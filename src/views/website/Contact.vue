<template>
  <section class="contact-us py-5" style="background-color: #f5f2ed;">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <h2 class="text-gradient text-dark fw-bolder mb-4 text-center">Get in Touch</h2>
          <p class="text-center text-muted mb-5">
            We’re here to help with any questions regarding our solar products, partnerships, or support
            needs.
          </p>

          <div class="card shadow-lg border-0">
            <div class="card-body p-md-5 p-3">
              <div class="row">
                <div class="col-lg-5 mb-4 mb-lg-0 bg-light p-4 rounded-3 shadow-sm">
                  <h5 class="fw-bolder text-primary mb-3">Our Office Details</h5>

                  <div v-if="isOfficeLoading" class="text-center text-muted">
                    <p>Loading contact info...</p>
                  </div>
                  <div v-else>
                    <div class="d-flex align-items-start mb-4">
                      <i class="fas fa-map-marker-alt text-lg text-primary me-3 mt-1"></i>
                      <div>
                        <h6 class="mb-0 fw-semibold text-dark">Address</h6>
                        <p class="text-sm text-muted mb-0" style="white-space: pre-wrap;">
                          {{ websiteInfo.address }}
                        </p>
                      </div>
                    </div>

                    <div class="d-flex align-items-start mb-4">
                      <i class="fas fa-phone-alt text-lg text-primary me-3 mt-1"></i>
                      <div>
                        <h6 class="mb-0 fw-semibold text-dark">Phone</h6>
                        <p class="text-sm text-muted mb-0">
                          {{ websiteInfo.phone }} (Main)
                        </p>
                        <p class="text-sm text-muted mb-0">
                          {{ websiteInfo.contactPerson.phone }} (Sales/Support)
                        </p>
                      </div>
                    </div>

                    <div class="d-flex align-items-start mb-4">
                      <i class="fas fa-envelope text-lg text-primary me-3 mt-1"></i>
                      <div>
                        <h6 class="mb-0 fw-semibold text-dark">Email</h6>
                        <p class="text-sm text-muted mb-0">{{ websiteInfo.email }}</p>
                      </div>
                    </div>
                  </div>

                  <h6 class="fw-bolder text-primary mt-4 mb-3">Operating Hours</h6>
                  <p class="text-sm text-muted mb-0">Monday - Friday: 9:00 AM to 7:00 PM IST</p>
                  <p class="text-sm text-muted mb-0">Saturday: 9:00 AM to 5:00 PM IST</p>
                </div>

                <div class="col-lg-7 ps-lg-5">
                  <h5 class="fw-bolder text-dark mb-4">Send Us a Message</h5>
                  <form @submit.prevent="submitForm"> 
                    <div class="mb-3">
                      <label for="name" class="form-label fw-semibold">Full Name</label>
                      <input type="text" id="name" v-model="form.name" class="form-control border"
                        placeholder="Enter your name" required>
                    </div>
                    <div class="mb-3">
                      <label for="number" class="form-label fw-semibold">Number</label>
                      <input type="tel" id="number" v-model="form.phone" class="form-control border"
                        placeholder="Enter your number" required>
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label fw-semibold">Email</label>
                      <input type="email" id="email" v-model="form.email" class="form-control border"
                        placeholder="Enter your email" required>
                    </div>
                    <div class="mb-3">
                      <label for="subject" class="form-label fw-semibold">Subject</label>
                      <input type="text" id="subject" v-model="form.subject" class="form-control border"
                        placeholder="Briefly state your query" required>
                    </div>
                    <div class="mb-4">
                      <label for="message" class="form-label fw-semibold">Your Message</label>
                      <textarea id="message" v-model="form.message" class="form-control border" rows="4"
                        placeholder="How can we help you?" required></textarea>
                    </div>

                    <button type="submit" :disabled="isSubmitting"
                      class="btn bg-gradient-dark btn-lg w-100 mt-2 text-white">
                      <i class="fas fa-paper-plane me-2"></i> {{ isSubmitting ? 'Sending...' :
                        'Send Message' }}
                    </button> 
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { websiteApi } from "@/services/api"; // axios helper
// 1. Import useToast
import { useToast } from 'vue-toastification';

defineOptions({
  name: 'ContactUsPage'
});

// 2. Initialize Toast
const toast = useToast();

// --- Toast Helper ---
/**
 * Shows a toast notification using Vue Toastification
 * @param {string} message - The message to display (can contain HTML if dangerousHTMLString is true)
 * @param {string} type - The toast type (success, error, warning, info, default)
 * @param {object} options - Vue-toastification options
 */
function showToast(message, type = 'success', options = {}) {
  toast[type](message, options);
}

// --- Form State (Using API payload keys) ---
const form = reactive({
  name: '',
  phone: '', // Maps to API 'phone' field
  email: '',
  subject: '',
  message: ''
});

// --- UI/API State ---
const isSubmitting = ref(false);
const isOfficeLoading = ref(true);

const websiteInfo = ref({
  email: 'N/A',
  phone: 'N/A',
  address: 'N/A',
  contactPerson: { phone: 'N/A' } // Nested structure for secondary phone
});


// --- API Integration Functions ---

/**
 * Fetches office details from the website info API. (GET /v1/website-info)
 */
const fetchOfficeDetails = async () => {
  isOfficeLoading.value = true;
  try {
    const response = await websiteApi.get("/v1/website-info");
    if (response.data && response.data.data) {
      // Map main fields and nested contact person phone
      websiteInfo.value = {
        ...response.data.data,
        contactPerson: response.data.data.contactPerson || { phone: 'N/A' }
      };
    }
  } catch (error) {
    console.error("Error fetching office details:", error);
    // Optional: Show toast if the crucial contact info fails to load
    // showToast('Failed to load contact details.', 'error');
  } finally {
    isOfficeLoading.value = false;
  }
};

/**
 * Handles the form submission logic. (POST /v1/contact/store)
 */
const submitForm = async () => {
  isSubmitting.value = true;

  try {
    const response = await websiteApi.post("/v1/contact/store", form);

    if (response.data.status || response.data.success) {
      // 3. Use Toast for success
      showToast(`Thank you, ${form.name}! Your message has been received. We'll respond to ${form.email} shortly.`, 'success', {
        timeout: 5000
      });

      // Clear the form after submission
      Object.assign(form, {
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      // 4. Use Toast for API failure
      showToast(`Submission failed: ${response.data.message || 'Unknown API error'}`, 'error');
    }

  } catch (error) {
    console.error('Error submitting contact form:', error.response?.data || error);
    let errorMsg = 'Failed to send message due to a server error.';

    if (error.response?.data?.message) {
      errorMsg = `Failed to send message: ${error.response.data.message}`;
    }

    // Handle validation errors from the server
    if (error.response?.data?.errors) {
      let validationHtml = '<ul>';
      for (const key in error.response.data.errors) {
        // Nicely format field names for the toast
        validationHtml += `<li>**${key.charAt(0).toUpperCase() + key.slice(1)}:** ${error.response.data.errors[key].join(', ')}</li>`;
      }
      validationHtml += '</ul>';

      // 5. Use Toast for validation errors (using HTML content in toast options)
      showToast(`**Please correct the following errors:** ${validationHtml}`, 'error', {
        dangerouslyHTMLString: true,
        timeout: 8000
      });
      return;
    }

    // 6. Use Toast for general error
    showToast(errorMsg, 'error');

  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchOfficeDetails();
});
</script>

<style scoped>
/* Scoped styles are preserved */
.text-gradient.text-dark {
  background-image: linear-gradient(310deg, #1c2331, #3c4858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-primary {
  /* Define the primary color, matching the admin pages */
  color: #4CAF50 !important;
}

.card {
  border: none;
  border-radius: 1rem;
}

.bg-gradient-dark {
  background-image: linear-gradient(310deg, #1c2331, #3c4858);
}

.form-control,
.form-select {
  border-radius: 0.5rem;
}
</style>