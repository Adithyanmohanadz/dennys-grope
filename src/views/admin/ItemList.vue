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
                <div class="col-6 col-md-4 mt-2">
                  <label>Item Name Search</label>
                  <input class="form-control" type="text" v-model="searchQuery.itemName" placeholder="Search by name" />
                </div>
                <div class="col-6 col-md-4 mt-2">
                  <label>Dealer Name Search</label>
                  <input class="form-control" type="text" v-model="searchQuery.dealerName"
                    placeholder="Search by dealer" />
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
                <table class="table table-bordered table-hover table-sm" id="item-list">
                  <thead class="thead-light bg-dark">
                    <tr>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">SL/No</th>
                      <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable"
                        @click="sortBy('item_name')">
                        Item Name
                        <i :class="getSortIcon('item_name')"></i>
                      </th>
                      <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable"
                        @click="sortBy('item_alias_code')">
                        Item Alias Code
                        <i :class="getSortIcon('item_alias_code')"></i>
                      </th>
                      <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable"
                        @click="sortBy('category')">
                        Category
                        <i :class="getSortIcon('category')"></i>
                      </th>
                      <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable"
                        @click="sortBy('brand')">
                        Brand
                        <i :class="getSortIcon('brand')"></i>
                      </th>
                      <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable"
                        @click="sortBy('dealer')">
                        Dealer
                        <i :class="getSortIcon('dealer')"></i>
                      </th>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable"
                        @click="sortBy('price')">
                        Price (₹)
                        <i :class="getSortIcon('price')"></i>
                      </th>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable"
                        @click="sortBy('have_stock')">
                        Stock
                        <i :class="getSortIcon('have_stock')"></i>
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
                    <tr v-for="(item, index) in paginatedItems" :key="item.id">
                      <td class="align-middle text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</p>
                      </td>
                      <td class="align-middle">
                        <p class="text-sm font-weight-bold mb-0 clamp-2-lines">{{ item.item_name }}</p>
                      </td>
                      <td class="align-middle">
                        <p class="text-sm font-weight-bold mb-0 clamp-2-lines">{{ item.item_alias_code }}</p>
                      </td>
                      <td class="align-middle">
                        <p class="text-sm font-weight-bold mb-0">{{ item.category }}</p>
                      </td>
                      <td class="align-middle">
                        <p class="text-sm font-weight-bold mb-0">{{ item.brand }}</p>
                      </td>
                      <td class="align-middle">
                        <p class="text-sm font-weight-bold mb-0">{{ item.dealer }}</p>
                      </td>
                      <td class="align-middle text-center">
                        <p class="text-sm font-weight-bold mb-0">₹{{ parseFloat(item.price).toFixed(2) }}</p>
                      </td>
                      <td class="align-middle text-center">
                        <div class="form-check form-switch d-flex align-items-center justify-content-center">
                          <input class="form-check-input" type="checkbox" :id="'stockSwitch' + index"
                            v-model="item.have_stock" :true-value="1" :false-value="0"
                            @change="toggleStockStatus(item)" />
                        </div>
                        <p class="text-xs font-weight-bold mb-0">{{ item.have_stock ? 'Available' : 'Out of Stock' }}
                        </p>
                      </td>
                      <td class="align-middle text-center">
                        <span :class="['badge', item.status === 1 ? 'badge-success' : 'badge-danger', 'badge-sm']">
                          {{ item.status === 1 ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td class="align-middle text-center">
                        <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip" title="Edit Item"
                          @click="editItem(item)">
                          <i class="fas fa-user-edit text-dark"></i>
                        </a>
                        <a href="javascript:;" data-bs-toggle="tooltip"
                          :title="item.status === 1 ? 'Deactivate Item' : 'Activate Item'"
                          @click="toggleItemStatus(item)">
                          <i
                            :class="[item.status === 1 ? 'fas fa-ban text-danger' : 'fas fa-check-circle text-success']"></i>
                        </a>
                        <a href="javascript:;" class="ms-3" data-bs-toggle="tooltip" title="Remove Item"
                          @click="removeItem(item.id)">
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="filteredItems.length === 0">
                      <td colspan="10" class="text-center text-muted py-4">No items found matching your criteria.</td>
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

const items = ref([])
const loading = ref(false)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sorting state
const sortColumn = ref('')
const sortDirection = ref('asc')

const toggleStockStatus = async (item) => {
  const newStockStatus = item.have_stock === 1
  const action = newStockStatus ? 'in stock' : 'out of stock'

  try {
    const response = await api.patch(`/v1/admin/item/stock-update/${item.id}`, {
      status: newStockStatus
    })

    console.log("Stock API Response:", response.data)

    if (response.data.status === true) {
      console.log(`Stock status updated successfully to ${action}`)
      alert(`Item marked as ${action} successfully.`)
    } else {
      console.error('Failed to update stock status:', response.data.message)
      item.have_stock = item.have_stock === 1 ? 0 : 1
      alert(`Failed to mark item as ${action}. Please try again.`)
    }
  } catch (error) {
    console.error('Error updating stock status:', error)
    item.have_stock = item.have_stock === 1 ? 0 : 1
    alert('An error occurred while updating stock status. Please check your connection and try again.')
  }
}

const searchQuery = reactive({
  itemName: '',
  dealerName: '',
})

// --- Excel Download Method ---
const downloadExcel = () => {
  try {
    // Prepare data for Excel
    const excelData = filteredAndSortedItems.value.map((item, index) => ({
      'SL/No': index + 1,
      'Item Name': item.item_name,
      'Item Alias Code': item.item_alias_code,
      'Category': item.category,
      'Brand': item.brand,
      'Dealer': item.dealer,
      'Price (₹)': parseFloat(item.price).toFixed(2),
      'Stock': item.have_stock ? 'Available' : 'Out of Stock',
      'Status': item.status === 1 ? 'Active' : 'Inactive'
    }))

    // Create a new workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items')

    // Set column widths
    const columnWidths = [
      { wch: 8 },  // SL/No
      { wch: 30 }, // Item Name
      { wch: 20 }, // Item Alias Code
      { wch: 15 }, // Category
      { wch: 15 }, // Brand
      { wch: 20 }, // Dealer
      { wch: 12 }, // Price
      { wch: 15 }, // Stock
      { wch: 10 }  // Status
    ]
    worksheet['!cols'] = columnWidths

    // Generate filename with current date
    const date = new Date()
    const dateStr = date.toISOString().split('T')[0]
    const filename = `Item_List_${dateStr}.xlsx`

    // Download the file
    XLSX.writeFile(workbook, filename)

    console.log('Excel file downloaded successfully')
  } catch (error) {
    console.error('Error downloading Excel file:', error)
    alert('An error occurred while downloading the Excel file. Please try again.')
  }
}

// --- Sorting Methods ---
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

const filteredItems = computed(() => {
  let filtered = items.value

  if (searchQuery.itemName) {
    filtered = filtered.filter(item =>
      item.item_name.toLowerCase().includes(searchQuery.itemName.toLowerCase())
    )
  }

  if (searchQuery.dealerName) {
    filtered = filtered.filter(item =>
      item.dealer.toLowerCase().includes(searchQuery.dealerName.toLowerCase())
    )
  }

  return filtered
})

// --- Filtered and Sorted Items ---
const filteredAndSortedItems = computed(() => {
  let result = [...filteredItems.value]

  if (sortColumn.value) {
    result.sort((a, b) => {
      let aVal = a[sortColumn.value]
      let bVal = b[sortColumn.value]

      // Handle price as number
      if (sortColumn.value === 'price') {
        aVal = parseFloat(aVal) || 0
        bVal = parseFloat(bVal) || 0
      }
      // Handle stock and status as numbers
      else if (sortColumn.value === 'have_stock' || sortColumn.value === 'status') {
        aVal = aVal ? 1 : 0
        bVal = bVal ? 1 : 0
      }
      // Handle strings
      else {
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

// --- Pagination Computed Properties ---
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

// Reset to page 1 when filters or sorting change
watch([searchQuery, itemsPerPage, sortColumn, sortDirection], () => {
  currentPage.value = 1
})

// --- API Methods ---
const fetchItems = async () => {
  loading.value = true
  try {
    const response = await api.get('/v1/admin/items')

    if (response.data.success) {
      items.value = response.data.data.map(item => ({
        ...item,
        id: item.item_id
      }))
    } else {
      console.error('Failed to fetch items:', response.data.message)
      alert('Failed to load items. Please try again.')
    }
  } catch (error) {
    console.error('Error fetching items:', error)
    alert('Error loading items. Please check your connection and try again.')
  } finally {
    loading.value = false
  }
}

const removeItem = async (itemId) => {
  if (confirm(`Are you sure you want to permanently delete item ID ${itemId}? This action cannot be undone.`)) {
    try {
      // Using DELETE method as it is correct for removal, despite your prompt mentioning PUT for "remove"
      // If the API truly uses PUT for removal, change api.delete to api.put
      const response = await api.put(`/v1/admin/item/remove/${itemId}`)

      if (response.data.success) {
        // Remove the item from the local array
        items.value = items.value.filter(item => item.id !== itemId)
        console.log(`Item ID ${itemId} removed successfully`)
        alert(`Item ID ${itemId} removed successfully!`)
      } else {
        console.error('Failed to remove item:', response.data.message)
        alert(`Failed to remove item: ${response.data.message}`)
      }
    } catch (error) {
      console.error('Error removing item:', error)
      alert('An error occurred while removing the item. Please try again.')
    }
  }
}

const toggleItemStatus = async (item) => {
  const action = item.status === 1 ? 'deactivate' : 'activate'
  const newStatus = item.status === 1 ? 0 : 1

  if (confirm(`Are you sure you want to ${action} item: ${item.item_name}?`)) {
    try {
      // Using PATCH method and the structure: v1/admin/item/status/12
      const response = await api.patch(`/v1/admin/item/status/${item.id}`, {
        status: newStatus
      })

      if (response.data.success) {
        // Update the status locally only if the API call succeeded
        item.status = newStatus
        console.log(`Item ${action}d successfully`)
        alert(`Item ${action}d successfully!`)
      } else {
        console.error(`Failed to ${action} item:`, response.data.message)
        alert(`Failed to ${action} item. Please try again.`)
      }
    } catch (error) {
      console.error(`Error ${action}ing item:`, error)
      alert(`An error occurred while ${action}ing the item. Please check your connection and try again.`)
    }
  }
}

// --- Methods for Actions ---
const addNewItem = () => {
  router.push("/admin/item-add")
}

const editItem = (item) => {
  router.push(`/admin/item-edit/${item.id}`)
}

 

// --- Lifecycle ---
onMounted(() => {
  fetchItems()
})
</script>

<style scoped>
.badge-success {
  background-color: #28a745;
  color: white;
}

.badge-danger {
  background-color: #dc3545;
  color: white;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.clamp-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

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
</style>