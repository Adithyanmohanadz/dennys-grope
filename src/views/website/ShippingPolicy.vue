 <script setup>
import { ref, onMounted } from 'vue';

const lastUpdated = ref('October 20, 2023');

onMounted(() => {
    window.scrollTo(0, 0);
});
</script>

<template>
    <div class="shipping-policy-page">
        <!-- Header Section -->
        <section class="policy-header py-5 text-center">
            <div class="container">
                <h1 class="fw-black display-4 mb-3">Shipping Policy</h1>
                <p class="text-muted lead">Everything you need to know about how we deliver your favorite coffee.</p>
                <div class="mx-auto mt-4" style="width: 60px; height: 4px; background: #1a1a1a; border-radius: 2px;"></div>
            </div>
        </section>

        <!-- Content Section -->
        <section class="pb-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-9">
                        <div class="content-card p-4 p-md-5 shadow-sm bg-white rounded-4">
                            
                            <div class="mb-5">
                                <p class="text-muted small mb-4">Last Updated: {{ lastUpdated }}</p>
                                <h2 class="h4 fw-bold mb-3">1. Shipping Coverage</h2>
                                <p>We currently offer shipping services across all major cities and towns in India. We partner with reputed courier services to ensure your coffee reaches you fresh and on time.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">2. Processing Time</h2>
                                <p>Orders are typically processed within 1-2 business days. Orders placed on weekends or public holidays will be processed on the next business day. You will receive a notification once your order has been dispatched.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">3. Delivery Timelines</h2>
                                <ul>
                                    <li><strong>Metros:</strong> 2-3 business days</li>
                                    <li><strong>Tier 2 Cities:</strong> 3-5 business days</li>
                                    <li><strong>Tier 3 Cities:</strong> 5-7 business days</li>
                                </ul>
                            </div>
                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">4. Shipping Charges</h2>
                                <p>We offer free shipping on orders above ₹500. For orders below ₹500, a flat shipping fee of ₹50 will be applied at checkout. Shipping charges are calculated based on the delivery location and the weight of the package.</p>
                            </div>
                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">5. Tracking Your Order</h2>
                                <p>Once your order is shipped, you will receive an email and SMS with the tracking number and the courier partner's website link. You can track the status of your shipment in real-time through our "Track Order" page.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">6. Delayed or Lost Shipments</h2>
                                <p>While we strive for timely delivery, delays may occur due to unforeseen circumstances like weather conditions, strikes, or logistical issues. If your order is significantly delayed, please contact our support team at support@yourcompany.com.</p>
                            </div>

                            <div class="mb-0">
                                <h2 class="h4 fw-bold mb-3">7. Damaged Packaging</h2>
                                <p>If you receive a package that is visibly damaged or tampered with, please do not accept the delivery and report it to us immediately. If you have already accepted it, please take photos of the packaging and contact us within 24 hours.</p>
                            </div>

                        </div>

                        <div class="text-center mt-5">
                            <router-link to="/shop" class="btn btn-dark btn-lg px-5 rounded-pill">
                                Back to Shop
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.shipping-policy-page {
    background-color: #f8f9fa;
    min-height: 100vh;
}

.policy-header {
    background: #fff;
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
}

.policy-header h1 {
    font-size: 2.5rem;
}

.policy-header p {
    font-size: 1.25rem;
}

.content-card {
    background: #fff;
    border: 1px solid #eee;
}
.content-card h2 {
    color: #333;
}
.content-card p {
    color: #666;
}
</style>