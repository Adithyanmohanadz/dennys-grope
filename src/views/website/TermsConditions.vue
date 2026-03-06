<script setup>
import { ref, onMounted } from 'vue';

const lastUpdated = ref('October 20, 2023');

onMounted(() => {
    window.scrollTo(0, 0);
});
</script>

<template>
    <div class="terms-page">
        <!-- Header Section -->
        <section class="terms-header py-5 text-center">
            <div class="container">
                <h1 class="fw-black display-4 mb-3">Terms & Conditions</h1>
                <p class="text-muted lead">Please read these terms carefully before using our services.</p>
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
                                <h2 class="h4 fw-bold mb-3">1. Agreement to Terms</h2>
                                <p>By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all of these terms, do not use this website.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">2. Intellectual Property</h2>
                                <p>The content, organization, graphics, design, and other matters related to the Site are protected under applicable copyrights and trademarks. The copying, redistribution, or publication by you of any such matters or any part of the Site is strictly prohibited.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">3. Product Information & Pricing</h2>
                                <p>We strive to ensure that all product information and pricing on our website is accurate. However, we do not guarantee that all information is error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.</p>
                            </div>                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">4. Order Acceptance & Cancellation</h2>
                                <p>Your receipt of an electronic or other form of order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell. We reserve the right at any time after receipt of your order to accept or decline your order for any reason.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">5. Shipping & Delivery</h2>
                                <p>Delivery times are estimates and commence from the date of shipping, rather than the date of order. Delivery times are to be used as a guide only and are subject to the acceptance and approval of your order.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">6. Limitation of Liability</h2>
                                <p>In no event shall our company, its directors, officers, employees, or agents be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of this website or with the delay or inability to use this website.</p>
                            </div>

                            <div class="mb-0">
                                <h2 class="h4 fw-bold mb-3">7. Governing Law</h2>
                                <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts in our registered business location.</p>
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
.terms-page {
    background-color: #f8f9fa;
    min-height: 100vh;
}

.terms-header {
    background: #fff;
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
}

.terms-header h1 {
    font-size: 2.5rem;
}

.terms-header p {
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