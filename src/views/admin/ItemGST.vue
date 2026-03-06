<template>
  <div class="admin-gst">
    <div class="container-fluid py-1">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="fw-bolder mb-0">Tax Type Management</h5>
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addTaxModal"
                @click="resetForm">
                <i class="fa fa-plus"></i> Add Tax Type
              </button>
            </div>

            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="thead-light bg-dark">
                    <tr>
                      <th class="text-center text-white text-xs">SL/No</th>
                      <th class="text-white text-xs">Tax Type Name</th>
                      <th class="text-white text-xs text-center">Tax %</th>
                      <th class="text-white text-xs text-center">Status</th>
                      <th class="text-center text-white text-xs">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="isLoading">
                      <td colspan="5" class="text-center text-muted py-4">Loading tax types...</td>
                    </tr>
                    <tr v-else v-for="(tax, index) in taxList" :key="tax.tax_type_id">
                      <td class="align-middle text-center">{{ index + 1 }}</td>
                      <td class="align-middle">{{ tax.tax_type }}</td>
                      <td class="align-middle text-center">{{ tax.tax }}%</td>
                      <td class="align-middle text-center">
                        <span :class="tax.status === 1 ? 'badge badge-success' : 'badge badge-danger'">
                          {{ tax.status === 1 ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td class="align-middle text-center">
                        <a href="javascript:;" class="mx-1" title="Edit Tax Type" @click="openEditModal(tax)">
                          <i class="fas fa-edit text-info"></i>
                        </a>
                        <a href="javascript:;" class="mx-1" title="Delete Tax Type" @click="openDeleteModal(tax)">
                          <i class="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="!isLoading && taxList.length === 0">
                      <td colspan="5" class="text-center text-muted py-4">No tax types found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addTaxModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="addTaxType">
            <div class="modal-header">
              <h5 class="modal-title">Add New Tax Type</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>Tax Type Name</label>
                <input type="text" v-model="addForm.tax_type" class="form-control" placeholder="e.g., GST 18%"
                  required />
              </div>
              <div class="form-group mb-3">
                <label>Tax %</label>
                <input type="number" v-model="addForm.tax" class="form-control" min="0" max="100" step="0.01"
                  required />
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
              <button type="submit" class="btn btn-primary">
                <i class="fa fa-save"></i> Save Tax Type
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editTaxModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="updateTaxType">
            <div class="modal-header">
              <h5 class="modal-title">Edit Tax Type</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>Tax Type Name</label>
                <input type="text" v-model="editForm.tax_type" class="form-control" required />
              </div>
              <div class="form-group mb-3">
                <label>Tax %</label>
                <input type="number" v-model="editForm.tax" class="form-control" min="0" max="100" step="0.01"
                  required />
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
              <button type="submit" class="btn btn-primary">
                <i class="fa fa-save"></i> Update Tax Type
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteTaxModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered " role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title text-white">Confirm Deletion</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the tax type:
              <br>
              <strong>{{ taxToDelete.tax_type }} ({{ taxToDelete.tax }}%)</strong>?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="removeTaxType">
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
import { api } from "@/services/api"; // axios helper

// State
const taxList = ref([]);
const isLoading = ref(false);

// Separate form states for Add and Edit
const defaultFormState = { tax_type_id: null, tax_type: "", tax: 0, status: 1 };
const addForm = ref({ ...defaultFormState });
const editForm = ref({ ...defaultFormState });
// NEW: State for deletion
const taxToDelete = ref({ ...defaultFormState });

// --- Utility Functions ---

// Resets the Add form and ensures the tax value is treated as a number
const resetForm = () => {
  addForm.value = { ...defaultFormState };
};

// Function to hide a specific Bootstrap modal
const hideModal = (id) => {
  const modalEl = document.getElementById(id);
  if (modalEl) {
    // Check if a modal instance already exists, otherwise create a new one
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.hide();
  }
};

// Function to show a specific Bootstrap modal
const showModal = (id) => {
  const modalEl = document.getElementById(id);
  if (modalEl) {
    // A new instance is created here because the button uses data-bs-target, which might
    // interfere if we try to get an existing instance. This is safer for dynamic calls.
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

// --- API Integration Functions ---

/**
 * Fetches tax types from the API (GET v1/admin/tax-type).
 */
const fetchTaxTypes = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/v1/admin/tax-type");
    // Filter out items marked as deleted (deleted: 0) and convert 'tax' back to a number for the form
    taxList.value = response.data.data
      .filter(t => t.deleted === 0)
      .map(t => ({
        ...t,
        tax: parseFloat(t.tax) // Ensure 'tax' is a number for the input fields
      }));
  } catch (error) {
    console.error("Error fetching tax types:", error);
    alert("Failed to load tax types. Check console for details.");
  } finally {
    isLoading.value = false;
  }
};

/**
 * Handles Add New Tax Type (POST v1/admin/tax-type/store).
 */
const addTaxType = async () => {
  if (!addForm.value.tax_type || addForm.value.tax < 0 || addForm.value.tax > 100) {
    alert("Please enter a valid Tax Type name and percentage (0-100).");
    return;
  }

  try {
    const payload = {
      tax_type: addForm.value.tax_type,
      // API expects the tax percentage as a string
      tax: String(addForm.value.tax),
      status: addForm.value.status,
    };

    await api.post("/v1/admin/tax-type/store", payload);
    alert("Tax Type added successfully! 🎉");

    // Close modal and reset form
    hideModal('addTaxModal');
    resetForm();

    // Re-fetch the list to refresh the table
    await fetchTaxTypes();

  } catch (error) {
    console.error("Error adding tax type:", error);
    alert(`Failed to add tax type. Details: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Prepares the edit modal with selected tax type data.
 */
const openEditModal = (tax) => {
  // Populate the editForm with the selected tax data
  editForm.value = { ...tax };
  // Manually show the edit modal
  showModal('editTaxModal');
};

/**
 * Handles Update Tax Type (PUT/PATCH to v1/admin/tax-type/update/{id}).
 */
const updateTaxType = async () => {
  if (!editForm.value.tax_type || editForm.value.tax < 0 || editForm.value.tax > 100) {
    alert("Please enter a valid Tax Type name and percentage (0-100).");
    return;
  }

  try {
    const payload = {
      tax_type: editForm.value.tax_type,
      // API expects the tax percentage as a string
      tax: String(editForm.value.tax),
      status: editForm.value.status,
    };

    await api.put(`/v1/admin/tax-type/update/${editForm.value.tax_type_id}`, payload);
    alert("Tax Type updated successfully! 👍");

    // Close modal
    hideModal('editTaxModal');

    // Re-fetch the list to refresh the table
    await fetchTaxTypes();

  } catch (error) {
    console.error("Error updating tax type:", error);
    alert(`Failed to update tax type. Details: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * NEW: Prepares the delete modal with selected tax type data.
 */
const openDeleteModal = (tax) => {
  // Store the tax item to be deleted
  taxToDelete.value = { ...tax };
  // Show the delete confirmation modal
  showModal('deleteTaxModal');
};

/**
 * NEW: Handles Delete Tax Type (DELETE v1/admin/tax-type/remove/{id}).
 */
const removeTaxType = async () => {
  // Ensure we have a valid ID
  if (!taxToDelete.value.tax_type_id) {
    alert("Error: Tax type ID is missing for deletion.");
    hideModal('deleteTaxModal');
    return;
  }

  try {
    // The API call uses the DELETE method as requested
    await api.put(`/v1/admin/tax-type/remove/${taxToDelete.value.tax_type_id}`);

    alert(`Tax Type "${taxToDelete.value.tax_type}" deleted successfully! 🗑️`);

    // Close modal
    hideModal('deleteTaxModal');

    // Re-fetch the list to refresh the table
    await fetchTaxTypes();

    // Reset the taxToDelete state
    taxToDelete.value = { ...defaultFormState };

  } catch (error) {
    console.error("Error deleting tax type:", error);
    alert(`Failed to delete tax type. Details: ${error.response?.data?.message || error.message}`);
  }
};

// Fetch tax types on component mount
onMounted(() => {
  fetchTaxTypes();
});
</script>

<style scoped>
/* Existing styles */
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