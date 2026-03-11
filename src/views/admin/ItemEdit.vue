<template>
  <div class="container-fluid px-1 px-md-4">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <div>
                <h5 class="fw-bolder">Edit Item</h5>
                <p class="text-muted text-xs mb-0">Update item details and variant configurations</p>
              </div>
              <div class="ms-auto my-auto d-flex gap-2">
                <button type="button" class="btn bg-gradient-secondary btn-sm mb-0" @click="goBack">
                  <i class="fas fa-arrow-left"></i>&nbsp; Back to List
                </button>
              </div>
            </div>
          </div>

          <div class="card-body">
            <!-- Loading State -->
            <div v-if="loading" class="text-center p-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="text-muted mt-2">Loading item data...</p>
            </div>

            <!-- Edit Form -->
            <div v-else-if="itemData">
              <!-- This is a placeholder for AdminItemInfo component -->
              <!-- In real implementation, you would import and use AdminItemInfo component here -->
              <!-- For now, showing the structure -->
              
              <div class="alert alert-info border-0">
                <div class="d-flex align-items-center">
                  <i class="fas fa-info-circle fa-2x me-3"></i>
                  <div>
                    <h6 class="mb-1">Edit Mode Active</h6>
                    <p class="mb-0 text-sm">
                      Editing: <strong>{{ itemData.item_name }}</strong> (ID: {{ itemId }})
                    </p>
                    <p class="mb-0 text-xs text-muted mt-1">
                      Use your AdminItemInfo component here with :editMode="true" :itemData="itemData"
                    </p>
                  </div>
                </div>
              </div>

              <!-- Item Summary Card -->
              <div class="card mb-3 border">
                <div class="card-header bg-light pb-0">
                  <h6 class="mb-2">Current Item Data</h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <p class="text-sm mb-2"><strong>Item Name:</strong> {{ itemData.item_name }}</p>
                      <p class="text-sm mb-2"><strong>Alias Code:</strong> {{ itemData.item_alias_code }}</p>
                      <p class="text-sm mb-2"><strong>Category:</strong> {{ getCategoryName(itemData.category_id) }}</p>
                    </div>
                    <div class="col-md-6">
                      <p class="text-sm mb-2"><strong>Status:</strong> 
                        <span :class="['badge', itemData.status === 1 ? 'badge-success' : 'badge-danger']">
                          {{ itemData.status === 1 ? 'Active' : 'Inactive' }}
                        </span>
                      </p>
                      <p class="text-sm mb-2"><strong>Created:</strong> {{ itemData.created_at }}</p>
                      <p class="text-sm mb-2"><strong>Last Updated:</strong> {{ itemData.updated_at }}</p>
                    </div>
                  </div>
                  
                  <div class="mt-3">
                    <p class="text-sm mb-1"><strong>Description:</strong></p>
                    <p class="text-xs text-muted">{{ itemData.description || 'No description' }}</p>
                  </div>

                  <div class="mt-3">
                    <p class="text-sm mb-2"><strong>Variant Groups:</strong></p>
                    <div class="d-flex flex-wrap gap-2">
                      <span v-for="qType in (itemData.quantity_types || [])" :key="qType.quantity_type_id"
                        class="badge badge-lg" :class="{
                          'bg-gradient-success': qType.quantity_type.toLowerCase().includes('wholesale'),
                          'bg-gradient-primary': qType.quantity_type.toLowerCase().includes('retail'),
                          'bg-gradient-warning': qType.quantity_type.toLowerCase().includes('sample')
                        }">
                        {{ qType.quantity_type }}: {{ qType.sub_items?.length || 0 }} variants
                      </span>
                    </div>
                  </div>

                  <!-- Images Preview -->
                  <div class="mt-3" v-if="itemData.item_image || itemData.sub_images?.length">
                    <p class="text-sm mb-2"><strong>Images:</strong></p>
                    <div class="d-flex flex-wrap gap-2">
                      <div v-if="itemData.item_image" class="position-relative">
                        <img :src="itemData.item_image" alt="Main" class="item-preview-img" />
                        <span class="badge badge-sm bg-dark position-absolute" style="top: 4px; left: 4px;">Main</span>
                      </div>
                      <div v-for="(img, idx) in (itemData.sub_images || [])" :key="idx" class="position-relative">
                        <img :src="img" alt="Sub" class="item-preview-img" />
                        <span class="badge badge-sm bg-secondary position-absolute" style="top: 4px; left: 4px;">{{ idx + 1 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Detailed Variants Table -->
              <div class="card border">
                <div class="card-header bg-light pb-0">
                  <h6 class="mb-2">All Variant Combinations</h6>
                </div>
                <div class="card-body">
                  <div v-for="qType in (itemData.quantity_types || [])" :key="qType.quantity_type_id" class="mb-4">
                    <div class="d-flex align-items-center mb-2">
                      <h6 class="mb-0 me-2">{{ qType.quantity_type }}</h6>
                      <span class="badge badge-sm" :class="{
                        'bg-gradient-success': qType.quantity_type.toLowerCase().includes('wholesale'),
                        'bg-gradient-primary': qType.quantity_type.toLowerCase().includes('retail'),
                        'bg-gradient-warning': qType.quantity_type.toLowerCase().includes('sample')
                      }">
                        {{ qType.sub_items?.length || 0 }} combinations
                      </span>
                    </div>
                    
                    <p class="text-xs text-muted mb-2">
                      Variant Types: {{ qType.variant_types?.map(vt => vt.variant_type).join(', ') || 'None' }}
                    </p>

                    <div class="table-responsive">
                      <table class="table table-sm table-bordered align-items-center mb-0">
                        <thead class="bg-light">
                          <tr>
                            <th class="text-xs">#</th>
                            <th v-for="vt in (qType.variant_types || [])" :key="vt.variant_type_id" class="text-xs">
                              {{ vt.variant_type }}
                            </th>
                            <th class="text-xs">Quantity</th>
                            <th class="text-xs">Price</th>
                            <th class="text-xs">Discount %</th>
                            <th class="text-xs">Tax Type</th>
                            <th class="text-xs">Tax Included?</th>
                            <th class="text-xs">Final Price</th>
                            <th class="text-xs">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(subItem, idx) in (qType.sub_items || [])" :key="subItem.sub_item_id">
                            <td class="text-xs">{{ idx + 1 }}</td>
                            <td v-for="vt in (qType.variant_types || [])" :key="`var-${vt.variant_type_id}`" class="text-xs">
                              <span class="badge badge-sm bg-light text-dark border">
                                {{ getVariantName(vt.variants, subItem.variant_ids) }}
                              </span>
                            </td>
                            <td class="text-xs">{{ subItem.quantity_label }}</td>
                            <td class="text-xs">₹{{ parseFloat(subItem.price).toFixed(2) }}</td>
                            <td class="text-xs">{{ subItem.discount }}%</td>
                            <td class="text-xs">{{ getTaxTypeName(subItem.tax_type_id) }}</td>
                            <td class="text-xs">
                              <span :class="['badge badge-xs', subItem.tax_included ? 'badge-success' : 'badge-secondary']">
                                {{ subItem.tax_included ? 'Yes' : 'No' }}
                              </span>
                            </td>
                            <td class="text-xs fw-bold text-success">
                              ₹{{ parseFloat(subItem.gst_included_price).toFixed(2) }}
                            </td>
                            <td class="text-xs">
                              <span :class="['badge badge-xs', subItem.status === 1 ? 'badge-success' : 'badge-secondary']">
                                {{ subItem.status === 1 ? 'Active' : 'Inactive' }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-4 d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" @click="goBack">
                  <i class="fas fa-times"></i> Cancel
                </button>
                <button type="button" class="btn btn-primary" @click="openEditInAdminItemInfo">
                  <i class="fas fa-edit"></i> Edit with Form
                </button>
              </div>

              <!-- Integration Instructions -->
              <div class="alert alert-warning border-0 mt-4">
                <h6 class="mb-2"><i class="fas fa-code me-2"></i>Integration Instructions</h6>
                <p class="text-sm mb-2">To integrate with your AdminItemInfo component:</p>
                <pre class="bg-dark text-white p-3 rounded text-xs mb-0"><code>&lt;AdminItemInfo 
  :editMode="true"
  :itemId="itemId"
  :itemData="itemData"
  @update:success="handleUpdateSuccess"
  @cancel="goBack"
/&gt;</code></pre>
                <p class="text-xs text-muted mt-2 mb-0">
                  The component will auto-populate all fields, variant groups, and images from itemData
                </p>
              </div>
            </div>

            <!-- Item Not Found -->
            <div v-else class="text-center py-5">
              <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
              <h5 class="text-muted">Item Not Found</h5>
              <p class="text-sm text-muted mb-3">The item you're trying to edit could not be loaded.</p>
              <button type="button" class="btn btn-primary" @click="goBack">
                <i class="fas fa-arrow-left"></i> Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { api } from '@/services/api'

const router = useRouter()
const route = useRoute()

const itemId = ref(route.params.id)
const loading = ref(false)
const itemData = ref(null)

const categories = ref([])
const taxTypes = ref([])

// ── Lifecycle ──────────────────────────────────────────────────────────────────
onMounted(async () => {
  await fetchCategories()
  await fetchTaxTypes()
  await fetchItemData()
})

// ── API Calls (Commented - Using Dummy Data) ──────────────────────────────────
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

const fetchItemData = async () => {
  loading.value = true

  // try {
  //   const response = await api.get(`/v1/admin/item/${itemId.value}`)
  //   if (response.data.success) {
  //     itemData.value = response.data.data
  //   } else {
  //     alert('Failed to load item data')
  //     router.push('/admin/items')
  //   }
  // } catch (error) {
  //   console.error('Error fetching item:', error)
  //   alert('Error loading item data')
  //   router.push('/admin/items')
  // } finally {
  //   loading.value = false
  // }

  // DUMMY DATA - Comprehensive example matching AdminItemInfo structure
  setTimeout(() => {
    itemData.value = {
      item_id: 1,
      item_name: 'Premium Arabica Coffee Blend',
      item_alias_code: 'COFFEE-ARB-001',
      category_id: 1,
      description: 'Premium blended coffee sourced from the finest Arabica beans across South America and Africa. Perfect for espresso and drip brewing.',
      additional_information: 'Best served hot. Store in a cool, dry place away from direct sunlight. Once opened, consume within 30 days for optimal freshness.',
      item_image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop',
      sub_images: [
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop'
      ],
      status: 1,
      created_at: '2024-01-15 10:30:00',
      updated_at: '2024-03-09 14:45:00',
      
      // Quantity Types with Variants (Matching your structure)
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
              tax_included: false,
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
              tax_included: false,
              variant_ids: [1, 5],
              status: 1
            },
            {
              sub_item_id: 3,
              quantity: '1.00',
              unit_id: 1,
              unit: 'KG',
              quantity_label: '1.00 KG',
              price: '510.00',
              discount: '10.00',
              gst_included_price: '481.95',
              gst_excluded_price: '459.00',
              tax_type_id: 1,
              tax_included: false,
              variant_ids: [1, 6],
              status: 1
            },
            {
              sub_item_id: 4,
              quantity: '1.00',
              unit_id: 1,
              unit: 'KG',
              quantity_label: '1.00 KG',
              price: '420.00',
              discount: '5.00',
              gst_included_price: '418.95',
              gst_excluded_price: '399.00',
              tax_type_id: 1,
              tax_included: false,
              variant_ids: [2, 4],
              status: 0
            },
            {
              sub_item_id: 5,
              quantity: '1.00',
              unit_id: 1,
              unit: 'KG',
              quantity_label: '1.00 KG',
              price: '445.00',
              discount: '5.00',
              gst_included_price: '443.89',
              gst_excluded_price: '422.75',
              tax_type_id: 1,
              tax_included: false,
              variant_ids: [2, 5],
              status: 1
            },
            {
              sub_item_id: 6,
              quantity: '1.00',
              unit_id: 1,
              unit: 'KG',
              quantity_label: '1.00 KG',
              price: '400.00',
              discount: '8.00',
              gst_included_price: '386.40',
              gst_excluded_price: '368.00',
              tax_type_id: 1,
              tax_included: false,
              variant_ids: [3, 4],
              status: 1
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
              sub_item_id: 7,
              quantity: '0.50',
              unit_id: 1,
              unit: 'KG',
              quantity_label: '0.50 KG',
              price: '250.00',
              discount: '0.00',
              gst_included_price: '262.50',
              gst_excluded_price: '250.00',
              tax_type_id: 1,
              tax_included: false,
              variant_ids: [1, 4],
              status: 1
            },
            {
              sub_item_id: 8,
              quantity: '0.50',
              unit_id: 1,
              unit: 'KG',
              quantity_label: '0.50 KG',
              price: '270.00',
              discount: '0.00',
              gst_included_price: '283.50',
              gst_excluded_price: '270.00',
              tax_type_id: 1,
              tax_included: false,
              variant_ids: [1, 5],
              status: 1
            },
            {
              sub_item_id: 9,
              quantity: '0.50',
              unit_id: 1,
              unit: 'KG',
              quantity_label: '0.50 KG',
              price: '240.00',
              discount: '0.00',
              gst_included_price: '252.00',
              gst_excluded_price: '240.00',
              tax_type_id: 1,
              tax_included: false,
              variant_ids: [2, 4],
              status: 1
            },
            {
              sub_item_id: 10,
              quantity: '0.50',
              unit_id: 1,
              unit: 'KG',
              quantity_label: '0.50 KG',
              price: '255.00',
              discount: '0.00',
              gst_included_price: '267.75',
              gst_excluded_price: '255.00',
              tax_type_id: 1,
              tax_included: false,
              variant_ids: [2, 5],
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
              sub_item_id: 11,
              quantity: '1.00',
              unit_id: 2,
              unit: 'Packet',
              quantity_label: '1.00 Packet',
              price: '50.00',
              discount: '0.00',
              gst_included_price: '52.50',
              gst_excluded_price: '50.00',
              tax_type_id: 1,
              tax_included: false,
              variant_ids: [1],
              status: 1
            }
          ]
        }
      ]
    }

    loading.value = false
    console.log('Item data loaded for edit:', itemData.value)
  }, 800)
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
  const matchedVariants = variants.filter(v => variantIds.includes(v.variant_id))
  return matchedVariants.map(v => v.variant).join(', ') || '—'
}

// ── Actions ────────────────────────────────────────────────────────────────────
const goBack = () => {
  router.push('/admin/items')
}

const openEditInAdminItemInfo = () => {
  alert('In production: Navigate to edit form view with AdminItemInfo component in edit mode')
  // In real implementation:
  // You would either:
  // 1. Show AdminItemInfo component on this page, OR
  // 2. Navigate to a separate edit form route that uses AdminItemInfo
}

const handleUpdateSuccess = () => {
  alert('Item updated successfully!')
  router.push('/admin/items')
}
</script>

<style scoped>
.item-preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.badge-lg {
  padding: 6px 12px;
  font-size: 0.8rem;
}

.badge-xs {
  padding: 2px 6px;
  font-size: 0.65rem;
  font-weight: 600;
}

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

.spinner-border {
  width: 3rem;
  height: 3rem;
}

pre {
  margin-bottom: 0;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}
</style>