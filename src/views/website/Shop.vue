<template>
  <section style="background-color: #f5f2ed;">
    <div class="shopify-grid mt-lg-5">
      <div class="container-fluid">
        <div class="row g-5">

          <!-- Mobile Filter Button -->
          <div class="col-12 d-md-none">
            <button class="btn btn-outline-primary w-100" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasFilters" aria-controls="offcanvasFilters">
              <i class="fas fa-filter me-2"></i> Filters
            </button>
          </div>

          <!-- Desktop Sidebar -->
          <aside class="col-md-2 mt-3 d-none d-md-block">
            <div class="sidebar">
              <div class="widget-menu">
                <div class="widget-search-bar">
                  <form role="search" class="d-flex position-relative mt-3 gap-0" @submit.prevent>
                    <input class="form-control form-control-lg rounded-2 bg-white" type="text" placeholder="Search here"
                      aria-label="Search here" v-model="searchQuery" @input="onSearchInput">
                    <button class="btn bg-transparent position-absolute end-0 align-items-center h-100" type="submit">
                      <i class="fas fa-search text-lg"></i>
                    </button>
                  </form>
                </div>
              </div>

              <!-- Dynamic Category Filter -->
              <div class="widget-product-category pt-3">
                <h5 class="widget-title">Category</h5>
                <div v-if="categoriesLoading" class="text-muted small py-2">
                  <span class="spinner-border spinner-border-sm me-1"></span> Loading...
                </div>
                <ul v-else class="product-tags sidebar-list list-unstyled">
                  <li class="tags-item d-flex" v-for="category in categories" :key="category.category_id">
                    <input type="checkbox" :id="'cat-' + category.category_id" name="category-filter"
                      :value="category.category_id" v-model="selectedCategories" @change="onFilterChange">
                    <label :for="'cat-' + category.category_id" class="nav-link ms-2">
                      {{ category.category_name }}
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <!-- Mobile Offcanvas Filters -->
          <div class="offcanvas offcanvas-start mt-0 px-0" tabindex="-1" id="offcanvasFilters"
            aria-labelledby="offcanvasFiltersLabel">
            <div class="offcanvas-header border-bottom">
              <h5 class="offcanvas-title" id="offcanvasFiltersLabel">Filters</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body filter p-0 d-flex flex-column">
              <div class="flex-grow-1 overflow-auto px-3">
                <div class="widget-menu">
                  <div class="widget-search-bar">
                    <form role="search" class="d-flex position-relative mt-3 gap-0" @submit.prevent>
                      <input class="form-control form-control-lg rounded-2 bg-light" type="text"
                        placeholder="Search here" aria-label="Search here" v-model="searchQuery" @input="onSearchInput">
                      <button class="btn bg-transparent position-absolute end-0 align-items-center h-100" type="submit">
                        <i class="fas fa-search text-lg"></i>
                      </button>
                    </form>
                  </div>
                </div>

                <!-- Dynamic Category Filter (Mobile) -->
                <div class="widget-product-category pt-3">
                  <h5 class="widget-title">Category</h5>
                  <div v-if="categoriesLoading" class="text-muted small py-2">
                    <span class="spinner-border spinner-border-sm me-1"></span> Loading...
                  </div>
                  <ul v-else class="product-tags sidebar-list list-unstyled">
                    <li class="tags-item d-flex" v-for="category in categories" :key="category.category_id">
                      <input type="checkbox" :id="'mob-cat-' + category.category_id" name="category-filter-mobile"
                        :value="category.category_id" v-model="selectedCategories" @change="onFilterChange">
                      <label :for="'mob-cat-' + category.category_id" class="nav-link ms-2">
                        {{ category.category_name }}
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="d-flex border-top flex-shrink-0">
                <button class="btn bg-info w-50 py-3 rounded-0 text-uppercase" type="button"
                  data-bs-dismiss="offcanvas">Close</button>
                <button class="btn btn-primary w-50 py-3 rounded-0 text-uppercase" type="button"
                  data-bs-dismiss="offcanvas">Apply</button>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <main class="col-12 col-md-10 mt-3">
            <div class="filter-shop d-flex justify-content-between flex-wrap align-items-center mb-3">
              <div class="showing-product">
                <p class="mb-0">
                  Showing {{ pagination.from }}–{{ pagination.to }} of {{ pagination.total }} results
                </p>
              </div>
              <div class="sort-by mt-2 mt-md-0">
                <select id="input-sort" class="form-control" v-model="sortBy" @change="onSortChange">
                  <option value="">Default sorting</option>
                  <option value="name-asc">Name (A - Z)</option>
                  <option value="name-desc">Name (Z - A)</option>
                </select>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="itemsLoading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3 text-muted">Loading products...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="itemsError" class="alert alert-danger">
              <i class="fas fa-exclamation-circle me-2"></i>
              {{ itemsError }}
            </div>

            <!-- Empty State -->
            <div v-else-if="items.length === 0" class="text-center py-5 text-muted">
              <i class="fas fa-box-open fa-3x mb-3 d-block"></i>
              <p>No products found.</p>
            </div>

            <!-- Product List -->
            <div v-else class="product-list p-3">
              <div class="product-card mb-4 overflow-hidden" v-for="item in items" :key="item.item_id">
                <div class="row g-0 align-items-stretch">

                  <!-- Product Image -->
                  <div
                    class="col-md-3 d-flex align-items-center justify-content-center p-4 position-relative border-end-sm">
                    <div class="image-container">
                      <router-link to="product">
                        <img :src="item.item_image || '/assets/website/img/product/placeholder.jpg'"
                          class="img-fluid hover-zoom" :alt="item.item_name" @error="handleImageError">
                      </router-link>
                    </div>
                  </div>

                  <!-- Product Details -->
                  <div class="col-md-9 p-4">

                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h2 class="product-title h4 fw-bolder text-dark mb-1">{{ item.item_name }}</h2>
                        <span class="badge bg-secondary opacity-75" v-if="item.category_name">
                          {{ item.category_name }}
                        </span>
                      </div>
                    </div>

                    <p class="text-secondary mb-4 description-text">
                      {{ item.description || 'No description available.' }}
                    </p>

                    <!-- Quantity Type Selector (Retail / Wholesale) -->
                    <div class="purchase-selector d-flex gap-2 mb-4"
                      v-if="item.quantity_types && item.quantity_types.length">
                      <template v-for="qt in item.quantity_types" :key="qt.quantity_type_id">
                        <input type="radio" class="btn-check" :name="'options-' + item.item_id"
                          :id="'qt-' + item.item_id + '-' + qt.quantity_type_id" :value="qt.quantity_type_id"
                          v-model="selectedQuantityType[item.item_id]" @change="onQuantityTypeChange(item)">
                        <label class="btn btn-outline-soft-danger px-3 py-1 text-sm qty"
                          :for="'qt-' + item.item_id + '-' + qt.quantity_type_id">
                          {{ qt.quantity_type }}
                        </label>
                      </template>
                    </div>

                    <div class="row align-items-end g-3">
                      <div class="col-md-9 row g-2">

                        <!-- Variant Type Dropdowns -->
                        <template v-if="getSelectedQuantityType(item)">
                          <div class="col-md-3 col-6" v-for="variantType in getSelectedQuantityType(item).variant_types"
                            :key="variantType.variant_type_id">
                            <label class="form-label-custom">{{ variantType.variant_type }}</label>
                            <select class="form-select modern-select"
                              v-model="selectedVariants[item.item_id + '-' + variantType.variant_type_id]"
                              @change="onVariantChange(item)">
                              <option v-for="variant in variantType.variants" :key="variant.variant_id"
                                :value="variant.variant_id">
                                {{ variant.variant }}
                              </option>
                            </select>
                          </div>

                          <!-- Quantity / Sub-item Dropdown -->
                          <div class="col-md-3 col-12" v-if="getMatchingSubItems(item).length > 0">
                            <label class="form-label-custom">Quantity</label>
                            <select class="form-select modern-select" v-model="selectedSubItem[item.item_id]">
                              <option v-for="sub in getMatchingSubItems(item)" :key="sub.sub_item_id"
                                :value="sub.sub_item_id">
                                {{ sub.quantity_label }}
                              </option>
                            </select>
                          </div>
                        </template>

                      </div>

                      <!-- Price & Action Button -->
                      <div class="col-md-3 col-12 d-flex flex-column align-items-end">

                        <!-- Wholesale: Route to Registration Page -->
                        <div v-if="isWholesale(item)" class="w-100">
                          <router-link
                            :to="{ name: 'wholesale-registration', query: { item_id: item.item_id, item_name: item.item_name } }"
                            class="btn btn-primary w-100 text-dark text-decoration-none d-flex align-items-center justify-content-center gap-2">
                            <i class="fas fa-eye"></i> View Price
                          </router-link>
                        </div>

                        <!-- Retail: Price + Add to Cart -->
                        <div v-else>
                          <div class="price-tag text-end mb-2 mt-lg-n6">
                            <template v-if="getActiveSubItem(item)">

                              <!-- Discount badge -->
                              <div v-if="parseFloat(getActiveSubItem(item).discount) > 0" class="badge bg-danger2 mb-1">
                                -{{ Math.round(getActiveSubItem(item).discount) }}%
                              </div>

                              <div class="d-flex">
                                <!-- GST label -->
                                <div class="">
                                  <span
                                    v-if="parseFloat(getActiveSubItem(item).gst_included_price) !== parseFloat(getActiveSubItem(item).gst_excluded_price)"
                                    class="gst-pill gst-incl">Incl. GST</span>
                                  <span v-else class="gst-pill gst-excl">Excl. GST</span>
                                </div>
                                <!-- GST Included price (main price) -->
                                <h3 class="fw-black text-success3 mb-0">
                                  <span class="text-sm">₹</span>
                                  {{ formatPrice(getActiveSubItem(item).gst_included_price) }}
                                </h3>
                              </div>

                              <!-- Strikethrough MRP — only when discounted -->
                              <span v-if="parseFloat(getActiveSubItem(item).discount) > 0"
                                class="text-muted text-decoration-line-through small d-block">
                                M.R.P ₹{{ formatPrice(getActiveSubItem(item).price) }}
                              </span>

                            </template>
                            <template v-else>
                              <h3 class="fw-black text-muted mb-0">--</h3>
                            </template>
                          </div>

                          <!-- Add to Cart button -->
                          <button class="btn btn-dark-modern w-100"
                            :disabled="!getActiveSubItem(item) || cartLoadingItems[item.item_id]"
                            @click="addToCart(item)">
                            <span v-if="cartLoadingItems[item.item_id]">
                              <span class="spinner-border spinner-border-sm me-1"></span> Adding...
                            </span>
                            <span v-else>
                              <i class="fas fa-shopping-bag me-2"></i> Add to Cart
                            </span>
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <nav v-if="pagination.lastPage > 1" class="text-center py-4" aria-label="Page navigation">
              <ul class="pagination d-flex justify-content-center">

                <!-- Previous -->
                <li class="page-item" :class="{ disabled: pagination.currentPage === 1 }">
                  <a class="page-link bg-none border-0 bg-info" href="#" aria-label="Previous"
                    @click.prevent="goToPage(pagination.currentPage - 1)">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                <!-- Page Numbers -->
                <li class="page-item" v-for="page in visiblePages" :key="page"
                  :class="{ active: page === pagination.currentPage }">
                  <a class="page-link border-0" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                </li>

                <!-- Next -->
                <li class="page-item" :class="{ disabled: pagination.currentPage === pagination.lastPage }">
                  <a class="page-link border-0 bg-info" href="#" aria-label="Next"
                    @click.prevent="goToPage(pagination.currentPage + 1)">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>

              </ul>
            </nav>

          </main>

        </div>
      </div>
    </div>

    <!-- ── Add to Cart Toast ─────────────────────────────────────────────── -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100;">
      <div id="cartToast" class="toast align-items-center text-white border-0"
        :class="cartToast.success ? 'bg-success' : 'bg-danger'" role="alert" aria-live="assertive" aria-atomic="true"
        ref="cartToastEl">
        <div class="d-flex">
          <div class="toast-body">
            <i :class="cartToast.success ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="me-2"></i>
            {{ cartToast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { Toast } from "bootstrap";
import { websiteApi } from '@/services/api';
import { getGuestId } from '@/utils/guest';
import emitter from '@/utils/emitter.js';

// ─── State ────────────────────────────────────────────────────────────────────

const categories = ref([]);
const categoriesLoading = ref(false);

const items = ref([]);
const itemsLoading = ref(false);
const itemsError = ref(null);

const cartLoadingItems = reactive({});

const cartToastEl = ref(null);
const cartToast = reactive({ success: true, message: '' });

const pagination = reactive({
  currentPage: 1,
  lastPage: 1,
  total: 0,
  from: 0,
  to: 0,
  perPage: 10,
});

const searchQuery = ref('');
const selectedCategories = ref([]);
const sortBy = ref('');

const selectedQuantityType = reactive({});
const selectedVariants = reactive({});
const selectedSubItem = reactive({});

// ─── Toast Helper ─────────────────────────────────────────────────────────────

const showToast = (message, success = true) => {
  cartToast.message = message;
  cartToast.success = success;
  if (cartToastEl.value) {
    const toast = Toast.getOrCreateInstance(cartToastEl.value, { delay: 3000 });
    toast.show();
  }
};

// ─── Computed ─────────────────────────────────────────────────────────────────

const visiblePages = computed(() => {
  const { currentPage, lastPage } = pagination;
  const delta = 2;
  const range = [];
  const left = Math.max(1, currentPage - delta);
  const right = Math.min(lastPage, currentPage + delta);
  if (left > 1) range.push(1);
  if (left > 2) range.push('...');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < lastPage - 1) range.push('...');
  if (right < lastPage) range.push(lastPage);
  return range;
});

// ─── API Calls ────────────────────────────────────────────────────────────────

const fetchCategories = async () => {
  categoriesLoading.value = true;
  try {
    const res = await websiteApi.get('v1/category/active');
    if (res.data.success) categories.value = res.data.data;
  } catch (e) {
    console.error('fetchCategories error:', e);
  } finally {
    categoriesLoading.value = false;
  }
};

const fetchItems = async (page = 1) => {
  itemsLoading.value = true;
  itemsError.value = null;
  try {
    const params = {
      page,
      ...(searchQuery.value.trim() && { search: searchQuery.value.trim() }),
      ...(selectedCategories.value.length && { category_ids: selectedCategories.value.join(',') }),
      ...(sortBy.value && { sort: sortBy.value }),
    };
    const res = await websiteApi.get('v1/items', { params });
    if (res.data.status) {
      const paginatedData = res.data.data;
      items.value = paginatedData.data;
      pagination.currentPage = paginatedData.current_page;
      pagination.lastPage = paginatedData.last_page;
      pagination.total = paginatedData.total;
      pagination.from = paginatedData.from ?? 0;
      pagination.to = paginatedData.to ?? 0;
      pagination.perPage = paginatedData.per_page;
      items.value.forEach(item => initItemSelections(item));
    }
  } catch (e) {
    console.error('fetchItems error:', e);
    itemsError.value = 'Failed to load products. Please try again.';
  } finally {
    itemsLoading.value = false;
  }
};

// ─── Pagination ───────────────────────────────────────────────────────────────

const goToPage = (page) => {
  if (page < 1 || page > pagination.lastPage || page === pagination.currentPage) return;
  fetchItems(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ─── Filter / Sort ────────────────────────────────────────────────────────────

let searchDebounceTimer = null;
const onSearchInput = () => {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => fetchItems(1), 400);
};
const onFilterChange = () => fetchItems(1);
const onSortChange = () => fetchItems(1);

// ─── Item Selection ───────────────────────────────────────────────────────────

const initItemSelections = (item) => {
  if (!item.quantity_types?.length) return;
  const defaultQT = item.quantity_types[0];
  selectedQuantityType[item.item_id] = defaultQT.quantity_type_id;
  defaultQT.variant_types?.forEach(vt => {
    const key = `${item.item_id}-${vt.variant_type_id}`;
    if (vt.variants?.length) selectedVariants[key] = vt.variants[0].variant_id;
  });
  resolveSubItem(item);
};

const getSelectedQuantityType = (item) => {
  const id = selectedQuantityType[item.item_id];
  return item.quantity_types?.find(qt => qt.quantity_type_id === id) ?? null;
};

const isWholesale = (item) => {
  const qt = getSelectedQuantityType(item);
  return qt?.quantity_type?.toLowerCase().includes('wholesale') ?? false;
};

const getSelectedVariantIds = (item) => {
  const qt = getSelectedQuantityType(item);
  if (!qt?.variant_types) return [];
  return qt.variant_types
    .map(vt => selectedVariants[`${item.item_id}-${vt.variant_type_id}`])
    .filter(Boolean);
};

const getMatchingSubItems = (item) => {
  const qt = getSelectedQuantityType(item);
  if (!qt?.sub_items) return [];
  const selected = getSelectedVariantIds(item);
  if (!selected.length) return qt.sub_items;
  return qt.sub_items.filter(sub => selected.every(vid => sub.variant_ids.includes(vid)));
};

const getActiveSubItem = (item) => {
  const qt = getSelectedQuantityType(item);
  if (!qt?.sub_items) return null;
  const id = selectedSubItem[item.item_id];
  return qt.sub_items.find(s => s.sub_item_id === id) ?? null;
};

const resolveSubItem = (item) => {
  const matches = getMatchingSubItems(item);
  selectedSubItem[item.item_id] = matches.length ? matches[0].sub_item_id : null;
};

const onQuantityTypeChange = (item) => {
  const qt = getSelectedQuantityType(item);
  qt?.variant_types?.forEach(vt => {
    const key = `${item.item_id}-${vt.variant_type_id}`;
    selectedVariants[key] = vt.variants?.length ? vt.variants[0].variant_id : null;
  });
  resolveSubItem(item);
};

const onVariantChange = (item) => resolveSubItem(item);

// ─── Formatting ───────────────────────────────────────────────────────────────

const formatPrice = (value) =>
  parseFloat(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ─── Cart ─────────────────────────────────────────────────────────────────────

const addToCart = async (item) => {
  const subItem = getActiveSubItem(item);
  if (!subItem) return;

  const qt = getSelectedQuantityType(item);
  cartLoadingItems[item.item_id] = true;

  try {
    const guestId = getGuestId();
    const res = await websiteApi.post('v1/cart/add', {
      guest_uuid: guestId,
      sub_item_id: subItem.sub_item_id,
      quantity: 1,
      unit_price: parseFloat(subItem.gst_included_price),
    });

    if (!res.data.success) throw new Error(res.data.message || 'Failed to add to cart');

    const backendCart = res.data.data;

    const cartEntry = {
      cart_id: backendCart.cart_id,
      item_id: item.item_id,
      item_name: item.item_name,
      item_image: item.item_image || null,
      quantity_type: qt?.quantity_type ?? '',
      sub_item_id: subItem.sub_item_id,
      quantity_label: subItem.quantity_label,
      price: subItem.price,
      discount: subItem.discount ?? '0.00',
      gst_included_price: subItem.gst_included_price,
      gst_excluded_price: subItem.gst_excluded_price,
      tax_type_id: subItem.tax_type_id ?? null,
      selected_variants: (qt?.variant_types ?? []).map(vt => {
        const selectedVid = selectedVariants[`${item.item_id}-${vt.variant_type_id}`];
        const variant = vt.variants?.find(v => v.variant_id === selectedVid);
        return { variant_type_id: vt.variant_type_id, variant_type: vt.variant_type, variant: variant?.variant ?? '' };
      }),
      qty: backendCart.quantity,
    };

    const stored = localStorage.getItem('cart_items');
    let cartItems = stored ? JSON.parse(stored) : [];
    const existingIndex = cartItems.findIndex(c => c.sub_item_id === cartEntry.sub_item_id);
    if (existingIndex !== -1) {
      cartItems[existingIndex] = cartEntry;
    } else {
      cartItems.push(cartEntry);
    }
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
    emitter.emit('cart-updated');

    showToast(`"${item.item_name}" added to cart!`, true);
  } catch (e) {
    console.error('addToCart error:', e);
    showToast(e.message || 'Could not add to cart. Please try again.', false);
  } finally {
    cartLoadingItems[item.item_id] = false;
  }
};

console.log('Token:', localStorage.getItem('website_user_token'));
console.log('User:', localStorage.getItem('website_user'));

// ─── Image Fallback ───────────────────────────────────────────────────────────

const handleImageError = (e) => {
  e.target.src = '/assets/website/img/product/placeholder.jpg';
};

// ─── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(async () => {
  await Promise.all([fetchCategories(), fetchItems(1)]);
});
</script>

<style scoped>
.filter {
  display: flex !important;
  flex-direction: column;
  padding-bottom: 70px !important;
}

.qty {
  text-transform: capitalize !important;
}

.tags-item input[type="checkbox"]:checked+.nav-link,
.cat-item input[type="checkbox"]:checked+.nav-link {
  font-weight: bold;
}

#offcanvasFilters {
  max-width: 100%;
  width: 100%;
}

.product-item h3 {
  font-size: 15px;
  line-height: 1.4;
  height: calc(1.4em * 3);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.product-item a h3:hover {
  color: #2a72dd;
}

@media (max-width: 500px) {
  .product-item figure img {
    max-height: 180px !important;
    height: auto;
  }
}

@media (max-width: 400px) {
  .product-item figure img {
    max-height: 135px !important;
    height: auto;
  }
}

/* Pagination */
.pagination .page-item .page-link {
  border: none;
  background: transparent;
  color: #333;
  font-weight: 500;
  padding: 10px 16px;
  margin: 0 5px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.pagination .page-item .page-link:hover {
  background-color: #f1f1f1;
  color: #007bff;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

.pagination .page-item.disabled .page-link {
  color: #aaa;
  pointer-events: none;
  background: transparent;
}

.pagination .page-item:first-child .page-link,
.pagination .page-item:last-child .page-link {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Product Card */
.product-card {
  background: #fff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.08);
}

.product-title {
  letter-spacing: -0.5px;
  text-transform: capitalize;
}

.description-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #6c757d !important;
}

.hover-zoom {
  transition: transform 0.5s ease;
  max-height: 200px;
}

.product-card:hover .hover-zoom {
  transform: scale(1.08);
}

/* Buttons */
.btn-outline-soft-danger {
  border: 1px solid #fee2e2;
  color: #dc3545;
  background: #fff5f5;
  border-radius: 10px;
  font-weight: 500;
}

.btn-check:checked+.btn-outline-soft-danger {
  background-color: #dc3545;
  color: white;
  border-color: #dc3545;
}

.btn-dark-modern {
  background: #1a1a1a;
  color: white;
  border-radius: 12px;
  padding: 0.75rem;
  font-weight: 600;
  border: none;
  transition: all 0.2s;
}

.btn-dark-modern:hover {
  background: #000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-dark-modern:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.gst-pill {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 20px;
  white-space: nowrap;
}

.gst-incl {
  background-color: #e6f4ea;
  color: #1a7f3c;
  border: 1px solid #b7dfc4;
}

.gst-excl {
  background-color: #fff3e0;
  color: #b45309;
  border: 1px solid #fcd9a0;
}

.form-label-custom {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #585d61;
  margin-bottom: 0.5rem;
  display: block;
}

.modern-select {
  border-radius: 12px;
  border: 1px solid #f1f3f5;
  background-color: #f8f9fa;
  padding: 0.6rem;
  font-size: 0.9rem;
}
</style>