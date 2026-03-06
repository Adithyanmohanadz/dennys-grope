<template>
  <div class="admin-state">
    <div class="container-fluid py-1">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="fw-bolder mb-0">State Management</h5>
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addStateModal"
                @click="resetForm">
                <i class="fa fa-plus"></i> Add State
              </button>
            </div>

            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="thead-light bg-dark">
                    <tr>
                      <th class="text-center text-white text-xs">SL/No</th>
                      <th class="text-white text-xs">State Name</th>
                      <th class="text-white text-xs text-center">Status</th>
                      <th class="text-center text-white text-xs">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="isLoading">
                      <td colspan="4" class="text-center text-muted py-4">Loading states...</td>
                    </tr>
                    <tr v-else v-for="(state, index) in states" :key="state.state_id">
                      <td class="align-middle text-center">{{ index + 1 }}</td>
                      <td class="align-middle">{{ state.state }}</td>
                      <td class="align-middle text-center">
                        <span :class="state.status === 1 ? 'badge badge-success' : 'badge badge-danger'">
                          {{ state.status === 1 ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td class="align-middle text-center">
                        <a href="javascript:;" class="mx-1" title="Edit State" @click="openEditModal(state)">
                          <i class="fas fa-edit text-info"></i>
                        </a>
                        <a href="javascript:;" class="mx-1" title="Delete State" @click="openDeleteModal(state)">
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="!isLoading && states.length === 0">
                      <td colspan="4" class="text-center text-muted py-4">No states found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addStateModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="addState">
            <div class="modal-header">
              <h5 class="modal-title">Add New State</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>State Name</label>
                <input type="text" v-model="addForm.state" class="form-control" required />
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
                <i class="fa fa-save"></i> Save State
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editStateModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="updateState">
            <div class="modal-header">
              <h5 class="modal-title">Edit State</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>State Name</label>
                <input type="text" v-model="editForm.state" class="form-control" required />
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
                <i class="fa fa-save"></i> Update State
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteStateModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered " role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title text-white">Confirm Deletion</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the state:
              <br>
              <strong>"{{ stateToDelete.state }}"</strong>?
            </p> 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="removeState">
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
const states = ref([]);
const isLoading = ref(false);

// Separate form states for Add and Edit, using API field names
const defaultFormState = { state_id: null, state: "", status: 1 };
const addForm = ref({ ...defaultFormState });
const editForm = ref({ ...defaultFormState });

// NEW: State for deletion
const stateToDelete = ref({ ...defaultFormState });


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

// --- API Integration Functions ---

/**
 * Fetches states from the API (GET v1/admin/states).
 */
const fetchStates = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/v1/admin/states");
    // Filter out items marked as deleted (deleted: 0)
    states.value = response.data.data.filter(s => s.deleted === 0);
  } catch (error) {
    console.error("Error fetching states:", error);
    alert("Failed to load states. Check console for details.");
  } finally {
    isLoading.value = false;
  }
};

/**
 * Handles Add New State (POST v1/admin/state/store).
 */
const addState = async () => {
  if (!addForm.value.state) {
    alert("Please enter a State Name.");
    return;
  }

  try {
    const payload = {
      state: addForm.value.state,
      status: addForm.value.status,
    };

    await api.post("/v1/admin/state/store", payload);
    alert("State added successfully! 🎉");

    // Close modal and reset form
    hideModal('addStateModal');
    resetForm();

    // Re-fetch the list to refresh the table
    await fetchStates();

  } catch (error) {
    console.error("Error adding state:", error);
    alert(`Failed to add state. Details: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Prepares the edit modal with selected state data.
 */
const openEditModal = (state) => {
  // Populate the editForm with the selected state data
  editForm.value = { ...state };
  // Manually show the edit modal
  showModal('editStateModal');
};

/**
 * Handles Update State (PUT/PATCH to v1/admin/state/update/{id}).
 */
const updateState = async () => {
  if (!editForm.value.state) {
    alert("Please enter a State Name.");
    return;
  }

  try {
    const payload = {
      state: editForm.value.state,
      status: editForm.value.status,
    };

    await api.put(`/v1/admin/state/update/${editForm.value.state_id}`, payload);
    alert("State updated successfully! 👍");

    // Close modal
    hideModal('editStateModal');

    // Re-fetch the list to refresh the table
    await fetchStates();

  } catch (error) {
    console.error("Error updating state:", error);
    alert(`Failed to update state. Details: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * NEW: Prepares the delete modal with selected state data.
 */
const openDeleteModal = (state) => {
  // Store the state item to be deleted
  stateToDelete.value = { ...state };
  // Show the delete confirmation modal
  showModal('deleteStateModal');
};

/**
 * NEW: Handles Delete State (DELETE v1/admin/state/remove/{id}).
 */
const removeState = async () => {
  // Ensure we have a valid ID
  if (!stateToDelete.value.state_id) {
    alert("Error: State ID is missing for deletion.");
    hideModal('deleteStateModal');
    return;
  }

  try {
    // API call using DELETE method as requested
    await api.put(`/v1/admin/state/remove/${stateToDelete.value.state_id}`);

    alert(`State "${stateToDelete.value.state}" deleted successfully! 🗑️`);

    // Close modal
    hideModal('deleteStateModal');

    // Re-fetch the list to refresh the table
    await fetchStates();

    // Reset the state
    stateToDelete.value = { ...defaultFormState };

  } catch (error) {
    console.error("Error deleting state:", error);
    alert(`Failed to delete state. Details: ${error.response?.data?.message || error.message}`);
  }
};

// Fetch states on component mount
onMounted(() => {
  fetchStates();
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