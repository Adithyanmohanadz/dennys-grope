<template>
  <div class="admin-order-detail">
    <div class="container-fluid py-1 pb-5">

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading Order Details...</p>
      </div>

      <div v-else-if="!orderData.user_order_id" class="alert alert-danger text-center">
        Order not found or an error occurred.
      </div>

      <div v-else class="row">
        <div class="col-lg-6 mb-3">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <h5 class="fw-bolder text-dark">Order Details</h5>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                      <span class="text-muted">Order Id:</span>
                      <span class="text-dark fw-bolder h5 mb-0">{{ orderData.order_id }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                      <span class="text-muted">Order Date:</span>
                      <span class="text-dark fw-semibold">{{ orderData.order_time }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                      <span class="text-muted">Items:</span>
                      <span class="text-dark fw-semibold">{{ orderData.item_quantity }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                      <span class="text-muted">Grand Total:</span>
                      <span class="text-dark fw-semibold">₹{{ parseFloat(orderData.grand_total).toFixed(2) }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <h5 class="fw-bolder text-dark mt-3">Customer Details</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Name:</span>
                  <span class="text-dark fw-semibold text-uppercase">{{ orderData.customer_details?.name }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Email:</span>
                  <span class="text-dark fw-semibold">{{ orderData.customer_details?.email }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Phone:</span>
                  <span class="text-dark fw-semibold">{{ orderData.customer_details?.phone }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Billing Address:</span>
                  <span class="text-dark fw-semibold">{{ orderData.customer_details?.billing_address }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Pincode:</span>
                  <span class="text-dark fw-semibold">{{ orderData.pincode }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mb-3">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-header bg-white border-0 pb-0">
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="fw-bolder text-dark">Shipping Information</h5>
                <div class="ms-auto" v-if="canEditShipping">
                  <button class="btn btn-sm btn-outline-info" @click="openEditShippingModal">
                    <i class="fas fa-truck me-1"></i> Edit Shipping
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted d-block">Shipping Address:</span>
                  <span class="text-dark fw-semibold ms-2 text-end">{{ orderData.shipping_address }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Tracking ID:</span>
                  <span class="text-dark fw-semibold">{{ orderData.tracking_id || 'N/A' }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Shipping Carrier:</span>
                  <span class="text-dark fw-semibold">{{ orderData.shipping_carrier || 'N/A' }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Shipping Executed Date:</span>
                  <span class="text-dark fw-semibold">{{ orderData.shipping_executed_date || 'N/A' }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Shipping Executed By:</span>
                  <span class="text-dark fw-semibold">{{ orderData.shipping_executed_by || 'N/A' }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Remark:</span>
                  <span class="text-dark fw-semibold">{{ orderData.remark || 'N/A' }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-1">
                  <span class="text-muted">Status:</span>
                  <span class="badge badge-custom" :class="getStatusBadgeClass(orderData.order_status)">
                    {{ orderData.order_status }}
                  </span>
                </li>
              </ul>
              <div class="row">
                <div class="card-header bg-white border-0 pb-0">
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="fw-bolder text-dark">Update Status</h5> 
              </div>
            </div>
                <div class="col-lg-6 mb-0">
                  <select class="form-select form-select-sm mb-0 bg-light fw-bolder" v-model="selectedStatus">
                    <option value="">Update Status</option>
                    <option v-for="status in availableStatuses" :key="status.value" :value="status.value">
                      {{ status.label }}
                    </option>
                  </select>
                </div>
                <div class="col-lg-6 ms-auto">
                  <button type="submit" class="btn btn-sm bg-gradient-dark w-100 mb-0" :disabled="statusUpdating"
                    @click="openSubmitConfirmationModal">
                    {{ statusUpdating ? 'Updating...' : 'Submit Status' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card shadow-sm border-0">
            <div class="card-header bg-white border-0 pb-0">
              <h5 class="fw-bolder text-dark mb-0">Order Items</h5>
            </div>
            <div class="card-body py-0">
              <div class="table-responsive">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Unit
                        Price</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">
                        Quantity</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">
                        Subtotal</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">GST %
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">CGST
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">SGST
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in orderData.items" :key="item.item_id">
                      <td>
                        <div class="d-flex px-2 py-1">
                          <img :src="item.item_image || '/path/to/default-image.jpg'" class="avatar avatar-sm me-3"
                            :alt="item.item_name">
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm text-wrap text-break">{{ item.item_name }}</h6>
                            <p class="text-xs text-muted mb-0">Brand: {{ item.brand }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-xs fw-bold mb-0">₹{{ parseFloat(item.unit_price).toFixed(2) }}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-xs fw-bold">{{ item.quantity }}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-sm fw-bold mb-0">₹{{ parseFloat(item.sub_total).toFixed(2) }}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-sm fw-bold mb-0">{{ item.tax_percentage }} %</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-sm fw-bold mb-0">₹{{ parseFloat(item.cgst).toFixed(2) }}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-sm fw-bold mb-0">₹{{ parseFloat(item.sgst).toFixed(2) }}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-sm fw-bold mb-0">₹{{ parseFloat(item.grand_total).toFixed(2) }}</p>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot class="bg-light">
                    <tr class="border-top">
                      <td colspan="2" class="text-end fw-bold text-dark">Grand Total:</td>
                      <td class="text-end fw-bolder text-dark text-center">{{ calculateTotalItemQuantity }}</td>
                      <td class="text-end fw-bolder text-dark text-center">₹{{ calculateTotalSubtotal }}</td>
                      <td class="text-end fw-bolder text-dark"></td>
                      <td class="text-end fw-bolder text-dark text-center">₹{{ calculateTotalCgst }}</td>
                      <td class="text-end fw-bolder text-dark text-center">₹{{ calculateTotalSgst }}</td>
                      <td class="text-end fw-bolder text-success">₹{{ calculateTotalGrandTotal }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Edit Shipping Modal -->
    <div class="modal fade" :class="{ show: showEditShippingModal }"
      :style="{ display: showEditShippingModal ? 'block' : 'none' }" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Shipping Information</h5>
            <button type="button" class="btn-close" @click="closeEditShippingModal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Delivery Address</label>
                <textarea class="form-control" rows="3" v-model="editShippingData.delivery_address"></textarea>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Tracking ID</label>
                <input type="text" class="form-control" v-model="editShippingData.tracking_id">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Shipping Carrier</label>
                <input type="text" class="form-control" v-model="editShippingData.shipping_carrier">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Shipping Executed Date</label>
                <input type="date" class="form-control" v-model="editShippingData.shipping_executed_date">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Shipping Executed By</label>
                <input type="text" class="form-control" v-model="editShippingData.shipping_executed_by">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Remark</label>
                <textarea class="form-control" rows="3" v-model="editShippingData.remark"></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeEditShippingModal">Cancel</button>
            <button type="button" class="btn btn-primary" :disabled="shippingUpdating" @click="saveShippingChanges">
              {{ shippingUpdating ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showEditShippingModal" class="modal-backdrop fade show"></div>

    <!-- Submit Confirmation Modal -->
    <div class="modal fade" :class="{ show: showSubmitConfirmationModal }"
      :style="{ display: showSubmitConfirmationModal ? 'block' : 'none' }" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Status Update</h5>
            <button type="button" class="btn-close" @click="closeSubmitConfirmationModal"></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-3">
              <i class="fas fa-question-circle fa-3x text-warning mb-3"></i>
              <h6 class="mb-3">Are you sure you want to update the order status?</h6>
            </div>

            <div v-if="selectedStatus" class="card shadow-sm">
              <div class="card-body text-center " :class="getStatusCardClass(selectedStatus)">
                <p class="text-white-50 mb-2 small fw-bold">New Status</p>
                <h4 class="text-white fw-bold text-uppercase mb-0">{{ selectedStatus }}</h4>
              </div>
            </div>
            <div v-else class="alert alert-danger d-flex align-items-center text-white" role="alert">
              <i class="fas fa-exclamation-triangle me-2"></i>
              <span>Please select a new status before submitting.</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" @click="closeSubmitConfirmationModal">Cancel</button>
            <button type="button" class="btn btn-dark btn-sm" :disabled="!selectedStatus || statusUpdating"
              @click="confirmSubmit">
              {{ statusUpdating ? 'Updating...' : 'Yes, Update Status' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showSubmitConfirmationModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/services/api';

// Props
const props = defineProps({
  orderId: [String, Number]
});

// Router
const route = useRoute();

// Status workflow order
const statusOrder = [
  { value: 'pending', label: 'Pending', order: 1 },
  { value: 'processing', label: 'Processing', order: 2 },
  { value: 'shipped', label: 'Shipped', order: 3 },
  { value: 'delivered', label: 'Delivered', order: 4 },
  { value: 'cancelled', label: 'Cancelled', order: 99 } // Special order for cancelled
];

// Reactive state
const orderData = ref({
  customer_details: {},
  items: []
});
const loading = ref(true);
const shippingUpdating = ref(false);
const statusUpdating = ref(false);
const selectedStatus = ref('');
const showEditShippingModal = ref(false);
const showSubmitConfirmationModal = ref(false);

const editShippingData = ref({
  delivery_address: '',
  tracking_id: '',
  shipping_carrier: '',
  shipping_executed_date: '',
  shipping_executed_by: '',
  remark: ''
});

// Computed properties
const availableStatuses = computed(() => {
  const currentStatus = (orderData.value.order_status || '').toLowerCase();
  const currentStatusObj = statusOrder.find(s => s.value === currentStatus);

  if (!currentStatusObj) {
    return statusOrder;
  }

  // If current status is "delivered", don't show any options
  if (currentStatus === 'delivered') {
    return [];
  }

  // Filter out statuses that come before the current status and the current status itself
  // Cancelled can be selected from any status except delivered
  return statusOrder.filter(status =>
    (status.order > currentStatusObj.order || status.value === 'cancelled') && 
    status.value !== currentStatus
  );
});

const calculateTotalSubtotal = computed(() => {
  return orderData.value.items.reduce((sum, item) => sum + parseFloat(item.sub_total || 0), 0).toFixed(2);
});

const calculateTotalCgst = computed(() => {
  return orderData.value.items.reduce((sum, item) => sum + parseFloat(item.cgst || 0), 0).toFixed(2);
});

const calculateTotalSgst = computed(() => {
  return orderData.value.items.reduce((sum, item) => sum + parseFloat(item.sgst || 0), 0).toFixed(2);
});

const calculateTotalGrandTotal = computed(() => {
  return orderData.value.items.reduce((sum, item) => sum + parseFloat(item.grand_total || 0), 0).toFixed(0);
});

const calculateTotalItemQuantity = computed(() => {
  return orderData.value.items.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);
});

const canEditShipping = computed(() => {
  const currentStatus = (orderData.value.order_status || '').toLowerCase();
  // Allow editing only for pending and processing statuses
  return currentStatus === 'pending' || currentStatus === 'processing';
});

// Methods
const fetchOrderDetails = async () => {
  loading.value = true;
  const id = props.orderId || route.params.id;

  if (!id) {
    loading.value = false;
    console.error('Order ID is missing.');
    return;
  }

  try {
    const response = await api.get(`/v1/admin/order/view/${id}`);
    if (response.data.success) {
      orderData.value = response.data.data;
      initializeEditShippingData();
    } else {
      console.error('Failed to fetch order details:', response.data.message);
      orderData.value = {};
    }
  } catch (error) {
    console.error('Error fetching order details:', error);
    orderData.value = {};
  } finally {
    loading.value = false;
  }
};

const initializeEditShippingData = () => {
  editShippingData.value = {
    delivery_address: orderData.value.shipping_address || '',
    tracking_id: orderData.value.tracking_id || '',
    shipping_carrier: orderData.value.shipping_carrier || '',
    shipping_executed_date: orderData.value.shipping_executed_date || '',
    shipping_executed_by: orderData.value.shipping_executed_by || '',
    remark: orderData.value.remark || ''
  };
};

const openEditShippingModal = () => {
  initializeEditShippingData();
  showEditShippingModal.value = true;
  document.body.classList.add('modal-open');
};

const closeEditShippingModal = () => {
  showEditShippingModal.value = false;
  document.body.classList.remove('modal-open');
};

const saveShippingChanges = async () => {
  shippingUpdating.value = true;
  const id = orderData.value.user_order_id;

  const payload = {
    delivery_address: editShippingData.value.delivery_address,
    tracking_id: editShippingData.value.tracking_id,
    shipping_carrier: editShippingData.value.shipping_carrier,
    shipping_executed_date: editShippingData.value.shipping_executed_date,
    shipping_executed_by: editShippingData.value.shipping_executed_by,
    remark: editShippingData.value.remark
  };

  try {
    const response = await api.put(`/v1/admin/order/add-shipment-data/${id}`, payload);

    if (response.data.success) {
      alert('Shipment data updated successfully!');
      closeEditShippingModal();
      await fetchOrderDetails();
    } else {
      alert(`Failed to update shipment data: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Error updating shipping data:', error);
    alert('An error occurred while updating shipping data.');
  } finally {
    shippingUpdating.value = false;
  }
};

const openSubmitConfirmationModal = () => {
  showSubmitConfirmationModal.value = true;
  document.body.classList.add('modal-open');
};

const closeSubmitConfirmationModal = () => {
  showSubmitConfirmationModal.value = false;
  document.body.classList.remove('modal-open');
};

const confirmSubmit = async () => {
  if (!selectedStatus.value) return;

  statusUpdating.value = true;
  const id = orderData.value.user_order_id;
  const newStatus = selectedStatus.value;

  try {
    const response = await api.put(`/v1/admin/order/change-order-status/${id}`, {
      order_status: newStatus
    });

    if (response.data.success) {
      alert(`Order status updated successfully to ${newStatus}!`);
      selectedStatus.value = '';
      closeSubmitConfirmationModal();
      await fetchOrderDetails();
    } else {
      alert(`Failed to update status: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    alert('An error occurred while updating the order status.');
  } finally {
    statusUpdating.value = false;
  }
};

const getStatusBadgeClass = (status) => {
  const lowerStatus = (status || '').toLowerCase();
  switch (lowerStatus) {
    case 'delivered':
      return 'badge-success';
    case 'pending':
      return 'bg-gradient-warning';
    case 'processing':
      return 'bg-gradient-info';
    case 'shipped':
      return 'bg-gradient-primary';
    case 'cancelled':
      return 'bg-gradient-danger';
    default:
      return 'badge-secondary';
  }
};

const getStatusCardClass = (status) => {
  const lowerStatus = (status || '').toLowerCase();
  switch (lowerStatus) {
    case 'delivered':
      return 'bg-gradient-success';
    case 'pending':
      return 'bg-gradient-warning';
    case 'processing':
      return 'bg-gradient-info';
    case 'shipped':
      return 'bg-gradient-primary';
    case 'cancelled':
      return 'bg-gradient-danger';
    default:
      return 'bg-gradient-secondary';
  }
};

// Lifecycle
onMounted(() => {
  fetchOrderDetails();
});
</script>

<style scoped>
.text-primary {
  color: #4CAF50 !important;
}

.text-success {
  color: #28a745 !important;
}

.list-group-item {
  border: none;
  padding: 0.5rem 0;
  background-color: transparent !important;
}

.list-group-flush .list-group-item:last-child {
  border-bottom: none;
}

.avatar {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 0rem;
}

.badge-custom {
  display: inline-block;
  padding: 0.35em 0.6em;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  border-radius: 0.25rem;
  text-transform: uppercase;
}

.badge-success {
  background-color: #28a745;
}

.bg-gradient-warning {
  background-image: linear-gradient(195deg, #ffc107, #e0a800);
}

.bg-gradient-info {
  background-image: linear-gradient(195deg, #17a2b8, #117a8b);
}

.bg-gradient-primary {
  background-image: linear-gradient(195deg, #5e72e4, #825ee4);
}

.bg-gradient-danger {
  background-image: linear-gradient(195deg, #dc3545, #bd2130);
}

.bg-gradient-success {
  background-image: linear-gradient(195deg, #28a745, #1e7e34);
}

.bg-gradient-secondary {
  background-image: linear-gradient(195deg, #6c757d, #545b62);
}

.modal.show {
  display: block;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>