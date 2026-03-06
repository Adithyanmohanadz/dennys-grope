<template>
  <div class="container-fluid">
    <div class="row mb-5">
      <div class="col-lg-3">
        <div class="card card-body" id="profile">
          <div v-if="loading" class="text-center py-5">
            <p>Loading user data...</p>
          </div>
          <div v-else-if="user" class="row align-items-center">
            <div class="col-sm-auto col-4 text-center">
              <div class="avatar avatar-xl position-relative">
                <img :src="profileImg" alt="Profile image" class="w-100 border-radius-lg shadow-sm">
              </div>
            </div>
            <div class="col-sm-auto col-8 my-auto">
              <div class="h-100 mt-3">
                <h5 class="mb-2 font-weight-bolder">
                  {{ user.user_name }}
                </h5>
                <p class="mb-1 font-weight-bold text-sm">
                  {{ user.email }}
                </p>
                <p class="mb-0 font-weight-bold text-sm">
                  {{ user.phone }}
                </p>
                <p class="mb-0 text-xs" :class="statusClass(user.registration_status)">
                   {{ user.registration_status }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-5">
            <p>Failed to load user data.</p>
          </div>
        </div>
      </div>

      <div class="col-lg-9 mt-lg-0 mt-4">
        <div class="card position-sticky top-1 z-index-sticky">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-pills nav-fill p-1" role="tablist">
              <li class="nav-item">
                <a 
                  class="nav-link text-body" 
                  :class="{ 'active': isActiveTab('profile') }"
                  href="#profile"
                  @click.prevent="setActiveTab('profile')"
                >
                  <span class="text-sm">Profile</span>
                </a>
              </li>
              <li class="nav-item">
                <a 
                  class="nav-link text-body" 
                  :class="{ 'active': isActiveTab('basic-info') }"
                  href="#basic-info"
                  @click.prevent="setActiveTab('basic-info')"
                >
                  <span class="text-sm">Basic Info</span>
                </a>
              </li>
              <li class="nav-item">
                <a 
                  class="nav-link text-body" 
                  :class="{ 'active': isActiveTab('password') }"
                  href="#password"
                  @click.prevent="setActiveTab('password')"
                >
                  <span class="text-sm">Change Password</span>
                </a>
              </li>
              <li class="nav-item">
                <a 
                  class="nav-link text-body" 
                  :class="{ 'active': isActiveTab('delete') }"
                  href="#delete"
                  @click.prevent="setActiveTab('delete')"
                >
                  <span class="text-sm">Delete Account</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Basic Info Section -->
        <div class="card mt-4" id="basic-info">
          <div class="card-header">
            <h5>Basic Info</h5>
            <p v-if="basicInfoMessage" :class="basicInfoStatus ? 'text-success' : 'text-danger'" class="text-sm mb-0">
              {{ basicInfoMessage }}
            </p>
          </div>
          <form @submit.prevent="updateBasicInfo">
            <div class="card-body pt-0">
              <div class="row">
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="userName">Company/User Name</label>
                  <div class="input-group">
                    <input id="userName" v-model="basicInfo.user_name" class="form-control" type="text"
                      placeholder="Enter your name" required>
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="email">Email Address</label>
                  <div class="input-group">
                    <input id="email" v-model="basicInfo.email" class="form-control" type="email"
                      placeholder="Enter your email" required>
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="phone">Phone Number</label>
                  <div class="input-group">
                    <input id="phone" v-model="basicInfo.phone" class="form-control" type="text"
                      placeholder="Enter your phone number" required>
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="whatsapp">WhatsApp Number</label>
                  <div class="input-group">
                    <input id="whatsapp" v-model="basicInfo.whatsapp_number" class="form-control" type="text"
                      placeholder="Enter your WhatsApp number">
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="address">Address</label>
                  <div class="input-group">
                    <input id="address" v-model="basicInfo.address" class="form-control" type="text"
                      placeholder="Enter your address">
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="deliveryAddress">Delivery Address</label>
                  <div class="input-group">
                    <input id="deliveryAddress" v-model="basicInfo.delivery_address" class="form-control" type="text"
                      placeholder="Enter your delivery address">
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label" for="state">State</label>
                  <multiselect
                    id="state"
                    v-model="selectedState"
                    :options="states"
                    :custom-label="opt => opt.state"
                    track-by="state_id"
                    placeholder="Select State"
                    :loading="loadingStates"
                    :disabled="loadingStates"
                    :allow-empty="false"
                  >
                    <template #noResult>No states found</template>
                    <template #noOptions>No states available</template>
                  </multiselect>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label" for="city">City</label>
                  <multiselect
                    id="city"
                    v-model="selectedCity"
                    :options="cities"
                    :custom-label="opt => opt.city"
                    track-by="city_id"
                    placeholder="Select City"
                    :loading="loadingCities"
                    :disabled="loadingCities || !selectedState"
                    :allow-empty="false"
                  >
                    <template #noResult>No cities found</template>
                    <template #noOptions>{{ selectedState ? 'No cities available' : 'Please select a state first' }}</template>
                  </multiselect>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="pincode">Pin Code</label>
                  <div class="input-group">
                    <input id="pincode" v-model="basicInfo.pincode" class="form-control" type="text"
                      placeholder="Enter your pin code">
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="country">Country</label>
                  <div class="input-group">
                    <input id="country" v-model="basicInfo.country" class="form-control" type="text"
                      placeholder="Enter your country">
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="gst">GST Number</label>
                  <div class="input-group">
                    <input id="gst" v-model="basicInfo.gst_number" class="form-control" type="text"
                      placeholder="Enter your GST number">
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label" for="turnover">Annual Turnover</label>
                  <div class="input-group">
                    <input id="turnover" v-model="basicInfo.annual_turnover" class="form-control" type="number"
                      step="0.01" placeholder="Enter your annual turnover">
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label class="form-label fw-semibold" for="status">Status <span
                      class="text-xxs text-danger ms-1">(Change the status of your account)</span></label>
                  <select id="status" v-model="basicInfo.registration_status" class="form-select" required>
                    <option value="active">Active (Ready to login)</option>
                    <option value="unconfirmed">Unconfirmed (Requires user action)</option>
                    <option value="deActive">Deactive</option>
                    <option value="reject">Rejected</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn bg-gradient-dark btn-sm float-end mt-2 mb-0"
                :disabled="basicInfoLoading">
                {{ basicInfoLoading ? 'Updating...' : 'Update Basic Info' }}
              </button>
            </div>
          </form>
        </div>
        <hr>

        <!-- Change Password Section -->
        <div class="card mt-4" id="password">
          <div class="card-header">
            <h5>Change Password</h5>
            <p v-if="passwordMessage" :class="passwordStatus ? 'text-success' : 'text-danger'" class="text-sm mb-0">
              {{ passwordMessage }}
            </p>
          </div>
          <form @submit.prevent="updatePassword">
            <div class="card-body pt-0">
              <div class="row p-0">
                <div class="col-12 col-md-6 mb-2">
                  <label class="form-label" for="newPassword">New Password</label>
                  <div class="form-group">
                    <input id="newPassword" v-model="passwordForm.password" class="form-control" type="password"
                      placeholder="Enter new password" required>
                  </div>
                </div>
                <div class="col-12 col-md-6 mb-2">
                  <label class="form-label" for="confirmPassword">Confirm New Password</label>
                  <div class="form-group">
                    <input id="confirmPassword" v-model="passwordForm.password_confirmation" class="form-control"
                      type="password" placeholder="Confirm new password" required>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn bg-gradient-dark btn-sm float-end mb-0" :disabled="passwordLoading">
                {{ passwordLoading ? 'Updating...' : 'Update Password' }}
              </button>
            </div>
          </form>
        </div>
        <hr>

        <!-- Delete Account Section -->
        <div class="card mt-4" id="delete">
          <div class="card-header">
            <h5>Delete Account</h5>
            <p class="text-sm mb-0">Once you delete your account, there is no going back. Please be certain.</p>
            <p v-if="deleteMessage" :class="deleteStatus ? 'text-success' : 'text-danger'" class="text-sm mb-0">
              {{ deleteMessage }}
            </p>
          </div>
          <div class="card-body d-sm-flex pt-0">
            <div class="d-flex align-items-center mb-sm-0 mb-4">
              <div>
                <div class="form-check form-switch mb-0">
                  <input class="form-check-input" type="checkbox" id="deleteConfirm" v-model="deleteConfirmed">
                </div>
              </div>
              <div class="ms-2">
                <span class="text-dark font-weight-bold d-block text-sm">Confirm</span>
                <span class="text-xs d-block">I want to delete this account.</span>
              </div>
            </div>
            <button class="btn bg-gradient-danger mb-0 ms-auto" type="button" @click="removeUser"
              :disabled="!deleteConfirmed || deleteLoading">
              {{ deleteLoading ? 'Deleting...' : 'Delete Account' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect';
import profileImg from '@/assets/website/img/reviewer-1.png';
import { api } from "@/services/api";

// --- Configuration ---
const route = useRoute();
const router = useRouter(); // 👈 Initialize useRouter
const USER_ID = computed(() => route.params.id || 1); // Get ID from route params

// --- State ---
const user = ref(null);
const loading = ref(true);

// Basic Info Form State
const basicInfo = ref({
  user_name: '',
  email: '',
  phone: '',
  whatsapp_number: '',
  address: '',
  delivery_address: '',
  state_id: null,
  city_id: null,
  pincode: '',
  country: '',
  gst_number: '',
  annual_turnover: null,
  registration_status: ''
});
const basicInfoLoading = ref(false);
const basicInfoMessage = ref('');
const basicInfoStatus = ref(false);

// States and Cities
const states = ref([]);
const cities = ref([]);
const selectedState = ref(null);
const selectedCity = ref(null);
const loadingStates = ref(false);
const loadingCities = ref(false);

// Password Form State
const passwordForm = ref({
  password: '',
  password_confirmation: ''
});
const passwordLoading = ref(false);
const passwordMessage = ref('');
const passwordStatus = ref(false);

// Delete Account State
const deleteConfirmed = ref(false);
const deleteLoading = ref(false);
const deleteMessage = ref('');
const deleteStatus = ref(false);

// Active Tab State
const activeTab = ref('profile');

// --- Methods ---

/**
 * Sets the active tab and scrolls to the section
 */
const setActiveTab = (tabId) => {
  activeTab.value = tabId;
  const element = document.getElementById(tabId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Check if tab is active
 */
const isActiveTab = (tabId) => {
  return activeTab.value === tabId;
};

/**
 * Fetches active states from the API
 */
const fetchStates = async () => {
  loadingStates.value = true;
  try {
    const response = await api.get('/v1/admin/state/active');
    if (response.data.success) {
      states.value = response.data.data;
    } else {
      console.error('Failed to fetch states:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching states:', error);
  } finally {
    loadingStates.value = false;
  }
};

/**
 * Fetches active cities for a given state
 */
const fetchCities = async (stateId) => {
  if (!stateId) {
    cities.value = [];
    selectedCity.value = null;
    return;
  }
  
  loadingCities.value = true;
  try {
    const response = await api.get(`/v1/admin/city/active/${stateId}`);
    if (response.data.success) {
      cities.value = response.data.data;
      
      // If editing and city_id exists, set the selected city
      if (basicInfo.value.city_id) {
        selectedCity.value = cities.value.find(c => c.city_id === basicInfo.value.city_id) || null;
      }
    } else {
      console.error('Failed to fetch cities:', response.data.message);
      cities.value = [];
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
    cities.value = [];
  } finally {
    loadingCities.value = false;
  }
};

/**
 * Watch for state changes to fetch cities
 */
watch(selectedState, (newState) => {
  if (newState) {
    basicInfo.value.state_id = newState.state_id;
    fetchCities(newState.state_id);
  } else {
    basicInfo.value.state_id = null;
    cities.value = [];
    selectedCity.value = null;
    basicInfo.value.city_id = null;
  }
});

/**
 * Watch for city changes
 */
watch(selectedCity, (newCity) => {
  if (newCity) {
    basicInfo.value.city_id = newCity.city_id;
  } else {
    basicInfo.value.city_id = null;
  }
});

/**
 * Fetches the user data and populates the reactive state.
 */
const fetchUser = async () => {
  loading.value = true;
  try {
    const response = await api.get(`/v1/admin/user/view/${USER_ID.value}`);
    if (response.data.success) {
      user.value = response.data.data;
      
      // Populate basicInfo form for editing
      basicInfo.value = {
        user_name: user.value.user_name || '',
        email: user.value.email || '',
        phone: user.value.phone || '',
        whatsapp_number: user.value.whatsapp_number || '',
        address: user.value.address || '',
        delivery_address: user.value.delivery_address || '',
        state_id: user.value.state_id || null,
        city_id: user.value.city_id || null,
        pincode: user.value.pincode || '',
        country: user.value.country || '',
        gst_number: user.value.gst_number || '',
        annual_turnover: user.value.annual_turnover || null,
        registration_status: user.value.registration_status || 'active',
      };
      
      // Set selected state and city after states are loaded
      if (user.value.state_id && states.value.length > 0) {
        selectedState.value = states.value.find(s => s.state_id === user.value.state_id) || null;
        if (selectedState.value && user.value.city_id) {
          await fetchCities(user.value.state_id);
        }
      }
    } else {
      console.error('API Error:', response.data.message);
    }
  } catch (error) {
    console.error('Fetch user failed:', error);
  } finally {
    loading.value = false;
  }
};

/**
 * Updates the user's basic information.
 */
const updateBasicInfo = async () => {
  basicInfoLoading.value = true;
  basicInfoMessage.value = '';
  basicInfoStatus.value = false;

  const payload = {
    ...basicInfo.value,
    annual_turnover: basicInfo.value.annual_turnover ? parseFloat(basicInfo.value.annual_turnover) : 0,
    state_id: basicInfo.value.state_id ? parseInt(basicInfo.value.state_id) : null,
    city_id: basicInfo.value.city_id ? parseInt(basicInfo.value.city_id) : null,
  };

  try {
    const response = await api.put(`/v1/admin/user/update/${USER_ID.value}`, payload);
    if (response.data.status) {
      basicInfoMessage.value = response.data.message;
      basicInfoStatus.value = true;
      user.value = { ...user.value, ...response.data.data };
    } else {
      basicInfoMessage.value = response.data.message || 'Failed to update basic info.';
      basicInfoStatus.value = false;
    }
  } catch (error) {
    basicInfoMessage.value = error.response?.data?.message || 'An error occurred during update.';
    basicInfoStatus.value = false;
  } finally {
    basicInfoLoading.value = false;
  }
};

/**
 * Updates the user's password.
 */
const updatePassword = async () => {
  passwordLoading.value = true;
  passwordMessage.value = '';
  passwordStatus.value = false;

  if (passwordForm.value.password !== passwordForm.value.password_confirmation) {
    passwordMessage.value = 'New Password and Confirm New Password must match.';
    passwordStatus.value = false;
    passwordLoading.value = false;
    return;
  }

  try {
    const response = await api.put(`/v1/admin/user/password/update/${USER_ID.value}`, {
      password: passwordForm.value.password,
      password_confirmation: passwordForm.value.password_confirmation
    });

    if (response.data.success) {
      passwordMessage.value = response.data.message;
      passwordStatus.value = true;
      passwordForm.value.password = '';
      passwordForm.value.password_confirmation = '';
    } else {
      passwordMessage.value = response.data.message || 'Failed to update password.';
      passwordStatus.value = false;
    }
  } catch (error) {
    passwordMessage.value = error.response?.data?.message || 'An error occurred during password update.';
    passwordStatus.value = false;
  } finally {
    passwordLoading.value = false;
  }
};

/**
 * Removes (soft deletes) the user.
 */
const removeUser = async () => {
  if (!deleteConfirmed.value) return;

  deleteLoading.value = true;
  deleteMessage.value = '';
  deleteStatus.value = false;

  try {
    const response = await api.put(`/v1/admin/user/remove/${USER_ID.value}`);
    if (response.data.success) {
      deleteMessage.value = response.data.message + ' You may be redirected now.';
      deleteStatus.value = true;
      // Optional: Redirect after successful deletion
      setTimeout(() => router.push('/admin/user-list'), 2000);
    } else {
      deleteMessage.value = response.data.message || 'Failed to remove user.';
      deleteStatus.value = false;
    }
  } catch (error) {
    deleteMessage.value = error.response?.data?.message || 'An error occurred during removal.';
    deleteStatus.value = false;
  } finally {
    deleteLoading.value = false;
  }
};

/**
 * Utility function to apply class based on registration status.
 */
const statusClass = (status) => {
  switch (status) {
    case 'active':
      return 'badge badge-success';
    case 'unconfirmed':
      return 'badge badge-unconfirmed';
    case 'reject':
    case 'deActive':
      return 'badge badge-danger';
    default:
      return 'badge badge-info';
  }
};

// --- Lifecycle Hook ---
onMounted(async () => {
  await fetchStates(); // Load states first
  await fetchUser(); // Then load user data which will set state/city
  
  // Setup Intersection Observer for automatic tab switching on scroll
  const sections = ['profile', 'basic-info', 'password', 'delete'];
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeTab.value = entry.target.id;
      }
    });
  }, observerOptions);
  
  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    }
  });
});
</script>

<style scoped>
input.form-control {
  font-size: 0.95rem;
}

.card {
  transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

/* Vue Multiselect Styles */
:deep(.multiselect) {
  min-height: 42px;
  font-size: 0.95rem;
}

:deep(.multiselect__tags) {
  min-height: 42px;
  padding: 8px 40px 0 8px;
  border: 1px solid #d2d6da;
  border-radius: 0.5rem;
}

:deep(.multiselect__single) {
  font-size: 0.95rem;
  margin-bottom: 0;
  padding-top: 2px;
}

:deep(.multiselect__placeholder) {
  color: #adb5bd;
  padding-top: 2px;
  margin-bottom: 0;
}

:deep(.multiselect__select) {
  height: 42px;
}

:deep(.multiselect__option--highlight) {
  background: #344767;
}

:deep(.multiselect__option--selected) {
  background: #f8f9fa;
  color: #344767;
  font-weight: 600;
}

:deep(.multiselect__content-wrapper) {
  border: 1px solid #d2d6da;
  border-radius: 0.5rem;
}

/* Active Tab Styles */
.nav-link.active {
  background: linear-gradient(310deg, #141727 0%, #3A416F 100%) !important;
  color: #fff !important;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.09), 0 2px 3px -1px rgba(0, 0, 0, 0.07);
}

.nav-link.active .text-sm {
  color: #fff !important;
}

.nav-link {
  transition: all 0.15s ease-in;
  cursor: pointer;
}

.nav-link:hover:not(.active) {
  background-color: rgba(0, 0, 0, 0.02);
}

.badge-active {
  background-color: #28a745;
}
.badge-unconfirmed {
  background-color: #17a2b8;
}
.badge-deactive {
  background-color: #6c757d;
}
.badge-rejected {
  background-color: #dc3545;
}
</style>