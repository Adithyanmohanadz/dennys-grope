<template>
    <div class="WebsiteAuthLayout">
  
        <main class="website-main">
            <router-view />
        </main>

    </div>
</template>

<script setup>
import { onMounted } from 'vue'

defineOptions({
  name: 'WebsiteAuthLayout'
})
 

// Load external CSS/JS only after component is mounted
onMounted(() => {
    // CSS
      import('@/assets/website/css/vendor.css')
      import('@/assets/website/css/style.css')
      import('@/assets/website/css/styles.css')
      import('@/assets/website/css/b5-sub.css') 
      
      import('@/assets/website/css/font.css') 
    // // JS
    //   import('@/assets/website/js/jquery-1.11.0.min.js')
     
})
</script>

<style scoped>
</style>