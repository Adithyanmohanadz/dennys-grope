<template>
    <section class="business-enquiry py-5" style="background-color: #f5f2ed;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <h2 class="text-gradient text-dark fw-bolder mb-3 text-center">Business & Partnership Enquiry</h2>
                    <p class="text-center text-muted mb-5">
                        Use this form for large volume orders, B2B procurement, installation projects, or dealership
                        interest.
                    </p>

                    <div class="card shadow-lg border-0">
                        <div class="card-body p-md-5 p-3">
                            <div class="row">

                                <div class="col-lg-7 mb-4 mb-lg-0 pe-lg-5 border-end">
                                    <h5 class="fw-bolder text-primary mb-4">Tell Us About Your Project</h5>
                                    <form @submit.prevent="submitBusinessForm">

                                        <div class="mb-3">
                                            <label for="companyName" class="form-label fw-semibold">Company Name</label>
                                            <input type="text" id="companyName" v-model="form.company_name"
                                                class="form-control border" placeholder="Enter company name" required>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="contactName" class="form-label fw-semibold">Contact
                                                    Person</label>
                                                <input type="text" id="contactName" v-model="form.contact_person"
                                                    class="form-control border" placeholder="Your name" required>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="phone" class="form-label fw-semibold">Contact Number</label>
                                                <input type="tel" id="phone" v-model="form.phone"
                                                    class="form-control border" placeholder="Enter phone number"
                                                    required>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label for="email" class="form-label fw-semibold">Work Email Address</label>
                                            <input type="email" id="email" v-model="form.email"
                                                class="form-control border" placeholder="Enter work email" required>
                                        </div>

                                        <div class="mb-3">
                                            <label for="enquiryType" class="form-label fw-semibold">Type of
                                                Enquiry</label>
                                            <select id="enquiryType" v-model="form.enquiry_type_id"
                                                class="form-select border" required>
                                                <option value="" disabled>Select a purpose</option>
                                                <option v-if="isLoadingEnquiryTypes" disabled>Loading types...</option>
                                                <option v-for="type in enquiryTypes" :key="type.enquiry_type_id"
                                                    :value="type.enquiry_type_id">
                                                    {{ type.enquiry_type }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="mb-4">
                                            <label for="details" class="form-label fw-semibold">Project / Requirement
                                                Details</label>
                                            <textarea id="details" v-model="form.message" class="form-control border"
                                                rows="4"
                                                placeholder="Describe your requirement, estimated project size (kW), and timeline."
                                                required></textarea>
                                        </div>

                                        <button type="submit" :disabled="isSubmitting"
                                            class="btn bg-gradient-dark btn-lg w-100 mt-2 text-white">
                                            <i class="fas fa-handshake me-2"></i> {{ isSubmitting ? 'Submitting...' :
                                                'Submit Business Enquiry' }}
                                        </button>
                                    </form>
                                </div>

                                <div
                                    class="col-lg-5 ps-lg-5 d-flex flex-column justify-content-center align-items-center text-center">
                                    <h5 class="fw-bolder text-primary mb-3">Why Partner With Us?</h5>

                                    <div class="text-start">
                                        <ul class="list-unstyled">
                                            <li class="d-flex mb-3">
                                                <i class="fas fa-check-circle text-success me-3 mt-1 text-lg"></i>
                                                <p class="text-sm text-muted mb-0">Exclusive **Wholesale Pricing** and
                                                    volume discounts.</p>
                                            </li>
                                            <li class="d-flex mb-3">
                                                <i class="fas fa-check-circle text-success me-3 mt-1 text-lg"></i>
                                                <p class="text-sm text-muted mb-0">Access to **Certified and
                                                    BIS-approved** solar components.</p>
                                            </li>
                                            <li class="d-flex mb-3">
                                                <i class="fas fa-check-circle text-success me-3 mt-1 text-lg"></i>
                                                <p class="text-sm text-muted mb-0">Dedicated **B2B Account Manager** for
                                                    priority support.</p>
                                            </li>
                                            <li class="d-flex mb-3">
                                                <i class="fas fa-check-circle text-success me-3 mt-1 text-lg"></i>
                                                <p class="text-sm text-muted mb-0">Flexible logistics and **Pan-India
                                                    Delivery** solutions.</p>
                                            </li>
                                        </ul>
                                    </div>
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
    name: 'BusinessEnquiryPage'
});

// 2. Initialize Toast
const toast = useToast();

// --- Toast Helper ---
/**
 * Shows a toast notification using Vue Toastification
 * @param {string} message - The message to display
 * @param {string} type - The toast type (success, error, warning, info, default)
 */
function showToast(message, type = 'success', options = {}) {
    toast[type](message, options);
}

// --- State ---
const form = reactive({
    company_name: '',
    contact_person: '',
    phone: '',
    email: '',
    enquiry_type_id: '', // Binds to the ID from the select options
    message: ''
});

const enquiryTypes = ref([]);
const isLoadingEnquiryTypes = ref(false);
const isSubmitting = ref(false);

// --- API Integration ---

/**
 * Fetches the list of active enquiry types to populate the dropdown.
 * API Endpoint: v1/enquiry-type/active
 */
const fetchEnquiryTypes = async () => {
    isLoadingEnquiryTypes.value = true;
    try {
        const response = await websiteApi.get("/v1/enquiry-type/active");
        enquiryTypes.value = response.data.data;
    } catch (error) {
        console.error("Error fetching enquiry types:", error);
        // 3. Use Toast for fetch error
        showToast('Failed to load enquiry types for the dropdown. Please refresh.', 'error');
    } finally {
        isLoadingEnquiryTypes.value = false;
    }
};


/**
 * Handles the business enquiry form submission and sends data to the API.
 * API Endpoint: /v1/enquiry/store
 */
const submitBusinessForm = async () => {
    if (!form.enquiry_type_id) {
        // 4. Use Toast for client validation
        showToast('Please select a Type of Enquiry.', 'warning');
        return;
    }

    isSubmitting.value = true;

    // The form data is already mapped to the payload structure

    try {
        const response = await websiteApi.post("/v1/enquiry/store", form);

        if (response.data.status) {
            // 5. Use Toast for success
            showToast(`Thank you, ${form.contact_person}! Your enquiry has been submitted successfully. We will contact you shortly.`, 'success', {
                timeout: 5000
            });

            // Clear the form after successful submission
            Object.assign(form, {
                company_name: '',
                contact_person: '',
                phone: '',
                email: '',
                enquiry_type_id: '',
                message: ''
            });

        } else {
            // 6. Use Toast for API failure
            showToast(`Submission failed: ${response.data.message || 'Unknown API error'}`, 'error');
        }

    } catch (error) {
        console.error('Error submitting enquiry:', error.response?.data || error);
        let errorMsg = 'Submission failed due to a server error.';

        if (error.response?.data?.message) {
            errorMsg = `Submission failed: ${error.response.data.message}`;
        }

        // Handle validation errors from the server and display them in the toast
        if (error.response?.data?.errors) {
            let validationHtml = '<ul>';
            for (const key in error.response.data.errors) {
                validationHtml += `<li>**${key.replace(/_/g, ' ')}:** ${error.response.data.errors[key].join(', ')}</li>`;
            }
            validationHtml += '</ul>';

            // 7. Use Toast for validation errors (using HTML content in toast options)
            showToast(`**Please correct the following errors:** ${validationHtml}`, 'error', {
                dangerouslyHTMLString: true,
                timeout: 8000
            });
            return;
        }

        // 8. Use Toast for general error
        showToast(errorMsg, 'error');

    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    fetchEnquiryTypes();
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
    color: #4CAF50 !important;
    /* Primary color */
}

.text-success {
    color: #28a745 !important;
}

.card {
    border: none;
    border-radius: 1rem;
}

.bg-gradient-dark {
    background-image: linear-gradient(310deg, #1c2331, #3c4858);
}

.list-unstyled {
    padding-left: 0;
}

/* Ensure form controls look consistent */
.form-control,
.form-select {
    border-radius: 0.5rem;
}
</style>