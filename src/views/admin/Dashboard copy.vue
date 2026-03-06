<template>
    <div class="container-fluid dashboard-container">
        <!-- Stats Cards -->
        <div class="row g-4 mb-4">
            <div v-for="stat in stats" :key="stat.id" class="col-xl-3 col-md-6">
                <div class="card shadow-sm border-0 stat-card h-100">
                    <div class="card-body d-flex justify-content-between align-items-center p-4">
                        <div class="stat-info">
                            <p class="text-muted text-uppercase mb-1 fw-bold stat-label">
                                {{ stat.label }}
                            </p>
                            <h3 class="stat-value mb-0 text-dark">
                                {{ formatNumber(stat.value) }}
                            </h3>
                        </div>
                        <div class="p-3 rounded-circle stat-icon" :class="getIconColor(stat.id)">
                            <FontAwesomeIcon :icon="getIcon(stat.id)" class="fs-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="row g-4">
            <!-- Order Overview -->
            <div class="col-lg-5">
                <div class="card shadow-sm border-0 h-100 order-overview">
                    <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 py-3">
                        <h3 class="card-title h5 mb-0">Order Overview</h3>
                        <select v-model="selectedPeriod" class="form-select form-select-sm w-auto period-select">
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                    <div class="card-body chart-container d-flex flex-column flex-md-row align-items-center justify-content-center p-4">
                        <OrderDoughnutChart :chartData="doughnutChartData" class="me-md-4 mb-4 mb-md-0" />
                        <div class="chart-legend w-100">
                            <div v-for="item in orderData" :key="item.status" class="d-flex justify-content-between align-items-center mb-2">
                                <div class="d-flex align-items-center">
                                    <span class="legend-dot rounded-circle me-2" :style="{ backgroundColor: item.color }"></span>
                                    <span class="legend-label text-truncate">{{ item.status }}</span>
                                </div>
                                <span class="legend-value text-muted fw-bold">({{ item.percentage }}%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Revenue Trends -->
            <div class="col-lg-7">
                <div class="card shadow-sm border-0 h-100 revenue-trends">
                    <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 py-3">
                        <h3 class="card-title h5 mb-0">Revenue Trends</h3>
                        <span class="trend-period text-muted">Last 6 Months</span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <div class="revenue-amount mb-3 text-dark fw-bold h3">
                            ₹{{ formatCurrency(revenueData.current) }}
                        </div>
                        <div class="chart-height-wrapper flex-grow-1">
                            <RevenueLineChart :chartData="lineChartData" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Orders Table -->
        <div class="row mt-4">
            <div class="col-12">
                <div class="card shadow-sm border-0 pending-invoices">
                    <div class="card-header bg-white border-0 py-3">
                        <div class="d-flex align-items-center justify-content-between">
                            <h3 class="h5 mb-0">Recent Orders (Pending Only)</h3>
                            <div v-if="!loading && orders.meta.total > 0" class="alert alert-danger p-2 m-0 d-flex align-items-center invoice-alert" role="alert">
                                <span class="alert-icon me-2 fw-bold">!</span>
                                <small class="mb-0 text-white">
                                    {{ orders.meta.total }} total orders | {{ orders.meta.from }} to {{ orders.meta.to }} displayed
                                </small>
                            </div>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div v-if="loading" class="text-center p-4">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error" class="alert alert-danger m-3" role="alert">
                        <strong>Error:</strong> {{ error }}
                        <button @click="fetchOrders(1)" class="btn btn-sm btn-outline-danger ms-3">
                            Retry
                        </button>
                    </div>

                    <!-- Orders Table -->
                    <div v-else class="card-body p-0 mt-3">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover table-sm" id="order-list" aria-label="Pending Orders">
                                <thead class="bg-dark">
                                    <tr>
                                        <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                            SL/No
                                        </th>
                                        <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                            Order ID
                                        </th>
                                        <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                            Customer
                                        </th>
                                        <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                            Date
                                        </th>
                                        <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                            Items
                                        </th>
                                        <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                            Total (₹)
                                        </th>
                                        <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                            Estimate
                                        </th>
                                        <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in orders.data" :key="order.user_order_id">
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">
                                                {{ orders.meta.from + index }}
                                            </p>
                                        </td>
                                        <td class="align-middle">
                                            <p class="text-sm font-weight-bold mb-0 text-dark">
                                                {{ order.order_id }}
                                            </p>
                                        </td>
                                        <td class="align-middle">
                                            <p class="text-sm font-weight-bold mb-0">
                                                {{ order.user_name }}
                                            </p>
                                            <p class="text-xs text-muted mb-0">
                                                {{ order.phone }}
                                            </p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-sm font-weight-bold mb-0">
                                                {{ order.order_time }}
                                            </p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-sm font-weight-bold mb-0">
                                                {{ order.item_quantity }}
                                            </p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-sm font-weight-bold mb-0">
                                                {{ parseFloat(order.grand_total).toFixed(2) }}
                                            </p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <router-link :to="`/admin/invoice/${order.user_order_id}`">
                                                <button class="btn px-4 py-1 btn-dark mb-0 text-xs font-weight-bold">
                                                    Estimate
                                                </button>
                                            </router-link>
                                        </td>
                                        <td class="align-middle text-center">
                                            <a href="javascript:;" class="mx-1" data-bs-toggle="tooltip" title="View Details" @click="viewOrderDetails(order.user_order_id)">
                                                <i class="fas fa-eye text-info"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr v-if="orders.data.length === 0">
                                        <td colspan="8" class="text-center text-muted py-4">
                                            No pending orders found matching your criteria.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div class="d-flex justify-content-between align-items-center p-3">
                            <span class="text-sm">
                                Showing {{ orders.meta.from }} to {{ orders.meta.to }} of {{ orders.meta.total }} entries
                            </span>
                            <nav aria-label="Page navigation">
                                <ul class="pagination mb-0">
                                    <li class="page-item" :class="{ disabled: orders.meta.current_page === 1 }">
                                        <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(orders.meta.current_page - 1)">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    <li class="page-item" v-for="page in paginationPages" :key="page" :class="{ active: page === orders.meta.current_page }">
                                        <a class="page-link" href="#" @click.prevent="changePage(page)">
                                            {{ page }}
                                        </a>
                                    </li>
                                    <li class="page-item" :class="{ disabled: orders.meta.current_page === orders.meta.last_page }">
                                        <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(orders.meta.current_page + 1)">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Top Selling Items Chart -->
        <div class="row g-4 mt-4">
            <div class="col-12">
                <div class="card shadow-sm border-0 top-selling-items">
                    <div class="card-header bg-white border-0 py-3">
                        <h3 class="card-title h5 mb-0">Top Selling Items</h3>
                    </div>
                    <div class="card-body">
                        <div style="height: 300px;">
                            <TopSellingItemsChart :chartData="topItemsChartData" :height="300" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart, faDollarSign, faUsers, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { api } from '@/services/api'
import { useRouter } from 'vue-router'

// Import Chart Components
import OrderDoughnutChart from '@/views/components/admin/OrderDoughnutChart.vue'
import RevenueLineChart from '@/views/components/admin/RevenueLineChart.vue'
import TopSellingItemsChart from '@/views/components/admin/TopSellingItemsChart.vue'

const router = useRouter()

// --- State Management ---
const loading = ref(false)
const error = ref(null)
const selectedPeriod = ref('today')

// --- Icon Setup ---
const icons = {
    CartIcon: faShoppingCart,
    DollarIcon: faDollarSign,
    UsersIcon: faUsers,
    BoxIcon: faBoxOpen
}

const getIcon = (id) => {
    const iconMap = {
        1: icons.CartIcon,
        2: icons.DollarIcon,
        3: icons.UsersIcon,
        4: icons.BoxIcon
    }
    return iconMap[id] || icons.BoxIcon
}

const getIconColor = (id) => {
    const colorMap = {
        1: 'bg-primary',
        2: 'bg-success',
        3: 'bg-warning',
        4: 'bg-info'
    }
    return colorMap[id] || 'bg-secondary'
}

// --- Dashboard Stats ---
const stats = ref([
    { id: 1, label: "Today's Order", value: 0 },
    { id: 2, label: "Today's Sales", value: 0 },
    { id: 3, label: 'Customers', value: 0 },
    { id: 4, label: 'Items', value: 0 }
])

const orderData = ref([
    { status: 'Confirmed', percentage: 45, color: '#0d6efd', value: 45 },
    { status: 'Processing', percentage: 25, color: '#ffc107', value: 25 },
    { status: 'Shipped', percentage: 20, color: '#198754', value: 20 },
    { status: 'Cancelled', percentage: 10, color: '#dc3545', value: 10 }
])

const revenueData = ref({
    current: 120500+120500,
    data: [15000, 25000, 32000, 48000, 85000, 120500, 15000, 25000, 32000, 48000, 85000, 120500]
})

const topItemsData = ref([
    { name: 'Wireless Earbuds X1', sales: 1250, color: '#6c757d' },
    { name: '4K HDMI Cable', sales: 890, color: '#6c757d' },
    { name: 'Portable Charger 10k', sales: 620, color: '#6c757d' },
    { name: 'Mesh WiFi Router', sales: 450, color: '#6c757d' },
    { name: 'E-commerce Theme License', sales: 310, color: '#6c757d' }
])

// --- Orders Data ---
const orders = ref({
    data: [],
    meta: {
        current_page: 1,
        last_page: 1,
        from: 0,
        to: 0,
        total: 0,
        per_page: 10
    }
})

// --- API Functions ---

/**
 * Fetch dashboard statistics
 */
const fetchDashboardStats = async () => {
    try {
        // Uncomment when API endpoint is ready
        // const response = await api.get('/v1/admin/dashboard/stats')
        // if (response.data.success) {
        //     stats.value = response.data.stats
        //     orderData.value = response.data.orderBreakdown
        //     revenueData.value = response.data.revenue
        //     topItemsData.value = response.data.topItems
        // }
    } catch (err) {
        console.error('Error fetching dashboard stats:', err)
    }
}

/**
 * Fetch orders with server-side filtering for "Pending" status
 * @param {number} page - Page number to fetch
 */
const fetchOrders = async (page = 1) => {
    loading.value = true
    error.value = null

    try {
        // Server-side filtering: Add status=Pending to API request
        const response = await api.get(`/v1/admin/orders`)

        if (response.data.success) {
            orders.value.data = response.data.data || []
            orders.value.meta = {
                current_page: response.data.meta?.current_page || 1,
                last_page: response.data.meta?.last_page || 1,
                from: response.data.meta?.from || 0,
                to: response.data.meta?.to || 0,
                total: response.data.meta?.total || 0,
                per_page: response.data.meta?.per_page || 10
            }
        } else {
            error.value = response.data.message || 'Failed to fetch orders'
            resetOrdersData()
        }
    } catch (err) {
        console.error('Error fetching orders:', err)
        error.value = err.message || 'An error occurred while fetching orders'
        resetOrdersData()
    } finally {
        loading.value = false
    }
}

/**
 * Reset orders data to initial state
 */
const resetOrdersData = () => {
    orders.value = {
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            from: 0,
            to: 0,
            total: 0,
            per_page: 10
        }
    }
}

/**
 * Handle page change
 * @param {number} page - New page number
 */
const changePage = (page) => {
    if (page < 1 || page > orders.value.meta.last_page) return
    fetchOrders(page)
}

/**
 * View order details
 * @param {number} orderId - Order ID to view
 */
const viewOrderDetails = (orderId) => {
    router.push(`/admin/order-details/${orderId}`)
}

// --- Computed Properties ---

/**
 * Generate pagination pages with ellipsis for large page counts
 */
const paginationPages = computed(() => {
    const current = orders.value.meta.current_page
    const last = orders.value.meta.last_page
    const pages = []

    if (last <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= last; i++) {
            pages.push(i)
        }
    } else {
        // Show first, last, current, and surrounding pages
        if (current <= 3) {
            pages.push(1, 2, 3, 4, '...', last)
        } else if (current >= last - 2) {
            pages.push(1, '...', last - 3, last - 2, last - 1, last)
        } else {
            pages.push(1, '...', current - 1, current, current + 1, '...', last)
        }
    }

    return pages.filter(p => p !== '...' || pages.indexOf(p) === pages.lastIndexOf(p))
})

/**
 * Doughnut chart data for order overview
 */
const doughnutChartData = computed(() => ({
    labels: orderData.value.map(item => item.status),
    datasets: [{
        backgroundColor: orderData.value.map(item => item.color),
        data: orderData.value.map(item => item.value),
        borderWidth: 0,
        hoverOffset: 8
    }]
}))

/**
 * Line chart data for revenue trends
 */
const lineChartData = computed(() => ({
    labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
        label: 'Revenue',
        data: revenueData.value.data,
        backgroundColor: 'rgba(13, 110, 253, 0.2)',
        borderColor: '#0d6efd',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7
    }]
}))

/**
 * Bar chart data for top selling items
 */
const topItemsChartData = computed(() => ({
    labels: topItemsData.value.map(item => item.name).reverse(),
    datasets: [{
        label: 'Units Sold',
        data: topItemsData.value.map(item => item.sales).reverse(),
        backgroundColor: topItemsData.value.map(item => item.color).reverse(),
        borderColor: topItemsData.value.map(item => item.color).reverse(),
        borderWidth: 1,
        borderRadius: 4
    }]
}))

// --- Utility Functions ---

/**
 * Format large numbers with K/M suffixes
 */
const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toLocaleString()
}

/**
 * Format currency in Indian format
 */
const formatCurrency = (amount) => {
    return parseFloat(amount).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

// --- Watchers ---

/**
 * Watch for period changes and refetch data
 */
watch(selectedPeriod, (newPeriod) => {
    console.log('Period changed to:', newPeriod)
    // Uncomment to fetch data based on selected period
    // fetchDashboardStats()
    // fetchOrders(1)
})

// --- Lifecycle ---
onMounted(() => {
    fetchOrders(1)
    fetchDashboardStats()
})
</script>

<style scoped>
.dashboard-container {
    min-height: 100vh;
    padding: 1rem;
}

/* Stat Cards */
.stat-card {
    transition: all 0.3s ease;
    cursor: pointer;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.stat-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
}

.stat-label {
    font-size: 0.75rem;
    letter-spacing: 0.5px;
}

/* Chart Containers */
.chart-container {
    min-height: 300px;
}

.chart-height-wrapper {
    min-height: 250px;
}

/* Legend */
.legend-dot {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
}

.legend-label {
    font-size: 0.875rem;
}

.legend-value {
    font-size: 0.875rem;
}

/* Alert */
.invoice-alert {
    max-width: 400px;
}

.alert-icon {
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
}

/* Table */
.table {
    margin-bottom: 0;
}

.table thead th {
    font-size: 0.75rem;
    padding: 0.75rem;
    border-bottom: 2px solid #dee2e6;
}

.table tbody td {
    padding: 0.75rem;
    vertical-align: middle;
}

.table tbody tr {
    transition: background-color 0.2s ease;
}

.table tbody tr:hover {
    background-color: #f8f9fa;
}

/* Spinner */
.spinner-border {
    width: 3rem;
    height: 3rem;
}

/* Pagination */
.pagination {
    gap: 0.25rem;
}

.page-link {
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    color: #0d6efd;
    border: 1px solid #dee2e6;
}

.page-item.active .page-link {
    background-color: #0d6efd;
    border-color: #0d6efd;
}

.page-item.disabled .page-link {
    cursor: not-allowed;
    opacity: 0.5;
}

/* Responsive */
@media (max-width: 768px) {
    .stat-value {
        font-size: 1.5rem;
    }

    .invoice-alert {
        max-width: 100%;
    }

    .table-responsive {
        font-size: 0.875rem;
    }
}
</style>