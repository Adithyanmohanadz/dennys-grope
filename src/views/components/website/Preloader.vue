<template>
    <div v-if="loading" class="preloader">
        <div class="logo">
            <img 
                v-if="websiteLogo"
                :src="websiteLogo" 
                alt="logo" 
                height="100px" 
                class="fade-in-logo"
            >
            </div>
        <div class="charging-sun"></div>
        <div class="loading-text">Loading {{ websiteName }}...</div> 
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { websiteApi } from "@/services/api"; 

const loading = ref(true);
const websiteName = ref(""); 
const websiteLogo = ref("");      // Keep this initially empty

const fetchWebsiteInfo = async () => {
    try {
        const response = await websiteApi.get("v1/website-info");
        if (response.data && response.data.data) {
            websiteName.value = response.data.data.websiteName || "";
            // Assign logo only after successful fetch
            websiteLogo.value = response.data.data.logo || "";
        }
    } catch (error) {
        console.error("Failed to fetch website info for preloader:", error);
    }
};

onMounted(async () => {
    const fetchPromise = fetchWebsiteInfo(); // Start fetching info
    const minimumLoadingTimePromise = new Promise(resolve => setTimeout(resolve, 2000)); // Minimum 1.5s display

    await Promise.all([fetchPromise, minimumLoadingTimePromise]);
    
    loading.value = false;
});
</script>

<style scoped>
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f7f9fc;
    z-index: 9999;
}

.logo {
    margin-bottom: 2rem;
    min-height: 100px; /* Reserve space to prevent layout shift */
    display: flex; /* Helps center the image vertically if it's smaller than min-height */
    align-items: center;
    justify-content: center;
}

/* CSS for the fade-in effect */
.fade-in-logo {
    opacity: 0; /* Start invisible */
    animation: fadeIn 0.8s ease-out forwards; /* Apply fade-in animation */
    animation-delay: 0.2s; /* Optional: slight delay after component mounts */
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.charging-sun {
    width: 60px;
    height: 60px;
    border: 4px solid #fff;
    border-top: 4px solid #4b3008;
    border-radius: 50%;
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-left: 4px solid #e0e0e0;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-text {
    margin-top: 1.5rem;
    color: #444;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}
</style>