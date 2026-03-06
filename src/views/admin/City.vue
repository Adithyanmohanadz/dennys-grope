<template>
  <div class="admin-city">
    <div class="container-fluid py-1">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="fw-bolder mb-0">City Management</h5>
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addCityModal"
                @click="resetForm">
                <i class="fa fa-plus"></i> Add City
              </button>
            </div>

            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="thead-light bg-dark">
                    <tr>
                      <th class="text-center text-white text-xs">SL/No</th>
                      <th class="text-white text-xs">City Name</th>
                      <th class="text-white text-xs">State</th>
                      <th class="text-white text-xs text-center">Status</th>
                      <th class="text-center text-white text-xs">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="isLoading">
                      <td colspan="5" class="text-center text-muted py-4">Loading cities...</td>
                    </tr>
                    <tr v-else v-for="(city, index) in cities" :key="city.city_id">
                      <td class="align-middle text-center">{{ index + 1 }}</td>
                      <td class="align-middle">{{ city.city }}</td>
                      <td class="align-middle">{{ getStateName(city.state_id) }}</td>
                      <td class="align-middle text-center">
                        <span :class="city.status === 1 ? 'badge badge-success' : 'badge badge-danger'">
                          {{ city.status === 1 ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td class="align-middle text-center">
                        <a href="javascript:;" class="mx-1" title="Edit City" @click="openEditModal(city)">
                          <i class="fas fa-edit text-info"></i>
                        </a>
                        <a href="javascript:;" class="mx-1" title="Delete City" @click="openDeleteModal(city)">
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="!isLoading && cities.length === 0">
                      <td colspan="5" class="text-center text-muted py-4">No cities found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addCityModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="addCity">
            <div class="modal-header">
              <h5 class="modal-title">Add New City</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>City Name</label>
                <input type="text" v-model="addForm.city" class="form-control" required />
              </div>
              <div class="form-group mb-3">
                <label>State</label>
                <select v-model="addForm.state_id" class="form-select" required>
                  <option value="" disabled>Select State</option>
                  <option v-for="state in statesList" :key="state.state_id" :value="state.state_id">
                    {{ state.state }}
                  </option>
                </select>
              </div>
              <div class="form-group mb-3">
                <label>Status</label>
                <select v-model="addForm.status" class="form-select" required>
                  <option :value="1">Active</option>
                  <option :value="0">Inactive</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                <i class="fa fa-save"></i> Save City
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editCityModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="updateCity">
            <div class="modal-header">
              <h5 class="modal-title">Edit City</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>City Name</label>
                <input type="text" v-model="editForm.city" class="form-control" required />
              </div>
              <div class="form-group mb-3">
                <label>State</label>
                <select v-model="editForm.state_id" class="form-select" required>
                  <option value="" disabled>Select State</option>
                  <option v-for="state in statesList" :key="state.state_id" :value="state.state_id">
                    {{ state.state }}
                  </option>
                </select>
              </div>
              <div class="form-group mb-3">
                <label>Status</label>
                <select v-model="editForm.status" class="form-select" required>
                  <option :value="1">Active</option>
                  <option :value="0">Inactive</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                <i class="fa fa-save"></i> Update City
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteCityModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered  " role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title text-white">Confirm Deletion</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the city:
              <br>
              <strong>"{{ cityToDelete.city }}"</strong> (State: {{ getStateName(cityToDelete.state_id) }})?
            </p> 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="removeCity">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// Assuming your 'api' (axios instance with interceptors) is imported from a configuration file
import { api } from "@/services/api"; // axios helper

// State
const cities = ref([]);
const statesList = ref([]); // To store ACTIVE states for the dropdown
const isLoading = ref(false);

// Separate form states for Add and Edit, using API field names
const defaultFormState = { city_id: null, state_id: "", city: "", status: 1 };
const addForm = ref({ ...defaultFormState });
const editForm = ref({ ...defaultFormState });

// NEW: State for deletion
const cityToDelete = ref({ ...defaultFormState });


// --- Utility Functions ---

// Resets the Add form 
const resetForm = () => {
  addForm.value = { ...defaultFormState };
};

// Function to hide a specific Bootstrap modal
const hideModal = (id) => {
  const modalEl = document.getElementById(id);
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.hide();
  }
};

// Function to show a specific Bootstrap modal
const showModal = (id) => {
  const modalEl = document.getElementById(id);
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

/**
 * Helper to get the state name from the statesList
 */
const getStateName = (stateId) => {
  const state = statesList.value.find(s => s.state_id == stateId); // Use == for comparison as state_id might be string/number
  return state ? state.state : 'N/A';
};

// --- API Integration Functions ---

/**
 * Fetches the list of ACTIVE states to populate the dropdowns.
 * **UPDATED ENDPOINT: GET v1/admin/state/active**
 */
const fetchActiveStates = async () => {
  try {
    // Fetch only active states
    const response = await api.get("/v1/admin/state/active");
    statesList.value = response.data.data;
  } catch (error) {
    console.error("Error fetching active states for dropdown:", error);
  }
};


/**
 * Fetches cities from the API (GET v1/admin/city).
 */
const fetchCities = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/v1/admin/city");
    // Filter out items marked as deleted (deleted: 0)
    cities.value = response.data.data.filter(c => c.deleted === 0);
  } catch (error) {
    console.error("Error fetching cities:", error);
    alert("Failed to load cities. Check console for details.");
  } finally {
    isLoading.value = false;
  }
};

/**
 * Handles Add New City (POST v1/admin/city/store).
 */
const addCity = async () => {
  if (!addForm.value.city || !addForm.value.state_id) {
    alert("Please enter city name and select a state.");
    return;
  }

  try {
    const payload = {
      state_id: addForm.value.state_id,
      city: addForm.value.city,
      status: addForm.value.status,
    };

    await api.post("/v1/admin/city/store", payload);
    alert("City added successfully! 🎉");

    // Close modal and reset form
    hideModal('addCityModal');
    resetForm();

    // Re-fetch the list to refresh the table
    await fetchCities();

  } catch (error) {
    console.error("Error adding city:", error);
    alert(`Failed to add city. Details: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Prepares the edit modal with selected city data.
 */
const openEditModal = (city) => {
  // Populate the editForm with the selected city data
  editForm.value = { ...city };
  // Manually show the edit modal
  showModal('editCityModal');
};

/**
 * Handles Update City (PUT/PATCH to v1/admin/city/update/{id}).
 */
const updateCity = async () => {
  if (!editForm.value.city || !editForm.value.state_id) {
    alert("Please enter city name and select a state.");
    return;
  }

  try {
    const payload = {
      state_id: editForm.value.state_id,
      city: editForm.value.city,
      status: editForm.value.status,
    };

    await api.put(`/v1/admin/city/update/${editForm.value.city_id}`, payload);
    alert("City updated successfully! 👍");

    // Close modal
    hideModal('editCityModal');

    // Re-fetch the list to refresh the table
    await fetchCities();

  } catch (error) {
    console.error("Error updating city:", error);
    alert(`Failed to update city. Details: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * NEW: Prepares the delete modal with selected city data.
 */
const openDeleteModal = (city) => {
  // Store the city item to be deleted
  cityToDelete.value = { ...city };
  // Show the delete confirmation modal
  showModal('deleteCityModal');
};

/**
 * NEW: Handles Delete City (DELETE v1/admin/city/remove/{id}).
 */
const removeCity = async () => {
  // Ensure we have a valid ID
  if (!cityToDelete.value.city_id) {
    alert("Error: City ID is missing for deletion.");
    hideModal('deleteCityModal');
    return;
  }

  try {
    // API call using DELETE method as requested
    await api.put(`/v1/admin/city/remove/${cityToDelete.value.city_id}`);

    alert(`City "${cityToDelete.value.city}" deleted successfully! 🗑️`);

    // Close modal
    hideModal('deleteCityModal');

    // Re-fetch the list to refresh the table
    await fetchCities();

    // Reset the state
    cityToDelete.value = { ...defaultFormState };

  } catch (error) {
    console.error("Error deleting city:", error);
    alert(`Failed to delete city. Details: ${error.response?.data?.message || error.message}`);
  }
};

// Fetch data on component mount
onMounted(() => {
  fetchActiveStates(); // <-- Fetches active states for dropdown
  fetchCities();
});
</script>

<style scoped>
.badge {
  font-size: 0.65rem;
  padding: 0.35em 0.65em;
}

.badge-success {
  background-color: #28a745;
  color: white;
}

.badge-danger {
  background-color: #dc3545;
  color: white;
}
/* Style for modal close button on dark header */
.btn-close-white {
    filter: invert(1) grayscale(100%) brightness(200%);
}
</style>