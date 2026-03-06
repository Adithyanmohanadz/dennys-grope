<template>

  

 <Preloader />

  <div class="presentation-page">

    <!-- Navbar Component -->
    <Navbar />
    <Menubar />

    <main class="website-main">
      <router-view />
    </main>

    <!-- Footer Component -->
    <Footer />


  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Components
import Navbar from '@/views/components/website/Navbar.vue'
import Menubar from '@/views/components/website/Menubar.vue'
import Footer from '@/views/components/website/Footer.vue'
import Preloader from '@/views/components/website/Preloader.vue'

// Load external CSS/JS only after component is mounted
onMounted(() => {
  // CSS
  import('@/assets/website/css/vendor.css')
  import('@/assets/website/css/style.css')
  import('@/assets/website/css/styles.css')
  import('@/assets/website/css/b5-sub.css')

  import('@/assets/website/css/font.css')

  // await import('@/assets/website/css/styles.css')
  // await import('@/assets/website/css/design-system-pro.min.css')
  // await import('@/assets/website/css/nucleo-icons.css')
  // await import('@/assets/website/css/nucleo-svg.css')

  // // JS
  // import('@/assets/website/js/jquery-1.11.0.min.js')
  // await import('@/assets/website/js/plugins.js')
  // await import('@/assets/website/js/script.js')

  // await import('@/assets/website/js/core/popper.min.js')
  // await import('@/assets/website/js/core/bootstrap.min.js')
  // // await import('@/assets/website/js/plugins/perfect-scrollbar.min.js')
  // // await import('@/assets/website/js/plugins/typedjs.js')
  // await import('@/assets/website/js/plugins/countup.min.js')
  // await import('@/assets/website/js/plugins/rellax.min.js')
  // await import('@/assets/website/js/plugins/tilt.min.js')
  // await import('@/assets/website/js/plugins/choices.min.js')
  // await import('@/assets/website/js/plugins/parallax.min.js')
  // await import('@/assets/website/js/plugins/nouislider.min.js')
  // // await import('@/assets/website/js/plugins/glidejs.min.js')
  // // await import('@/assets/website/js/plugins/anime.min.js')
  // // await import('@/assets/website/js/plugins/chartjs.min.js')
  // await import('@/assets/website/js/design-system-pro.min.js')
})
</script>

<style>
.offcanvas,
.offcanvas-lg,
.offcanvas-md,
.offcanvas-sm,
.offcanvas-xl,
.offcanvas-xxl {

  --bs-offcanvas-width: 350px !important;
}
 

.table{
  --bs-table-border-color: #cecece !important;
}

.form-select { 
    border: var(--bs-border-width) solid #959595 !important; 
}
</style>