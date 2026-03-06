<template>
    <div class="admin-user-create">
        <div class="container-fluid py-41">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="card shadow border-0 rounded-4">
                        <div class="card-header pb-0 bg-white border-0">
                            <h5 class="fw-bolder mb-0">Create New User Account</h5>
                            <p class="text-sm mb-2 text-muted">Manually register and configure a new user profile.</p>
                        </div>

                        <div class="card-body pt-2 mt-n1">
                            <form @submit.prevent="createUser">
                                <div class="row">
                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Company/User Name <span
                                                class="text-danger">*</span></label>
                                        <input type="text" v-model="form.user_name" class="form-control"
                                            placeholder="User Name" required>
                                    </div>
                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Email Address <span
                                                class="text-danger">*</span></label>
                                        <input type="email" v-model="form.email" class="form-control"
                                            placeholder="Email" required>
                                    </div>
                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Phone Number <span
                                                class="text-danger">*</span></label>
                                        <input type="tel" v-model="form.phone" class="form-control" placeholder="Phone"
                                            required>
                                    </div>
                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">WhatsApp Number <span
                                                class="text-danger">*</span></label>
                                        <input type="tel" v-model="form.whatsapp_number" class="form-control"
                                            placeholder="WhatsApp Number" required>
                                    </div>

                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Address <span
                                                class="text-danger">*</span></label>
                                        <textarea v-model="form.address" class="form-control"
                                            placeholder="Enter primary address" rows="1" required></textarea>
                                    </div>
                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Delivery Address <span
                                                class="text-danger">*</span></label>
                                        <textarea v-model="form.delivery_address" class="form-control"
                                            placeholder="Enter delivery address" rows="1" required></textarea>
                                    </div>

                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">State <span
                                                class="text-danger">*</span></label>
                                        <Multiselect v-model="selectedState" :options="states" label="state"
                                            track-by="state_id" placeholder="Select State" :searchable="true"
                                            :allow-empty="false" :class="{ 'is-invalid': stateError }" />
                                    </div>

                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">City <span
                                                class="text-danger">*</span></label>
                                        <Multiselect v-model="selectedCity" :options="cities" label="city"
                                            track-by="city_id" :searchable="true"
                                            :disabled="!form.state_id || cityLoading"
                                            :placeholder="cityLoading ? 'Loading Cities...' : (form.state_id ? 'Select City' : 'Please select a state first')"
                                            :allow-empty="false" :class="{ 'is-invalid': cityError }" />
                                    </div>

                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Pin Code <span
                                                class="text-danger">*</span></label>
                                        <input type="text" v-model="form.pincode" class="form-control"
                                            placeholder="Pin Code" required>
                                    </div>
                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Country</label>
                                        <input type="text" v-model="form.country" class="form-control"
                                            placeholder="India" disabled value="India">
                                    </div>

                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">GST Number</label>
                                        <input type="text" v-model="form.gst_number" class="form-control"
                                            placeholder="GST Number">
                                    </div>
                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Annual Turnover</label>
                                        <input type="number" v-model="form.annual_turnover" class="form-control"
                                            placeholder="Annual Turnover" step="0.01" min="0">
                                    </div>
                                </div>

                                <h6 class="text-uppercase font-weight-bolder mt-2 mb-2 text-primary">Admin Config
                                </h6>
                                <div class="row">
                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Initial Password</label>
                                        <input type="password" v-model="form.password" class="form-control" required>
                                        <p class="text-xs text-muted mt-1">This will be the user's initial login
                                            password.</p>
                                    </div>
                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Confirm Password</label>
                                        <input type="password" v-model="form.password_confirmation" class="form-control"
                                            required>
                                    </div>

                                    <div class="col-md-4 mb-2">
                                        <label class="form-label fw-semibold">Initial Status</label>
                                        <select v-model="form.registration_status" class="form-select" required>
                                            <option value="active">Active (Ready to login)</option>
                                            <option value="unconfirmed">Unconfirmed (Requires user action)</option>
                                            <option value="deActive">Deactive</option>
                                            <option value="reject">Rejected</option>
                                        </select>
                                    </div>
                                </div>


                                <div class="d-flex justify-content-end mt-4">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-user-plus me-2"></i> Create User
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import { api } from "@/services/api"; // axios helper

const router = useRouter()

// --- Data & State ---
const form = reactive({
    user_name: '',
    email: '',
    phone: '',
    whatsapp_number: '',
    address: '',
    delivery_address: '',
    state_id: null,
    city_id: null,
    pincode: '',
    country: 'India',
    gst_number: '',
    annual_turnover: null,
    password: '',
    password_confirmation: '',
    registration_status: 'active',
});

// Dropdown data states
const states = ref([]);
const cities = ref([]);
const cityLoading = ref(false);

// Multiselect models
const selectedState = ref(null);
const selectedCity = ref(null);

// Error states for Multiselect validation (basic example)
const stateError = ref(false);
const cityError = ref(false);


// --- Watchers for Multiselect ---

// 1. Sync selectedState (object) to form.state_id (ID)
watch(selectedState, (newState) => {
    form.state_id = newState ? newState.state_id : null;
    form.city_id = null; // Reset city when state changes
    selectedCity.value = null;

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
});


// --- API Integration ---

/**
 * Fetches the list of active states.
 */
const fetchStates = async () => {
    try {
        const response = await api.get("/v1/admin/state/active");
        states.value = response.data.data;
    } catch (error) {
        console.error("Error fetching states:", error);
        alert('Failed to load active states.');
    }
};

/**
 * Fetches active cities based on the selected state ID.
 * @param {number} stateId
 */
const fetchCities = async (stateId) => {
    cityLoading.value = true;
    try {
        // API Endpoint: v1/admin/city/active/2 (state-id)
        const response = await api.get(`/v1/admin/city/active/${stateId}`);
        cities.value = response.data.data;
    } catch (error) {
        console.error("Error fetching cities:", error);
        cities.value = [];
        alert(`Failed to load cities for state ID ${stateId}.`);
    } finally {
        cityLoading.value = false;
    }
};


// --- Form Submission and API Integration ---
const createUser = async () => {
    stateError.value = !form.state_id;
    cityError.value = !form.city_id;

    if (form.password !== form.password_confirmation) {
        alert('Error: Passwords do not match!');
        return;
    }
    if (stateError.value || cityError.value) {
        alert('Please select both State and City.');
        return;
    }

    // Prepare payload with proper data types
    const payload = {
        user_name: form.user_name,
        email: form.email,
        phone: form.phone,
        whatsapp_number: form.whatsapp_number,
        address: form.address,
        delivery_address: form.delivery_address,
        state_id: form.state_id,
        city_id: form.city_id,
        pincode: form.pincode,
        country: form.country,
        gst_number: form.gst_number || '', // Send empty string if null
        annual_turnover: form.annual_turnover ? parseFloat(form.annual_turnover) : null, // Send null if empty
        password: form.password,
        password_confirmation: form.password_confirmation,
        registration_status: form.registration_status,
    };

    console.log('Submitting payload:', payload); // Debug log

    try {
        const response = await api.post("/v1/admin/user/store", payload);

        // Check for 'status' field instead of 'success'
        if (response.data.status) {
            alert(`User created successfully! ${response.data.message || ''}`);
            router.push('/admin/user-list');
        } else {
            alert(`Registration failed: ${response.data.message || 'Unknown API error'}`);
        }
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error);
        let errorMsg = 'Failed to create user.';

        // Handle 404 errors
        if (error.response?.status === 404) {
            errorMsg = "API Endpoint Not Found (404). Check the URL: /v1/admin/user/store";
        }
        // Handle 422 validation errors
        else if (error.response?.status === 422) {
            errorMsg = 'Validation Error:\n';
            if (error.response?.data?.errors) {
                for (const key in error.response.data.errors) {
                    errorMsg += `\n- ${key}: ${error.response.data.errors[key].join(', ')}`;
                }
            } else if (error.response?.data?.message) {
                errorMsg += error.response.data.message;
            }
        }
        // Handle other errors
        else if (error.response?.data?.message) {
            errorMsg = `Failed to create user: ${error.response.data.message}`;
        }

        alert(errorMsg);
    }
};

onMounted(() => {
    fetchStates();
});
</script>


<style scoped>
/* Custom style to make multiselect look like a form control */
.multiselect {
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
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
    border-color: #dc3545;
}
</style>