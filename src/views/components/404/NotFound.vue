<template>
  <div class="d-flex align-items-center justify-content-center vh-100 error-container">
    <div class="text-center">
      
      <h1 class="display-1 fw-bold text-danger">404</h1>
      
      <p class="fs-3 text-dark"> 
        <span class="text-danger">Opps!</span> Page not found.
      </p>
      
      <p class="lead text-muted mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <router-link to="/" class="btn btn-primary btn-lg shadow-sm">
        <i class="fas fa-home me-2"></i> Go to Home
      </router-link>
      
      </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
// Optional: If you use FontAwesome, ensure the home icon is available.
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faHome } from '@fortawesome/free-solid-svg-icons'

onMounted(() => {
  document.title = "404 - Page Not Found";
});

// Optional: Define component name if needed for dev tools
// defineOptions({
//   name: 'NotFoundPage'
// });
</script>

<style scoped>
.error-container {
  background-color: #f8f9fa; /* Light grey background */
  font-family: 'Inter', sans-serif;
}

/* Custom styling for the error code to give it more impact */
.display-1 {
  font-size: 8rem; /* Adjust size for impact */
  /* Optional: Text shadow for depth */
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1); 
}

/* Custom button style for a bit more color pop */
.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
}

.fs-3 {
    font-weight: 600;
}
</style>