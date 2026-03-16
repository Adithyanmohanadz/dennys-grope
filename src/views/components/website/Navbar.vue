<template>
    <header>
        <div class="container">
            <div class="navrow py-3 border-bottom">

                <div class="col-sm-4 col-lg-3 text-center text-sm-start">
                    <div class="main-logo">
                        <router-link to="/">
                            <img :src="logoUrl" alt="logo" class="img-fluid" width="250" />
                        </router-link>
                    </div>
                </div>

                <div class="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
                    <div class="search-bar row bg-light p-2 my-2 rounded-4 position-relative">
                        <div class="col-md-4 d-none d-md-block">
                            <select v-model="selectedCategory" class="form-select border-0 bg-transparent">
                                <option value="">All Categories</option>
                                <option v-for="category in categories" :key="category.category_id"
                                    :value="category.category_name">
                                    {{ category.category_name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-11 col-md-7">
                            <form id="search-form" class="text-center" @submit.prevent="handleSearch">
                                <input v-model="searchQuery" type="text" class="form-control border-0 bg-transparent"
                                    placeholder="Search products" @input="fetchSearchSuggestions"
                                    @focus="searchQuery.length >= 2 && searchSuggestions.length > 0 ? showSuggestions = true : null" />
                            </form>
                        </div>
                        <div class="col-1">
                            <a href="#" @click.prevent="handleSearch">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                                </svg>
                            </a>
                        </div>

                        <!-- Search Suggestions Dropdown -->
                        <div v-if="showSuggestions" class="search-suggestions">
                            <div v-if="isSearching" class="suggestion-item text-center py-3">
                                <div class="spinner-border spinner-border-sm text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <span class="ms-2 text-muted">Searching...</span>
                            </div>
                            <div v-else-if="searchSuggestions.length === 0" class="suggestion-item text-center py-3">
                                <i class="fas fa-search text-muted mb-2" style="font-size: 2rem;"></i>
                                <p class="mb-0 text-muted">No products found</p>
                                <small class="text-muted mb-0 ms-auto" v-if="selectedCategory">
                                    Try searching in all categories
                                </small>
                            </div>
                            <div v-else>
                                <div v-for="product in searchSuggestions" :key="product.item_id" class="suggestion-item"
                                    @click="selectSuggestion(product)">
                                    <img :src="product.item_image || 'https://via.placeholder.com/50'"
                                        :alt="product.item_name" class="suggestion-image" />
                                    <div class="suggestion-details">
                                        <div class="suggestion-name">{{ product.item_name }}</div>
                                        <div class="suggestion-brand">{{ product.brand }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end ms-auto">
                    <div class="support-box text-end d-none d-xl-block">
                        <span class="fs-6 text-muted">For Support?</span>
                        <h5 class="mb-0">{{ contactPersonPhone }}</h5>
                    </div>

                    <ul class="d-flex justify-content-end align-items-center list-unstyled m-0">
                        <li class="user-dropdown">
                            <a href="#" class="rounded-circle bg-light p-2 mx-1 user-icon-wrapper">
                                <i class="fas fa-user fa-lg"></i>
                                <span v-if="isLoggedIn" class="online-indicator"></span>
                            </a>
                            <div class="dropdown-menu-custom">
                                <template v-if="!isLoggedIn">
                                    <router-link to="/auth/login" class="dropdown-item-custom"
                                        style="text-wrap-style: balance ; line-height: normal;">
                                        <i class="fas fa-sign-in-alt"></i>
                                        Sign In
                                    </router-link>
                                    <router-link to="/auth/register" class="dropdown-item-custom">
                                        <i class="fas fa-user-plus"></i>
                                        Register
                                    </router-link>
                                    <div class="dropdown-divider-custom"></div>
                                </template>

                                <template v-else>
                                    <div class="dropdown-item-custom user-info-section">
                                        <i class="fas fa-user-circle text-success"></i>
                                        <div>
                                            <strong>{{ userName }}</strong>
                                            <p class="text-xxs text-muted mb-0">{{ userEmail }}</p>
                                        </div>
                                    </div>
                                    <div class="dropdown-divider-custom"></div>
                                    <router-link to="/profile" class="dropdown-item-custom">
                                        <i class="fas fa-user-circle"></i>
                                        My Profile
                                    </router-link>
                                    <router-link to="/orderview" class="dropdown-item-custom">
                                        <i class="fas fa-shopping-bag"></i>
                                        My Orders
                                    </router-link>
                                    <div class="dropdown-divider-custom"></div>
                                    <a href="#" @click.prevent="handleLogout" class="dropdown-item-custom text-danger2">
                                        <i class="fas fa-sign-out-alt"></i>
                                        Sign Out
                                    </a>
                                </template>
                            </div>
                        </li>

                        <!-- Cart icon — badge shows guest localStorage count OR logged-in API count -->
                        <li>
                            <router-link to="/cart" class="rounded-circle bg-light p-2 mx-1 cart-icon-badge-wrapper">
                                <i class="fas fa-shopping-cart fa-lg"></i>
                                <span v-if="carttotalItem > 0" class="cart-badge">{{ carttotalItem }}</span>
                            </router-link>
                        </li>

                        <li class="d-lg-none">
                            <a href="#" class="rounded-circle bg-light p-2 mx-1" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasSearch" aria-controls="offcanvasSearch">
                                <i class="fas fa-search fa-lg"></i>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </header>

    <OffcanvasSearch />
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { websiteApi } from '@/services/api';
import { updateWebsiteMeta } from '@/utils/websiteMeta.js';
import emitter from '@/utils/emitter.js';
import OffcanvasSearch from '@/views/components/website/offcanvasSearch.vue';

const router = useRouter();

// ─── Search state ─────────────────────────────────────────────────────────────
const searchQuery = ref('');
const selectedCategory = ref('');
const showSuggestions = ref(false);
const searchSuggestions = ref([]);
const isSearching = ref(false);

// ─── Website info state ───────────────────────────────────────────────────────
const logoUrl = ref('');
const contactPersonPhone = ref('');
const categories = ref([]);
const categoryNameToIdMap = ref({});

// ─── User state ───────────────────────────────────────────────────────────────
const user = ref(null);

// ─── Cart state ───────────────────────────────────────────────────────────────
const carttotalItem = ref(0);
const isFetchingCart = ref(false);

// ─── Computed ─────────────────────────────────────────────────────────────────

const isLoggedIn = computed(() => {
    return user.value !== null && !!localStorage.getItem('website_user_token');
});

const userName = computed(() => user.value?.name || 'User');
const userEmail = computed(() => user.value?.email || '');

// ─── Guest cart helper ────────────────────────────────────────────────────────

/**
 * Returns the number of distinct items in the guest localStorage cart.
 * This drives the badge when no user is logged in.
 */
function getGuestCartCount() {
    try {
        const raw = localStorage.getItem('cart_items');
        if (!raw) return 0;
        const items = JSON.parse(raw);
        return Array.isArray(items) ? items.length : 0;
    } catch {
        return 0;
    }
}

// ─── Cart data fetcher ────────────────────────────────────────────────────────

/**
 * For logged-in users: fetch total_items from the server.
 * For guests: read directly from localStorage cart_items.
 */
async function fetchCartData(loggedIn) {
     const isUserLoggedIn = loggedIn !== undefined ? loggedIn : isLoggedIn.value;

    if (!isUserLoggedIn) {
        carttotalItem.value = getGuestCartCount();
        return;
    }

    if (isFetchingCart.value) return;
    isFetchingCart.value = true;

    try {
        const res = await websiteApi.get("v1/user/cart/view");
        carttotalItem.value = res.data?.data?.summary?.total_items || 0;
    } catch (error) {
        console.error("Error fetching cart data:", error);
        carttotalItem.value = 0;
    } finally {
        isFetchingCart.value = false;
    }
}

// ─── Search ───────────────────────────────────────────────────────────────────

function handleSearch() {
    showSuggestions.value = false;
    const query = {};
    if (searchQuery.value.trim()) query.search = searchQuery.value.trim();
    if (selectedCategory.value?.trim()) query.category = selectedCategory.value;
    router.push({ path: '/shop', query: Object.keys(query).length > 0 ? query : {} });
}

let searchTimeout = null;
async function fetchSearchSuggestions() {
    const query = searchQuery.value.trim();

    if (query.length < 2) {
        showSuggestions.value = false;
        searchSuggestions.value = [];
        return;
    }

    if (searchTimeout) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
        try {
            isSearching.value = true;
            const res = await websiteApi.get("v1/item/intermediate-view");

            if (res.data.success) {
                const searchLower = query.toLowerCase();
                let filtered = res.data.data.filter(product =>
                    product.item_name.toLowerCase().includes(searchLower) ||
                    product.brand.toLowerCase().includes(searchLower)
                );

                if (selectedCategory.value?.trim()) {
                    const catId = categoryNameToIdMap.value[selectedCategory.value];
                    if (catId) {
                        filtered = filtered.filter(p => p.category_id === catId);
                    }
                }

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

function selectSuggestion(product) {
    searchQuery.value = product.item_name;
    showSuggestions.value = false;
    router.push(`/product/${product.item_id}`);
}

function handleClickOutside(event) {
    const searchContainer = document.querySelector('.search-bar');
    if (searchContainer && !searchContainer.contains(event.target)) {
        showSuggestions.value = false;
    }
}

// ─── User helpers ─────────────────────────────────────────────────────────────

function loadUserData() {
    const token = localStorage.getItem('website_user_token');
    const userData = localStorage.getItem('website_user');

    if (token && userData) {
        try {
            user.value = JSON.parse(userData);
        } catch {
            user.value = null;
        }
    } else {
        user.value = null;
    }

    // Always refresh badge after user state resolves
    const loggedIn = !!(user.value && token);
    fetchCartData(loggedIn); 
}

function handleLogout() {
    if (confirm('Are you sure you want to sign out?')) {
        localStorage.removeItem('website_user_token');
        localStorage.removeItem('website_user');
        // Clear guest cart on logout (Approach A)
        localStorage.removeItem('cart_items');
        localStorage.removeItem('guest_id');
        user.value = null;
        carttotalItem.value = 0;
        router.push('/');
        setTimeout(() => alert('You have been signed out successfully!'), 100);
    }
}

// ─── Categories ───────────────────────────────────────────────────────────────

async function fetchCategories() {
    try {
        const res = await websiteApi.get("v1/category/active");
        categories.value = res.data?.data || [];
        categories.value.forEach(cat => {
            categoryNameToIdMap.value[cat.category_name] = cat.category_id;
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

function formatPhoneNumber(number) {
    if (!number) return '';
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    return number;
}

function formatPrice(price) {
    return parseFloat(price).toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

// ─── Watchers ─────────────────────────────────────────────────────────────────

// Re-fetch cart when login status changes
watch(isLoggedIn, (loggedIn) => {
    fetchCartData(loggedIn);
});

// Re-run suggestions when category filter changes
watch(selectedCategory, () => {
    if (searchQuery.value.trim().length >= 2) fetchSearchSuggestions();
});

// ─── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(async () => {
    loadUserData();

    // Re-load user (and badge) when another tab logs in/out
    window.addEventListener('storage', loadUserData);
    window.addEventListener('click', handleClickOutside);

    fetchCategories();

    emitter.on("user-logged-in", () => {
  loadUserData();
});

    // cart-updated is emitted by ShopPage after every successful addToCart.
    // For guests it refreshes from localStorage; for logged-in users from the API.
    emitter.on('cart-updated', () => {
    fetchCartData(isLoggedIn.value);
});

    try {
        const res = await websiteApi.get("v1/website-info");
        const info = res.data?.data;
        if (info) {
            logoUrl.value = info.logo || '';
            contactPersonPhone.value = formatPhoneNumber(info.contactPerson?.phone || info.phone);
            updateWebsiteMeta({
                title: info.websiteName || 'My Website',
                logo: info.titleLogo || '/favicon.ico'
            });
        }
    } catch (error) {
        console.error("Error fetching website info:", error);
    }
});

onUnmounted(() => {
  window.removeEventListener('storage', loadUserData);
  window.removeEventListener('click', handleClickOutside);
  emitter.off('cart-updated');
  emitter.off('user-logged-in');
  if (searchTimeout) clearTimeout(searchTimeout);
});
</script>

<style scoped>
/* Cart Badge Styles */
.cart-icon-badge-wrapper {
    position: relative;
    display: inline-block;
}

.cart-badge {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 8px;
    border-radius: 50%;
    background-color: #dc3545;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 1;
    z-index: 10;
    transform: translate(30%, -25%);
    min-width: 22px;
    text-align: center;
    border: 2px solid white;
}

/* Existing styles */
.navrow {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-.5 * var(--bs-gutter-x));
    margin-left: calc(-.5 * var(--bs-gutter-x));
}

@media screen and (max-width: 460px) {
    .navrow {
        display: flex;
        flex-wrap: nowrap;
    }
}

.user-dropdown {
    position: relative;
    display: inline-block;
}

.user-icon-wrapper {
    position: relative;
    display: inline-block;
}

.online-indicator {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    background-color: #28a745;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(40, 167, 69, 0.5);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 0 4px rgba(40, 167, 69, 0.5); }
    50% { box-shadow: 0 0 8px rgba(40, 167, 69, 0.8); }
    100% { box-shadow: 0 0 4px rgba(40, 167, 69, 0.5); }
}

.dropdown-menu-custom {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 220px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 1000;
    margin-top: 8px;
}

.user-dropdown:hover .dropdown-menu-custom {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-item-custom {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    text-decoration: none;
    color: #333;
    border: none;
    background: none;
    text-align: left;
    transition: background-color 0.2s ease;
}

.dropdown-item-custom:hover {
    background-color: #f8f9fa;
    color: #333;
    text-decoration: none;
}

.dropdown-item-custom i {
    margin-right: 10px;
    width: 16px;
}

.user-info-section {
    background-color: #f8f9fa;
    border-bottom: 2px solid #28a745;
    padding: 14px 16px;
    cursor: default;
}

.user-info-section:hover {
    background-color: #f8f9fa;
}

.user-info-section i {
    font-size: 20px;
}

.dropdown-divider-custom {
    height: 1px;
    background-color: #e9ecef;
    margin: 4px 0;
}

.dropdown-menu-custom::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 20px;
    width: 12px;
    height: 12px;
    background: white;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    transform: rotate(45deg);
}

.navbar-nav {
    background: #f8f9fa;
    padding: 2px;
    border-radius: 10px;
}

.text-xxs {
    font-size: 0.65rem;
}

/* Search Suggestions Dropdown */
.search-bar {
    position: relative;
}

.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-top: 8px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1050;
    border: 1px solid #e0e0e0;
}

.suggestion-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
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

.search-suggestions::-webkit-scrollbar { width: 6px; }
.search-suggestions::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.search-suggestions::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
.search-suggestions::-webkit-scrollbar-thumb:hover { background: #555; }
</style>