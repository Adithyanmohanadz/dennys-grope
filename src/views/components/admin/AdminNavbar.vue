<template>
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur"
    data-scroll="false">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <h6 class="font-weight-bolder text-white mb-0">{{ pageTitle }}</h6>
      </nav>

      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
        </div>

        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <a href="#" @click.prevent="logout" class="nav-link text-white font-weight-bold px-0">
              <i class="fa fa-user me-sm-1"></i>
              <span class="d-sm-inline d-none">logout
                <p class="mb-0 text-sm">Welcome, {{ loginUsername }}</p>
              </span>
              <span class="d-sm-none d-inline">Logout</span>
            </a>
          </li>

          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a href="#" class="nav-link text-white p-0" id="iconNavbarSidenav" @click.prevent="toggleMobileSidebar">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from "@/services/api"
import { updateWebsiteMeta } from '@/utils/websiteMeta.js'

// Define Props
const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Dashboard'
  }
})

const router = useRouter()
const loginUsername = ref('Admin')

// Declare the missing ref variables
const logoUrl = ref('')
const faviconUrl = ref('')

// Function to retrieve the username from localStorage
const fetchUsername = () => {
  const storedUserData = localStorage.getItem('adminUser')

  if (storedUserData) {
    try {
      const userData = JSON.parse(storedUserData)
      loginUsername.value = userData.name || userData.username || 'Admin'
    } catch (e) {
      console.error('Failed to parse user data from localStorage', e)
      loginUsername.value = 'Admin'
    }
  }
}

const toggleMobileSidebar = () => {
  const sidebar = document.getElementById('sidenav-main')
  const body = document.body

  if (sidebar) {
    // Toggle the mobile sidebar visibility
    sidebar.classList.toggle('show')
    sidebar.classList.toggle('d-block')

    // Toggle body classes for mobile sidebar state
    body.classList.toggle('g-sidenav-show')
    body.classList.toggle('g-sidenav-pinned')

    // Create/remove backdrop
    toggleBackdrop()
  }
}

const toggleBackdrop = () => {
  let backdrop = document.querySelector('.sidenav-backdrop')

  if (!backdrop) {
    // Create backdrop
    backdrop = document.createElement('div')
    backdrop.className = 'sidenav-backdrop fade'
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1039;
      opacity: 0;
      transition: opacity 0.15s linear;
    `
    document.body.appendChild(backdrop)

    // Add click listener to close sidebar when backdrop is clicked
    backdrop.addEventListener('click', closeMobileSidebar)

    // Trigger fade in
    setTimeout(() => {
      backdrop.classList.add('show')
      backdrop.style.opacity = '1'
    }, 10)
  } else {
    // Remove backdrop
    backdrop.classList.remove('show')
    backdrop.style.opacity = '0'
    setTimeout(() => {
      if (backdrop && backdrop.parentNode) {
        backdrop.parentNode.removeChild(backdrop)
      }
    }, 150)
  }
}

const closeMobileSidebar = () => {
  const sidebar = document.getElementById('sidenav-main')
  const body = document.body

  if (sidebar && sidebar.classList.contains('show')) {
    sidebar.classList.remove('show', 'd-block')
    body.classList.remove('g-sidenav-show', 'g-sidenav-pinned')

    // Remove backdrop
    const backdrop = document.querySelector('.sidenav-backdrop')
    if (backdrop) {
      backdrop.classList.remove('show')
      backdrop.style.opacity = '0'
      setTimeout(() => {
        if (backdrop && backdrop.parentNode) {
          backdrop.parentNode.removeChild(backdrop)
        }
      }, 150)
    }
  }
}

const logout = () => {
  // Remove both the token and the stored user data
  localStorage.removeItem("token");
  localStorage.removeItem("adminUser");

  // Redirect to admin login page
  router.push({ name: "admin-login" });
};

// Close sidebar when clicking outside on mobile
const handleClickOutside = (event) => {
  const sidebar = document.getElementById('sidenav-main')
  const toggleButton = document.getElementById('iconNavbarSidenav')

  if (sidebar && sidebar.classList.contains('show')) {
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
      closeMobileSidebar()
    }
  }
}

// Consolidated onMounted hook
onMounted(async () => {
  // Fetch the username
  fetchUsername()

  // Add click outside listener
  document.addEventListener('click', handleClickOutside)

  // Initialize perfect scrollbar if available
  if (window.PerfectScrollbar) {
    const scrollbarElement = document.querySelector('#sidenav-scrollbar')
    if (scrollbarElement) {
      new window.PerfectScrollbar(scrollbarElement)
    }
  }

  // Initialize smooth scrollbar for Windows
  if (typeof window !== 'undefined') {
    const win = navigator.platform.indexOf('Win') > -1
    if (win && document.querySelector('#sidenav-scrollbar')) {
      const options = {
        damping: '0.5'
      }
      if (window.Scrollbar) {
        window.Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options)
      }
    }
  }

  // Fetch website info
  try {
    const res = await api.get('v1/website-info')
    const info = res.data?.data

    if (info) {
      logoUrl.value = info.logo || ''
      faviconUrl.value = info.favicon || ''

      updateWebsiteMeta({
        title: `Admin - ${info.websiteName || 'Dashboard'}`,
        logo: info.titleLogo || '/favicon.ico'
      })
    }
  } catch (error) {
    console.error('Error fetching website info:', error)
  }
})

onUnmounted(() => {
  // Remove event listeners
  document.removeEventListener('click', handleClickOutside)

  // Clean up backdrop if it exists
  const backdrop = document.querySelector('.sidenav-backdrop')
  if (backdrop && backdrop.parentNode) {
    backdrop.parentNode.removeChild(backdrop)
  }
})
</script>