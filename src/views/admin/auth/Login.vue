<template>
  <section class="login-section">
    <div class="page-header min-vh-100">
      <div class="container">
        <div class="row">
          <!-- Login Card -->
          <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
            <div class="card card-plain">
              <div class="card-header pb-0 text-start">
                <h4 class="font-weight-bolder">LogIn</h4>
                <p class="mb-0">Enter your User and password to sign in</p>
              </div>
              <div class="card-body">
                <form @submit.prevent="handleLogin">
                  <div class="mb-3">
                    <input type="text" v-model="username" class="form-control form-control-lg" placeholder="User Name"
                      aria-label="User Name" />
                  </div>
                  <div class="mb-3">
                    <input type="password" v-model="password" class="form-control form-control-lg"
                      placeholder="Password" aria-label="Password" />
                  </div>

                  <!-- Error Message -->
                  <div v-if="errorMessage" class="alert alert-danger text-white mb-0" role="alert">
                    {{ errorMessage }}
                  </div>

                  <div class="text-center">
                    <button type="submit" class="btn btn-lg btn-primary w-100 mt-4 mb-0">
                      LogIn
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Right Side Image -->
          <div
            class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
            <div
              class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
              :style="{
                // Use titleLogoUrl.value here. Use a fallback if titleLogoUrl is empty.
                backgroundImage: `url(${titleLogoUrl || 'fallback-image-url.jpg'})`,
                backgroundSize: 'cover'
              }"><span class="mask"></span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api"; // axios helper

// Remove the local logo import as we will fetch the image dynamically
// const logo = new URL("@/assets/website/img/logo/logo.jpg", import.meta.url).href;

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const titleLogoUrl = ref(""); // New ref to store the dynamic image URL

/**
 * Fetches the website info, specifically the titleLogo URL.
 */
const fetchWebsiteInfo = async () => {
  try {
    const { data } = await api.get("v1/website-info");
    if (data.data?.titleLogo) {
      titleLogoUrl.value = data.data.titleLogo;
    }
  } catch (error) {
    console.error("Error fetching website info:", error);
    // You can set a fallback image or handle the error gracefully here
  }
};

/**
 * Handles the login submission.
 */
const handleLogin = async () => {
  errorMessage.value = ""; // reset error
  try {
    const { data } = await api.post("v1/admin/login", {
      username: username.value,
      password: password.value,
    });

    if (data.status && data.data?.token) {
      localStorage.setItem("token", data.data.token);
      if (data.data.admin) {
        localStorage.setItem("adminUser", JSON.stringify(data.data.admin));
      }
      router.push("/admin/dashboard");
    } else {
      errorMessage.value = data.message || "Invalid username or password.";
    }
  } catch (error) {
    console.error("Login error:", error);

    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = "Something went wrong. Please try again.";
    }
  }
};

// Call the fetchWebsiteInfo function when the component is mounted
onMounted(() => {
  fetchWebsiteInfo();
});
</script>
