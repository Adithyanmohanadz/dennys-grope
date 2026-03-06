<template>
  <section class="mt-">
    <div class="container px-2 px-md-4">
      <h2 class="text-gradient text-dark pt-4">My Orders</h2>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Loading orders...</p>
      </div>

      <div v-if="error" class="alert alert-danger" role="alert">
        <h6 class="text-white mb-0">{{ error }}</h6>
      </div>

      <div v-if="!loading && !error && orders.length === 0" class="alert bg-danger" role="alert">
        <h6 class="text-white mb-0">There are no items or orders found.</h6>
      </div>

      <div v-if="!loading && !error && orders.length > 0" class="col-12">
        <div v-for="order in orders" :key="order.user_order_id" class="card mb-4 shadow-sm">
          <div class="card-header bg-light p-3 d-block d-md-flex justify-content-between align-items-center">
            <div>
              <h5 class="fw-bolder text-dark">Order ID: {{ order.order_id }}</h5>
              <p class="text-sm text-muted mb-0">Date Placed:
                <span class="fw-bold">{{ order.order_time }}</span>
              </p>
              <p class="text-sm text-muted mb-0">Total Amount:
                <span class="text-dark fw-bolder">₹{{ parseFloat(order.grand_total).toFixed(2) }}</span>
              </p>
              <button class="btn btn-sm btn-dark mt-2" @click="toggleItems(order.user_order_id)">
                {{ expandedOrders.includes(order.user_order_id) ? 'Hide Items' : `View Items
                (${order.items.length})` }}
              </button>
            </div>
            <div class="text-end mt-2 mt-md-0">
              <h5 class="mb-0">
                Status:
                <span :class="getStatusClass(order.order_status)" class="fw-bolder">
                  {{ capitalizeStatus(order.order_status) }}
                </span>
              </h5>
            </div>
          </div>

          <transition name="fade">
            <div v-show="expandedOrders.includes(order.user_order_id)" class="card-body p-0">
              <div class="items-container">
                <div v-for="(item, itemIndex) in order.items" :key="item.item_id"
                  class="single-product-wrapper row mx-0 py-3 px-3"
                  :class="{ 'border-bottom': itemIndex < order.items.length - 1 }">

                  <div
                    class="product-img col-12 col-md-2 rounded-3 p-0 d-flex justify-content-center align-items-center">
                    <img v-if="item.item_image" class="d-block rounded-3 w-100"
                      style="object-fit: contain; max-height: 100px;" :src="item.item_image" :alt="item.item_name">
                    <img v-else class="d-block rounded-3 w-100" style="object-fit: contain; max-height: 100px;"
                      src="https://via.placeholder.com/150/e0e0e0/666666?text=No+Image" :alt="item.item_name">
                  </div>

                  <div class="product-description pt-0 col-12 col-md-7 ps-md-4">
                    <h6 class="fw-bolder mb-1 text-dark text-gradient">
                      {{ item.item_name }}
                    </h6>
                    <p class="text-muted mb-1 text-sm">
                      Brand: <span class="text-dark fw-semibold">{{ item.brand || 'N/A' }}</span>
                    </p>
                    <p class="text-muted mb-1 text-sm">
                      Quantity: <span class="text-dark fw-semibold">{{ item.quantity }}</span>
                    </p>
                  </div>

                  <div
                    class="col-12 col-md-3 ms-auto mt-3 mt-md-0 d-flex flex-column align-items-end justify-content-center">
                    <h4 class="mb-0 d-block text-end fw-bolder">
                      ₹{{ parseFloat(item.sub_total).toFixed(2) }}
                    </h4>
                    <p class="mb-0 text-xs text-muted text-end">
                      (Unit Price: ₹{{ parseFloat(item.unit_price).toFixed(2) }})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <div class="card-footer bg-white p-3 d-block d-md-flex justify-content-between align-items-center">
            <div class="text-sm text-muted">
              Shipping to: <span class="text-dark fw-semibold">{{ order.shipping_address }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <router-link :to="`/estimate/${order.user_order_id}`">
                <button class="btn btn-sm bg-primary2 text-white mb-0 me-2">
                  Estimate Invoice
                </button>
              </router-link>
              <button v-if="order.order_status === 'pending'" class="btn btn-sm btn-outline-warning mb-0"
                @click="cancelOrder(order.order_id)">
                Cancel Order
              </button>
            </div>
          </div>
        </div>

        <div v-if="pagination.last_page > 1" class="d-flex justify-content-center align-items-center mt-4 mb-5">
          <nav aria-label="Order pagination">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: !pagination.prev }">
                <button class="page-link" @click="goToPage(pagination.current_page - 1)" :disabled="!pagination.prev">
                  Previous
                </button>
              </li>

              <li v-for="link in paginationLinks" :key="link.page" class="page-item" :class="{ active: link.active }">
                <button class="page-link" @click="goToPage(link.page)" :disabled="!link.page">
                  {{ link.label }}
                </button>
              </li>

              <li class="page-item" :class="{ disabled: !pagination.next }">
                <button class="page-link" @click="goToPage(pagination.current_page + 1)" :disabled="!pagination.next">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div v-if="pagination.total > 0" class="text-center text-muted mb-4">
          Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} orders
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { websiteApi } from '@/services/api'
// 1. Import useToast
import { useToast } from 'vue-toastification'

// 2. Initialize Toast
const toast = useToast()

// State
const selectedStatus = ref('')
const expandedOrders = ref([])
const allOrders = ref([])
const orders = ref([])
const loading = ref(false)
const error = ref(null)
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 25,
  total: 0,
  from: 0,
  to: 0,
  prev: null,
  next: null
})

// Default image for items without images
const defaultImage = ref('https://via.placeholder.com/150?text=No+Image')

// --- Toast Helper ---
/**
 * Shows a toast notification using Vue Toastification
 * @param {string} message - The message to display
 * @param {string} type - The toast type (success, error, warning, info, default)
 */
function showToast(message, type = 'success') {
  toast[type](message);
}

// Computed
const paginationLinks = computed(() => {
  return pagination.value.links?.filter(link =>
    link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;'
  ) || []
})

// Methods
const fetchOrders = async (page = 1) => {
  loading.value = true
  error.value = null

  try {
    const params = { page }
    if (selectedStatus.value) {
      params.status = selectedStatus.value
    }

    const response = await websiteApi.get('v1/user/orders', { params })

    if (response.data.success) {
      allOrders.value = response.data.data
      orders.value = response.data.data

      // Update pagination info
      pagination.value = {
        current_page: response.data.meta.current_page,
        last_page: response.data.meta.last_page,
        per_page: response.data.meta.per_page,
        total: response.data.meta.total,
        from: response.data.meta.from,
        to: response.data.meta.to,
        prev: response.data.links.prev,
        next: response.data.links.next,
        links: response.data.meta.links
      }
    }
  } catch (err) {
    // Use toast for load failure, but keep the page error state for persistent messaging
    showToast('Failed to fetch orders.', 'error');
    error.value = err.response?.data?.message || 'Failed to fetch orders. Please try again later.'
    console.error('Error fetching orders:', err)
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    fetchOrders(page)
    // Scroll to top of orders section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const filterOrders = () => {
  fetchOrders(1) // Reset to page 1 when filtering
}

const toggleItems = (orderId) => {
  const index = expandedOrders.value.indexOf(orderId)
  if (index > -1) {
    expandedOrders.value.splice(index, 1)
  } else {
    expandedOrders.value.push(orderId)
  }
}

const cancelOrder = async (orderId) => {
  // Use native confirm() as requested (warning modal)
  if (!confirm(`Are you sure you want to cancel Order ID: ${orderId}?`)) {
    return
  }

  try {
    // Get the user_order_id for the order
    const order = orders.value.find(o => o.order_id === orderId)
    if (!order) {
      showToast('Order not found.', 'error')
      return
    }

    loading.value = true

    // Make API call to cancel order with remark
    const response = await websiteApi.post(`v1/user/order/cancel/${order.user_order_id}`, {
      remark: 'Cancelled by user'
    })

    if (response.data.success) {
      // Update local state with the returned data
      order.order_status = response.data.data.order_status

      // 3. Use Toast for success
      showToast(response.data.message || `Order ${orderId} has been cancelled successfully.`, 'success')

      // Optionally refresh the orders list
      // await fetchOrders(pagination.value.current_page)
    } else {
      // 4. Use Toast for API failure
      showToast(response.data.message || `Failed to cancel order ${orderId}.`, 'error')
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Failed to cancel order. Please try again.'

    // 5. Use Toast for network/server error
    showToast(errorMessage, 'error')
    console.error('Error canceling order:', err)
  } finally {
    loading.value = false
  }
}

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'text-warning2'
    case 'delivered': return 'text-success2'
    case 'cancelled': return 'text-danger2'
    case 'shipped': return 'text-info2'
    case 'processing': return 'text-primary2'
    case 'completed': return 'text-success2'
    default: return 'text-secondary2'
  }
}

const capitalizeStatus = (status) => {
  if (!status) return 'N/A'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

// Lifecycle
onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
/* (Your existing CSS styles remain here) */
.card-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.card-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.items-container {
  max-height: 300px;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

/* Pagination Styles */
.pagination {
  margin: 0;
}

.page-link {
  cursor: pointer;
  border: 1px solid #dee2e6;
  padding: 0.5rem 0.75rem;
  margin: 0 2px;
  color: #6c757d;
  background-color: #fff;
  border-radius: 0.25rem;
}

.page-link:hover:not(:disabled) {
  background-color: #f8f9fa;
  color: #495057;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  color: white;
  border-color: #0d6efd;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #e9ecef;
  border-color: #dee2e6;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>