<template>
    <footer class="footer2 py-3 bg-white border-top text-center">
            <p class="mb-0 text-muted small">
                © {{ new Date().getFullYear() }} {{ footerData.websiteName || 'Website Name' }}. All rights reserved.
            </p>
        </footer>
</template>

<script setup>
import { ref, onMounted } from "vue"; 

import { api } from "@/services/api"; // axios helper
 

const footerData = ref({ 
  websiteName: "", 
});

onMounted(async () => {
  try {
    const res = await api.get("v1/website-info");
    const info = res.data?.data;
    if (info) footerData.value = info;
  } catch (err) {
    console.error("Failed to load footer data:", err);
  }
});

defineOptions({
  name: "AuthFooter",
});
</script>

<style scoped>
</style>