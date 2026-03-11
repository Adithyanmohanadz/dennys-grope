import { createRouter, createWebHistory } from "vue-router";

// Static imports for critical layouts (faster initial render)
import WebsiteLayout from "@/views/layouts/WebsiteLayout.vue";
import AdminLayout from "@/views/layouts/AdminLayout.vue";
import WebsiteAuthLayout from "@/views/layouts/auth/WebsiteAuthLayout.vue";
import AdminAuthLayout from "@/views/layouts/auth/AdminAuthLayout.vue";

const router = createRouter({
  history: createWebHistory("/dennys-group/"),
  routes: [
    // Website Routes
    {
      path: "/",
      component: WebsiteLayout,
      children: [
        {
          path: "",
          name: "home",
          component: () => import(/* webpackChunkName: "home" */ "@/views/website/Home.vue"),
        },
        {
          path: "about",
          name: "About Us",
          component: () => import(/* webpackChunkName: "about" */ "@/views/website/About.vue"),
        },
        {
          path: "shop",
          name: "Shop",
          component: () =>
            import(
              /* webpackChunkName: "shop" */
              /* webpackPrefetch: true */
              "@/views/website/Shop.vue"
            ),
        },
        {
          path: "wholesale-registration",
          name: "wholesale-registration",
          component: () =>
            import(
              /* webpackChunkName: "wholesale-registration" */ "@/views/website/WholesaleRegistrationPage.vue"
            ),
        },
        {
          path: "product/:id",
          name: "Product",
          component: () => import(/* webpackChunkName: "product" */ "@/views/website/Product.vue"),
        },
        {
          path: "contact",
          name: "Contact",
          component: () => import(/* webpackChunkName: "contact" */ "@/views/website/Contact.vue"),
        },
        {
          path: "business-enquiry",
          name: "Enquiry",
          component: () => import(/* webpackChunkName: "enquiry" */ "@/views/website/Enquiry.vue"),
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import(/* webpackChunkName: "profile" */ "@/views/website/Profile.vue"),
        },
        {
          path: "orderview",
          name: "Order View",
          component: () =>
            import(/* webpackChunkName: "orderview" */ "@/views/website/Orderview.vue"),
        },
        {
          path: "cart",
          name: "Cart",
          component: () =>
            import(
              /* webpackChunkName: "cart" */
              /* webpackPrefetch: true */
              "@/views/website/Cart.vue"
            ),
        },
        {
          path: "faq",
          name: "FAQ",
          component: () => import(/* webpackChunkName: "faq" */ "@/views/website/FAQ.vue"),
        },
        {
          path: "terms-conditions",
          name: "Terms & Conditions",
          component: () =>
            import(/* webpackChunkName: "terms" */ "@/views/website/TermsConditions.vue"),
        },
        {
          path: "privacy-policy",
          name: "Privacy Policy",
          component: () =>
            import(/* webpackChunkName: "privacy" */ "@/views/website/PrivacyPolicy.vue"),
        },
        {
          path: "shipping-policy",
          name: "Shipping Policy",
          component: () =>
            import(/* webpackChunkName: "shipping" */ "@/views/website/ShippingPolicy.vue"),
        },
        {
          path: "returns-refunds",
          name: "Returns & Refunds",
          component: () =>
            import(/* webpackChunkName: "refunds" */ "@/views/website/ReturnsRefunds.vue"),
        },
        {
          path: "estimate/:id",
          name: "Invoice",
          component: () =>
            import(/* webpackChunkName: "invoice" */ "@/views/website/invoice/Invoice.vue"),
        },
        {
          path: "coffeespices",
          name: "Coffees & Spices",
          component: () =>
            import(/* webpackChunkName: "coffeespices" */ "@/views/website/Coffeespices.vue"),
        },
        {
          path: "flourmill",
          name: "Flour Mill",
          component: () =>
            import(/* webpackChunkName: "flourmill" */ "@/views/website/Flourmill.vue"),
        },
        {
          path: "fly4tour",
          name: "Fly4Tour",
          component: () =>
            import(/* webpackChunkName: "fly4tour" */ "@/views/website/Fly4tour.vue"),
        },
        {
          path: "fly4study",
          name: "Fly4Study",
          component: () =>
            import(/* webpackChunkName: "fly4study" */ "@/views/website/Fly4study.vue"),
        },
        {
          path: "dennysspicehub",
          name: "Denny's Spice Hub",
          component: () =>
            import(/* webpackChunkName: "dennysspicehub" */ "@/views/website/Dennysspicehub.vue"),
        },
      ],
    },

    // Website Auth Routes
    {
      path: "/auth",
      component: WebsiteAuthLayout,
      children: [
        {
          path: "login",
          name: "Login",
          component: () =>
            import(/* webpackChunkName: "auth-login" */ "@/views/website/auth/Login.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "auth-register" */ "@/views/website/auth/Register.vue"),
        },
      ],
    },

    // Admin Auth Routes
    {
      path: "/admin",
      component: AdminAuthLayout,
      children: [
        {
          path: "",
          name: "admin-login",
          component: () =>
            import(/* webpackChunkName: "admin-auth" */ "@/views/admin/auth/Login.vue"),
        },
        {
          path: "login",
          name: "admin-login2",
          component: () =>
            import(/* webpackChunkName: "admin-auth" */ "@/views/admin/auth/Login.vue"),
        },
        {
          path: "adminlogincreation",
          name: "admin-login-creation",
          component: () =>
            import(/* webpackChunkName: "admin-auth" */ "@/views/admin/auth/LoginCreation.vue"),
        },
      ],
    },

    // Admin Protected Routes
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: () =>
            import(/* webpackChunkName: "admin-dashboard" */ "@/views/admin/Dashboard.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "info",
          name: "admin-info",
          component: () => import(/* webpackChunkName: "admin-info" */ "@/views/admin/Info.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "item-list",
          name: "admin-item-list",
          component: () =>
            import(/* webpackChunkName: "admin-items" */ "@/views/admin/ItemList.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "item-add",
          name: "admin-item-add",
          component: () =>
            import(/* webpackChunkName: "admin-items" */ "@/views/admin/ItemAdd.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "item-edit/:id",
          name: "admin-item-edit",
          component: () =>
            import(/* webpackChunkName: "admin-items" */ "@/views/admin/ItemEdit.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "user-list",
          name: "admin-user-list",
          component: () =>
            import(/* webpackChunkName: "admin-users" */ "@/views/admin/UserList.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "user-creation",
          name: "admin-user-creation",
          component: () =>
            import(/* webpackChunkName: "admin-users" */ "@/views/admin/UserCreation.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "user-edit/:id",
          name: "admin-user-edit",
          component: () =>
            import(/* webpackChunkName: "admin-users" */ "@/views/admin/UserEdit.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "user-wholesale-list",
          name: "admin-user-wholesale-list",
          component: () =>
            import(/* webpackChunkName: "admin-users" */ "@/views/admin/UserWholesaleList.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "user-wholesale-view/:id",
          name: "admin-user-wholesale-view",
          component: () =>
            import(/* webpackChunkName: "admin-users" */ "@/views/admin/UserWholesaleView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "orders-list",
          name: "admin-orders-list",
          component: () =>
            import(/* webpackChunkName: "admin-orders" */ "@/views/admin/OrdersList.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "order-details/:id",
          name: "admin-order-details",
          component: () =>
            import(/* webpackChunkName: "admin-orders" */ "@/views/admin/OrderDetails.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "cartorders-list",
          name: "admin-cartorders-list",
          component: () =>
            import(/* webpackChunkName: "admin-orders" */ "@/views/admin/CartOrdersList.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "enquiry-list",
          name: "admin-enquiry-list",
          component: () =>
            import(/* webpackChunkName: "admin-enquiry" */ "@/views/admin/EnquiryList.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "contact-list",
          name: "admin-contact-list",
          component: () =>
            import(/* webpackChunkName: "admin-contact" */ "@/views/admin/ContactList.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "item-brand",
          name: "admin-item-brand",
          component: () =>
            import(/* webpackChunkName: "admin-settings" */ "@/views/admin/ItemBrand.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "item-category",
          name: "admin-item-category",
          component: () =>
            import(/* webpackChunkName: "admin-settings" */ "@/views/admin/ItemCategory.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "item-gst",
          name: "admin-item-gst",
          component: () =>
            import(/* webpackChunkName: "admin-settings" */ "@/views/admin/ItemGST.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "state",
          name: "admin-state",
          component: () =>
            import(/* webpackChunkName: "admin-settings" */ "@/views/admin/State.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "city",
          name: "admin-city",
          component: () =>
            import(/* webpackChunkName: "admin-settings" */ "@/views/admin/City.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "enquiry-type",
          name: "admin-enquiry-type",
          component: () =>
            import(/* webpackChunkName: "admin-settings" */ "@/views/admin/EnquiryType.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "invoice/:id",
          name: "admin-invoice",
          component: () =>
            import(/* webpackChunkName: "admin-invoice" */ "@/views/admin/invoice/Invoice.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "category",
          name: "admin-category",
          component: () =>
            import(/* webpackChunkName: "admin-category" */ "@/views/admin/Category.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "variant-type",
          name: "admin-variant-type",
          component: () =>
            import(/* webpackChunkName: "admin-variant-type" */ "@/views/admin/VariantType.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "variant",
          name: "admin-variant",
          component: () =>
            import(/* webpackChunkName: "admin-variants" */ "@/views/admin/Variant.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },

    // 404 Catch-all
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () =>
        import(/* webpackChunkName: "not-found" */ "@/views/components/404/NotFound.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, left: 0 };
  },
});

// Auth guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next({ name: "admin-login" });
  } else {
    next();
  }
});

// Handle chunk load errors (e.g., after deployments)
router.onError((error) => {
  if (/ChunkLoadError|Loading chunk \d+ failed/.test(error.message)) {
    // Chunk failed to load - likely due to new deployment
    // Reload the page to get fresh chunks
    window.location.reload();
  }
});

export default router;
