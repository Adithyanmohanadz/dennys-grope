<template>
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasSearch"
        aria-labelledby="Search">
        <div class="offcanvas-header justify-content-center">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-primary">Search Products</span>
                </h4>
                
                <!-- Category Dropdown -->
                <div class="mb-3">
                    <select v-model="selectedCategory" class="form-select">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :key="category.category_id" :value="category.category_name">
                            {{ category.category_name }}
                        </option>
                    </select>
                </div>

                <!-- Search Form -->
                <form role="search" @submit.prevent="handleSearch" class="d-flex mt-3 gap-0 position-relative">
                    <input 
                        v-model="searchQuery"
                        class="form-control rounded-start rounded-0 bg-light" 
                        type="text"
                        placeholder="What are you looking for?" 
                        aria-label="What are you looking for?"
                        @input="fetchSearchSuggestions"
                        @focus="searchQuery.length >= 2 && searchSuggestions.length > 0 ? showSuggestions = true : null"
                    >
                    <button class="btn btn-dark rounded-end rounded-0" type="submit">
                        Search
                    </button>
                </form>

                <!-- Search Suggestions -->
                <div v-if="showSuggestions" class="mobile-search-suggestions mt-2">
                    <div v-if="isSearching" class="suggestion-item text-center py-3">
                        <div class="spinner-border spinner-border-sm text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <span class="ms-2 text-muted">Searching...</span>
                    </div>
                    <div v-else>
                        <div 
                            v-for="product in searchSuggestions" 
                            :key="product.item_id"
                            class="suggestion-item"
                            @click="selectSuggestion(product)"
                        >
                            <img 
                                :src="product.item_image || 'https://via.placeholder.com/50'" 
                                :alt="product.item_name"
                                class="suggestion-image"
                            />
                            <div class="suggestion-details">
                                <div class="suggestion-name">{{ product.item_name }}</div>
                                <div class="suggestion-brand">{{ product.brand }}</div>
                            </div>
                            <!-- <div class="suggestion-price">
                                ₹{{ formatPrice(product.tax_excluded_price) }}
                            </div> -->
                        </div>
                        <div v-if="searchSuggestions.length === 0 && searchQuery.length >= 2" class="suggestion-item text-center text-muted py-3">
                            No products found
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { websiteApi } from '@/services/api';
import { Offcanvas } from 'bootstrap';

const router = useRouter();

// State
const searchQuery = ref('');
const selectedCategory = ref('');
const categories = ref([]);
const showSuggestions = ref(false);
const searchSuggestions = ref([]);
const isSearching = ref(false);

// Category to ID mapping for filtering
const categoryNameToIdMap = ref({});

// Fetch categories
async function fetchCategories() {
    try {
        const res = await websiteApi.get("v1/category/active");
        categories.value = res.data?.data || [];
        
        // Build category name to ID map
        categories.value.forEach(category => {
            categoryNameToIdMap.value[category.category_name] = category.category_id;
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        categories.value = [];
    }
}

// Handle search submission
function handleSearch() {
    showSuggestions.value = false;
    
    const query = {};
    
    if (searchQuery.value.trim()) {
        query.search = searchQuery.value.trim();
    }
    
    if (selectedCategory.value && selectedCategory.value.trim()) {
        query.category = selectedCategory.value;
    }

    // Close offcanvas
    closeOffcanvas('offcanvasSearch');

    // Navigate to shop page
    router.push({
        path: '/shop',
        query: Object.keys(query).length > 0 ? query : {}
    });
}

// Fetch search suggestions with category filter
let searchTimeout = null;
async function fetchSearchSuggestions() {
    const query = searchQuery.value.trim();
    
    if (query.length < 2) {
        showSuggestions.value = false;
        searchSuggestions.value = [];
        return;
    }
    
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    searchTimeout = setTimeout(async () => {
        try {
            isSearching.value = true;
            const res = await websiteApi.get("v1/item/intermediate-view");
            
            if (res.data.success) {
                let allProducts = res.data.data;
                const searchLower = query.toLowerCase();
                
                // Filter by search query
                let filtered = allProducts.filter(product =>
                    product.item_name.toLowerCase().includes(searchLower) ||
                    product.brand.toLowerCase().includes(searchLower)
                );
                
                // Filter by category if selected
                if (selectedCategory.value && selectedCategory.value.trim()) {
                    const selectedCategoryId = categoryNameToIdMap.value[selectedCategory.value];
                    if (selectedCategoryId) {
                        filtered = filtered.filter(product => 
                            product.category_id === selectedCategoryId
                        );
                    }
                }
                
                // Limit to 8 suggestions
                searchSuggestions.value = filtered.slice(0, 8);
                showSuggestions.value = true;
            }
        } catch (error) {
            console.error('Error fetching search suggestions:', error);
        } finally {
            isSearching.value = false;
        }
    }, 300);
}

// Handle suggestion click
function selectSuggestion(product) {
    showSuggestions.value = false;
    
    // Close offcanvas
    closeOffcanvas('offcanvasSearch');
    
    // Navigate to product page
    router.push(`/product/${product.item_id}`);
}

// Close offcanvas function
function closeOffcanvas(offcanvasId) {
    const offcanvasEl = document.getElementById(offcanvasId);
    const bsOffcanvas = Offcanvas.getInstance(offcanvasEl);

    if (bsOffcanvas) {
        bsOffcanvas.hide();

        setTimeout(() => {
            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop) backdrop.remove();

            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }, 300);
    }
}

// Format price helper
function formatPrice(price) {
    return parseFloat(price).toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

// Initialize
onMounted(() => {
    fetchCategories();
});
</script>

<style scoped>
.mobile-search-suggestions {
    background: white;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    max-height: 400px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.suggestion-item {
    display: flex;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #f0f0f0;
}

.suggestion-item:last-child {
    border-bottom: none;
}

.suggestion-item:hover {
    background-color: #f8f9fa;
}

.suggestion-image {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 4px;
    margin-right: 12px;
    flex-shrink: 0;
}

.suggestion-details {
    flex-grow: 1;
    min-width: 0;
}

.suggestion-name {
    font-weight: 500;
    font-size: 0.9rem;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 4px;
}

.suggestion-brand {
    font-size: 0.75rem;
    color: #666;
}

.suggestion-price {
    font-weight: 600;
    color: #000;
    font-size: 0.95rem;
    flex-shrink: 0;
    margin-left: 12px;
}

.mobile-search-suggestions::-webkit-scrollbar {
    width: 6px;
}

.mobile-search-suggestions::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.mobile-search-suggestions::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.mobile-search-suggestions::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>