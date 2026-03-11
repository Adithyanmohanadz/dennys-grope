<template>
  <section style="background-color: #FFFFFF; border-radius: 1rem 1rem  0 0;">
    <div class="container">
      <!-- Top Navigation (Desktop/Tablet) -->
      <div class="row py-1">
        <div
          class="d-none d-md-flex justify-content-end justify-content-sm-between align-items-center bg-in fo rounded-pill">
          <nav class="main-menu d-flex navbar navbar-expand-lg w-100 justify-content-sm-between">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel">
              <div class="offcanvas-header justify-content-end">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>

              <div class="offcanvas-body" @click="closeOffcanvas">
                <ul
                  class="navbar-nav justify-content-end align-items-center menu-list list-unstyled d-flex gap-md-3 mb-0">
                  <li class="nav-item active">
                    <router-link to="/" class="nav-link fw-bold text-uppercase">Home</router-link>
                  </li>
                  <li class="nav-item  ">
                    <router-link to="/about" class="nav-link fw-bold text-uppercase">About Us</router-link>
                  </li>
                  <li class="nav-item dropdown user-dropdown">
                    <a class="nav-link dropdown-toggle fw-bold text-uppercase" href="#" role="button">
                      services
                    </a>
                    <div class="dropdown-menu-custom">
                      <router-link to="/coffeespices" class="dropdown-item-custom">
                        Coffee & Spices
                      </router-link> 
                    
                      <router-link to="/flourmill" class="dropdown-item-custom">
                        Flourmill
                      </router-link> 
                      <router-link to="/fly4tour" class="dropdown-item-custom">
                        Fly4tour
                      </router-link> 
                      <router-link to="/fly4study" class="dropdown-item-custom">
                        Fly4study
                      </router-link> 
                      <router-link to="/dennysspicehub" class="dropdown-item-custom">
                     Spice Hub & Cafe
                      </router-link> 

                    </div>
                  </li>
                  <li class="nav-item">
                    <router-link to="/business-enquiry" class="nav-link fw-bold text-uppercase">Business
                      Enquiry</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/shop"
                      class="nav-link fw-bolder text-uppercase bg-dan ger2 text-whi te px-4 py-1 rounded">Shop</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/contact" class="nav-link fw-bold text-uppercase">Contact Us</router-link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="">
              <div class="w-100">
                <!-- Show when NOT logged in -->
                <router-link v-if="!isLoggedIn" to="/auth/login">
                  <div class="text-end">
                    <p class="p-0 mb-0 text-xs">Hello, Sign in</p>
                    <h5 class="p-0 m-0">Account</h5>
                  </div>
                </router-link>

                <!-- Show when logged in -->
                <div v-else class="text-end cursor-pointer" @click="handleLogout">
                  <h5 class="p-0 m-0 text-capitalize">
                    <span>{{ userName }}</span>
                  </h5>
                  <p class="p-0 mb-0 text-xs">Sign Out</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <!-- Mobile Bottom Navigation -->
      <nav class="mobile-bottom-nav d-md-none">
        <router-link to="/" class="bottom-nav-item" :class="{ active: isActive('/') }">
          <i class="bi bi-house-door"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/shop" class="bottom-nav-item" :class="{ active: isActive('/shop') }">
          <i class="bi bi-shop"></i>
          <span>Shop</span>
        </router-link>
        <router-link to="/business-enquiry" class="bottom-nav-item" :class="{ active: isActive('/business-enquiry') }">
          <i class="bi bi-briefcase"></i>
          <span>Business</span>
        </router-link>
        <router-link to="/about" class="bottom-nav-item" :class="{ active: isActive('/about') }">
          <i class="bi bi-info-circle"></i>
          <span>About</span>
        </router-link>

        <!-- Mobile: Show Account or Sign Out -->
        <router-link v-if="!isLoggedIn" to="/auth/login" class="bottom-nav-item"
          :class="{ active: isActive('/auth/login') }">
          <i class="bi bi-person"></i>
          <span>Account</span>
        </router-link>
        <a v-else @click.prevent="handleLogout" class="bottom-nav-item">
          <i class="bi bi-box-arrow-right"></i>
          <span>Sign Out</span>
        </a>
      </nav>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Offcanvas } from "bootstrap";
import emitter from "@/utils/emitter.js";

const router = useRouter();
const route = useRoute();

const user = ref(null);

// Computed property to check if user is logged in
const isLoggedIn = computed(() => {
  return user.value !== null && localStorage.getItem("website_user_token");
});

// Get user name, with fallback
const userName = computed(() => {
  if (user.value && user.value.name) {
    // Return first name only
    return user.value.name.split(" ")[0];
  }
  return "User";
});

// Load user data from localStorage
function loadUserData() {
  const token = localStorage.getItem("website_user_token");
  const userData = localStorage.getItem("website_user");

  if (token && userData) {
    try {
      user.value = JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      user.value = null;
    }
  } else {
    user.value = null;
  }
}

// Logout function
function handleLogout() {
  if (confirm("Are you sure you want to sign out?")) {
    // Clear localStorage
    localStorage.removeItem("website_user_token");
    localStorage.removeItem("website_user");

    // Reset user state
    user.value = null;

    // Redirect to login page
    router.push("/auth/login");

    // Optional: Show success message
    setTimeout(() => {
      alert("You have been signed out successfully!");
    }, 100);
  }
}

function closeOffcanvas() {
  const offcanvasEl = document.getElementById("offcanvasNavbar");
  const bsOffcanvas = Offcanvas.getInstance(offcanvasEl);

  if (bsOffcanvas) {
    bsOffcanvas.hide();
  }

  setTimeout(() => {
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (backdrop) {
      backdrop.remove();
    }

    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.classList.remove("modal-open");
  }, 100);
}

function isActive(path) {
  return route.path === path;
}

// Load user data on component mount
onMounted(() => {
  loadUserData();
  window.addEventListener("storage", loadUserData);
  emitter.on("user-logged-in", loadUserData);
});

onUnmounted(() => {
  window.removeEventListener("storage", loadUserData);
  emitter.off("user-logged-in");
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #faf9f9;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 30px 30px 0 0;
}

.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #6c757d;
  font-size: 12px;
  padding: 4px 8px;
  transition: all 0.3s ease;
  min-width: 60px;
}

.bottom-nav-item i {
  font-size: 16px;
  margin-bottom: 0px;
}

.bottom-nav-item span {
  font-size: 10px;
  margin-bottom: 2px;
}

.bottom-nav-item.active {
  font-weight: 600;
  color: #0d6efd;
}

.bottom-nav-item:hover {
  color: #0d6efd;
}

/* Add padding to body to prevent content from hiding behind bottom nav */
@media (max-width: 767.98px) {
  body {
    padding-bottom: 60px;
  }
}

/* Pages Dropdown Styles - Same as user dropdown */
.nav-item.user-dropdown {
  position: relative;
}

.dropdown-menu-custom {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
  margin-top: 8px;
}

.nav-item.user-dropdown:hover .dropdown-menu-custom {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item-custom {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  text-decoration: none;
  color: #333;
  border: none;
  background: none;
  text-align: left;
  transition: background-color 0.2s ease;
}

.dropdown-item-custom:hover {
  background-color: #f8f9fa;
  color: #333;
  text-decoration: none;
}

.dropdown-menu-custom::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 20px;
  width: 12px;
  height: 12px;
  background: white;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  transform: rotate(45deg);
}

/* Make dropdown scrollable if too many items */
.dropdown-menu-custom {
  max-height: 400px;
  overflow-y: auto;
}

.dropdown-menu-custom::-webkit-scrollbar {
  width: 6px;
}

.dropdown-menu-custom::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.dropdown-menu-custom::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.dropdown-menu-custom::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.dropdown-menu {
  z-index: 1050 !important;
}
</style>
