<template>
    <div class="estimate-invoice">
        <div class="container py-4">

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2 text-muted">Loading invoice...</p>
            </div>

            <!-- Error State -->
            <div v-if="error" class="alert bg-danger2" role="alert">
                <h6 class="text-white mb-0">{{ error }}</h6>
            </div>

            <!-- Action Buttons -->
            <div class="row mb-3">
                <div class="col-12">
                    <div class="card shadow-sm border-0">
                        <div class="card-body py-2">
                            <div class="d-flex justify-content-between align-items-center flex-wrap">
                                <h4 class="mb-0 fw-bold">Estimate Invoice - {{ orderData.order_id }}</h4>
                                <div class="btn-group" role="group">
                                    <button class="btn   btn-warning text-dark mb-0" v-print="'#printInvoice'">
                                        <i class="fas fa-print me-1"></i> Print
                                    </button>
                                    <button class="btn   btn-success mb-0" @click="downloadPDF">
                                        <i class="fas fa-download me-1"></i> Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Invoice Content -->
            <div v-if="!loading && !error" class="row">
                <div class="col-12">
                    <div class="card shadow-sm border-0" id="invoice-content">
                        <div class="card-body p-4">
                            <div id="printInvoice" ref="invoiceContent">

                                <!-- Header -->
                                <div class="row mb-2">
                                    <div class="col-md-6 mb-3 mb-md-0">
                                        <img :src="companyData.logo" :alt="companyData.name"
                                            class="img-fluid mb-0 h-75 logo">
                                    </div>
                                    <div class="col-md-6 text-md-end">
                                        <h4 class="text-dark fw-bold mb-3">Estimate Invoice</h4>
                                        <div class="estimate-info">
                                            <p class="mb-2"><strong>Order Id #:</strong> {{ orderData.order_id }}</p>
                                            <p class="mb-2"><strong>Order Date:</strong> {{
                                                orderData.order_date_formatted
                                            }}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Customer Details -->
                                <div class="row mb-2">
                                    <div class="col-md-6 mb-3 mb-md-0">
                                        <h2 class="text-dark fw-bold mb-1">{{ companyData.name }}</h2>
                                        <p class="text-muted mb-1">{{ companyData.address }}</p>
                                        <p class="text-muted mb-1">Phone: {{ companyData.phone }}</p>
                                        <p class="text-muted mb-1">Email: {{ companyData.email }}</p>
                                    </div>
                                    <div class="col-md-6 text-end">
                                        <h5 class="fw-bold mb-2 text-dark">Bill To:</h5>
                                        <div class="customer-details">
                                            <p class="mb-2 fw-semibold text-dark">{{ orderData.customer_details?.name }}
                                            </p>
                                            <p class="mb-1 text-muted">{{ orderData.customer_details?.billing_address }}
                                            </p>
                                            <p class="mb-1 text-muted">Phone: {{ orderData.customer_details?.phone }}
                                            </p>
                                            <p class="mb-1 text-muted">Email: {{ orderData.customer_details?.email }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Shipping Address -->
                                <div class="mb-2">
                                    <p class="">
                                        <span class="text-dark fw-bold me-1">Shipping Address:</span>
                                        {{ orderData.shipping_address }}
                                    </p>
                                </div>

                                <!-- Items Table -->
                                <div class="row mb-4 mt-4">
                                    <div class="col-12">
                                        <div class="table-responsive">
                                            <table class="table table-bordered">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th class="text-center" style="width: 5%">#</th>
                                                        <th style="width: 30%">Product Description</th>
                                                        <th class="text-center" style="width: 10%">Qty</th>
                                                        <th class="text-end" style="width: 13%">Unit Price</th>
                                                        <th class="text-end" style="width: 13%">Subtotal</th>
                                                        <th class="text-center" style="width: 8%">GST %</th>
                                                        <th class="text-end" style="width: 10%">CGST</th>
                                                        <th class="text-end" style="width: 10%">SGST</th>
                                                        <th class="text-end" style="width: 13%">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in orderData.items"
                                                        :key="item.user_order_item_id">
                                                        <td class="text-center align-middle">{{ index + 1 }}</td>
                                                        <td class="align-middle">
                                                            <div class="fw-semibold">{{ item.item_name }}</div>
                                                            <small class="text-muted">Brand: {{ item.brand }}</small>
                                                        </td>
                                                        <td class="text-center align-middle">{{ item.quantity }}</td>
                                                        <td class="text-end align-middle">₹{{
                                                            parseFloat(item.unit_price).toFixed(2) }}</td>
                                                        <td class="text-end align-middle">₹{{
                                                            parseFloat(item.sub_total).toFixed(2) }}</td>
                                                        <td class="text-center align-middle">{{ item.tax_percentage }}%
                                                        </td>
                                                        <td class="text-end align-middle">₹{{
                                                            parseFloat(item.cgst).toFixed(2) }}</td>
                                                        <td class="text-end align-middle">₹{{
                                                            parseFloat(item.sgst).toFixed(2) }}</td>
                                                        <td class="text-end align-middle fw-bold">₹{{
                                                            parseFloat(item.item_total_order_amount).toFixed(2) }}</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot class="table-light">
                                                    <tr class="border-top border-2">
                                                        <td colspan="2" class="text-end fw-bold">Totals:</td>
                                                        <td class="text-center fw-bold">{{ calculateTotalQuantity }}
                                                        </td>
                                                        <td colspan="1"></td>
                                                        <td class="text-end fw-bold">₹{{
                                                            parseFloat(orderData.totals?.sub_total || 0).toFixed(2) }}
                                                        </td>
                                                        <td></td>
                                                        <td class="text-end fw-bold">₹{{
                                                            parseFloat(orderData.totals?.cgst
                                                                || 0).toFixed(2) }}</td>
                                                        <td class="text-end fw-bold">₹{{
                                                            parseFloat(orderData.totals?.sgst
                                                                || 0).toFixed(2) }}</td>
                                                        <td class="text-end fw-bold text-dark fs-5">₹{{
                                                            parseFloat(orderData.totals?.item_total_order_amount ||
                                                                0).toFixed(0) }}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <!-- Summary Box -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <h6 class="fw-bold mb-2">Terms & Conditions:</h6>
                                        <ul class="text-muted small">
                                            <li>This estimate is valid for 1 days from the date of issue.</li>
                                            <li>Prices are subject to change without prior notice.</li>
                                            <li>Payment terms: 50% advance, balance on delivery.</li>
                                            <li>Delivery time: 7-10 business days from order confirmation.</li>
                                            <li>All disputes are subject to local jurisdiction only.</li>
                                        </ul>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card bg-light">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between mb-2">
                                                    <span class="text-muted">Subtotal:</span>
                                                    <span class="fw-semibold">₹{{ parseFloat(orderData.totals?.sub_total
                                                        ||
                                                        0).toFixed(2) }}</span>
                                                </div>
                                                <div class="d-flex justify-content-between mb-2">
                                                    <span class="text-muted">Total Tax (CGST + SGST):</span>
                                                    <span class="fw-semibold">₹{{ parseFloat(orderData.totals?.total_tax
                                                        ||
                                                        0).toFixed(2) }}</span>
                                                </div>
                                                <hr>
                                                <div class="d-flex justify-content-between">
                                                    <span class="fw-bold fs-5">Grand Total:</span>
                                                    <span class="fw-bolder text-dark fs-4">₹{{
                                                        parseFloat(orderData.totals?.item_total_order_amount ||
                                                            0).toFixed(0) }}</span>
                                                </div>
                                                <p class="mb-0 text-end text-danger2 small">* Additional handling and
                                                    delivery charges apply to this order.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Footer -->
                                <div class="row mt-4 pt-3 border-top">
                                    <div class="col-md-6">
                                        <p class="text-muted small mb-0">For any queries, please contact us at {{
                                            companyData.email }}</p>
                                    </div>
                                    <div class="col-md-6 text-md-end">
                                        <p class="fw-semibold mb-0">Authorized Signature</p>
                                        <div class="mt-4 pt-2 border-top d-inline-block" style="width: 200px;"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import html2pdf from 'html2pdf.js';
import { useRoute } from 'vue-router';
import { websiteApi } from '@/services/api';

const route = useRoute();

const invoiceContent = ref(null);

// State
const loading = ref(false);
const error = ref(null);

// Company Data
const companyData = ref({
    name: '',
    address: '',
    phone: '',
    email: '',
    logo: ''
});

// Order Data
const orderData = ref({
    user_order_id: null,
    order_id: '',
    order_date_formatted: '',
    order_time: '',
    grand_total: '0.00',
    customer_details: {
        name: '',
        email: '',
        phone: '',
        billing_address: ''
    },
    shipping_address: '',
    items: [],
    totals: {
        sub_total: '0.00',
        cgst: '0.00',
        sgst: '0.00',
        total_tax: '0.00',
        item_total_order_amount: '0.00'
    }
});

// Computed
const calculateTotalQuantity = computed(() => {
    return orderData.value.items.reduce((sum, item) => sum + parseInt(item.quantity), 0);
});

// Methods
const fetchWebsiteInfo = async () => {
    try {
        const response = await websiteApi.get('v1/website-info');

        if (response.data.data) {
            const data = response.data.data;
            companyData.value = {
                name: data.websiteName || '',
                address: data.address || '',
                phone: data.phone || '',
                email: data.email || '',
                logo: data.logo || ''
            };
        }
    } catch (err) {
        console.error('Error fetching website info:', err);
    }
};

const fetchOrderInvoice = async (userOrderId) => {
    loading.value = true;
    error.value = null;

    try {
        const response = await websiteApi.get(`v1/user/order/invoice/${userOrderId}`);

        if (response.data.success && response.data.data) {
            orderData.value = response.data.data;
        } else {
            error.value = 'Failed to load invoice data.';
        }
    } catch (err) {
        if (err.response?.status === 500) {
            // Assume 500 with user error means Order ID is invalid
            error.value = 'The specified order ID is invalid or does not exist.';
        } else {
            error.value = err.response?.data?.message || 'Failed to fetch invoice. Please try again later.';
        }
        console.error('Error fetching order invoice:', err);
    } finally {
        loading.value = false;
    }
};

const downloadPDF = async () => {

    if (!orderData.value || !orderData.value.order_id) {
        alert('Invoice data not loaded yet.');
        return;
    }

    try {
        const element = document.getElementById('printInvoice');

        // ⭐ ENHANCED CONFIGURATION FOR BETTER SCALING ⭐
        const opt = {
            margin: 0.2, // Margin in inches (since unit is 'in')

            // ✅ Correction: Use orderData.value.order_id for the filename
            filename: `invoice-${orderData.value.order_id}.pdf`,

            image: { type: 'jpeg', quality: 0.98 },

            // 1. INCREASE SCALE for sharp logo/text/lines
            html2canvas: {
                scale: 2, // Try 3 or 4 for high-resolution capture
                scrollY: 0, // Helps with positioning the entire element
                useCORS: true // Essential if your logo is loaded from a different domain (CDN)
            },

            // 2. Use 'in' (inches) for the unit
            jsPDF: {
                unit: 'in',
                format: 'a3', // Changed to 'a4' as it's a more common standard
                orientation: 'portrait'
            }
        };

        // Generate and save the PDF
        await html2pdf().set(opt).from(element).save();

    } catch (err) {
        console.error('Error generating PDF:', err);
        alert('Failed to generate PDF. Please check the console for details and ensure your logo\'s server supports CORS.');
    }
};

// Lifecycle
onMounted(async () => {
    const userOrderId = route.params.id;

    if (!userOrderId) {
        error.value = 'Invalid order ID.';
        return;
    }

    // Fetch both website info and order invoice
    await Promise.all([
        fetchWebsiteInfo(),
        fetchOrderInvoice(userOrderId)
    ]);
});
</script>

<style scoped>
.estimate-invoice {
    min-height: 100vh;
    background-color: #f5f7fa;
}

.estimate-info p {
    font-size: 0.95rem;
}

.customer-details {
    font-size: 0.9rem;
}

/* Print Styles */
@media print {
    body * {
        visibility: hidden !important;
        overflow: hidden !important;
    }

    #invoice-content,
    #invoice-content * {
        visibility: visible !important;
    }

    #invoice-content {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        page-break-after: avoid !important;
    }

    .card.bg-light {
        background-color: white !important;
        border: 1px solid #ccc !important;
    }

    .table-dark {
        background-color: #343a40 !important;
        color: white !important;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
    }

    .table-light {
        background-color: #f8f9fa !important;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
    }

    .logo {
        max-width: 200px !important;
        height: auto !important;
        margin-top: 0 !important;
    }
}
</style>