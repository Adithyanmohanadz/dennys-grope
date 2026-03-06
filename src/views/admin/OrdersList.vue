<template>
    <div class="admin-order-list">
        <div class="container-fluid py-1 ">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="d-flex align-items-center">
                                <div>
                                    <h5 class="fw-bolder">Order Management List</h5>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="p-2 py-0 m-2 my-0">
                            <div class="row">
                                <div class="col-4 mt-2">
                                    <label>Date From</label>
                                    <input type="date" class="form-control" v-model="searchQuery.dateFrom"
                                        @change="fetchOrders(1)" />
                                </div>
                                <div class="col-4 mt-2">
                                    <label>Date To</label>
                                    <input type="date" class="form-control" v-model="searchQuery.dateTo"
                                        @change="fetchOrders(1)" />
                                </div>
                                <div class="col-4 mt-2">
                                    <label>Order ID Search</label>
                                    <input class="form-control" type="text" v-model.lazy="searchQuery.orderId"
                                        @change="fetchOrders(1)" placeholder="Search by ID" />
                                </div>
                                <div class="col-4 mt-2">
                                    <label>Customer Name Search</label>
                                    <input class="form-control" type="text" v-model.lazy="searchQuery.customerName"
                                        @change="fetchOrders(1)" placeholder="Search by customer" />
                                </div>
                                <div class="col-4 mt-2">
                                    <label>Status Filter</label>
                                    <select class="form-select" v-model="searchQuery.status" @change="fetchOrders(1)">
                                        <option value="">All Statuses</option>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div> -->

                        <div class="card-body p-0 mt-3">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover table-sm" id="order-list">
                                    <thead class="thead-light bg-dark">
                                        <tr>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                SL/No</th>
                                            <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Order ID</th>
                                            <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Customer</th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Date</th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Items</th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Total (₹)</th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Status</th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Estimate </th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(order, index) in orders.data" :key="order.user_order_id">
                                            <td class="align-middle text-center">
                                                <p class="text-xs font-weight-bold mb-0">{{ orders.meta.from + index }}</p>
                                            </td>
                                            <td class="align-middle">
                                                <p class="text-sm font-weight-bold mb-0 text-dark">{{ order.order_id
                                                    }}</p>
                                            </td>
                                            <td class="align-middle">
                                                <p class="text-sm font-weight-bold mb-0">{{ order.user_name }}</p>
                                                <p class="text-xs text-muted mb-0">{{ order.phone }}</p>
                                            </td>
                                            <td class="align-middle text-center">
                                                <p class="text-sm font-weight-bold mb-0">{{
                                                        order.order_time
                                                    }}</p>
                                            </td>
                                            <td class="align-middle text-center">
                                                <p class="text-sm font-weight-bold mb-0">{{ order.item_quantity }}</p>
                                            </td>
                                            <td class="align-middle text-center">
                                                <p class="text-sm font-weight-bold mb-0">{{
                                                        parseFloat(order.grand_total).toFixed(2) }}</p>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span :class="['badge-custom', getStatusBadgeClass(order.order_status)]">
                                                    {{ order.order_status }}
                                                </span>
                                            </td>
                                            <td class="align-middle text-center">
                                                 <router-link :to="`/admin/invoice/${order.user_order_id}`">
                                                    <button class="btn px-4 py-1 btn-dark mb-0 text-xs font-weight-bold"> 
                                                        Estimate 
                                                    </button>
                                                 </router-link>
                                            </td>
                                            <td class="align-middle text-center">
                                                <a href="javascript:;" class="mx-1" data-bs-toggle="tooltip"
                                                    title="View Details"
                                                    @click="viewOrderDetails(order.user_order_id)">
                                                    <i class="fas fa-eye text-info"></i>
                                                </a>  
                                            </td>
                                        </tr>
                                        <tr v-if="orders.data.length === 0">
                                            <td colspan="9" class="text-center text-muted py-4">No orders found matching
                                                your criteria.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="d-flex justify-content-between align-items-center p-3">
                                <span class="text-sm">
                                    Showing {{ orders.meta.from }} to {{ orders.meta.to }} of {{ orders.meta.total }} entries
                                </span>
                                <nav aria-label="Page navigation">
                                    <ul class="pagination mb-0">
                                        <li class="page-item" :class="{ disabled: !orders.meta.links[0].url }">
                                            <a class="page-link" href="#" aria-label="Previous"
                                                @click.prevent="fetchOrders(orders.meta.current_page - 1)">
                                                <span aria-hidden="true">&laquo;  </span>
                                            </a>
                                        </li>

                                        <li class="page-item"
                                            v-for="(link, index) in orders.meta.links.slice(1, -1)" :key="index"
                                            :class="{ active: link.active, disabled: !link.url }">
                                            <a class="page-link" href="#" @click.prevent="fetchOrders(link.page)">
                                                {{ link.label }}
                                            </a>
                                        </li>

                                        <li class="page-item" :class="{ disabled: !orders.meta.links[orders.meta.links.length - 1].url }">
                                            <a class="page-link" href="#" aria-label="Next"
                                                @click.prevent="fetchOrders(orders.meta.current_page + 1)">
                                                <span aria-hidden="true">  &raquo;</span>
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
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from "@/services/api"; // axios helper

const router = useRouter()

// --- State for Orders and Pagination ---
const orders = reactive({
    data: [],
    meta: {
        current_page: 1,
        from: 0,
        to: 0,
        total: 0,
        last_page: 1,
        links: [
            { url: null, label: '&laquo; Previous', page: null, active: false },
            { url: 'url?page=1', label: '1', page: 1, active: true },
            { url: null, label: 'Next &raquo;', page: null, active: false }
        ],
    },
});

const searchQuery = reactive({
    orderId: '',
    customerName: '',
    status: '',
    dateFrom: '',
    dateTo: ''
});

const isLoading = ref(false);

// --- API Integration Method ---

/**
 * Fetches the order list from the API with given page and search/filter parameters.
 * @param {number} page The page number to fetch.
 */
const fetchOrders = async (page = 1) => {
    // Prevent fetching if already loading or page is out of bounds
    if (isLoading.value || page < 1 || page > orders.meta.last_page) {
        // Only prevent if page is out of bounds if we have initial data
        if (orders.meta.total > 0 && (page < 1 || page > orders.meta.last_page)) {
            return;
        }
    }

    isLoading.value = true;
    orders.meta.current_page = page; // Optimistically set current page

    const params = {
        page: page,
        // Map search queries to API parameters (assuming API uses these keys)
        order_id: searchQuery.orderId || undefined,
        user_name: searchQuery.customerName || undefined,
        order_status: searchQuery.status || undefined, // API uses 'order_status'
        date_from: searchQuery.dateFrom || undefined,
        date_to: searchQuery.dateTo || undefined,
        // You might need to send other filters like 'per_page' if the API supports it
        // per_page: orders.meta.per_page, 
    };

    try {
        const response = await api.get('/v1/admin/orders', { params });
        const apiData = response.data;

        // Update state with API data
        if (apiData.success && apiData.data) {
            orders.data = apiData.data;
            orders.meta = apiData.meta;
        } else {
            console.error('API call was successful but success flag is false or data is missing.', apiData);
            orders.data = [];
            // Reset meta on failure
            orders.meta = {
                current_page: 1, from: 0, to: 0, total: 0, last_page: 1,
                links: [
                    { url: null, label: '&laquo; Previous', page: null, active: false },
                    { url: null, label: '1', page: 1, active: true },
                    { url: null, label: 'Next &raquo;', page: null, active: false }
                ],
            }
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        orders.data = []; // Clear data on error
    } finally {
        isLoading.value = false;
    }
};

// --- Helper Methods (Adapted to API Data Structure) ---

// The `calculateOrderTotal` and `formatDate` from the original script are no longer needed
// because the API provides `grand_total` and formatted `order_time`.

const viewOrderDetails = (userOrderId) => {
    // Navigate to a dedicated detail view page
    router.push(`/admin/order-details/${userOrderId}`)
}

/**
 * Returns the appropriate badge class based on the order status.
 * Note: Statuses from API are lowercase, so we compare with lowercase.
 */
const getStatusBadgeClass = (status) => {
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
        case 'delivered':
            return 'badge-success'
        case 'pending':
            return 'badge-warning'
        case 'processing':
            return 'badge-info'
        case 'shipped':
            return 'badge-primary'
        case 'cancelled':
            return 'badge-danger'
        default:
            return 'badge-secondary'
    }
}

// --- Lifecycle Hook ---

onMounted(() => {
    // Fetch the initial page of orders
    fetchOrders(1)
})
</script>

<style scoped>
/* Keeping original styles as they define the look of the badges and table */
.badge-custom {
    display: inline-block;
    padding: 0.35em 0.6em;
    font-size: 0.6rem;
    font-weight: 600;
    line-height: 1;
    color: #fff;
    border-radius: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

/* Status-specific badge colors */
.badge-success {
    background-color: #28a745;
}

/* Delivered */
.badge-warning {
    background-color: #ffc107;
    color: #343a40;
}

/* Pending */
.badge-info {
    background-color: #17a2b8;
}

/* Processing */
.badge-primary {
    background-color: #007bff;
}

/* Shipped */
.badge-danger {
    background-color: #dc3545;
}

/* Cancelled */
.badge-secondary {
    background-color: #6c757d;
}

/* Basic styling for pagination controls if not already in your framework */
.pagination .page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
</style>