<template>
  <section class="register-section">
    <div class="page-header min-vh-100">
      <div class="container">
        <div class="row">
          <!-- Register Card -->
          <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
            <div class="card card-plain">
              <div class="card-header pb-0 text-start">
                <h4 class="font-weight-bolder">Create Admin Login</h4>
                <p class="mb-0">Enter the security code to continue</p>
              </div>
              <div class="card-body">
                
                <!-- Step 1: Security Code -->
                <div v-if="!isCodeVerified">
                  <div class="mb-3">
                    <input
                      type="text"
                      v-model="securityCodeInput"
                      class="form-control form-control-lg"
                      placeholder="Enter Security Code"
                      aria-label="Security Code"
                      required
                    />
                  </div>
                  <div class="text-center">
                    <button @click="checkSecurityCode" class="btn btn-lg btn-primary w-100 mt-4 mb-0">
                      Verify Code
                    </button>
                  </div>
                  <p v-if="errorMsg" class="text-danger mt-2 text-sm">{{ errorMsg }}</p>
                </div>

                <!-- Step 2: Registration Form -->
                <form v-else @submit.prevent="handleRegister">
                  <!-- Full Name -->
                  <div class="mb-3">
                    <input 
                      type="text" 
                      v-model="name" 
                      class="form-control form-control-lg" 
                      :class="{ 'is-invalid': errors.name }"
                      placeholder="Full Name"
                      aria-label="Full Name" 
                      required 
                    />
                    <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
                  </div>

                  <!-- Username -->
                  <div class="mb-3">
                    <input 
                      type="text" 
                      v-model="username" 
                      class="form-control form-control-lg" 
                      :class="{ 'is-invalid': errors.username }"
                      placeholder="User Name"
                      aria-label="User Name" 
                      required 
                    />
                    <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
                  </div>

                  <!-- Password -->
                  <div class="mb-3">
                    <input 
                      type="password" 
                      v-model="password" 
                      class="form-control form-control-lg"
                      :class="{ 'is-invalid': errors.password }"
                      placeholder="Password" 
                      aria-label="Password" 
                      required 
                    />
                    <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
                  </div>

                  <!-- General Error Message -->
                  <div v-if="generalError" class="alert alert-danger" role="alert">
                    {{ generalError }}
                  </div>

                  <!-- Success Message -->
                  <div v-if="successMsg" class="alert alert-success" role="alert">
                    {{ successMsg }}
                  </div>

                  <!-- Submit -->
                  <div class="text-center">
                    <button 
                      type="submit" 
                      class="btn btn-lg btn-primary w-100 mt-4 mb-0"
                      :disabled="isLoading"
                    >
                      <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                      {{ isLoading ? 'Creating...' : 'Create Admin' }}
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
                backgroundImage: `url(${logo})`,
                backgroundSize: 'cover'
              }"><span class="mask"></span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";

const logo = new URL("@/assets/website/img/logo/logo.jpg", import.meta.url).href;
const router = useRouter();

// form fields
const name = ref("");
const username = ref("");
const password = ref("");

// security code
const securityCode = "12345"; // static code (should be moved to backend)
const securityCodeInput = ref("");
const isCodeVerified = ref(false);

// error handling
const errorMsg = ref("");
const errors = ref({});
const generalError = ref("");
const successMsg = ref("");
const isLoading = ref(false);

// check security code
const checkSecurityCode = () => {
  if (securityCodeInput.value === securityCode) {
    isCodeVerified.value = true;
    errorMsg.value = "";
  } else {
    errorMsg.value = "Invalid security code. Please try again.";
  }
};

// clear all errors
const clearErrors = () => {
  errors.value = {};
  generalError.value = "";
  successMsg.value = "";
};

// handle registration

const handleRegister = async () => {
  try {
    const { data } = await api.post("v1/admin/creation/secret", {
      admin_name: name.value,
      username: username.value,
      password: password.value,
    });

    // ✅ More flexible success check
    if (data.success || data.message?.includes("successfully")) {
      alert("Admin created successfully!");
      router.push({ name: "admin-login" });
    } else {
      alert("Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    
    // ✅ Check if it's actually successful despite error status
    if (error.response?.data?.success || 
        error.response?.data?.message?.includes("successfully")) {
      alert("Admin created successfully!");
      router.push({ name: "admin-login" });
      return;
    }
    
    // ✅ Show actual error message
    if (error.response?.data) {
      const errorMsg = error.response.data.message || 
                       error.response.data.errors?.username?.[0] ||
                       "Registration failed";
      alert(`Error: ${errorMsg}`);
    } else {
      alert("Network error!");
    }
  }
};



// handle registration2  
// const handleRegister = async () => {
//   clearErrors();
//   isLoading.value = true;

//   try {
//     const { data } = await api.post("/v1/admin/creation/secret", {
//       admin_name: name.value,
//       username: username.value,
//       password: password.value,
//     });

//     // Check if registration was successful
//     if (data.success || data.message === "Admin created successfully") {
//       successMsg.value = "Admin created successfully! Redirecting...";
      
//       // Clear form
//       name.value = "";
//       username.value = "";
//       password.value = "";
      
//       // Redirect after 2 seconds
//       setTimeout(() => {
//         router.push({ name: "admin-login" });
//       }, 2000);
//     } else {
//       generalError.value = data.message || "Registration failed. Please try again.";
//     }
//   } catch (error) {
//     console.error("Registration Error:", error);
//     console.log("Full error response:", error.response?.data);

//     if (error.response) {
//       const { status, data } = error.response;

//       // 👇 CHECK IF IT'S ACTUALLY A SUCCESS despite 422 status
//       if (data.success === true || data.message?.includes("successfully")) {
//         successMsg.value = "Admin created successfully! Redirecting...";
        
//         // Clear form
//         name.value = "";
//         username.value = "";
//         password.value = "";
        
//         setTimeout(() => {
//           router.push({ name: "admin-login" });
//         }, 2000);
//         return;
//       }

//       // Handle 422 validation errors
//       if (status === 422 && data.errors) {
//         // Display field-specific errors
//         errors.value = {
//           name: data.errors.admin_name?.[0] || "",
//           username: data.errors.username?.[0] || "",
//           password: data.errors.password?.[0] || "",
//         };
        
//         // If there's a general message too
//         if (data.message && !Object.keys(data.errors).length) {
//           generalError.value = data.message;
//         }
//       } 
//       // Handle other errors
//       else if (data.message) {
//         generalError.value = data.message;
//       } else {
//         generalError.value = `Error ${status}: Something went wrong.`;
//       }
//     } else if (error.request) {
//       // Network error
//       generalError.value = "Network error. Please check your connection.";
//     } else {
//       // Other errors
//       generalError.value = "An unexpected error occurred.";
//     }
//   } finally {
//     isLoading.value = false;
//   }
// };
</script>

<style scoped>
.invalid-feedback {
  display: block;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15em;
}
</style>