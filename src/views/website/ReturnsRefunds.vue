<script setup>
import { ref, onMounted } from 'vue';

const lastUpdated = ref('October 20, 2023');

onMounted(() => {
    window.scrollTo(0, 0);
});
</script>

<template>
    <div class="returns-refunds-page">
        <!-- Header Section -->
        <section class="policy-header py-5 text-center">
            <div class="container">
                <h1 class="fw-black display-4 mb-3">Returns & Refunds</h1>
                <p class="text-muted lead">Our commitment to your satisfaction and how we handle returns.</p>
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
                                <h2 class="h4 fw-bold mb-3">1. Return Policy</h2>
                                <p>Due to the perishable nature of coffee, we do not accept returns on coffee beans or grounds once the seal is broken. However, if there is an issue with the quality of the product or if you received the wrong item, please contact us within 48 hours of delivery.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">2. Eligibility for Refunds</h2>
                                <p>Refunds are processed under the following circumstances:</p>
                                <ul>
                                    <li>The product received is damaged or defective.</li>
                                    <li>The product received is different from what was ordered.</li>
                                    <li>The order was cancelled before it was dispatched.</li>
                                </ul>
                            </div>
                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">3. Refund Process</h2>
                                <p>To request a refund, please contact our customer support team at support@yourcompany.com.</p>
                            </div>
                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">4. Refund Timeline</h2>
                                <p>Once we receive your refund request, we will review it and notify you of the status within 5 business days. If your refund is approved, it will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.</p>
                            </div>
                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">5. Non-Refundable Items</h2>
                                <p>Gift cards, downloadable products, and any items marked as non-refundable on the product page are not eligible for refunds.</p>
                            </div>  
                            <div class="mb-0">
                                <h2 class="h4 fw-bold mb-3">6. Contact Us</h2>
                                <p>If you have any questions about our returns and refunds policy, please contact us at support@yourcompany.com.</p>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.returns-refunds-page {
    font-family: 'Poppins', sans-serif;
    color: #333;
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