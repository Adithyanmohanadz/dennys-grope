<template>
  <section class="mt-4">
    <div class="container py-2 px-md-4">
      <h2 class="text-gradient text-dark">My Profile</h2>
 
      <div class="row justify-content-center py-3"> 
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-body p-4">
              <!-- Profile Header -->
              <div class="d-flex align-items-center mb-4">
                <div class="profile-img me-3">
                  <img :src="profile.image || profileImg" alt="profile" class="rounded-circle border shadow"
                    style="width:80px; height:80px; object-fit:cover;" />
                </div>
                <div>
                  <h4 class="fw-bolder mb-0">{{ profile.user_name }}</h4>
                  <p class="text-muted mb-0">{{ profile.email }}</p>
                </div>
              </div>

              <!-- Profile Info Form -->
              <form @submit.prevent="updateProfile">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Company/User Name</label>
                    <input type="text" class="form-control border" v-model="profile.user_name" />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Email</label>
                    <input type="email" class="form-control border" v-model="profile.email" disabled />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Phone</label>
                    <input type="text" class="form-control border" v-model="profile.phone" />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">WhatsApp Number</label>
                    <input type="text" class="form-control border" v-model="profile.whatsapp_number" />
                  </div>

                  <div class="col-6">
                    <label class="form-label fw-semibold">Address</label>
                    <textarea class="form-control" rows="3" v-model="profile.address"></textarea>
                  </div>
                  <div class="col-6">
                    <label class="form-label fw-semibold">Delivery Address</label>
                    <textarea class="form-control" rows="3" v-model="profile.delivery_address"></textarea>
                  </div>

                  <!-- State -->
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">State</label>
                    <Multiselect v-model="selectedState" :options="states" label="state" track-by="state_id"
                      placeholder="Select State" @select="onStateChange" />
                  </div>

                  <!-- City -->
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">City</label>
                    <Multiselect v-model="selectedCity" :options="cities" label="city" track-by="city_id"
                      placeholder="Select City" :disabled="!selectedState" />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Pin Code</label>
                    <input type="text" class="form-control" v-model="profile.pincode" />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Country</label>
                    <input type="text" class="form-control" v-model="profile.country" />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">GST Number</label>
                    <input type="text" class="form-control" v-model="profile.gst_number" />
                  </div>
                </div>

                <div class="text-end mt-4">
                  <button class="btn bg-primary2 text-white px-4" type="submit" :disabled="loading">
                    {{ loading ? "Saving..." : "Save Changes" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div class="col-lg-4">
          <div class="card shadow-sm pb-4">
            <div class="card-body p-4 pb-0">
              <h5 class="fw-bolder mb-3">Account Settings</h5>
              <button class="btn btn-outline-secondary me-2 mb-0" @click="showPasswordModal = true">
                Change Password
              </button>
            </div>
            <div class="card-body p-4 pb-0">
              <h5 class="fw-bolder mb-3">Order</h5>
              <router-link to="/orderview">
                <button class="btn btn-outline-success mb-0">My Orders</button>
              </router-link>
            </div>
            <div class="card-body p-4 pb-0">
              <h5 class="fw-bolder mb-3">Cart</h5>
              <router-link to="/cart">
                <button class="btn btn-outline-success mb-0">My Cart</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div class="modal fade show d-block" tabindex="-1" v-if="showPasswordModal" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Change Password</h5>
            <button type="button" class="btn-close" @click="closePasswordModal"></button>
          </div>
          <form @submit.prevent="changePassword">
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-semibold">Previous Password</label>
                <input type="password" class="form-control" v-model="passwordForm.current_password" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">New Password</label>
                <input type="password" class="form-control" v-model="passwordForm.password" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Confirm Password</label>
                <input type="password" class="form-control" v-model="passwordForm.password_confirmation" required />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closePasswordModal">Cancel</button> <button
                type="submit" class="btn btn-primary" :disabled="passwordLoading">
                {{ passwordLoading ? "Updating..." : "Update Password" }} </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import profileImg from '@/assets/website/img/reviewer-1.png';
import { websiteApi } from '@/services/api';
// 1. Import useToast
import { useToast } from 'vue-toastification';
// If you need to redirect after password change, ensure useRouter is imported
// import { useRouter } from 'vue-router'; 

// 2. Initialize Toast
const toast = useToast();
// const router = useRouter(); // Uncomment if using router for logout redirect

// --- Reactive State Declarations ---
const profile = ref({});
const states = ref([]);
const cities = ref([]);
const selectedState = ref(null);
const selectedCity = ref(null);
const loading = ref(false); // For profile update
const passwordLoading = ref(false); // For password update
const showPasswordModal = ref(false);
const savedCityId = ref(null); // Store the original city_id

const passwordForm = ref({
  current_password: '', // Matches API field
  password: '', // Matches API field
  password_confirmation: '' // Matches API field
});

// --- Toast Helper ---
/**
 * Shows a toast notification using Vue Toastification
 * @param {string} message - The message to display
 * @param {string} type - The toast type (success, error, warning, info, default)
 */
function showToast(message, type = 'success') {
  toast[type](message);
}

// --- Methods ---

const getStates = async () => {
  try {
    const res = await websiteApi.get('/v1/state/active');
    if (res.data.success) {
      states.value = res.data.data;
    }
  } catch (err) {
    console.error('Error loading states:', err);
    // Optional: Show toast for data load errors
    // showToast('Failed to load states.', 'error'); 
  }
};

const getCities = async () => {
  if (!selectedState.value) {
    cities.value = [];
    return;
  }

  try {
    const res = await websiteApi.get(`/v1/city/active/${selectedState.value.state_id}`);
    if (res.data.success) {
      cities.value = res.data.data; 
    }
  } catch (err) {
    console.error('Error loading cities:', err);
    cities.value = [];
  }
};

const getProfile = async () => {
  try {
    const res = await websiteApi.get('/v1/user/profile/view');

    if (res.data.success) {
      profile.value = { ...res.data.data };

      savedCityId.value = profile.value.city_id;

      // Set initial state/city selection
      if (profile.value.state_id && states.value.length > 0) {
        selectedState.value = states.value.find(s => s.state_id === profile.value.state_id) || null;

        if (selectedState.value) {
          await getCities();

          // Set city after cities are loaded using the saved city_id
          if (savedCityId.value && cities.value.length > 0) {
            selectedCity.value = cities.value.find(c => c.city_id === savedCityId.value) || null;
          }
        }
      }
    }
  } catch (err) {
    console.error('Error loading profile:', err);
    // Show toast if profile fails to load initially
    showToast('Failed to load profile details.', 'error');
  }
};


const onStateChange = async () => {
  // Update profile state_id
  profile.value.state_id = selectedState.value ? selectedState.value.state_id : '';

  // Reset city selection
  selectedCity.value = null;
  profile.value.city_id = '';
  savedCityId.value = null;
  cities.value = [];

  // Load cities for new state
  if (selectedState.value) {
    await getCities();
  }
};



const updateProfile = async () => {
  try {
    loading.value = true;
    profile.value.state_id = selectedState.value ? selectedState.value.state_id : '';
    profile.value.city_id = selectedCity.value ? selectedCity.value.city_id : '';

    const res = await websiteApi.put('/v1/user/profile/update', profile.value);
    if (res.data.success) {
      // Update localStorage with new user data
      const userData = localStorage.getItem('website_user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          user.name = profile.value.user_name;
          user.email = profile.value.email;
          user.phone = profile.value.phone;
          localStorage.setItem('website_user', JSON.stringify(user));

          // Trigger storage event for other components
          window.dispatchEvent(new Event('storage'));
        } catch (error) {
          console.error('Error updating localStorage:', error);
        }
      }

      // 3. Use Toast for success
      showToast('Profile updated successfully! ', 'success');
      // await getProfile();
    } else {
      // 4. Use Toast for API failure
      showToast(res.data.message || 'Failed to update profile.', 'error');
    }
  } catch (err) {
    console.error('Profile update error:', err);
    // 5. Use Toast for network/server error
    showToast('An error occurred while updating profile. Please try again.', 'error');
  } finally {
    loading.value = false;
  }
};

const closePasswordModal = () => {
  showPasswordModal.value = false;
  // Reset the form fields
  passwordForm.value = { current_password: '', password: '', password_confirmation: '' };
};

const changePassword = async () => {
  // Client-side validation
  if (!passwordForm.value.current_password || !passwordForm.value.password || !passwordForm.value.password_confirmation) {
    // 6. Use Toast for client validation failure
    showToast('Please fill all password fields.', 'warning');
    return;
  }
  if (passwordForm.value.password !== passwordForm.value.password_confirmation) {
    // 7. Use Toast for client validation failure
    showToast('New Password and Confirm Password do not match!', 'warning');
    return;
  }

  try {
    passwordLoading.value = true;

    // Payload structure matches API requirements
    const payload = {
      current_password: passwordForm.value.current_password,
      password: passwordForm.value.password,
      password_confirmation: passwordForm.value.password_confirmation,
    };

    const res = await websiteApi.put('/v1/user/profile/password/update', payload);

    if (res.data.success) {
      // 8. Use Toast for success
      showToast(res.data.message || 'Password updated successfully.', 'success');
      closePasswordModal();

      // Action required by API: Logout and redirect to login
      console.log('Password changed. Initiating logout and redirect to login page.');
      // *** IMPLEMENT LOGOUT LOGIC HERE (e.g., clear localStorage, then router.push('/login')) ***
    } else {
      // 9. Use Toast for API error response (e.g., incorrect current password)
      showToast(res.data.message || 'Failed to update password. Please check your current password.', 'error');
    }

  } catch (err) {
    console.error('Password update error:', err.response ? err.response.data : err);
    // 10. Use Toast for general network or server error
    showToast('An error occurred while changing your password. Please try again.', 'error');
  } finally {
    passwordLoading.value = false;
  }
};


// --- Lifecycle Hook (Runs on component mount) ---
// This replaces the old `created()` logic
onMounted(async () => {
  await getStates();
  await getProfile();
  // console.log('Profile loaded:', profile.value);
});
</script>

<style scoped>
.card {
  border-radius: 12px;
}

.form-label {
  font-size: 0.9rem;
}

.modal {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* vue-multiselect styling */
.multiselect {
  border-radius: 6px;
  border: 1px solid #ced4da;
  min-height: 38px;
}

.multiselect__tags {
  min-height: 38px;
  padding: 6px 10px;
}

.multiselect__option--highlight {
  background-color: #0d6efd;
  color: #fff;
}

.multiselect--disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>