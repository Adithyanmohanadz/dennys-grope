<template>
  <div v-if="isAuthenticated" class="admin-layout g-sidenav-show bg-gray-100">
    <div class="min-height-300 bg-dark position-absolute w-100"></div>
    
    <!-- Sidebar -->
    <AdminSidebar />
    
    <!-- Main Content -->
    <main class="main-content position-relative border-radius-lg">
      <!-- Top Navbar -->
      <AdminNavbar :page-title="currentPageTitle" />
      
      <!-- Page Content -->
      <div class="page-content">
        <router-view />
      </div>

      <!-- Footer -->
      <AdminFooter />
    </main>
  </div>
  
  <!-- Optional: Loading state while checking auth -->
  <div v-else class="auth-check-loading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminSidebar from '@/views/components/admin/AdminSidebar.vue'
import AdminNavbar from '@/views/components/admin/AdminNavbar.vue'
import AdminFooter from '@/views/components/admin/AdminFooter.vue'

const route = useRoute()
const router = useRouter()
const isAuthenticated = ref(false)

onBeforeMount(() => {
  // Check authentication before mounting the layout
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
  
  if (!token) {
    // No token found, redirect immediately
    router.replace({ name: 'admin-login' })
  } else {
    // Token exists, allow rendering
    isAuthenticated.value = true
    
    // Load admin assets only when authenticated
    loadAdminAssets()
  }
})

const loadAdminAssets = () => {
  import('@/assets/admin/css/pro.css')
  import('@/assets/admin/css/nucleo-icons.css')
  import('@/assets/admin/css/nucleo-svg.css')
  import('@/assets/admin/css/glstyle.css')
  import('@/assets/admin/css/font.css')
}

const currentPageTitle = computed(() => {
  return route.meta?.title || 'Dashboard'
})
</script>

<style scoped>
.auth-check-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #f8f9fa;
}
</style>