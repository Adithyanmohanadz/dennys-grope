 <script setup>
import { ref, onMounted } from 'vue';

const lastUpdated = ref('October 20, 2023');

const faqs = ref([
    {
        question: "How long does delivery take?",
        answer: "Typically, orders in Metro cities are delivered within 2-3 business days. For Tier 2 and Tier 3 cities, it may take 3-7 business days depending on the location.",
        isOpen: true
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we only ship within India. We are working on expanding our reach to coffee lovers worldwide soon!",
        isOpen: false
    },
    {
        question: "Can I cancel my order?",
        answer: "Orders can be cancelled as long as they haven't been dispatched. Once the order is out for delivery, we cannot process cancellations due to the perishable nature of coffee.",
        isOpen: false
    },
    {
        question: "Is your coffee ethically sourced?",
        answer: "Yes, 100%. We work directly with farmers and estates that follow sustainable farming practices and ensure fair wages for all workers.",
        isOpen: false
    },
    {
        question: "How should I store my coffee?",
        answer: "To maintain freshness, store your coffee in an airtight container in a cool, dark place. Avoid the refrigerator or freezer as moisture can affect the flavor profile.",
        isOpen: false
    }
]);

const toggleFaq = (index) => {
    faqs.value[index].isOpen = !faqs.value[index].isOpen;
};

onMounted(() => {
    window.scrollTo(0, 0);
});
</script>

<template>
    <div class="faq-page">
        <!-- Header Section -->
        <section class="policy-header py-5 text-center">
            <div class="container">
                <h1 class="fw-black display-4 mb-3">Frequently Asked Questions</h1>
                <p class="text-muted lead">Find answers to common questions about our coffee and services.</p>
                <div class="mx-auto mt-4" style="width: 60px; height: 4px; background: #1a1a1a; border-radius: 2px;"></div>
            </div>
        </section>
        <!-- Content Section -->
        <section class="pb-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-9">
                        <div class="content-card p-4 p-md-5 shadow-sm bg-white rounded-4">
                            <p class="text-muted small mb-4">Last Updated: {{ lastUpdated }}</p>
                            <div v-for="(faq, index) in faqs" :key="index">
                                <div class="mb-4">
                                    <h2 class="h5 fw-bold mb-2" @click="toggleFaq(index)" style="cursor: pointer;">
                                        {{ faq.question }}
                                        <span class="float-end">{{ faq.isOpen ? '-' : '+' }}</span>
                                    </h2>
                                    <p v-if="faq.isOpen">
                                        {{ faq.answer }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
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