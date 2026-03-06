<template>
  <div class="admin-order-list">
    <div class="container-fluid py-1">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <div>
                  <h5 class="fw-bolder">Cart Order Enquiry List</h5>
                </div>
              </div>
            </div>

            <div class="p-2 py-0 m-2 my-0">
              <div class="row">
                <div class="col-4 mt-2">
                  <label>Customer Name Search</label>
                  <input class="form-control" type="text" placeholder="Search by customer" />
                </div>
              </div>
            </div>

            <div class="card-body p-0 mt-3">
              <div v-if="loading" class="text-center p-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading cart enquiries...</p>
              </div>

              <div v-else-if="error" class="alert alert-danger mx-4 my-3" role="alert">
                <strong>Error:</strong> {{ error }}
              </div>

              <div v-else-if="orders.length > 0" class="table-responsive">
                <table class="table table-bordered table-hover table-sm" id="order-list">
                  <thead class="thead-light bg-dark">
                    <tr>
                      <th class="text-center text-white text-xs text-uppercase">SL/No</th>
                      <th class="text-white text-xs text-uppercase">Customer</th>
                      <th class="text-center text-white text-xs text-uppercase">Date&time</th>
                      <th class="text-center text-white text-xs text-uppercase">Items</th>
                      <th class="text-center text-white text-xs text-uppercase">Quantity</th>
                      <th class="text-center text-white text-xs text-uppercase">Total (₹)</th>
                      <th class="text-center text-white text-xs text-uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(order, index) in orders" :key="order.id">
                      <td class="align-middle text-center">{{ index + 1 }}</td>
                      <td class="align-middle">
                        <p class="mb-0 fw-bold">{{ order.customerName }}</p>
                        <p class="text-muted mb-0 text-xs">{{ order.customerPhone }}</p>
                      </td>
                      <td class="align-middle text-center">{{ order.dateTime }}</td>
                      <td class="align-middle text-center">{{ order.itemsCount }}</td>
                      <td class="align-middle text-center">{{ order.totalQuantity }}</td>
                      <td class="align-middle text-center">₹{{ order.grandTotal.toLocaleString('en-IN', {
                        minimumFractionDigits: 2, maximumFractionDigits: 2
                      }) }}</td>
                      <td class="align-middle text-center">
                        <a href="javascript:;" class="mx-1" title="View Details" @click="showOrderDetails(order)">
                          <i class="fas fa-eye text-info"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-else class="text-center p-5">
                <p>No cart enquiries found.</p>
              </div>

              <div v-if="orders.length > 0 && !loading" class="d-flex justify-content-between align-items-center p-3">
                <span class="text-sm">Showing 1 to {{ orders.length }} of {{ orders.length }} entries</span>
                <nav>
                  <ul class="pagination mb-0">
                    <li class="page-item disabled"><a class="page-link" href="#">&laquo;</a></li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item disabled"><a class="page-link" href="#">&raquo;</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="orderDetailModal" tabindex="-1" aria-labelledby="orderDetailModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="orderDetailModalLabel">Cart Details (User ID: {{
              formattedSelectedOrderSummary.itemsCount ? selectedOrder.user_info.public_user_id : '...' }})</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body"
            v-if="formattedSelectedOrderSummary.items && formattedSelectedOrderSummary.items.length">

            <div class="row mb-3 border-bottom pb-2">
              <div class="col-md-6">
                <p class="mb-1 text-sm"><strong>Customer:</strong> {{ formattedSelectedOrderSummary.customerName }}</p>
                <p class="mb-0 text-sm"><strong>Contact:</strong> {{ formattedSelectedOrderSummary.customerPhone }}</p>
              </div>
              <div class="col-md-6 text-md-end">
                <p class="mb-1 text-sm"><strong>Date:</strong> {{ formattedSelectedOrderSummary.dateTime }}</p>
                <p class="mb-0 text-sm"><strong>Total Items:</strong> {{ formattedSelectedOrderSummary.itemsCount }}</p>
              </div>
            </div>

            <h6 class="fw-bolder mb-2">Item Breakdown:</h6>
            <div class="table-responsive">
              <table class="table table-bordered table-sm align-middle">
                <thead class="bg-light">
                  <tr>
                    <th>Item Name</th>
                    <th class="text-end">Price (₹)</th>
                    <th class="text-center">Qty</th>
                    <th class="text-end">Subtotal (₹)</th>
                    <th class="text-center">GST%</th>
                    <th class="text-end">₹ CGST</th>
                    <th class="text-end">₹ SGST</th>
                    <th class="text-end">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, itemIndex) in formattedSelectedOrderSummary.items" :key="itemIndex">
                    <td class="text-wrap text-brake">{{ item.name }}</td>
                    <td class="text-end">{{ item.price.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }}</td>
                    <td class="text-center">{{ item.qty }}</td>
                    <td class="text-end fw-bold">{{ item.subtotal.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }}</td>
                    <td class="text-center">{{ (item.gstRate * 100).toFixed(item.gstRate.toFixed(3).slice(-2) !== '00' ?
                      1 : 0) }}%</td>
                    <td class="text-end text-sm">{{ item.cgst.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }}</td>
                    <td class="text-end text-sm">{{ item.sgst.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }}</td>
                    <td class="text-end">{{ item.total.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }}</td>
                  </tr>
                </tbody>

                <tfoot class="table-primary fw-bolder">
                  <tr>
                    <th colspan="2" class="text-end">Total Summary:</th>
                    <th class="text-center">{{ formattedSelectedOrderSummary.totalQuantity }}</th>
                    <th class="text-end">₹{{ formattedSelectedOrderSummary.totalSubtotal.toLocaleString('en-IN', {
                      minimumFractionDigits: 2, maximumFractionDigits: 2
                    }) }}</th>
                    <th></th>
                    <th class="text-end">₹{{ formattedSelectedOrderSummary.totalCGST.toLocaleString('en-IN', {
                      minimumFractionDigits: 2, maximumFractionDigits: 2
                    }) }}</th>
                    <th class="text-end">₹{{ formattedSelectedOrderSummary.totalSGST.toLocaleString('en-IN', {
                      minimumFractionDigits: 2, maximumFractionDigits: 2
                    }) }}</th>
                    <th class="text-end h5 mb-0">₹{{ formattedSelectedOrderSummary.grandTotal.toLocaleString('en-IN', {
                      minimumFractionDigits: 2, maximumFractionDigits: 2
                    }) }}</th>
                  </tr>
                </tfoot>

              </table>
            </div>
          </div>
          <div class="modal-body" v-else>
            <p class="text-center text-muted">Loading cart items...</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/services/api"; // axios helper

// Remove mock data and calculation functions as the API provides the processed totals.

export default {
  // Component name (good practice for debugging)
  name: 'CartOrderEnquiryList',

  data() {
    return {
      // Initialize with an empty array to hold fetched cart users
      orders: [],
      // Initial structure for the selected order details
      selectedOrder: {
        user_info: {},
        cart_items: [],
        summary: {},
      },
      loading: false, // For showing a loading state
      error: null,    // For handling API errors
    };
  },

  computed: {
    // Helper to format the cart summary totals from the view API response
    // This is needed because the table expects a flat structure and formatted data
    formattedSelectedOrderSummary() {
      // Destructure for readability and ensure safe access
      const { user_info, cart_items, summary } = this.selectedOrder;

      if (!summary || !user_info) return {};

      // Map cart_items to the display structure expected by the modal table
      const mappedItems = cart_items.map(item => ({
        name: item.item_name,
        price: parseFloat(item.unit_price),
        qty: item.quantity,
        subtotal: parseFloat(item.subtotal),
        gstRate: parseFloat(item.tax_percentage) / 100,
        cgst: parseFloat(item.cgst),
        sgst: parseFloat(item.sgst),
        total: parseFloat(item.grand_total),
      }));

      return {
        // Data for the header
        customerName: user_info.user_name,
        customerPhone: user_info.phone,
        dateTime: user_info.latest_cart_date_formatted,
        itemsCount: user_info.total_items,

        // Data for the breakdown table
        items: mappedItems,

        // Data for the footer summary
        totalQuantity: summary.total_quantity,
        totalSubtotal: parseFloat(summary.subtotal),
        totalTax: parseFloat(summary.total_tax),
        // Calculate CGST and SGST for the footer from total_tax (assuming 50/50 split for GST)
        totalCGST: parseFloat(summary.total_tax) / 2,
        totalSGST: parseFloat(summary.total_tax) / 2,
        grandTotal: parseFloat(summary.grand_total),
      };
    }
  },

  mounted() {
    // Fetch data when the component is mounted
    this.fetchCartUserList();
  },

  methods: {
    /**
     * Fetches the list of users with items in their carts.
     */
    async fetchCartUserList() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('v1/admin/user/cart/list');

        if (response.data.success && Array.isArray(response.data.data)) {
          // Map API response data to the structure expected by the template
          this.orders = response.data.data.map(cartUser => ({
            id: cartUser.public_user_id, // Use public_user_id as the unique ID for view API
            customerName: cartUser.user_name,
            customerPhone: cartUser.phone,
            dateTime: cartUser.latest_cart_date_formatted,
            itemsCount: cartUser.total_items,
            totalQuantity: cartUser.total_quantity,
            // Convert to number for calculations/display formatting
            grandTotal: parseFloat(cartUser.total_cart_amount),
          }));
        } else {
          this.error = response.data.message || 'Failed to retrieve cart user list.';
          this.orders = [];
        }
      } catch (err) {
        console.error('API Error:', err);
        this.error = 'An error occurred while fetching the cart user list.';
        this.orders = [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetches the detailed cart for a specific user and shows the modal.
     * @param {Object} order The order object from the main list (contains public_user_id).
     */
    async showOrderDetails(order) {
      if (!order.id) {
        console.error('Missing user ID for fetching cart details.');
        return;
      }

      this.selectedOrder = { user_info: {}, cart_items: [], summary: {} }; // Clear previous data
      // You might want to show a modal with a loading spinner here

      try {
        // Fetch cart details using the user ID
        const response = await api.get(`v1/admin/user/cart/view/${order.id}`);

        if (response.data.success && response.data.data) {
          // Set the raw API data to be processed by the computed property
          this.selectedOrder = response.data.data;

          // Show the modal
          if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const detailModal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
            detailModal.show();
          } else {
            console.warn('Bootstrap JS or Modal component not loaded. Cannot show modal.');
          }
        } else {
          alert(response.data.message || 'Failed to retrieve cart details.');
        }
      } catch (err) {
        console.error('API Error:', err);
        alert('An error occurred while fetching the cart details.');
      }
    }
  },
};
</script>

<style scoped>
/* Your existing styles */
.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%);
}

.table-primary {
  --bs-table-bg: #cfe2ff;
  border-top: 2px solid #007bff;
}

.pagination .page-item.active .page-link {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

/* ... Other styles ... */
</style>