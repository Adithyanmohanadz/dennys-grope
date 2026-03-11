<template>
  <aside
    class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4"
    id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none"
        aria-hidden="true" id="iconSidenav" @click="closeSidebar"></i>
      <router-link to="/admin/dashboard" class="navbar-brand m-0">
        <img :src="websiteLogo || defaultLogo" class="navbar-brand-img h-100" alt="main_logo">
      </router-link>
    </div>

    <hr class="horizontal dark mt-0">

    <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav" id="sidenav-scrollbar">
        <li v-for="item in navigationItems" :key="item.name" class="nav-item">
          <router-link :to="item.path" class="nav-link" :class="{ active: isActiveRoute(item.routeName) }"
            @click="handleNavClick">
            <div
              class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i :class="`${item.icon} text-dark text-sm opacity-10`"></i>
            </div>
            <span class="nav-link-text ms-1">{{ item.name }}</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a class="nav-link" :class="{ active: isVrOpen }" @click.prevent="toggleVrDropdown" href="#">
            <div
              class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i class="fa fa-layer-group text-dark text-sm opacity-10"></i>
            </div>
            <span class="nav-link-text ms-1">
              Select Option <b class="caret"></b>
            </span>
            <i class="fa fa-chevron-down text-dark text-xs ms-auto" :class="{ 'rotate-up': isVrOpen }"></i>
          </a>

          <div class="collapse" :class="{ show: isVrOpen }" id="vrExamples">
            <ul class="nav nav-sm flex-column">
              <!-- <li class="nav-item">
                <router-link class="nav-link" to="/admin/item-brand" active-class="active" exact-active-class="active">
                  <span class="sidenav-normal">Item Brands</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/item-category" active-class="active">
                  <span class="sidenav-normal">Item Categories</span>
                </router-link>
              </li> -->
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/category" active-class="active">
                  <span class="sidenav-normal">Category</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/variant-type" active-class="active">
                  <span class="sidenav-normal">Variant Type</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/variant" active-class="active">
                  <span class="sidenav-normal">Variant</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/item-gst" active-class="active">
                  <span class="sidenav-normal">GST Type</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/state" active-class="active">
                  <span class="sidenav-normal">State</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/city" active-class="active">
                  <span class="sidenav-normal">City</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/enquiry-type" active-class="active">
                  <span class="sidenav-normal">Enquiry Type</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>


      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "@/services/api";
import localFallbackLogo from "@/assets/website/img/logo/logo.jpg";

const route = useRoute();
const isVrOpen = ref(false);
const websiteLogo = ref("");

const toggleVrDropdown = () => {
  isVrOpen.value = !isVrOpen.value;
};

// Fetch logo from API
const getWebsiteInfo = async () => {
  try {
    const response = await api.get("v1/website-info");
    // Path: response.data.data.logo based on your JSON
    if (response.data && response.data.data) {
      websiteLogo.value = response.data.data.logo;
    }
  } catch (error) {
    console.error("Failed to load website info:", error);
  }
};

onMounted(() => {
  getWebsiteInfo();
});

const navigationItems = ref([
  {
    name: "Dashboard",
    routeName: "admin-dashboard",
    path: "/admin/dashboard",
    icon: "fa fa-tachometer-alt",
  },
  {
    name: "Web Info",
    routeName: "admin-info",
    path: "/admin/info",
    icon: "fa fa-circle-info",
  },
  {
    name: "Item",
    routeName: ["admin-item-list", "admin-item-add"],
    path: "/admin/item-list",
    icon: "fa fa-list",
  },
  {
    name: "Users",
    routeName: ["admin-user-list", "admin-user-creation", "admin-user-edit", "admin-user-wholesale-list", "admin-user-wholesale-edit", "admin-user-wholesale-view"],
    path: "/admin/user-list",
    icon: "fa fa-user",
  },
  {
    name: "Order",
    routeName: ["admin-orders-list", "admin-order-details"],
    path: "/admin/orders-list",
    icon: "fa fa-shopping-cart",
  },
  // {
  //   name: "Cart Order",
  //   routeName: ["admin-cartorders-list", "admin-cartorder-details"],
  //   path: "/admin/cartorders-list",
  //   icon: "fa fa-shopping-cart",
  // },
  {
    name: "Enquiry",
    routeName: "admin-enquiry-list",
    path: "/admin/enquiry-list",
    icon: "fa fa-handshake",
  },
  {
    name: "Contact",
    routeName: "admin-contact-list",
    path: "/admin/contact-list",
    icon: "fa fa-phone"
  }
]);

const isActiveRoute = (routeName) => {
  if (Array.isArray(routeName)) {
    return routeName.includes(route.name);
  }
  return route.name === routeName;
};

const closeSidebar = () => {
  const sidebar = document.getElementById("sidenav-main");
  const body = document.body;
  if (sidebar) {
    sidebar.classList.remove("show", "d-block");
    body.classList.remove("g-sidenav-show", "g-sidenav-pinned");
    const backdrop = document.querySelector(".sidenav-backdrop");
    if (backdrop) {
      backdrop.classList.remove("show");
      backdrop.style.opacity = "0";
      setTimeout(() => {
        if (backdrop && backdrop.parentNode) {
          backdrop.parentNode.removeChild(backdrop);
        }
      }, 150);
    }
  }
};

const handleNavClick = () => {
  if (window.innerWidth < 1200) {
    setTimeout(() => {
      closeSidebar();
    }, 100);
  }
};

watch(
  () => route.path,
  (newPath) => {
    const dropdownRoutes = [
      "/admin/item-brand",
      "/admin/item-category",
      "/admin/category",
      "/admin/variant-type",
      "/admin/variant",
      "/admin/item-gst",
      "/admin/state",
      "/admin/city",
      "/admin/enquiry-type"
    ];
    isVrOpen.value = dropdownRoutes.includes(newPath);
  },
  { immediate: true }
);
</script>

<style scoped>
.fa-chevron-down {
  transition: transform 0.3s ease;
}

.rotate-up {
  transform: rotate(180deg);
}
</style>