<template>
    <Navbar />

    <div class="login-page d-flex flex-column min-vh-85">
        <section class="flex-grow-1 d-flex align-items-center justify-content-center bg-info">
            <div class="container py-1 px-2 px-md-4">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="card shadow border-0 rounded-4 p-4 p-md-5">
                            <div class="text-center mb-4">
                                <h3 class="fw-bold">Create Your Account</h3>
                                <p class="text-muted mb-0">
                                    Sign up to manage your solar panel system & track orders.
                                </p>
                            </div>

                            <form @submit.prevent="handleRegister">
                                <h5 class="fw-semibold text-dark mb-3">👤 Personal Info</h5>
                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Company/User Name <span
                                                class="text-danger2">*</span></label>
                                        <input type="text" v-model="form.user_name"
                                            class="form-control rounded-3 border" placeholder="Enter your name" required />
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Email <span
                                                class="text-danger2">*</span></label>
                                        <input type="email" v-model="form.email"
                                            class="form-control rounded-3 border" placeholder="Enter your email" required />
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Phone Number <span
                                                class="text-danger2">*</span></label>
                                        <input type="tel" v-model="form.phone"
                                            class="form-control rounded-3 border" placeholder="Enter your phone" required />
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">WhatsApp Number <span
                                                class="text-danger2">*</span></label>
                                        <input type="tel" v-model="form.whatsapp_number"
                                            class="form-control rounded-3 border" placeholder="Enter your WhatsApp" required/>
                                    </div>
                                </div>

                                <h5 class="fw-semibold text-dark mt-4 mb-3">🔒 Security</h5>
                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Password <span
                                                class="text-danger2">*</span></label>
                                        <div class="position-relative">
                                            <input 
                                                :type="showPassword ? 'text' : 'password'" 
                                                v-model="form.password"
                                                class="form-control rounded-3 border pe-5" 
                                                placeholder="Enter your password" 
                                                minlength="3"
                                                required 
                                            />
                                            <button 
                                                type="button" 
                                                class="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                                                @click="showPassword = !showPassword"
                                                style="text-decoration: none; padding: 0.375rem 0.75rem;"
                                            >
                                                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                            </button>
                                        </div>
                                        <small class="text-muted">Minimum 8 characters</small>
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Confirm Password <span
                                                class="text-danger2">*</span></label>
                                        <div class="position-relative">
                                            <input 
                                                :type="showConfirmPassword ? 'text' : 'password'" 
                                                v-model="form.password_confirmation"
                                                class="form-control rounded-3 border pe-5" 
                                                :class="{ 'is-invalid': passwordMismatch }"
                                                placeholder="Confirm your password" 
                                                minlength="3"
                                                required 
                                            />
                                            <button 
                                                type="button" 
                                                class="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                                                @click="showConfirmPassword = !showConfirmPassword"
                                                style="text-decoration: none; padding: 0.375rem 0.75rem;"
                                            >
                                                <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                            </button>
                                        </div>
                                        <small v-if="passwordMismatch" class="text-danger">Passwords do not match</small>
                                    </div>
                                </div>

                                <h5 class="fw-semibold text-dark mt-4 mb-3">🏡 Address Info</h5>
                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Address <span
                                                class="text-danger2">*</span></label>
                                        <textarea v-model="form.address"
                                            class="form-control rounded-3 border"
                                            placeholder="Enter your Primary Address" rows="3" required></textarea>
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Delivery Address <span
                                                class="text-danger2">*</span></label>
                                        <textarea v-model="form.delivery_address"
                                            class="form-control rounded-3 border"
                                            placeholder="Enter your Delivery Address" rows="3" required></textarea>
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">State <span
                                                class="text-danger2">*</span></label>
                                        <Multiselect 
                                            v-model="selectedState" 
                                            :options="states" 
                                            label="state" 
                                            track-by="state_id" 
                                            placeholder="Select State"
                                            :searchable="true" 
                                            :class="{ 'is-invalid': stateError }"
                                        />
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">City <span
                                                class="text-danger2">*</span></label>
                                        <Multiselect 
                                            v-model="selectedCity" 
                                            :options="cities" 
                                            label="city" 
                                            track-by="city_id" 
                                            :searchable="true" 
                                            :disabled="!form.state_id || cityLoading"
                                            :placeholder="cityLoading ? 'Loading Cities...' : (form.state_id ? 'Select City' : 'Please select a state first')"
                                            :class="{ 'is-invalid': cityError }"
                                        />
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Pin Code <span
                                                class="text-danger2">*</span></label>
                                        <input type="text" v-model="form.pincode"
                                            class="form-control rounded-3 border"
                                            placeholder="Enter your Pin Code" required />
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Country</label>
                                        <input type="text" v-model="form.country"
                                            class="form-control rounded-3 border" value="India"
                                            placeholder="Enter your Country" disabled />
                                    </div>
                                </div>

                                <h5 class="fw-semibold text-dark mt-4 mb-3">🏢 Business Info</h5>
                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">GST Number</label>
                                        <input type="text" v-model="form.gst_number"
                                            class="form-control rounded-3 border"
                                            placeholder="Enter your GST Number" />
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label class="form-label fw-semibold">Annual Turnover</label>
                                        <input type="number" v-model="form.annual_turnover"
                                            class="form-control rounded-3 border"
                                            placeholder="Enter your Annual Turnover" />
                                    </div>
                                </div>

                                <div class="d-grid mt-4">
                                    <button type="submit" class="btn btn-lg btn-dark rounded-3 shadow-sm" :disabled="isSubmitting || passwordMismatch">
                                        {{ isSubmitting ? 'Registering...' : 'Register' }}
                                    </button>
                                </div>
                            </form>

                            <p class="mt-4 text-center">
                                Already have an account?
                                <RouterLink to="/auth/login" class="text-success fw-semibold">
                                    Login here
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
import { ref, reactive, watch, onMounted, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import Multiselect from "vue-multiselect";
import 'vue-multiselect/dist/vue-multiselect.min.css';

import { api } from "@/services/api"; // axios helper

import Navbar from "@/views/components/website/Navbar.vue";
import AuthFooter from "@/views/components/website/AuthFooter.vue";

const router = useRouter();

// --- Form State (Using API field names) ---
const form = reactive({
    user_name: '',
    email: '',
    phone: '',
    whatsapp_number: '',
    password: '',
    password_confirmation: '',
    address: '',
    delivery_address: '',
    state_id: null, // ID for API payload
    city_id: null, // ID for API payload
    pincode: '',
    country: 'India',
    gst_number: '',
    annual_turnover: null,
});

// --- UI/Dropdown States ---
const states = ref([]);
const cities = ref([]);
const selectedState = ref(null);
const selectedCity = ref(null);
const cityLoading = ref(false);
const isSubmitting = ref(false);

const stateError = ref(false);
const cityError = ref(false);

// Password visibility toggles
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Password validation
const passwordMismatch = computed(() => {
    if (!form.password_confirmation) return false;
    return form.password !== form.password_confirmation;
});


// --- Watchers for Multiselect Binding ---

// 1. Sync selectedState (object) to form.state_id (ID)
watch(selectedState, (newState) => {
    form.state_id = newState ? newState.state_id : null;
    form.city_id = null; // Reset city ID when state changes
    selectedCity.value = null; // Reset multiselect model

    stateError.value = !form.state_id;
    
    // Fetch cities if a state is selected
    if (form.state_id) {
        fetchCities(form.state_id);
    } else {
        cities.value = [];
    }
});

// 2. Sync selectedCity (object) to form.city_id (ID)
watch(selectedCity, (newCity) => {
    form.city_id = newCity ? newCity.city_id : null;
    cityError.value = !form.city_id;
});


// --- API Data Fetching ---

/**
 * Fetches the list of active states. (API: v1/state/active)
 */
const fetchStates = async () => {
    try {
        // NOTE: The backend API endpoint is v1/state/active (without /admin)
        const response = await api.get("/v1/state/active");
        states.value = response.data.data;
    } catch (error) {
        console.error("Error fetching states:", error);
        alert('Failed to load available states.');
    }
};

/**
 * Fetches active cities based on the selected state ID. (API: v1/city/active/{state id})
 * @param {number} stateId
 */
const fetchCities = async (stateId) => {
    cityLoading.value = true;
    cities.value = [];
    selectedCity.value = null;
    try {
        // API Endpoint: v1/city/active/{state-id}
        const response = await api.get(`/v1/city/active/${stateId}`);
        cities.value = response.data.data;
    } catch (error) {
        console.error(`Error fetching cities for state ${stateId}:`, error);
        alert(`Failed to load cities for the selected state.`);
    } finally {
        cityLoading.value = false;
    }
};


// --- Form Submission and API Integration ---

/**
 * Handles user registration (API: v1/user/registration)
 */
const handleRegister = async () => {
    stateError.value = !form.state_id;
    cityError.value = !form.city_id;
    
    if (stateError.value || cityError.value) {
        alert('Please select a State and a City.');
        return;
    }

    if (passwordMismatch.value) {
        alert('Passwords do not match. Please check and try again.');
        return;
    }

    if (form.password.length < 3) {
        alert('Password must be at least 3 characters long.');
        return;
    }
    
    isSubmitting.value = true;

    // Payload includes all fields matching API structure
    const payload = {
        ...form, // Copies all reactive properties
        annual_turnover: form.annual_turnover ? parseFloat(form.annual_turnover) : null,
    };
    // Ensure we don't send null for optional string fields if not entered
    payload.gst_number = payload.gst_number || null;
    payload.annual_turnover = payload.annual_turnover || null;


    try {
        // API Endpoint: v1/user/registration
        const response = await api.post("/v1/user/registration", payload);

        if (response.data.success || response.data.status) { // Check for both 'success' and 'status' true
            alert(`Registration successful! You may now login.`);
            router.push('/auth/login');
        } else {
            alert(`Registration failed: ${response.data.message || 'Unknown API error'}`);
        }
    } catch (error) {
        console.error('Error during public registration:', error.response?.data || error);
        let errorMsg = 'Registration failed due to a server error.';

        if (error.response?.data?.message) {
             errorMsg = `Registration failed: ${error.response.data.message}`;
        }
        
        // Handle validation errors from the server
        if (error.response?.data?.errors) {
            errorMsg += '\nValidation Errors:';
            for (const key in error.response.data.errors) {
                errorMsg += `\n- ${key}: ${error.response.data.errors[key].join(', ')}`;
            }
        }
        alert(errorMsg);
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    fetchStates();
});

defineOptions({
    name: "RegisterPage",
});
</script>


<style scoped>
.login-page {
    font-family: "Inter", sans-serif;
}
/* Custom Multiselect styling to fit Bootstrap form aesthetics */
.multiselect {
    border: 1px solid #ced4da;
    border-radius: 0.5rem; /* Matches your rounded-3 class */
    padding: 0;
    min-height: calc(1.5em + 0.75rem + 2px);
    font-size: 1rem;
    line-height: 1.5;
}
.multiselect:focus-within {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.multiselect.is-invalid {
    border-color: #dc3545 !important;
}
.multiselect__select {
    height: 100% !important;
}

.form-control {
    border-radius: 0.5rem !important; /* Adjusted to match rounded-3 */
}
/* Ensure the multiselect control itself respects the border styling */
:deep(.multiselect__tags) {
    border: none !important;
    padding-top: 8px; /* Adjust padding to center text */
    padding-bottom: 0px;
}
:deep(.multiselect__single) {
    margin-bottom: 0px;
}

/* Password field styling */
.position-relative .btn-link {
    color: #6c757d;
    z-index: 10;
}
.position-relative .btn-link:hover {
    color: #495057;
}
</style>