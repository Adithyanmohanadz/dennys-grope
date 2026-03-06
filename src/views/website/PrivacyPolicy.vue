<script setup>
import { ref, onMounted } from 'vue';

const lastUpdated = ref('October 20, 2023');

onMounted(() => {
    window.scrollTo(0, 0);
});
</script>

<template>
    <div class="privacy-policy-page">
        <!-- Header Section -->
        <section class="policy-header py-5 text-center">
            <div class="container">
                <h1 class="fw-black display-4 mb-3">Privacy Policy</h1>
                <p class="text-muted ">Your privacy is important to us. Learn how we protect your data.</p>
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
                                <h2 class="h4 fw-bold mb-3">1. Information We Collect</h2>
                                <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter. This may include your name, email address, phone number, and shipping address.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">2. How We Use Your Information</h2>
                                <p>We use the information we collect to process your orders, communicate with you about your account, send promotional offers (if opted-in), and improve our website experience.</p>
                            </div>

                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">3. Data Security</h2>
                                <p>We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
                            </div>
                            <div class="mb-5">      
                                <h2 class="h4 fw-bold mb-3">4. Sharing Your Information</h2>
                                <p>We do not sell your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.</p>
                            </div>
                            <div class="mb-5">
                                <h2 class="h4 fw-bold mb-3">5. Your Rights</h2>
                                <p>You have the right to access, correct, or delete your personal information. You can also opt-out of receiving promotional communications from us at any time by following the unsubscribe instructions in our emails or contacting us directly.</p>
                            </div>
                            <div class="mb-0">
                                <h2 class="h4 fw-bold mb-3">6. Contact Us</h2>
                                <p>If you have any questions about our privacy policy, please contact us at support@yourcompany.com.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.privacy-policy-page {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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