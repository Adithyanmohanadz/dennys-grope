<template>
  <div class="admin-layout"> 
    <router-view />
  </div>

</template>

<script setup>
import { onMounted } from 'vue'

defineOptions({
  name: 'AdminAuthLayout'
})

onMounted(() => {
  import('@/assets/admin/css/pro.css')
  import('@/assets/admin/css/nucleo-icons.css')
  import('@/assets/admin/css/nucleo-svg.css')
  import('@/assets/admin/css/glstyle.css')
  // import('@/assets/admin/css/argon-dashboard.css')

  // import('@/assets/admin/js/core/popper.min.js')
  // import('@/assets/admin/js/core/bootstrap.min.js')
  // import('@/assets/admin/js/plugins/perfect-scrollbar.min.js')
  // import('@/assets/admin/js/plugins/smooth-scrollbar.min.js')
  // import('@/assets/admin/js/argon-dashboard.min.js?v=2.1.0')
  // import('@/assets/admin/js/pro.js')
})
</script>