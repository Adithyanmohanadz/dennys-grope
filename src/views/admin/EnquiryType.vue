<template>
  <div class="admin-enquiry-type">
    <div class="container-fluid py-1">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="fw-bolder mb-0">Enquiry Type Management</h5>
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#addEnquiryTypeModal" @click="resetForm">
                <i class="fa fa-plus"></i> Add Enquiry Type
              </button>
            </div>

            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="thead-light bg-dark">
                    <tr>
                      <th class="text-center text-white text-xs">SL/No</th>
                      <th class="text-white text-xs">Enquiry Type</th>
                      <th class="text-white text-xs text-center">Status</th>
                      <th class="text-center text-white text-xs">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="isLoading">
                      <td colspan="4" class="text-center text-muted py-4">Loading enquiry types...
                      </td>
                    </tr>
                    <tr v-else v-for="(type, index) in enquiryTypes" :key="type.enquiry_type_id">
                      <td class="align-middle text-center">{{ index + 1 }}</td>
                      <td class="align-middle">{{ type.enquiry_type }}</td>
                      <td class="align-middle text-center">
                        <span
                          :class="type.status === 1 ? 'badge badge-success' : 'badge badge-danger'">
                          {{ type.status === 1 ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td class="align-middle text-center">
                        <a href="javascript:;" class="mx-1" title="Edit Enquiry Type"
                          @click="openEditModal(type)">
                          <i class="fas fa-edit text-info"></i>
                        </a>
                        <a href="javascript:;" class="mx-1" title="Delete Enquiry Type"
                          @click="openDeleteModal(type)">
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="!isLoading && enquiryTypes.length === 0">
                      <td colspan="4" class="text-center text-muted py-4">No enquiry types found.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addEnquiryTypeModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="addEnquiryType">
            <div class="modal-header">
              <h5 class="modal-title">Add New Enquiry Type</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>Enquiry Type Name</label>
                <input type="text" v-model="addForm.enquiry_type" class="form-control"
                  placeholder="e.g., Product Inquiry" required />
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
                <i class="fa fa-save"></i> Save Enquiry Type
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editEnquiryTypeModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="updateEnquiryType">
            <div class="modal-header">
              <h5 class="modal-title">Edit Enquiry Type</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>Enquiry Type Name</label>
                <input type="text" v-model="editForm.enquiry_type" class="form-control" required />
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
                <i class="fa fa-save"></i> Update Enquiry Type
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteEnquiryTypeModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered  " role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title text-white">Confirm Deletion</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the enquiry type: 
              <br>
              <strong>"{{ enquiryTypeToDelete.enquiry_type }}"</strong>?
            </p> 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="removeEnquiryType">
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
const enquiryTypes = ref([]);
const isLoading = ref(false);

// Separate form states for Add and Edit, using API field names
const defaultFormState = { enquiry_type_id: null, enquiry_type: "", status: 1 };
const addForm = ref({ ...defaultFormState });
const editForm = ref({ ...defaultFormState });

// NEW: State for deletion
const enquiryTypeToDelete = ref({ ...defaultFormState });


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
 * Fetches enquiry types from the API (GET v1/admin/enquiry-type).
 */
const fetchEnquiryTypes = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/v1/admin/enquiry-type");
    // Filter out items marked as deleted (deleted: 0)
    enquiryTypes.value = response.data.data.filter(t => t.deleted === 0);
  } catch (error) {
    console.error("Error fetching enquiry types:", error);
    alert("Failed to load enquiry types. Check console for details.");
  } finally {
    isLoading.value = false;
  }
};

/**
 * Handles Add New Enquiry Type (POST v1/admin/enquiry-type/store).
 */
const addEnquiryType = async () => {
  if (!addForm.value.enquiry_type) {
    alert("Please enter an Enquiry Type Name.");
    return;
  }

  try {
    const payload = {
      enquiry_type: addForm.value.enquiry_type,
      status: addForm.value.status,
    };

    await api.post("/v1/admin/enquiry-type/store", payload);
    alert("Enquiry Type added successfully! 🎉");

    // Close modal and reset form
    hideModal('addEnquiryTypeModal');
    resetForm();

    // Re-fetch the list to refresh the table
    await fetchEnquiryTypes();
    
  } catch (error) {
    console.error("Error adding enquiry type:", error);
    alert(`Failed to add enquiry type. Details: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Prepares the edit modal with selected enquiry type data.
 */
const openEditModal = (type) => {
  // Populate the editForm with the selected type data
  editForm.value = { ...type };
  // Manually show the edit modal
  showModal('editEnquiryTypeModal');
};

/**
 * Handles Update Enquiry Type (PUT/PATCH to v1/admin/enquiry-type/update/{id}).
 */
const updateEnquiryType = async () => {
  if (!editForm.value.enquiry_type) {
    alert("Please enter an Enquiry Type Name.");
    return;
  }

  try {
    const payload = {
      enquiry_type: editForm.value.enquiry_type,
      status: editForm.value.status,
    };

    await api.put(`/v1/admin/enquiry-type/update/${editForm.value.enquiry_type_id}`, payload);
    alert("Enquiry Type updated successfully! 👍");

    // Close modal
    hideModal('editEnquiryTypeModal');

    // Re-fetch the list to refresh the table
    await fetchEnquiryTypes();
    
  } catch (error) {
    console.error("Error updating enquiry type:", error);
    alert(`Failed to update enquiry type. Details: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * NEW: Prepares the delete modal with selected enquiry type data.
 */
const openDeleteModal = (type) => {
  // Store the enquiry item to be deleted
  enquiryTypeToDelete.value = { ...type };
  // Show the delete confirmation modal
  showModal('deleteEnquiryTypeModal');
};

/**
 * NEW: Handles Delete Enquiry Type (DELETE v1/admin/enquiry-type/remove/{id}).
 */
const removeEnquiryType = async () => {
  // Ensure we have a valid ID
  if (!enquiryTypeToDelete.value.enquiry_type_id) {
    alert("Error: Enquiry type ID is missing for deletion.");
    hideModal('deleteEnquiryTypeModal');
    return;
  }

  try {
    // API call using DELETE method as requested
    await api.put(`/v1/admin/enquiry-type/remove/${enquiryTypeToDelete.value.enquiry_type_id}`);
    
    alert(`Enquiry Type "${enquiryTypeToDelete.value.enquiry_type}" deleted successfully! 🗑️`);

    // Close modal
    hideModal('deleteEnquiryTypeModal');

    // Re-fetch the list to refresh the table
    await fetchEnquiryTypes();
    
    // Reset the state
    enquiryTypeToDelete.value = { ...defaultFormState };

  } catch (error) {
    console.error("Error deleting enquiry type:", error);
    alert(`Failed to delete enquiry type. Details: ${error.response?.data?.message || error.message}`);
  }
};


// Fetch enquiry types on component mount
onMounted(() => {
  fetchEnquiryTypes();
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