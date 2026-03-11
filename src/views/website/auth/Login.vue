<template>
  <Navbar />

  <div class="login-page d-flex flex-column min-vh-85">
    <section class="flex-grow-1 d-flex align-items-center justify-content-center bg-info">
      <div class="container px-2 px-md-4">
        <div class="row align-items-center">
          <!-- Left branding (desktop only) -->
          <div class="col-lg-6 text-center text-lg-start mb-5 mb-lg-0 bg-info d-none d-lg-block">
            <img :src="websiteLogo" alt="Logo" class="mb-4 logo-img" />
            <h2 class="fw-bold mb-3">Welcome to {{ websiteName }}</h2>
            <p class="text-muted">
              Login to access your orders, and recommendations for your system.
            </p>
            <!-- <p class="mt-3">
              Don't have an account?
              <RouterLink to="/auth/register" class="text-success fw-semibold">
                Register here
              </RouterLink>
            </p> -->
          </div>

          <!-- Right card -->
          <div class="col-lg-5 ms-auto">
            <div class="card shadow-sm border-0 rounded-4 p-4">
              <h3 class="fw-bold mb-2 text-center">Log In</h3>
              <p class="text-muted text-center mb-4">Enter your credentials to continue</p>

              <!-- Alert -->
              <div v-if="alertMessage" :class="['alert', alertClass, 'alert-dismissible', 'fade', 'show']" role="alert">
                {{ alertMessage }}
                <button type="button" class="btn-close" @click="alertMessage = ''"></button>
              </div>

              <div class="bg-light2 mb-4 rounded-3 ">
                <!-- Login Method Tabs -->
                <ul class="nav nav-pills nav-fill login-tabs">
                  <li class="nav-item">
                    <button class="nav-link mb-0" :class="{ active: loginMethod === 'otp' }" @click="switchMethod('otp')">
                      Mobile OTP
                    </button>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link mb-0" :class="{ active: loginMethod === 'email' }"
                      @click="switchMethod('email')">
                      Email
                    </button>
                  </li>
                </ul>
              </div>

              <!-- ───────────────────────────────────── -->
              <!-- EMAIL / PASSWORD LOGIN -->
              <!-- ───────────────────────────────────── -->
              <form v-if="loginMethod === 'email'" @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label fw-semibold">Email</label>
                  <input type="email" id="email" v-model="email" class="form-control form-control-lg rounded-3 border"
                    placeholder="Enter your email" required />
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label fw-semibold">Password</label>
                  <input type="password" id="password" v-model="password"
                    class="form-control form-control-lg rounded-3 border" placeholder="Enter your password" required />
                </div>

                <div class="d-grid mt-3">
                  <button type="submit" class="btn btn-lg btn-dark rounded-3 shadow-sm mb-2" :disabled="loading">
                    <span v-if="loading">Logging in...</span>
                    <span v-else>Log In</span>
                  </button>
                </div>
              </form>

              <!-- ───────────────────────────────────── -->
              <!-- MOBILE OTP LOGIN -->
              <!-- ───────────────────────────────────── -->
              <div v-if="loginMethod === 'otp'">

                <!-- STEP 1: Enter Mobile Number -->
                <form v-if="otpStep === 1" @submit.prevent="sendOtp">
                  <div class="mb-3">
                    <label for="mobile" class="form-label fw-semibold">Mobile Number</label>
                    <div class="input-group input-group-lg">
                      <span class="input-group-text rounded-start-3">+91</span>
                      <input type="tel" id="mobile" v-model="mobile" class="form-control rounded-end-3 border"
                        placeholder="Enter 10-digit mobile number" maxlength="10" pattern="[0-9]{10}" required />
                    </div>
                    <div class="form-text">We'll send a one-time password to this number.</div>
                  </div>

                  <div class="d-grid mt-3">
                    <button type="submit" class="btn btn-lg btn-dark rounded-3 shadow-sm mb-2" :disabled="loading">
                      <span v-if="loading">Sending OTP...</span>
                      <span v-else>Send OTP</span>
                    </button>
                  </div>
                </form>

                <!-- STEP 2: Enter OTP -->
                <form v-if="otpStep === 2" @submit.prevent="verifyOtp">
                  <div class="mb-3">
                    <label class="form-label fw-semibold">
                      OTP sent to +91 {{ mobile }}
                      <button type="button" class="btn btn-link btn-sm text-success p-0 ms-2" @click="otpStep = 1">
                        Change
                      </button>
                    </label>

                    <!-- OTP Boxes -->
                    <div class="d-flex gap-2 justify-content-between mt-2">
                      <input v-for="(digit, index) in otpDigits" :key="index" type="text" inputmode="numeric"
                        maxlength="1" :ref="el => otpInputs[index] = el" v-model="otpDigits[index]"
                        class="form-control otp-box text-center fw-bold fs-4 rounded-3" @input="onOtpInput(index)"
                        @keydown.backspace="onOtpBackspace(index)" @paste.prevent="onOtpPaste($event)" />
                    </div>
                  </div>

                  <!-- Resend OTP -->
                  <div class="text-center mb-3">
                    <span v-if="resendTimer > 0" class="text-muted small">
                      Resend OTP in {{ resendTimer }}s
                    </span>
                    <button v-else type="button" class="btn btn-link btn-sm text-success p-0" @click="resendOtp"
                      :disabled="loading">
                      Resend OTP
                    </button>
                  </div>

                  <div class="d-grid">
                    <button type="submit" class="btn btn-lg btn-dark rounded-3 shadow-sm mb-2"
                      :disabled="loading || otpDigits.join('').length < 6">
                      <span v-if="loading">Verifying...</span>
                      <span v-else>Verify & Login</span>
                    </button>
                  </div>
                </form>

              </div>
              <!-- END OTP SECTION -->

              <p class="mt-3  ">
                Don't have an account?
                <RouterLink to="/auth/register" class="text-success fw-semibold">
                  Register here
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AuthFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { websiteApi } from "@/services/api";
import Navbar from "@/views/components/website/Navbar.vue";
import AuthFooter from "@/views/components/website/AuthFooter.vue";
import emitter from "@/utils/emitter.js";

const router = useRouter();
const route = useRoute();

// ── Shared ────────────────────────────────────────────────────────────────────
const loading = ref(false);
const websiteName = ref("");
const websiteLogo = ref("");
const alertMessage = ref("");
const alertClass = ref("alert-info");
const loginMethod = ref("email"); // 'email' | 'otp'

// ── Email login ───────────────────────────────────────────────────────────────
const email = ref("");
const password = ref("");

// ── OTP login ─────────────────────────────────────────────────────────────────
const mobile = ref("");
const otpStep = ref(1);          // 1 = enter mobile, 2 = enter OTP
const otpDigits = ref(["", "", "", "", "", ""]);
const otpInputs = ref([]);       // DOM refs for each OTP box
const resendTimer = ref(0);
let timerInterval = null;

// ── Alert helpers ─────────────────────────────────────────────────────────────
const showAlert = (message, type = "info") => {
  alertMessage.value = message;
  alertClass.value = `alert-${type}`;
  setTimeout(() => { alertMessage.value = ""; }, 4000);
};

// ── Switch login method ───────────────────────────────────────────────────────
const switchMethod = (method) => {
  loginMethod.value = method;
  alertMessage.value = "";
  resetOtp();
};

// ── Fetch website info ────────────────────────────────────────────────────────
const fetchWebsiteInfo = async () => {
  try {
    const response = await websiteApi.get("v1/website-info");
    if (response.data?.data) {
      websiteName.value = response.data.data.websiteName;
      websiteLogo.value = response.data.data.logo;
    }
  } catch (error) {
    console.error("Failed to fetch website info:", error);
  }
};

// ── Email login handler ───────────────────────────────────────────────────────
const handleLogin = async () => {
  if (!email.value || !password.value) {
    showAlert("Please enter email and password", "warning");
    return;
  }
  loading.value = true;
  try {
    const response = await websiteApi.post("v1/user/login", {
      username: email.value,
      password: password.value,
    });
    if (response.data.status) {
      const userData = response.data.data;
      localStorage.setItem("website_user_token", userData.token);
      localStorage.setItem("website_user", JSON.stringify(userData.user));
      localStorage.setItem("website_user_token_saved_at", Date.now().toString());
      emitter.emit("user-logged-in");
      showAlert("Login successful! Redirecting...", "success");
      setTimeout(() => router.push(route.query.redirect || "/cart"), 1500);
    } else {
      showAlert(response.data.message || "Login failed", "danger");
    }
  } catch (error) {
    const msg = error.response?.data?.message || "Invalid credentials. Please try again.";
    showAlert(msg, "danger");
  } finally {
    loading.value = false;
  }
};

// ── OTP: Send OTP ─────────────────────────────────────────────────────────────
const sendOtp = async () => {
  if (mobile.value.length !== 10) {
    showAlert("Please enter a valid 10-digit mobile number", "warning");
    return;
  }
  loading.value = true;
  try {
    const response = await websiteApi.post("v1/user/send-otp", {
      mobile: mobile.value,
    });
    if (response.data.status) {
      otpStep.value = 2;
      startResendTimer();
      showAlert("OTP sent successfully!", "success");
    } else {
      showAlert(response.data.message || "Failed to send OTP", "danger");
    }
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to send OTP. Try again.";
    showAlert(msg, "danger");
  } finally {
    loading.value = false;
  }
};

// ── OTP: Verify OTP ───────────────────────────────────────────────────────────
const verifyOtp = async () => {
  const otp = otpDigits.value.join("");
  if (otp.length < 6) {
    showAlert("Please enter the 6-digit OTP", "warning");
    return;
  }
  loading.value = true;
  try {
    const response = await websiteApi.post("v1/user/verify-otp", {
      mobile: mobile.value,
      otp: otp,
    });
    if (response.data.status) {
      const userData = response.data.data;
      localStorage.setItem("website_user_token", userData.token);
      localStorage.setItem("website_user", JSON.stringify(userData.user));
      localStorage.setItem("website_user_token_saved_at", Date.now().toString());
      emitter.emit("user-logged-in");
      showAlert("Login successful! Redirecting...", "success");
      setTimeout(() => router.push(route.query.redirect || "/cart"), 1500);
    } else {
      showAlert(response.data.message || "Invalid OTP. Please try again.", "danger");
    }
  } catch (error) {
    const msg = error.response?.data?.message || "OTP verification failed.";
    showAlert(msg, "danger");
  } finally {
    loading.value = false;
  }
};

// ── OTP: Resend OTP ───────────────────────────────────────────────────────────
const resendOtp = async () => {
  resetOtpDigits();
  await sendOtp();
};

// ── OTP: Timer ────────────────────────────────────────────────────────────────
const startResendTimer = () => {
  resendTimer.value = 30;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    resendTimer.value--;
    if (resendTimer.value <= 0) clearInterval(timerInterval);
  }, 1000);
};

// ── OTP Box: handle input ─────────────────────────────────────────────────────
const onOtpInput = (index) => {
  // Allow only digits
  otpDigits.value[index] = otpDigits.value[index].replace(/\D/g, "");
  if (otpDigits.value[index] && index < 5) {
    otpInputs.value[index + 1]?.focus();
  }
};

const onOtpBackspace = (index) => {
  if (!otpDigits.value[index] && index > 0) {
    otpDigits.value[index - 1] = "";
    otpInputs.value[index - 1]?.focus();
  }
};

const onOtpPaste = (event) => {
  const pasted = (event.clipboardData || window.clipboardData).getData("text");
  const digits = pasted.replace(/\D/g, "").slice(0, 6).split("");
  digits.forEach((d, i) => { otpDigits.value[i] = d; });
  const nextEmpty = digits.length < 6 ? digits.length : 5;
  otpInputs.value[nextEmpty]?.focus();
};

// ── OTP: Reset helpers ────────────────────────────────────────────────────────
const resetOtpDigits = () => {
  otpDigits.value = ["", "", "", "", "", ""];
};

const resetOtp = () => {
  mobile.value = "";
  otpStep.value = 1;
  resetOtpDigits();
  resendTimer.value = 0;
  clearInterval(timerInterval);
};

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(() => { fetchWebsiteInfo(); });
onUnmounted(() => { clearInterval(timerInterval); });

defineOptions({ name: "LoginPage" });
</script>

<style scoped>
.login-page {
  font-family: "Inter", sans-serif;
}

.logo-img {
  max-width: 320px;
  border-radius: 12px;
}

/* Tab pills */
.login-tabs .nav-link {
  border-radius: 10px;
  color: #555;
  font-weight: 500;
  transition: all 0.2s;
}

.login-tabs .nav-link.active {
  background-color: #212529;
  color: #fff;
}

/* OTP input boxes */
.otp-box {
  width: 48px;
  height: 56px;
  border: 2px solid #dee2e6;
  transition: border-color 0.2s;
}

.otp-box:focus {
  border-color: #212529;
  box-shadow: 0 0 0 0.2rem rgba(33, 37, 41, 0.15);
  outline: none;
}
</style>