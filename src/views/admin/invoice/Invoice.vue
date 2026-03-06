<template>
    <div class="estimate-invoice">
        <div class="container-fluid">
            <!-- Loading State -->
            <div v-if="isLoading" class="row">
                <div class="col-12">
                    <div class="card shadow-sm border-0">
                        <div class="card-body text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p class="mt-3 text-muted">Loading invoice data...</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="row">
                <div class="col-12">
                    <div class="card shadow-sm border-0">
                        <div class="card-body text-center py-5">
                            <i class="fas fa-exclamation-triangle text-danger fa-3x mb-3"></i>
                            <h5 class="text-danger">Error Loading Invoice</h5>
                            <p class="text-muted">{{ error }}</p>
                            <button class="btn btn-primary" @click="fetchInvoiceData">
                                <i class="fas fa-redo me-1"></i> Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Invoice Content -->
            <template v-else-if="invoiceData">
                <!-- Action Buttons -->
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="card shadow-sm border-0">
                            <div class="card-body py-2">
                                <div class="d-flex justify-content-between align-items-center flex-wrap">
                                    <h4 class="mb-0 fw-bold">Invoice - {{ invoiceData.order_id }}</h4>
                                    <div class="btn-group" role="group">
                                        <button class="btn btn-sm btn-outline-primary mb-0" v-print="'#printInvoice'">
                                            <i class="fas fa-print me-1"></i> Print
                                        </button>
                                        <button class="btn btn-sm btn-outline-success mb-0" @click="downloadPDF">
                                            <i class="fas fa-download me-1"></i> Download
                                        </button>
                                        <button class="btn btn-sm btn-outline-info mb-0" @click="sharePDF"
                                            :disabled="isSharing">
                                            <i class="fas fa-share-alt me-1"></i>
                                            {{ isSharing ? 'Preparing...' : 'Share' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Invoice Content -->
                <div class="row">
                    <div class="col-12">
                        <div class="card shadow-sm border-0" id="invoice-content">
                            <div class="card-body p-4">
                                <div id="printInvoice" ref="invoiceContent">

                                    <!-- Header -->
                                    <div class="row mb-2">
                                        <div class="col-md-6 mb-3 mb-md-0">
                                            <img v-if="companyData.logo" :src="companyData.logo" alt="Company Logo"
                                                class="img-fluid mb-0 h-75 logo">
                                        </div>
                                        <div class="col-md-6 text-md-end">
                                            <h4 class="text-dark fw-bold mb-3">Estimate Invoice</h4>
                                            <div class="estimate-info">
                                                <p class="mb-2"><strong>Order ID:</strong> {{ invoiceData.order_id }}
                                                </p>
                                                <p class="mb-2"><strong>Order Date:</strong> {{
                                                    invoiceData.order_date_formatted }}</p>
                                                <p class="mb-2"><strong>Invoice Date:</strong> {{ invoiceData.order_time
                                                    }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Company and Customer Details -->
                                    <div class="row mb-2">
                                        <div class="col-md-6 mb-3 mb-md-0">
                                            <h2 class="text-primary fw-bold mb-1">{{ companyData.websiteName }}</h2>
                                            <p class="text-muted mb-1">{{ companyData.address }}</p>
                                            <p class="text-muted mb-1">Phone: {{ companyData.phone }}</p>
                                            <p class="text-muted mb-1">Email: {{ companyData.email }}</p>
                                        </div>
                                        <div class="col-md-6 text-end">
                                            <h5 class="fw-bold mb-2 text-dark">Bill To:</h5>
                                            <div class="customer-details">
                                                <p class="mb-2 fw-semibold text-dark">{{
                                                    invoiceData.customer_details.name }}</p>
                                                <p class="mb-1 text-muted">{{
                                                    invoiceData.customer_details.billing_address }}</p>
                                                <p class="mb-1 text-muted">Phone: {{ invoiceData.customer_details.phone
                                                    }}</p>
                                                <p class="mb-1 text-muted" v-if="invoiceData.customer_details.email">
                                                    Email: {{ invoiceData.customer_details.email }}</p>
                                                <p class="mb-1 text-muted" v-if="invoiceData.customer_details.whatsapp">
                                                    WhatsApp: {{ invoiceData.customer_details.whatsapp }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Shipping Address -->
                                    <div class="mb-2">
                                        <p class="">
                                            <span class="text-dark fw-bold me-1">Shipping Address:</span>
                                            {{ invoiceData.shipping_address }}
                                        </p>
                                    </div>

                                    <!-- Items Table -->
                                    <div class="row mb-4 mt-4">
                                        <div class="col-12">
                                            <div class="table-responsive">
                                                <table class="table table-bordered">
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th class="text-center" style="width: 4%">#</th>
                                                            <th style="width: 25%">Product Description</th>
                                                            <th class="text-center" style="width: 8%">Qty</th>
                                                            <th class="text-end" style="width: 12%">Unit Price</th>
                                                            <th class="text-end" style="width: 12%">Subtotal</th>
                                                            <th class="text-center" style="width: 7%">GST %</th>
                                                            <th class="text-end" style="width: 10%">CGST</th>
                                                            <th class="text-end" style="width: 10%">SGST</th>
                                                            <th class="text-end" style="width: 12%">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) in invoiceData.items"
                                                            :key="item.user_order_item_id">
                                                            <td class="text-center align-middle mb-0">{{ index + 1 }}
                                                            </td>
                                                            <td class="align-middle mb-0">
                                                                <div class="fw-semibold mb-0 text-wrap text-break">{{
                                                                    item.item_name }}</div>
                                                                <small class="text-muted mb-0">Brand: {{ item.brand
                                                                    }}</small>
                                                            </td>
                                                            <td class="text-center align-middle mb-0">{{ item.quantity
                                                                }}</td>
                                                            <td class="text-end align-middle mb-0">₹{{
                                                                parseFloat(item.unit_price).toFixed(2) }}</td>
                                                            <td class="text-end align-middle mb-0">₹{{
                                                                parseFloat(item.sub_total).toFixed(2) }}</td>
                                                            <td class="text-center align-middle mb-0">{{
                                                                item.tax_percentage }}%</td>
                                                            <td class="text-end align-middle mb-0">₹{{
                                                                parseFloat(item.cgst).toFixed(2) }}</td>
                                                            <td class="text-end align-middle mb-0">₹{{
                                                                parseFloat(item.sgst).toFixed(2) }}</td>
                                                            <td class="text-end align-middle mb-0 fw-bold">₹{{
                                                                parseFloat(item.item_total_order_amount).toFixed(2) }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot class="table-light">
                                                        <tr class="border-top border-2">
                                                            <td colspan="2" class="text-end fw-bold">Totals:</td>
                                                            <td class="text-center fw-bold">{{ calculateTotalQuantity }}
                                                            </td>
                                                            <td colspan="1"></td>
                                                            <td class="text-end fw-bold">₹{{
                                                                parseFloat(invoiceData.totals.sub_total).toFixed(2) }}
                                                            </td>
                                                            <td></td>
                                                            <td class="text-end fw-bold">₹{{
                                                                parseFloat(invoiceData.totals.cgst).toFixed(2) }}</td>
                                                            <td class="text-end fw-bold">₹{{
                                                                parseFloat(invoiceData.totals.sgst).toFixed(2) }}</td>
                                                            <td class="text-end fw-bold text-dark fs-5">₹{{
                                                                parseFloat(invoiceData.totals.item_total_order_amount).toFixed(0)
                                                                }}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Summary Box and Terms -->
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h6 class="fw-bold mb-2">Terms & Conditions:</h6>
                                            <ul class=" small">
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
                                                        <span class="fw-semibold">₹{{
                                                            parseFloat(invoiceData.totals.sub_total).toFixed(2)
                                                            }}</span>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-2">
                                                        <span class="text-muted">Total Tax (CGST):</span>
                                                        <span class="fw-semibold">₹{{
                                                            parseFloat(invoiceData.totals.cgst).toFixed(2) }}</span>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-2">
                                                        <span class="text-muted">Total Tax (SGST):</span>
                                                        <span class="fw-semibold">₹{{
                                                            parseFloat(invoiceData.totals.sgst).toFixed(2) }}</span>
                                                    </div>
                                                    <div class="d-flex justify-content-between mb-2">
                                                        <span class="text-muted">Total Tax:</span>
                                                        <span class="fw-semibold">₹{{
                                                            parseFloat(invoiceData.totals.total_tax).toFixed(2)
                                                            }}</span>
                                                    </div>
                                                    <hr>
                                                    <div class="d-flex justify-content-between">
                                                        <span class="fw-bold fs-5">Grand Total:</span>
                                                        <span class="fw-bolder text-dark fs-4">₹{{
                                                            parseFloat(invoiceData.totals.item_total_order_amount).toFixed(0)
                                                            }}</span>
                                                    </div>
                                                    <p class="mb-0 text-end text-danger small">* Additional handling and
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
                                            <div class="mt-4 pt-2 border-top d-inline-block" style="width: 200px;">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import html2pdf from 'html2pdf.js';
import { useRoute } from 'vue-router';
import { api } from "@/services/api";

const route = useRoute();

const invoiceContent = ref(null);

// State
const isLoading = ref(true);
const isSharing = ref(false);
const error = ref(null);
const invoiceData = ref(null);
const companyData = ref({
    websiteName: '',
    email: '',
    phone: '',
    address: '',
    logo: ''
});

// Computed
const calculateTotalQuantity = computed(() => {
    if (!invoiceData.value?.items) return 0;
    return invoiceData.value.items.reduce((sum, item) => sum + parseInt(item.quantity), 0);
});

// Methods
const fetchCompanyInfo = async () => {
    try {
        const response = await api.get('/v1/website-info');
        if (response.data?.data) {
            companyData.value = response.data.data;
        }
    } catch (err) {
        console.error('Error fetching company info:', err);
    }
};

const fetchInvoiceData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
        const orderId = route.params.id;
        if (!orderId) {
            throw new Error('Order ID is required');
        }

        // Fetch both company info and invoice data in parallel
        await Promise.all([
            fetchCompanyInfo(),
            api.get(`/v1/admin/order/invoice/${orderId}`)
                .then(response => {
                    if (response.data?.success && response.data?.data) {
                        invoiceData.value = response.data.data;
                    } else {
                        throw new Error('Invalid response format');
                    }
                })
        ]);
    } catch (err) {
        console.error('Error fetching invoice:', err);
        error.value = err.response?.data?.message || err.message || 'Failed to load invoice data';
    } finally {
        isLoading.value = false;
    }
};

// Generate PDF as Blob
const generatePDFBlob = async () => {
    const element = document.getElementById('printInvoice');

    const opt = {
        margin: 0.2,
        filename: `invoice-${invoiceData.value.order_id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            scrollY: 0,
            useCORS: true
        },
        jsPDF: {
            unit: 'in',
            format: 'a3',
            orientation: 'portrait'
        }
    };

    // Generate PDF and return as blob
    const pdf = await html2pdf().set(opt).from(element).outputPdf('blob');
    return pdf;
};

const downloadPDF = async () => {
    if (!invoiceData.value) {
        alert('Invoice data not loaded yet.');
        return;
    }

    try {
        const element = document.getElementById('printInvoice');

        const opt = {
            margin: 0.2,
            filename: `invoice-${invoiceData.value.order_id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                scrollY: 0,
                useCORS: true
            },
            jsPDF: {
                unit: 'in',
                format: 'a3',
                orientation: 'portrait'
            }
        };

        await html2pdf().set(opt).from(element).save();

    } catch (err) {
        console.error('Error generating PDF:', err);
        alert('Failed to generate PDF. Please check the console for details.');
    }
};

// Share PDF function
const sharePDF = async () => {
    if (!invoiceData.value) {
        alert('Invoice data not loaded yet.');
        return;
    }

    // Check if Web Share API is supported
    if (!navigator.share) {
        alert('Sharing is not supported on this browser. Please use Download instead.');
        return;
    }

    isSharing.value = true;

    try {
        // Generate PDF as blob
        const pdfBlob = await generatePDFBlob();

        // Create a File object from the blob
        const fileName = `invoice-${invoiceData.value.order_id}.pdf`;
        const file = new File([pdfBlob], fileName, { type: 'application/pdf' });

        // Check if files can be shared
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: `Invoice - ${invoiceData.value.order_id}`,
                text: `Invoice for Order ${invoiceData.value.order_id}`,
                files: [file]
            });
        } else {
            // Fallback: Share text with download link
            const shareData = {
                title: `Invoice - ${invoiceData.value.order_id}`,
                text: `Invoice for Order ${invoiceData.value.order_id}\nTotal: ₹${parseFloat(invoiceData.value.totals.item_total_order_amount).toFixed(2)}`
            };
            await navigator.share(shareData);
            alert('PDF file sharing not supported. Please use the Download button to save the PDF, then share it manually.');
        }
    } catch (err) {
        // User cancelled the share or an error occurred
        if (err.name !== 'AbortError') {
            console.error('Error sharing PDF:', err);
            alert('Failed to share PDF. Please try downloading instead.');
        }
    } finally {
        isSharing.value = false;
    }
};

// Lifecycle
onMounted(() => {
    fetchInvoiceData();
});
</script>

<style scoped>
.estimate-invoice {
    min-height: 100vh;
}

.estimate-info p {
    font-size: 0.95rem;
}

.customer-details {
    font-size: 0.9rem;
}

.logo {
    height: 100px !important;
}

@media screen,
print {
    .table-responsive {
        page-break-inside: avoid;
    }
}
</style>