<template>
  <div class="admin-item-list">
    <div class="container-fluid px-1 px-md-4">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <div>
                  <h5 class="fw-bolder">Item List</h5>
                  <p class="text-muted text-xs mb-0">Manage your items with variants and pricing</p>
                </div>
                <div class="ms-auto my-auto d-flex gap-2">
                  <button type="button" class="btn bg-gradient-dark btn-sm mb-0" @click="downloadExcel">
                    <i class="fas fa-download"></i>&nbsp; Download Excel
                  </button>
                  <button type="button" class="btn bg-gradient-primary btn-sm mb-0" @click="addNewItem">
                    +&nbsp; New Item
                  </button>
                </div>
              </div>
            </div>

            <!-- Filters -->
            <div class="p-2 m-2 my-0 py-0">
              <div class="row">
                <div class="col-6 col-md-3 mt-2">
                  <label>Item Name</label>
                  <input class="form-control form-control-sm" type="text" v-model="searchQuery.itemName"
                    placeholder="Search by name" />
                </div>
                <div class="col-6 col-md-3 mt-2">
                  <label>Category</label>
                  <select class="form-control form-control-sm" v-model="searchQuery.category">
                    <option value="">All Categories</option>
                    <option v-for="cat in categories" :key="cat.category_id" :value="cat.category_id">
                      {{ cat.category_name }}
                    </option>
                  </select>
                </div>
                <div class="col-6 col-md-3 mt-2">
                  <label>Quantity Type</label>
                  <select class="form-control form-control-sm" v-model="searchQuery.quantityType">
                    <option value="">All Types</option>
                    <option v-for="qt in quantityTypes" :key="qt.quantity_type_id" :value="qt.quantity_type_id">
                      {{ qt.quantity_type_name }}
                    </option>
                  </select>
                </div>
                <div class="col-6 col-md-3 mt-2">
                  <label>Status</label>
                  <select class="form-control form-control-sm" v-model="searchQuery.status">
                    <option value="">All</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center p-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <!-- Table -->
            <div v-else class="card-body p-0 mt-3">
              <div class="table-responsive">
                <table class="table table-flush align-items-center mb-0">
                  <thead class="bg-dark">
                    <tr>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">#</th>
                      <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable"
                        @click="sortBy('item_name')">
                        Item Details
                        <i :class="getSortIcon('item_name')"></i>
                      </th>
                      <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                        Variants Summary
                      </th> 
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable"
                        @click="sortBy('status')">
                        Status
                        <i :class="getSortIcon('status')"></i>
                      </th>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item, index) in paginatedItems" :key="item.item_id">
                      <tr>
                        <td class="align-middle text-center">
                          <span class="text-xs font-weight-bold">{{ (currentPage - 1) * itemsPerPage + index + 1
                            }}</span>
                        </td>

                        <!-- Item Details -->
                        <td class="align-middle">
                          <div class="d-flex align-items-center">
                            <div v-if="item.item_image" class="me-3">
                              <img :src="item.item_image" alt="Item" class="item-thumbnail" />
                            </div>
                            <div>
                              <h6 class="mb-0 text-sm">{{ item.item_name }}</h6>
                              <p class="text-xs text-secondary mb-0">
                                <strong>Code:</strong> {{ item.item_alias_code }}
                              </p>
                              <p class="text-xs text-secondary mb-0">
                                <strong>Category:</strong> {{ getCategoryName(item.category_id) }}
                              </p>
                            </div>
                          </div>
                        </td>

                        <!-- Variants Summary -->
                        <td class="align-middle">
                          <div class="d-flex flex-column gap-1">
                            <div v-for="qType in item.quantity_types" :key="qType.quantity_type_id"
                              class="variant-summary-card"
                              :class="{ 'variant-summary-card--active': isExpanded(item.item_id, qType.quantity_type_id) }">
                              <span class="qty-type-badge" :class="{
                                'badge-wholesale': qType.quantity_type.toLowerCase().includes('wholesale'),
                                'badge-retail': qType.quantity_type.toLowerCase().includes('retail'),
                                'badge-sample': qType.quantity_type.toLowerCase().includes('sample')
                              }">
                                {{ qType.quantity_type }}
                              </span>
                              <span class="text-xs text-muted ms-2">
                                {{ qType.sub_items.length }} variant{{ qType.sub_items.length > 1 ? 's' : '' }}
                              </span>
                              <button type="button" class="btn btn-link btn-sm p-0 ms-auto expand-toggle-btn"
                                @click="toggleItemExpand(item.item_id, qType.quantity_type_id)">
                                <i class="fas fa-chevron-down text-xs transition-transform"
                                  :class="{ 'rotate-180': isExpanded(item.item_id, qType.quantity_type_id) }"></i>
                              </button>
                            </div>
                          </div>
                        </td> 

                        <!-- Status -->
                        <td class="align-middle text-center">
                          <span :class="['badge', item.status === 1 ? 'badge-success' : 'badge-danger', 'badge-sm']">
                            {{ item.status === 1 ? 'Active' : 'Inactive' }}
                          </span>
                        </td>

                        <!-- Actions -->
                        <td class="align-middle text-center">
                          <a href="javascript:;" class="me-2" data-bs-toggle="tooltip" title="Edit Item"
                            @click="editItem(item)">
                            <i class="fas fa-edit text-primary"></i>
                          </a>
                          <a href="javascript:;" class="me-2" data-bs-toggle="tooltip"
                            :title="item.status === 1 ? 'Deactivate' : 'Activate'" @click="toggleItemStatus(item)">
                            <i
                              :class="[item.status === 1 ? 'fas fa-ban text-warning' : 'fas fa-check-circle text-success']"></i>
                          </a>
                          <a href="javascript:;" data-bs-toggle="tooltip" title="Delete" @click="removeItem(item.item_id)">
                            <i class="fas fa-trash text-danger"></i>
                          </a>
                        </td>
                      </tr>

                      <!-- Expanded Variant Details Row -->
                      <tr v-for="qType in item.quantity_types" :key="`expand-${item.item_id}-${qType.quantity_type_id}`"
                        v-show="isExpanded(item.item_id, qType.quantity_type_id)" class="variant-detail-row">
                        <td colspan="6" class="p-0">
                          <div class="variant-detail-container">
                            <div class="variant-detail-header">
                              <h6 class="mb-0">{{ qType.quantity_type }} Variants</h6>
                              <span class="text-xs text-muted">
                                Variant Types: {{ qType.variant_types.map(vt => vt.variant_type).join(', ') }}
                              </span>
                            </div>

                            <div class="table-responsive">
                              <table class="table table-sm mb-0 variant-detail-table">
                                <thead>
                                  <tr>
                                    <th class="text-xs">#</th>
                                    <th v-for="vt in qType.variant_types" :key="vt.variant_type_id" class="text-xs">
                                      {{ vt.variant_type }}
                                    </th>
                                    <th class="text-xs text-center">Quantity</th>
                                    <th class="text-xs text-center">Price</th>
                                    <th class="text-xs text-center">Discount</th>
                                    <th class="text-xs text-center">Tax Type</th>
                                    <th class="text-xs text-center">Final Price</th>
                                    <th class="text-xs text-center">Status</th>
                                    <th class="text-xs text-center">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(subItem, sIndex) in qType.sub_items" :key="subItem.sub_item_id">
                                    <td class="text-xs">{{ sIndex + 1 }}</td>
                                    <td v-for="vt in qType.variant_types" :key="`var-${vt.variant_type_id}`"
                                      class="text-xs">
                                      <span class="variant-option-tag">
                                        {{ getVariantName(vt.variants, subItem.variant_ids) }}
                                      </span>
                                    </td>
                                    <td class="text-xs text-center">{{ subItem.quantity_label }}</td>
                                    <td class="text-xs text-center">₹{{ parseFloat(subItem.price).toFixed(2) }}</td>
                                    <td class="text-xs text-center">{{ subItem.discount }}%</td>
                                    <td class="text-xs text-center">
                                      {{ getTaxTypeName(subItem.tax_type_id) }}
                                    </td>
                                    <td class="text-xs text-center fw-bold text-success">
                                      ₹{{ parseFloat(subItem.gst_included_price).toFixed(2) }}
                                    </td>
                                    <td class="text-xs text-center">
                                      <span :class="['badge badge-xs', subItem.status === 1 ? 'badge-success' : 'badge-secondary']">
                                        {{ subItem.status === 1 ? 'Active' : 'Inactive' }}
                                      </span>
                                    </td>
                                    <td class="text-xs text-center">
                                      <a href="javascript:;" 
                                        data-bs-toggle="tooltip" 
                                        :title="subItem.status === 1 ? 'Deactivate' : 'Activate'"
                                        @click="toggleVariantStatus(item.item_id, qType.quantity_type_id, subItem)">
                                        <i :class="[subItem.status === 1 ? 'fas fa-toggle-on text-success' : 'fas fa-toggle-off text-secondary']"
                                          style="font-size: 1.2rem;"></i>
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>

                    <tr v-if="filteredItems.length === 0">
                      <td colspan="6" class="text-center text-muted py-4">
                        <i class="fas fa-inbox fa-3x mb-3"></i>
                        <p>No items found matching your criteria.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="!loading && filteredItems.length > 0"
              class="card-footer d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <label class="mb-0 me-2">Rows per page:</label>
                <select class="form-select form-select-sm" v-model="itemsPerPage" style="width: 80px;">
                  <option :value="10">10</option>
                  <option :value="25">25</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
                <span class="ms-3 text-sm text-muted">
                  Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredAndSortedItems.length }} entries
                </span>
              </div>

              <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm mb-0">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="javascript:void(0)" @click="currentPage = 1">
                      <i class="fas fa-angle-double-left"></i>
                    </a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="javascript:void(0)" @click="currentPage--">
                      <i class="fas fa-angle-left"></i>
                    </a>
                  </li>

                  <li v-for="page in visiblePages" :key="page" class="page-item"
                    :class="{ active: currentPage === page }">
                    <a class="page-link" href="javascript:void(0)" @click="currentPage = page">
                      {{ page }}
                    </a>
                  </li>

                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="javascript:void(0)" @click="currentPage++">
                      <i class="fas fa-angle-right"></i>
                    </a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="javascript:void(0)" @click="currentPage = totalPages">
                      <i class="fas fa-angle-double-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import * as XLSX from 'xlsx'

const router = useRouter()

// ── State ──────────────────────────────────────────────────────────────────────
const items = ref([])
const categories = ref([])
const quantityTypes = ref([])
const taxTypes = ref([])
const loading = ref(false)
const expandedItems = ref([]) // Track expanded items: [{itemId, qtyTypeId}]

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sorting
const sortColumn = ref('')
const sortDirection = ref('asc')

// Search filters
const searchQuery = reactive({
  itemName: '',
  category: '',
  quantityType: '',
  status: ''
})

// ── Lifecycle ──────────────────────────────────────────────────────────────────
onMounted(async () => {
  await Promise.all([
    fetchCategories(),
    fetchQuantityTypes(),
    fetchTaxTypes(),
    fetchItems()
  ])
})

// ── API Calls ──────────────────────────────────────────────────────────────────
const fetchCategories = async () => {
  // try {
  //   const response = await api.get('/v1/admin/category/active')
  //   if (response.data.success) categories.value = response.data.data
  // } catch (error) {
  //   console.error('Error fetching categories:', error)
  // }
  
  // DUMMY DATA
  categories.value = [
    { category_id: 1, category_name: 'Coffee', category_code: 'COF' },
    { category_id: 2, category_name: 'Spices', category_code: 'SPC' },
    { category_id: 3, category_name: 'Tea', category_code: 'TEA' }
  ]
}

const fetchQuantityTypes = async () => {
  // try {
  //   const response = await api.get('/v1/admin/quantity-types')
  //   if (response.data.success) quantityTypes.value = response.data.data
  // } catch (error) {
  //   console.error('Error fetching quantity types:', error)
  // }
  
  // DUMMY DATA
  quantityTypes.value = [
    { quantity_type_id: 1, quantity_type_name: 'Wholesale' },
    { quantity_type_id: 2, quantity_type_name: 'Retail' },
    { quantity_type_id: 3, quantity_type_name: 'Sample' }
  ]
}

const fetchTaxTypes = async () => {
  // try {
  //   const response = await api.get('/v1/admin/tax-type/active')
  //   if (response.data.success) taxTypes.value = response.data.data
  // } catch (error) {
  //   console.error('Error fetching tax types:', error)
  // }
  
  // DUMMY DATA
  taxTypes.value = [
    { tax_type_id: 1, tax_type: 'GST 5%', tax: '5' },
    { tax_type_id: 2, tax_type: 'GST 12%', tax: '12' },
    { tax_type_id: 3, tax_type: 'GST 18%', tax: '18' }
  ]
}

const fetchItems = async () => {
  loading.value = true
  
  // try {
  //   const response = await api.get('/v1/admin/items')
  //   if (response.data.success) {
  //     items.value = response.data.data
  //     console.log('Items loaded:', items.value.length)
  //   } else {
  //     console.error('Failed to fetch items:', response.data.message)
  //     alert('Failed to load items. Please try again.')
  //   }
  // } catch (error) {
  //   console.error('Error fetching items:', error)
  //   alert('Error loading items. Please check your connection and try again.')
  // } finally {
  //   loading.value = false
  // }
  
  // DUMMY DATA - Comprehensive sample matching your API structure
  setTimeout(() => {
    items.value = [
      {
        item_id: 1,
        item_name: 'Premium Arabica Coffee Blend',
        item_alias_code: 'COFFEE-ARB-001',
        category_id: 1,
        description: 'Premium blended coffee from the finest Arabica beans',
        additional_information: 'Best served hot. Store in cool dry place.',
        item_image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop',
        status: 1,
        quantity_types: [
          {
            quantity_type_id: 1,
            quantity_type: 'Wholesale',
            variant_types: [
              {
                variant_type_id: 1,
                variant_type: 'Bean Type',
                variants: [
                  { variant_id: 1, variant: 'Arabica 100%' },
                  { variant_id: 2, variant: 'Robusta 100%' },
                  { variant_id: 3, variant: 'Arabica-Robusta Blend' }
                ]
              },
              {
                variant_type_id: 2,
                variant_type: 'Roast Level',
                variants: [
                  { variant_id: 4, variant: 'Light Roast' },
                  { variant_id: 5, variant: 'Medium Roast' },
                  { variant_id: 6, variant: 'Dark Roast' }
                ]
              }
            ],
            sub_items: [
              {
                sub_item_id: 1,
                quantity: '1.00',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '1.00 KG',
                price: '450.00',
                discount: '10.00',
                gst_included_price: '425.25',
                gst_excluded_price: '405.00',
                tax_type_id: 1,
                variant_ids: [1, 4],
                status: 1
              },
              {
                sub_item_id: 2,
                quantity: '1.00',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '1.00 KG',
                price: '480.00',
                discount: '10.00',
                gst_included_price: '453.60',
                gst_excluded_price: '432.00',
                tax_type_id: 1,
                variant_ids: [1, 5],
                status: 1
              },
              {
                sub_item_id: 3,
                quantity: '1.00',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '1.00 KG',
                price: '420.00',
                discount: '5.00',
                gst_included_price: '418.95',
                gst_excluded_price: '399.00',
                tax_type_id: 1,
                variant_ids: [2, 4],
                status: 0
              }
            ]
          },
          {
            quantity_type_id: 2,
            quantity_type: 'Retail',
            variant_types: [
              {
                variant_type_id: 1,
                variant_type: 'Bean Type',
                variants: [
                  { variant_id: 1, variant: 'Arabica 100%' },
                  { variant_id: 2, variant: 'Robusta 100%' }
                ]
              },
              {
                variant_type_id: 2,
                variant_type: 'Roast Level',
                variants: [
                  { variant_id: 4, variant: 'Light Roast' },
                  { variant_id: 5, variant: 'Medium Roast' }
                ]
              }
            ],
            sub_items: [
              {
                sub_item_id: 4,
                quantity: '0.50',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '0.50 KG',
                price: '250.00',
                discount: '0.00',
                gst_included_price: '262.50',
                gst_excluded_price: '250.00',
                tax_type_id: 1,
                variant_ids: [1, 4],
                status: 1
              },
              {
                sub_item_id: 5,
                quantity: '0.50',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '0.50 KG',
                price: '270.00',
                discount: '0.00',
                gst_included_price: '283.50',
                gst_excluded_price: '270.00',
                tax_type_id: 1,
                variant_ids: [1, 5],
                status: 1
              }
            ]
          },
          {
            quantity_type_id: 3,
            quantity_type: 'Sample',
            variant_types: [
              {
                variant_type_id: 1,
                variant_type: 'Bean Type',
                variants: [
                  { variant_id: 1, variant: 'Arabica 100%' }
                ]
              }
            ],
            sub_items: [
              {
                sub_item_id: 6,
                quantity: '1.00',
                unit_id: 2,
                unit: 'Packet',
                quantity_label: '1.00 Packet',
                price: '50.00',
                discount: '0.00',
                gst_included_price: '52.50',
                gst_excluded_price: '50.00',
                tax_type_id: 1,
                variant_ids: [1],
                status: 1
              }
            ]
          }
        ]
      },
      {
        item_id: 2,
        item_name: 'Organic Black Pepper',
        item_alias_code: 'SPICE-PEP-002',
        category_id: 2,
        description: 'Premium organic black pepper from Kerala',
        additional_information: 'Hand-picked and sun-dried',
        item_image: 'https://images.unsplash.com/photo-1599909533253-dc48c6a7b4dc?w=200&h=200&fit=crop',
        status: 1,
        quantity_types: [
          {
            quantity_type_id: 1,
            quantity_type: 'Wholesale',
            variant_types: [
              {
                variant_type_id: 3,
                variant_type: 'Grade',
                variants: [
                  { variant_id: 7, variant: 'Grade A' },
                  { variant_id: 8, variant: 'Grade B' }
                ]
              }
            ],
            sub_items: [
              {
                sub_item_id: 7,
                quantity: '5.00',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '5.00 KG',
                price: '2500.00',
                discount: '15.00',
                gst_included_price: '2231.25',
                gst_excluded_price: '2125.00',
                tax_type_id: 1,
                variant_ids: [7],
                status: 1
              },
              {
                sub_item_id: 8,
                quantity: '5.00',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '5.00 KG',
                price: '2200.00',
                discount: '15.00',
                gst_included_price: '1963.50',
                gst_excluded_price: '1870.00',
                tax_type_id: 1,
                variant_ids: [8],
                status: 1
              }
            ]
          },
          {
            quantity_type_id: 2,
            quantity_type: 'Retail',
            variant_types: [
              {
                variant_type_id: 3,
                variant_type: 'Grade',
                variants: [
                  { variant_id: 7, variant: 'Grade A' }
                ]
              }
            ],
            sub_items: [
              {
                sub_item_id: 9,
                quantity: '0.50',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '0.50 KG',
                price: '300.00',
                discount: '0.00',
                gst_included_price: '315.00',
                gst_excluded_price: '300.00',
                tax_type_id: 1,
                variant_ids: [7],
                status: 1
              }
            ]
          }
        ]
      },
      {
        item_id: 3,
        item_name: 'Darjeeling Premium Tea',
        item_alias_code: 'TEA-DAR-003',
        category_id: 3,
        description: 'First flush Darjeeling tea leaves',
        additional_information: 'Handpicked from the finest tea estates',
        item_image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=200&h=200&fit=crop',
        status: 1,
        quantity_types: [
          {
            quantity_type_id: 2,
            quantity_type: 'Retail',
            variant_types: [
              {
                variant_type_id: 4,
                variant_type: 'Packaging',
                variants: [
                  { variant_id: 9, variant: 'Loose Leaf' },
                  { variant_id: 10, variant: 'Tea Bags' }
                ]
              }
            ],
            sub_items: [
              {
                sub_item_id: 10,
                quantity: '0.25',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '0.25 KG',
                price: '350.00',
                discount: '5.00',
                gst_included_price: '349.13',
                gst_excluded_price: '332.50',
                tax_type_id: 1,
                variant_ids: [9],
                status: 1
              },
              {
                sub_item_id: 11,
                quantity: '1.00',
                unit_id: 2,
                unit: 'Packet',
                quantity_label: '1.00 Packet',
                price: '200.00',
                discount: '0.00',
                gst_included_price: '210.00',
                gst_excluded_price: '200.00',
                tax_type_id: 1,
                variant_ids: [10],
                status: 1
              }
            ]
          }
        ]
      },
      {
        item_id: 4,
        item_name: 'Masala Chai Blend',
        item_alias_code: 'TEA-MAS-004',
        category_id: 3,
        description: 'Traditional Indian spiced tea blend',
        additional_information: 'Perfect for morning tea',
        item_image: null,
        status: 0,
        quantity_types: [
          {
            quantity_type_id: 1,
            quantity_type: 'Wholesale',
            variant_types: [
              {
                variant_type_id: 5,
                variant_type: 'Spice Level',
                variants: [
                  { variant_id: 11, variant: 'Mild' },
                  { variant_id: 12, variant: 'Medium' },
                  { variant_id: 13, variant: 'Strong' }
                ]
              }
            ],
            sub_items: [
              {
                sub_item_id: 12,
                quantity: '2.00',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '2.00 KG',
                price: '800.00',
                discount: '10.00',
                gst_included_price: '756.00',
                gst_excluded_price: '720.00',
                tax_type_id: 1,
                variant_ids: [11],
                status: 1
              },
              {
                sub_item_id: 13,
                quantity: '2.00',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '2.00 KG',
                price: '850.00',
                discount: '10.00',
                gst_included_price: '803.25',
                gst_excluded_price: '765.00',
                tax_type_id: 1,
                variant_ids: [12],
                status: 0
              },
              {
                sub_item_id: 14,
                quantity: '2.00',
                unit_id: 1,
                unit: 'KG',
                quantity_label: '2.00 KG',
                price: '900.00',
                discount: '10.00',
                gst_included_price: '850.50',
                gst_excluded_price: '810.00',
                tax_type_id: 1,
                variant_ids: [13],
                status: 1
              }
            ]
          }
        ]
      }
    ]
    
    loading.value = false
    console.log('Dummy items loaded:', items.value.length)
  }, 500)
}

// ── Helper Functions ───────────────────────────────────────────────────────────
const getCategoryName = (categoryId) => {
  const cat = categories.value.find(c => c.category_id == categoryId)
  return cat?.category_name || 'Unknown'
}

const getTaxTypeName = (taxTypeId) => {
  if (!taxTypeId) return 'No Tax'
  const tax = taxTypes.value.find(t => t.tax_type_id == taxTypeId)
  return tax?.tax_type || `Tax ${taxTypeId}`
}

const getVariantName = (variants, variantIds) => {
  // Find the variant that matches the variant_id from sub_item
  // variantIds is an array from sub_item.variant_ids
  // We need to match against this variant type's variants
  const matchedVariants = variants.filter(v => variantIds.includes(v.variant_id))
  return matchedVariants.map(v => v.variant).join(', ') || '—'
}
 

// ── Expand/Collapse ────────────────────────────────────────────────────────────
const toggleItemExpand = (itemId, qtyTypeId) => {
  const key = `${itemId}-${qtyTypeId}`
  const index = expandedItems.value.indexOf(key)
  
  if (index > -1) {
    expandedItems.value.splice(index, 1)
  } else {
    expandedItems.value.push(key)
  }
}

const isExpanded = (itemId, qtyTypeId) => {
  return expandedItems.value.includes(`${itemId}-${qtyTypeId}`)
}

// ── Sorting ────────────────────────────────────────────────────────────────────
const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (column) => {
  if (sortColumn.value !== column) {
    return 'fas fa-sort text-white-50 ms-1'
  }
  return sortDirection.value === 'asc'
    ? 'fas fa-sort-up text-white ms-1'
    : 'fas fa-sort-down text-white ms-1'
}

// ── Filtering ──────────────────────────────────────────────────────────────────
const filteredItems = computed(() => {
  let filtered = items.value

  // Filter by item name
  if (searchQuery.itemName) {
    filtered = filtered.filter(item =>
      item.item_name.toLowerCase().includes(searchQuery.itemName.toLowerCase())
    )
  }

  // Filter by category
  if (searchQuery.category) {
    filtered = filtered.filter(item => item.category_id == searchQuery.category)
  }

  // Filter by quantity type
  if (searchQuery.quantityType) {
    filtered = filtered.filter(item =>
      item.quantity_types?.some(qt => qt.quantity_type_id == searchQuery.quantityType)
    )
  }

  // Filter by status
  if (searchQuery.status !== '') {
    filtered = filtered.filter(item => item.status == searchQuery.status)
  }

  return filtered
})

const filteredAndSortedItems = computed(() => {
  let result = [...filteredItems.value]

  if (sortColumn.value) {
    result.sort((a, b) => {
      let aVal = a[sortColumn.value]
      let bVal = b[sortColumn.value]

      if (sortColumn.value === 'status') {
        aVal = aVal ? 1 : 0
        bVal = bVal ? 1 : 0
      } else {
        aVal = String(aVal || '').toLowerCase()
        bVal = String(bVal || '').toLowerCase()
      }

      if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})

// ── Pagination ─────────────────────────────────────────────────────────────────
const totalPages = computed(() => {
  return Math.ceil(filteredAndSortedItems.value.length / itemsPerPage.value)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage.value, filteredAndSortedItems.value.length)
})

const paginatedItems = computed(() => {
  return filteredAndSortedItems.value.slice(startIndex.value, endIndex.value)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }

  return pages.filter(p => p !== '...' || pages.indexOf(p) === pages.lastIndexOf(p))
})

// Reset to page 1 when filters change
watch([searchQuery, itemsPerPage, sortColumn, sortDirection], () => {
  currentPage.value = 1
})

// ── Actions ────────────────────────────────────────────────────────────────────
const addNewItem = () => {
  router.push('/admin/item-add')
}

const editItem = (item) => {
  router.push(`/admin/item-edit/${item.item_id}`)
}

const toggleItemStatus = async (item) => {
  const action = item.status === 1 ? 'deactivate' : 'activate'
  const newStatus = item.status === 1 ? 0 : 1

  if (confirm(`Are you sure you want to ${action} item: ${item.item_name}?`)) {
    // try {
    //   const response = await api.patch(`/v1/admin/item/status/${item.item_id}`, {
    //     status: newStatus
    //   })
    //
    //   if (response.data.success) {
    //     item.status = newStatus
    //     alert(`Item ${action}d successfully!`)
    //   } else {
    //     alert(`Failed to ${action} item. Please try again.`)
    //   }
    // } catch (error) {
    //   console.error(`Error ${action}ing item:`, error)
    //   alert(`An error occurred while ${action}ing the item.`)
    // }
    
    // DEMO MODE - Just update locally
    item.status = newStatus
    alert(`Item ${action}d successfully! (Demo mode)`)
  }
}

const removeItem = async (itemId) => {
  if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
    // try {
    //   const response = await api.put(`/v1/admin/item/remove/${itemId}`)
    //
    //   if (response.data.success) {
    //     items.value = items.value.filter(item => item.item_id !== itemId)
    //     alert('Item deleted successfully!')
    //   } else {
    //     alert('Failed to delete item.')
    //   }
    // } catch (error) {
    //   console.error('Error deleting item:', error)
    //   alert('An error occurred while deleting the item.')
    // }
    
    // DEMO MODE - Just remove from array
    items.value = items.value.filter(item => item.item_id !== itemId)
    alert('Item deleted successfully! (Demo mode)')
  }
}

const toggleVariantStatus = async (itemId, qtyTypeId, subItem) => {
  const action = subItem.status === 1 ? 'deactivate' : 'activate'
  const newStatus = subItem.status === 1 ? 0 : 1
  
  if (confirm(`Are you sure you want to ${action} this variant?`)) {
    // try {
    //   const response = await api.patch(`/v1/admin/sub-item/status/${subItem.sub_item_id}`, {
    //     status: newStatus
    //   })
    //
    //   if (response.data.success) {
    //     subItem.status = newStatus
    //     alert(`Variant ${action}d successfully!`)
    //   } else {
    //     alert(`Failed to ${action} variant.`)
    //   }
    // } catch (error) {
    //   console.error(`Error ${action}ing variant:`, error)
    //   alert(`An error occurred while ${action}ing the variant.`)
    // }
    
    // DEMO MODE - Just update locally
    subItem.status = newStatus
    console.log(`Variant ${action}d: Item ${itemId}, QtyType ${qtyTypeId}, SubItem ${subItem.sub_item_id}`)
  }
}

// ── Excel Download ─────────────────────────────────────────────────────────────
const downloadExcel = () => {
  try {
    const excelData = []
    
    filteredAndSortedItems.value.forEach((item, index) => {
      item.quantity_types?.forEach(qt => {
        qt.sub_items?.forEach(si => {
          const variantNames = qt.variant_types.map(vt => 
            getVariantName(vt.variants, si.variant_ids)
          ).join(' + ')
          
          excelData.push({
            'SL/No': index + 1,
            'Item Name': item.item_name,
            'Item Code': item.item_alias_code,
            'Category': getCategoryName(item.category_id),
            'Quantity Type': qt.quantity_type,
            'Variants': variantNames,
            'Quantity': si.quantity_label,
            'Price': parseFloat(si.price).toFixed(2),
            'Discount %': si.discount,
            'Tax Type': getTaxTypeName(si.tax_type_id),
            'Final Price': parseFloat(si.gst_included_price).toFixed(2),
            'Status': item.status === 1 ? 'Active' : 'Inactive'
          })
        })
      })
    })

    const worksheet = XLSX.utils.json_to_sheet(excelData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items')

    const date = new Date().toISOString().split('T')[0]
    const filename = `Item_List_${date}.xlsx`

    XLSX.writeFile(workbook, filename)
    console.log('Excel file downloaded successfully')
  } catch (error) {
    console.error('Error downloading Excel file:', error)
    alert('An error occurred while downloading the Excel file.')
  }
}
</script>

<style scoped>
/* Item Thumbnail */
.item-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

/* Variant Summary Cards */
.variant-summary-card {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 4px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.variant-summary-card:hover {
  background: #e9ecef;
  border-color: #dee2e6;
}

.variant-summary-card--active {
  background: #fff;
  border-color: #5e72e4 !important;
  box-shadow: 0 2px 8px rgba(94, 114, 228, 0.15);
}

.variant-summary-card--active .qty-type-badge.badge-wholesale {
  background: linear-gradient(135deg, #10b981, #065f46);
  color: white;
  border-color: #059669;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.variant-summary-card--active .qty-type-badge.badge-retail {
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  color: white;
  border-color: #2563eb;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.variant-summary-card--active .qty-type-badge.badge-sample {
  background: linear-gradient(135deg, #f59e0b, #92400e);
  color: white;
  border-color: #d97706;
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
}

/* Expand toggle button */
.expand-toggle-btn {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.2s;
}

.expand-toggle-btn:hover {
  color: #495057;
  text-decoration: none;
}

.variant-summary-card--active .expand-toggle-btn {
  color: #5e72e4;
}

/* Icon rotation */
.transition-transform {
  transition: transform 0.3s ease;
  display: inline-block;
}

.rotate-180 {
  transform: rotate(180deg);
}

.qty-type-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid;
  white-space: nowrap;
}

.qty-type-badge.badge-wholesale {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
  border-color: #6ee7b7;
}

.qty-type-badge.badge-retail {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
  border-color: #93c5fd;
}

.qty-type-badge.badge-sample {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
  border-color: #fcd34d;
}

/* Variant Detail Row */
.variant-detail-row {
  background: #f8f9fb !important;
}

.variant-detail-container {
  padding: 1rem;
  border-top: 2px solid #e9ecef;
}

.variant-detail-header {
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
}

.variant-detail-table {
  background: white;
  border-radius: 6px;
  overflow: hidden;
}

.variant-detail-table thead {
  background: #f1f3f5;
}

.variant-detail-table th,
.variant-detail-table td {
  padding: 0.5rem;
  vertical-align: middle;
}

.variant-option-tag {
  display: inline-block;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.72rem;
  font-weight: 500;
}

/* Status Badges */
.badge-success {
  background-color: #28a745;
  color: white;
}

.badge-danger {
  background-color: #dc3545;
  color: white;
}

.badge-secondary {
  background-color: #6c757d;
  color: white;
}

.badge-xs {
  padding: 2px 6px;
  font-size: 0.65rem;
  font-weight: 600;
}

/* Pagination */
.pagination .page-link {
  color: #344767;
  border: 1px solid #dee2e6;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.pagination .page-item.active .page-link {
  background-color: #5e72e4;
  border-color: #5e72e4;
  color: white;
}

.pagination .page-item.disabled .page-link {
  opacity: 0.5;
  pointer-events: none;
}

.pagination .page-link:hover {
  background-color: #f8f9fa;
}

/* Sortable Headers */
.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.sortable:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sortable i {
  font-size: 0.7rem;
  vertical-align: middle;
}

/* Loading Spinner */
.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .item-thumbnail {
    width: 40px;
    height: 40px;
  }

  .variant-summary-card {
    font-size: 0.75rem;
  }
}
</style>