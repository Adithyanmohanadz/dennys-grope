<template>
    <section style="background-color: #f5f2ed; min-height: 100vh;" class="py-5">
        <div class="container-fluid px-3 px-md-5">

            <!-- Page Header -->
            <div class="mb-4">
                <h1 class="fw-black mb-1" style="font-size: 2rem; letter-spacing: -1px;">Your Cart</h1>
                <p class="text-muted mb-0">{{ cartItems.length }} item(s) in your bag</p>
            </div>

            <!-- Empty Cart State -->
            <div v-if="cartItems.length === 0" class="empty-cart text-center py-5">
                <div class="mb-4">
                    <i class="fas fa-shopping-bag" style="font-size: 4rem; color: #dee2e6;"></i>
                </div>
                <h3 class="fw-bold text-dark mb-2">Your cart is empty</h3>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <router-link to="/shop" class="btn btn-dark-modern px-5 py-3">
                    <i class="fas fa-arrow-left me-2"></i> Continue Shopping
                </router-link>
            </div>

            <!-- Cart Content -->
            <div v-else class="row g-4">

                <!-- ── Cart Items ─────────────────────────────────────────────── -->
                <div class="col-lg-8">
                    <div class="cart-card mb-3" v-for="(item, index) in cartItems" :key="item.cart_id">

                        <div class="row g-0 align-items-center p-3">

                            <!-- Product Image -->
                            <div class="col-3 col-md-2 d-flex align-items-center justify-content-center">
                                <div class="product-img-wrap">
                                    <img :src="item.item_image || '/assets/website/img/product/placeholder.jpg'"
                                        :alt="item.item_name" class="img-fluid"
                                        style="max-height: 90px; object-fit: contain;" @error="handleImageError">
                                </div>
                            </div>

                            <!-- Product Info -->
                            <div class="col-9 col-md-10 ps-3">
                                <div class="row align-items-center g-2">

                                    <!-- Name & Meta Chips -->
                                    <div class="col-md-4">
                                        <h2 class="h6 fw-bold text-dark mb-2">{{ item.item_name }}</h2>
                                        <div class="d-flex flex-wrap gap-1">
                                            <span class="meta-chip type-chip">{{ item.quantity_type }}</span>
                                            <span class="meta-chip">
                                                <span v-for="(v, vi) in item.selected_variants"
                                                    :key="v.variant_type_id + '-' + vi">
                                                    {{ v.variant }}<span v-if="vi < item.selected_variants.length - 1">
                                                        | </span>
                                                </span>
                                            </span>
                                            <span class="meta-chip qty-chip">{{ item.quantity_label }}</span>
                                        </div>
                                    </div>

                                    <!-- ── Price Block ─────────────────────────────────── -->
                                    <div class="col-6 col-md-3 mt-2 mt-md-0">
                                        <p class="label-tiny mb-2">Unit Price</p>

                                        <div class="d-flex align-items-center gap-2">
                                            <span v-if="parseFloat(item.discount) > 0"
                                                class="discount mb-1 d-inline-block">
                                                -{{ parseFloat(item.discount) }}%
                                            </span>
                                            <span class="fw-bold text-dark">
                                                ₹{{ formatPrice(item.gst_included_price) }}
                                            </span>
                                        </div>

                                        <p v-if="parseFloat(item.discount) > 0"
                                            class="text-muted text-decoration-line-through small mb-0">
                                            M.R.P ₹{{ formatPrice(item.price) }}
                                        </p>

                                        <div class="d-flex align-items-center gap-1 mb-1">
                                            <span
                                                v-if="parseFloat(item.gst_included_price) !== parseFloat(item.gst_excluded_price)"
                                                class="gst-pill gst-incl">Incl. GST</span>
                                            <span v-else class="gst-pill gst-excl">Excl. GST</span>
                                        </div>
                                    </div>

                                    <!-- Quantity Controls -->
                                    <div class="col-6 col-md-2 mt-2 mt-md-0">
                                        <p class="label-tiny mb-1">Qty</p>
                                        <div class="qty-control d-flex align-items-center justify-content-between">
                                            <button class="qty-btn" @click="decrement(index)" :disabled="item.qty <= 1 || item.qtyLoading">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                            <span v-if="item.qtyLoading" class="qty-value">
                                                <span class="spinner-border spinner-border-sm"></span>
                                            </span>
                                            <span v-else class="qty-value">{{ item.qty }}</span>
                                            <button class="qty-btn" @click="increment(index)" :disabled="item.qtyLoading">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Item Total + Remove -->
                                    <div
                                        class="col-12 col-md-3 mt-2 mt-md-0 d-flex align-items-start justify-content-between justify-content-md-end gap-3">
                                        <div class="text-md-end">
                                            <p class="label-tiny mb-1">Total</p>
                                            <h5 class="fw-black mb-0 text-success-custom">
                                                ₹{{ formatPrice(parseFloat(item.gst_included_price) * item.qty) }}
                                            </h5>
                                            <p class="gst-note mb-0">Incl. GST</p>
                                        </div>
                                        <button class="remove-btn" @click="removeItem(index)" title="Remove item">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Continue Shopping -->
                    <div class="mt-2">
                        <router-link to="/shop" class="btn btn-outline-secondary rounded-pill px-4">
                            <i class="fas fa-arrow-left me-2"></i> Continue Shopping
                        </router-link>
                    </div>
                </div>

                <!-- ── Order Summary ──────────────────────────────────────────── -->
                <div class="col-lg-4">
                    <div class="position-sticky" style="top: 110px;">
                        <div class="summary-card">
                            <h5 class="fw-black mb-4" style="letter-spacing: -0.5px;">Price Summary</h5>

                            <ul class="list-unstyled mb-0">
                                <li class="d-flex justify-content-between py-2">
                                    <span class="text-muted">Total Items:</span>
                                    <span class="fw-semibold">{{ cartItems.length }}</span>
                                </li>
                                <li class="d-flex justify-content-between py-2">
                                    <span class="text-muted">Total Quantity:</span>
                                    <span class="fw-semibold">{{ totalQty }}</span>
                                </li>
                                <li class="d-flex align-items-center justify-content-between py-3 border-top mt-2">
                                    <div>
                                        <h5 class="mb-0">Total Estimated</h5>
                                        <p class="gst-note mb-0">All prices incl. GST</p>
                                    </div>
                                    <h5 class="fw-black mb-0 text-success-custom">₹{{ formatPrice(grandTotal) }}</h5>
                                </li>
                            </ul>

                            <!-- Place Order -->
                            <button class="btn btn-checkout btn-lg w-100 rounded-pill mt-3" @click="confirmPlaceOrder"
                                :disabled="cartItems.length === 0 || isSubmitting">
                                <span v-if="isSubmitting">
                                    <span class="spinner-border spinner-border-sm me-2"></span> Processing...
                                </span>
                                <span v-else>
                                    Place Your Order <i class="fas fa-arrow-right ms-2"></i>
                                </span>
                            </button>

                            <p class="text-center text-muted small mt-3 mb-0">
                                <i class="fas fa-shield-alt me-1"></i> Secure & encrypted checkout
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- PAYMENT MODAL  (dummy — replace when gateway is configured)        -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <div v-if="showPaymentModal" class="modal-backdrop fade show"></div>
    <div v-if="showPaymentModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content border-0 shadow-lg">

                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold">
                        <i class="fas fa-lock me-2 text-success"></i> Secure Checkout
                    </h5>
                    <button type="button" class="btn-close" @click="showPaymentModal = false"></button>
                </div>

                <div class="modal-body px-4 pb-2">

                    <!-- Notice banner -->
                    <div class="alert alert-warning d-flex align-items-start gap-2 py-2 px-3 mb-4" role="alert">
                        <i class="fas fa-tools mt-1 flex-shrink-0"></i>
                        <div class="small">
                            <strong>Payment gateway not yet configured.</strong><br>
                            This is a placeholder checkout. Click <em>Pay Now</em> to simulate a successful payment.
                        </div>
                    </div>

                    <!-- Order summary strip -->
                    <div class="payment-summary rounded-3 p-3 mb-4">
                        <div class="d-flex justify-content-between small text-muted mb-1">
                            <span>Items</span>
                            <span>{{ cartItems.length }} product(s) · qty {{ totalQty }}</span>
                        </div>
                        <div class="d-flex justify-content-between fw-bold fs-5 mt-2 border-top pt-2">
                            <span>Total</span>
                            <span class="text-success-custom">₹{{ formatPrice(grandTotal) }}</span>
                        </div>
                        <p class="text-muted small mb-0 mt-1">
                            <i class="fas fa-info-circle me-1"></i> All prices include GST.
                            Additional delivery charges may apply.
                        </p>
                    </div>

                    <!-- Dummy payment method selector -->
                    <p class="label-tiny mb-2">Select Payment Method</p>
                    <div class="d-flex flex-wrap gap-2 mb-4">
                        <div v-for="method in paymentMethods" :key="method.id"
                            class="payment-method-chip"
                            :class="{ 'payment-method-chip--active': selectedPaymentMethod === method.id }"
                            @click="selectedPaymentMethod = method.id">
                            <i :class="method.icon" class="me-1"></i> {{ method.label }}
                        </div>
                    </div>

                </div>

                <div class="modal-footer border-0 pt-0 px-4 pb-4 d-flex gap-2">
                    <button class="btn btn-outline-secondary flex-fill rounded-pill"
                        @click="showPaymentModal = false">
                        Cancel
                    </button>
                    <button class="btn btn-pay flex-fill rounded-pill" @click="handlePayNow">
                        <i class="fas fa-bolt me-2"></i> Pay ₹{{ formatPrice(grandTotal) }}
                    </button>
                </div>

            </div>
        </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- ORDER CONFIRMATION MODAL                                           -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <div v-if="showConfirmModal" class="modal-backdrop fade show"></div>
    <div v-if="showConfirmModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow-lg border-0">
                <div class="modal-body text-center p-5">
                    <i class="fas fa-shopping-basket text-success mb-4" style="font-size: 3.5rem;"></i>
                    <h4 class="fw-bold text-dark">Confirm Your Order</h4>
                    <p class="text-muted">Are you sure you want to place this order? Once confirmed, our team will begin
                        processing your request.</p>

                    <div class="confirm-summary p-3 rounded-3 text-start mb-4">
                        <div class="d-flex justify-content-between small mb-1">
                            <span class="text-muted">Total Items:</span>
                            <span class="fw-semibold">{{ cartItems.length }}</span>
                        </div>
                        <div class="d-flex justify-content-between small mb-1">
                            <span class="text-muted">Total Quantity:</span>
                            <span class="fw-semibold">{{ totalQty }}</span>
                        </div>
                        <div class="d-flex justify-content-between border-top pt-2 mt-2">
                            <span class="fw-bold">Grand Total <span class="text-muted fw-normal small">(incl.
                                    GST)</span>:</span>
                            <span class="fw-black text-success-custom">₹{{ formatPrice(grandTotal) }}</span>
                        </div>
                    </div>

                    <div class="d-flex gap-3 justify-content-center">
                        <button class="btn btn-outline-secondary px-4 rounded-pill" @click="showConfirmModal = false">
                            Cancel
                        </button>
                        <button class="btn btn-dark px-4 rounded-pill" @click="submitOrder">
                            Yes, Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- ORDER SUCCESS MODAL                                                -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <div v-if="showOrderModal" class="modal-backdrop fade show"></div>
    <div v-if="showOrderModal" class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">

                <div class="modal-header border-0 pb-0">
                    <button type="button" class="btn-close ms-auto" @click="closeOrderModal"></button>
                </div>

                <div class="modal-body pt-0">
                    <div class="text-center mb-4">
                        <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                        <h3 class="text-dark fw-bold mt-3">Order Placed Successfully!</h3>
                        <p class="text-muted">Your order has been placed. Our team will contact you soon.</p>
                    </div>

                    <div id="orderInvoice">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <h4 class="fw-bold text-dark mb-1">{{ companyData.name }}</h4>
                                <p class="text-muted small mb-0">{{ companyData.address }}</p>
                                <p class="text-muted small mb-0">Phone: {{ companyData.phone }}</p>
                                <p class="text-muted small mb-0">Email: {{ companyData.email }}</p>
                            </div>
                            <div class="col-md-6 text-md-end">
                                <h5 class="fw-bold text-dark mb-1">Order Invoice</h5>
                                <p class="text-muted small mb-0"><strong>Order ID:</strong> {{ orderData.order_id }}</p>
                                <p class="text-muted small mb-0"><strong>Date:</strong> {{
                                    orderData.order_date_formatted }}</p>
                            </div>
                        </div>

                        <div class="row mb-3" v-if="orderData.customer_details">
                            <div class="col-md-6">
                                <h6 class="fw-bold mb-1">Bill To:</h6>
                                <p class="mb-0 fw-semibold">{{ orderData.customer_details.name }}</p>
                                <p class="text-muted small mb-0">{{ orderData.customer_details.billing_address }}</p>
                                <p class="text-muted small mb-0">Phone: {{ orderData.customer_details.phone }}</p>
                                <p class="text-muted small mb-0">Email: {{ orderData.customer_details.email }}</p>
                            </div>
                            <div class="col-md-6 text-md-end" v-if="orderData.shipping_address">
                                <h6 class="fw-bold mb-1">Shipping Address:</h6>
                                <p class="text-muted small mb-0">{{ orderData.shipping_address }}</p>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-bordered table-sm">
                                <thead class="table-dark">
                                    <tr>
                                        <th class="text-center" style="width:4%">#</th>
                                        <th style="width:26%">Product</th>
                                        <th class="text-center" style="width:7%">Qty</th>
                                        <th class="text-end" style="width:11%">MRP</th>
                                        <th class="text-center" style="width:7%">Disc%</th>
                                        <th class="text-end" style="width:11%">Unit Price</th>
                                        <th class="text-end" style="width:11%">Base Amt</th>
                                        <th class="text-end" style="width:11%">GST Amt</th>
                                        <th class="text-end" style="width:12%">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, i) in orderData.items" :key="row.user_order_item_id || i">
                                        <td class="text-center align-middle">{{ i + 1 }}</td>
                                        <td class="align-middle">
                                            <div class="fw-semibold">{{ row.item_name }}</div>
                                            <small class="text-muted">{{ row.quantity_type }} · {{ row.quantity_label
                                            }}</small>
                                        </td>
                                        <td class="text-center align-middle">{{ row.quantity }}</td>
                                        <td class="text-end align-middle text-muted">
                                            <span
                                                :class="parseFloat(row.discount) > 0 ? 'text-decoration-line-through' : ''">
                                                ₹{{ formatPrice(row.mrp) }}
                                            </span>
                                        </td>
                                        <td class="text-center align-middle">
                                            <span v-if="parseFloat(row.discount) > 0" class="discount-badge-sm">
                                                -{{ parseFloat(row.discount) }}%
                                            </span>
                                            <span v-else class="text-muted small">—</span>
                                        </td>
                                        <td class="text-end align-middle">₹{{ formatPrice(row.unit_price) }}</td>
                                        <td class="text-end align-middle">₹{{ formatPrice(row.sub_total) }}</td>
                                        <td class="text-end align-middle" style="color:#856404;">₹{{
                                            formatPrice(row.gst_amount) }}</td>
                                        <td class="text-end align-middle fw-bold">₹{{
                                            formatPrice(row.item_total_order_amount) }}</td>
                                    </tr>
                                </tbody>
                                <tfoot class="table-light">
                                    <tr class="border-top border-2">
                                        <td colspan="2" class="text-end fw-bold">Totals:</td>
                                        <td class="text-center fw-bold">{{ orderData.totals?.total_quantity || totalQty
                                        }}</td>
                                        <td colspan="3"></td>
                                        <td class="text-end fw-bold">₹{{ formatPrice(orderData.totals?.sub_total || 0)
                                        }}</td>
                                        <td class="text-end fw-bold" style="color:#856404;">₹{{
                                            formatPrice(orderData.totals?.total_gst || 0) }}</td>
                                        <td class="text-end fw-bold text-success-custom fs-6">₹{{
                                            formatPrice(orderData.totals?.item_total_order_amount || 0) }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <p class="text-danger small mt-2 mb-0">
                            * Additional handling and delivery charges may apply.
                        </p>
                    </div>

                    <div v-if="orderData.order_id" class="p-3 bg-light rounded text-center mt-3">
                        <div class="d-flex align-items-center justify-content-center gap-4 flex-wrap">
                            <p class="mb-0 small"><strong>Order ID:</strong> {{ orderData.order_id }}</p>
                            <p class="mb-0 small"><strong>Grand Total:</strong> ₹{{
                                formatPrice(orderData.totals?.item_total_order_amount || grandTotal) }}</p>
                        </div>
                    </div>
                </div>

                <div class="modal-footer border-0 justify-content-between">
                    <div class="d-flex gap-2">
                        <button class="btn btn-success text-dark" @click="downloadOrderPDF">
                            <i class="fas fa-download me-1"></i> Download Invoice
                        </button>
                        <button class="btn btn-warning text-dark" @click="printOrderInvoice">
                            <i class="fas fa-print me-1"></i> Print
                        </button>
                    </div>
                    <div class="d-flex gap-2">
                        <router-link to="/shop">
                            <button class="btn btn-outline-secondary" @click="closeOrderModal">Continue
                                Shopping</button>
                        </router-link>
                        <router-link to="/orders">
                            <button class="btn btn-dark" @click="closeOrderModal">View Orders</button>
                        </router-link>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- ── Cart Toast Notification ──────────────────────────────────────────── -->
    <Transition name="toast-slide">
        <div v-if="toast.show"
            class="cart-toast"
            :class="toast.type === 'warning' ? 'cart-toast--warning' : 'cart-toast--danger'">
            <i :class="toast.type === 'warning' ? 'fas fa-exclamation-triangle' : 'fas fa-times-circle'"
                class="me-2 flex-shrink-0"></i>
            <span>{{ toast.message }}</span>
            <button class="cart-toast__close" @click="toast.show = false">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </Transition>

</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import emitter from '@/utils/emitter.js';
import { websiteApi } from '@/services/api';
import { getGuestId } from '@/utils/guest.js';
// import html2pdf from 'html2pdf.js';

const router = useRouter();

// ─── Load Cart from localStorage ─────────────────────────────────────────────
/**
 * Cart items are written to localStorage by ShopPage after every successful
 * POST to v1/cart/add. Each entry is a plain object matching the shape the
 * template expects (cart_id, item_name, qty, gst_included_price, …).
 *
 * We add a reactive `qtyLoading` flag per row for the +/- spinner — this is
 * only a UI concern and is never persisted to localStorage.
 */
const loadCartFromStorage = () => {
  try {
    const raw = localStorage.getItem('cart_items');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Attach UI-only flag
    return parsed.map(item => ({ ...item, qtyLoading: false }));
  } catch {
    return [];
  }
};

const cartItems = ref(loadCartFromStorage());

/** Persist the current cartItems array back to localStorage (without UI flags). */
const persistCart = () => {
  const toStore = cartItems.value.map(({ qtyLoading, ...rest }) => rest);
  localStorage.setItem('cart_items', JSON.stringify(toStore));
};

// ─── Modals ───────────────────────────────────────────────────────────────────
const showConfirmModal = ref(false);
const showOrderModal = ref(false);
const showPaymentModal = ref(false);

// ─── Toast notification ───────────────────────────────────────────────────────
const toast = ref({ show: false, message: '', type: 'danger' });
let toastTimer = null;

const showToast = (message, type = 'danger') => {
    if (toastTimer) clearTimeout(toastTimer);
    toast.value = { show: true, message, type };
    toastTimer = setTimeout(() => { toast.value.show = false; }, 4000);
};
// ─── Loading ──────────────────────────────────────────────────────────────────
const isSubmitting = ref(false);

// ─── Payment (dummy — replace when gateway is configured) ─────────────────────
const paymentMethods = [
    { id: 'upi',  icon: 'fas fa-mobile-alt', label: 'UPI' },
    { id: 'card', icon: 'fas fa-credit-card', label: 'Card' },
    { id: 'cod',  icon: 'fas fa-money-bill-wave', label: 'Cash on Delivery' },
];
const selectedPaymentMethod = ref('upi');

// ─── Company Data ─────────────────────────────────────────────────────────────
const companyData = ref({
    name: 'Your Company Name',
    address: '123, Business Street, City - 600001',
    phone: '+91 98765 43210',
    email: 'info@yourcompany.com',
});

// ─── Order Data ───────────────────────────────────────────────────────────────
const orderData = ref({
    order_id: '',
    order_date_formatted: '',
    customer_details: null,
    shipping_address: '',
    items: [],
    totals: { total_quantity: 0, sub_total: '0.00', total_gst: '0.00', item_total_order_amount: '0.00' },
});

// ─── Computed ─────────────────────────────────────────────────────────────────
const totalQty = computed(() =>
    cartItems.value.reduce((s, i) => s + i.qty, 0)
);
const subtotalExclGST = computed(() =>
    cartItems.value.reduce((s, i) => s + parseFloat(i.gst_excluded_price) * i.qty, 0)
);
const totalGST = computed(() =>
    cartItems.value.reduce((s, i) =>
        s + (parseFloat(i.gst_included_price) - parseFloat(i.gst_excluded_price)) * i.qty, 0)
);
const grandTotal = computed(() =>
    cartItems.value.reduce((s, i) => s + parseFloat(i.gst_included_price) * i.qty, 0)
);

// ─── Cart Actions ─────────────────────────────────────────────────────────────

const isLoggedIn = () => !!localStorage.getItem('website_user_token');

/**
 * Calls POST v1/cart/update-quantity.
 *
 * Guest payload:  { guest_uuid, sub_item_id, action, quantity: 1 }
 * Logged-in payload: { cart_id, action, quantity: 1 }
 *
 * Always sends quantity: 1 — the backend uses `action` to step by 1.
 * qty in the UI is updated from the API response (source of truth).
 */
const updateQuantity = async (i, action) => {
    const item = cartItems.value[i];
    if (!item) return;

    // Guard: don't decrement below 1
    if (action === 'decrement' && item.qty <= 1) return;

    // Prevent double-tap while request is in flight
    if (item.qtyLoading) return;
    item.qtyLoading = true;

    try {
        // Always send quantity: 1 — the backend uses `action` to increment or
        // decrement by 1 step. Sending item.qty here was causing the DB to
        // add/subtract the full current qty each click (exponential growth bug).
        const payload = isLoggedIn()
            ? { cart_id: item.cart_id, action, quantity: 1 }
            : { guest_uuid: getGuestId(), sub_item_id: item.sub_item_id, action, quantity: 1 };

        const res = await websiteApi.post('v1/cart/update-quantity', payload);

        // ── Update qty from API response (source of truth) ──
        // Adjust this path to match whatever your backend returns,
        // e.g. res.data.data.quantity or res.data.data.qty
        const updatedQty = res.data?.data?.quantity ?? res.data?.data?.qty ?? null;

        if (updatedQty !== null) {
            item.qty = updatedQty;
        } else {
            // Fallback: backend didn't return qty, update locally
            item.qty = action === 'increment' ? item.qty + 1 : item.qty - 1;
        }

        persistCart();
        emitter.emit('cart-updated');
    } catch (e) {
        const status = e?.response?.status;

        if (status === 404) {
            // Cart record gone from DB (cleared/expired).
            // Remove the stale item so the user isn't stuck with a ghost entry.
            cartItems.value.splice(i, 1);
            persistCart();
            emitter.emit('cart-updated');
            showToast(
                `"${item.item_name}" is no longer in your cart. Please add it again from the shop.`,
                'warning'
            );
        } else {
            // Network error, 500, etc — do nothing, qty stays as-is
            console.error('updateQuantity error:', e);
            showToast('Could not update quantity. Please try again.', 'danger');
        }
    } finally {
        item.qtyLoading = false;
    }
};

const increment = (i) => updateQuantity(i, 'increment');

const decrement = (i) => updateQuantity(i, 'decrement');

/**
 * Remove item from cart locally and from localStorage.
 * TODO: call DELETE /v1/cart/{cart_id} when that endpoint is available.
 */
const removeItem = (i) => {
    cartItems.value.splice(i, 1);
    persistCart();
    emitter.emit('cart-updated');
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (v) =>
    parseFloat(v || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const handleImageError = (e) => {
    e.target.src = '/assets/website/img/product/placeholder.jpg';
};

// ─── Order ────────────────────────────────────────────────────────────────────

/**
 * Checkout flow:
 * 1. If not logged in  → redirect to /auth/login (with ?redirect=/cart so we
 *    can bring them back after login)
 * 2. If logged in      → show payment modal (dummy until gateway is configured)
 */
const confirmPlaceOrder = () => {
    if (!cartItems.value.length) return;

    if (!isLoggedIn()) {
        // Save intended destination so Login page can redirect back after auth
        router.push({ name: 'Login', query: { redirect: '/cart' } });
        return;
    }

    // Logged in — open payment modal
    showPaymentModal.value = true;
};

// Called from inside the payment modal "Pay Now" button
const handlePayNow = () => {
    showPaymentModal.value = false;
    showConfirmModal.value = true;
};

const submitOrder = async () => {
    showConfirmModal.value = false;
    isSubmitting.value = true;
    try {
        // TODO: replace with real API call, e.g.:
        // const res = await websiteApi.post('v1/orders', { guest_uuid: getGuestId(), items: ... });
        // orderData.value = res.data.data;
        await new Promise(r => setTimeout(r, 1000));

        orderData.value = {
            order_id: 'ORD-' + Date.now(),
            order_date_formatted: new Date().toLocaleDateString('en-IN', {
                year: 'numeric', month: 'long', day: 'numeric'
            }),
            customer_details: null,   // populate from API response
            shipping_address: '',     // populate from API response
            items: cartItems.value.map(item => ({
                user_order_item_id: item.cart_id,
                item_name: item.item_name,
                quantity_type: item.quantity_type,
                quantity_label: item.quantity_label,
                quantity: item.qty,
                mrp: item.price,
                discount: item.discount,
                unit_price: item.gst_included_price,
                sub_total: (parseFloat(item.gst_excluded_price) * item.qty).toFixed(2),
                gst_amount: ((parseFloat(item.gst_included_price) - parseFloat(item.gst_excluded_price)) * item.qty).toFixed(2),
                item_total_order_amount: (parseFloat(item.gst_included_price) * item.qty).toFixed(2),
            })),
            totals: {
                total_quantity: totalQty.value,
                sub_total: subtotalExclGST.value.toFixed(2),
                total_gst: totalGST.value.toFixed(2),
                item_total_order_amount: grandTotal.value.toFixed(2),
            },
        };

        // Clear cart from localStorage after successful order
        cartItems.value = [];
        localStorage.removeItem('cart_items');
        emitter.emit('cart-updated');

        showOrderModal.value = true;
    } catch (e) {
        console.error('Order failed:', e);
        showToast('Failed to place order. Please try again.', 'danger');
    } finally {
        isSubmitting.value = false;
    }
};

const downloadOrderPDF = () => {
    alert('Plug in html2pdf to download.');
};

const printOrderInvoice = () => {
    const el = document.getElementById('orderInvoice');
    if (!el) return;
    const win = window.open('', '_blank', 'height=600,width=900');
    win.document.write(`<html><head><title>Order Invoice</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>@media print{.table-dark{background:#343a40!important;color:#fff!important;-webkit-print-color-adjust:exact}}</style>
    </head><body class="p-4">${el.innerHTML}</body></html>`);
    win.document.close(); win.print();
};

const closeOrderModal = () => {
    showOrderModal.value = false;
    orderData.value = {
        order_id: '', order_date_formatted: '', customer_details: null, shipping_address: '',
        items: [],
        totals: { total_quantity: 0, sub_total: '0.00', total_gst: '0.00', item_total_order_amount: '0.00' },
    };
};
</script>

<style scoped>
/* ── Surfaces ──────────────────────────────────────────────────────── */
.cart-card {
    background: #fff;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.cart-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.08);
}

.summary-card {
    background: #fff;
    border-radius: 24px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    padding: 2rem;
}

.discount {
    display: inline-block;
    color: #dc3545;
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.3px;
}

.discount-badge-sm {
    display: inline-block;
    background: #dc3545;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 1px 7px;
    border-radius: 20px;
}

.gst-pill {
    font-size: 0.68rem;
    font-weight: 700;
    border-radius: 20px;
    white-space: nowrap;
    flex-shrink: 0;
}

.gst-incl {
    background-color: #e6f4ea;
    color: #1a7f3c;
    border: 1px solid #b7dfc4;
    padding: 1px 6px;
}

.gst-excl {
    background-color: #fff3e0;
    color: #b45309;
    border: 1px solid #fcd9a0;
    padding: 1px 6px;
}

.gst-note {
    font-size: 0.68rem;
    color: #adb5bd;
    font-weight: 600;
}

.meta-chip {
    display: inline-block;
    background: #f1f3f5;
    color: #495057;
    font-size: 0.68rem;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 20px;
    text-transform: capitalize;
}

.type-chip {
    background: #fff5f5;
    color: #dc3545;
}

.qty-chip {
    background: #e8f5e9;
    color: #2e7d32;
}

.label-tiny {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #adb5bd;
    letter-spacing: 0.5px;
}

.qty-control {
    display: inline-flex;
    align-items: center;
    background: #f8f9fa;
    border-radius: 12px;
    padding: 4px;
    gap: 4px;
    width: 100%;
    max-width: 110px;
}

.qty-btn {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: none;
    background: #fff;
    color: #1a1a1a;
    font-size: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: background 0.2s, transform 0.1s;
}

.qty-btn:hover:not(:disabled) {
    background: #1a1a1a;
    color: #fff;
    transform: scale(1.1);
}

.qty-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}

.qty-value {
    flex: 1;
    text-align: center;
    font-weight: 700;
    font-size: 0.9rem;
    color: #1a1a1a;
}

.remove-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: none;
    background: #fff5f5;
    color: #dc3545;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.15s;
}

.remove-btn:hover {
    background: #dc3545;
    color: #fff;
    transform: scale(1.1);
}

.btn-checkout {
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 14px;
    font-weight: 700;
    font-size: 1rem;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
}

.btn-checkout:hover {
    background: #000;
    color: #fff;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
}

.btn-dark-modern {
    background: #1a1a1a;
    color: #fff;
    border-radius: 14px;
    font-weight: 600;
    border: none;
    transition: all 0.2s;
}

.btn-dark-modern:hover {
    background: #000;
    color: #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.text-success-custom {
    color: #1a7a4a !important;
}

.confirm-summary {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
}

.product-img-wrap {
    width: 80px;
    height: 80px;
    background: #f8f9fa;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.empty-cart {
    background: #fff;
    border-radius: 24px;
    padding: 4rem 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
}

.modal.show.d-block {
    z-index: 1050;
}

.modal-content {
    border-radius: 16px;
    border: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
}

@media (max-width: 576px) {
    .summary-card {
        padding: 1.25rem;
    }

    .product-img-wrap {
        width: 60px;
        height: 60px;
    }
}

/* ── Cart Toast ────────────────────────────────────────────────────── */
.cart-toast {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 300px;
    max-width: 90vw;
    padding: 0.85rem 1.25rem;
    border-radius: 14px;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    color: #fff;
}

.cart-toast--warning {
    background: #d97706;   /* amber */
}

.cart-toast--danger {
    background: #dc3545;
}

.cart-toast__close {
    margin-left: auto;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    padding: 0 0 0 0.75rem;
    font-size: 0.8rem;
    flex-shrink: 0;
    transition: color 0.2s;
}

.cart-toast__close:hover { color: #fff; }

/* Slide-up transition */
.toast-slide-enter-active,
.toast-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(16px);
}

/* ── Payment Modal ─────────────────────────────────────────────────── */
.payment-summary {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
}

.payment-method-chip {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: 1.5px solid #e9ecef;
    background: #fff;
    font-size: 0.85rem;
    font-weight: 600;
    color: #495057;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
}

.payment-method-chip:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
}

.payment-method-chip--active {
    border-color: #1a1a1a;
    background: #1a1a1a;
    color: #fff;
}

.btn-pay {
    background: #16a34a;
    color: #fff;
    font-weight: 700;
    border: none;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
}

.btn-pay:hover {
    background: #15803d;
    color: #fff;
    box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
    transform: translateY(-1px);
}
</style>