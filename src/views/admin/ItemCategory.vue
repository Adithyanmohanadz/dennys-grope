<template>
  <div class="admin-item-category">
    <div class="container-fluid py-1">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="fw-bolder mb-0">Item Categories</h5>
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addCategoryModal"
                @click="resetForm">
                <i class="fa fa-plus"></i> Add Category
              </button>
            </div>

            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="thead-light bg-dark">
                    <tr>
                      <th class="text-center text-white text-xs">SL/No</th>
                      <th class="text-white text-xs">Category Name</th>
                      <th class="text-white text-xs">Category Code</th>
                      <th class="text-white text-xs text-center">Status</th>
                      <th class="text-center text-white text-xs">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="isLoading">
                      <td colspan="5" class="text-center text-muted py-4">Loading categories...</td>
                    </tr>
                    <tr v-else v-for="(category, index) in categories" :key="category.category_id">
                      <td class="align-middle text-center">{{ index + 1 }}</td>
                      <td class="align-middle">{{ category.category_name }}</td>
                      <td class="align-middle">{{ category.category_code }}</td>
                      <td class="align-middle text-center">
                        <span :class="category.status === 1 ? 'badge badge-success' : 'badge badge-danger'">
                          {{ category.status === 1 ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td class="align-middle text-center">
                        <a href="javascript:;" class="mx-1" title="Edit Category" @click="openEditModal(category)">
                          <i class="fas fa-edit text-info"></i>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="!isLoading && categories.length === 0">
                      <td colspan="5" class="text-center text-muted py-4">No categories found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addCategoryModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="addCategory">
            <div class="modal-header">
              <h5 class="modal-title">Add New Category</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>Category Name</label>
                <input type="text" v-model="addForm.category_name" class="form-control" required />
              </div>
              <div class="form-group mb-3">
                <label>Category Code</label>
                <input type="text" v-model="addForm.category_code" class="form-control" required />
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
                <i class="fa fa-save"></i> Save Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editCategoryModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="updateCategory">
            <div class="modal-header">
              <h5 class="modal-title">Edit Category</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>Category Name</label>
                <input type="text" v-model="editForm.category_name" class="form-control" required />
              </div>
              <div class="form-group mb-3">
                <label>Category Code</label>
                <input type="text" v-model="editForm.category_code" class="form-control" required />
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
                <i class="fa fa-save"></i> Update Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// Assuming your `api` instance is imported from a configuration file
import { api } from "@/services/api"; // axios helper

// State
const categories = ref([]);
const isLoading = ref(false);

// Separate form states for Add and Edit
const defaultFormState = { category_id: null, category_name: "", category_code: "", status: 1 };
const addForm = ref({ ...defaultFormState });
const editForm = ref({ ...defaultFormState });


// --- Utility Functions ---

// Resets the Add form when the Add modal is opened
const resetForm = () => {
  addForm.value = { ...defaultFormState };
};

// Function to hide a specific Bootstrap modal
const hideModal = (id) => {
  const modalEl = document.getElementById(id);
  if (modalEl) {
    // Use the Bootstrap JS API to hide the modal
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

// Fetch categories from the API
const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/v1/admin/category");
    // Filter out categories marked as deleted (deleted: 0)
    categories.value = response.data.data.filter(c => c.deleted === 0);
  } catch (error) {
    console.error("Error fetching categories:", error);
    alert("Failed to load categories. Check console for details.");
  } finally {
    isLoading.value = false;
  }
};

// Handle Add Category (POST to v1/admin/category/store)
const addCategory = async () => {
  if (!addForm.value.category_name || !addForm.value.category_code) {
    alert("Please enter both Category Name and Code.");
    return;
  }

  try {
    const payload = {
      category_name: addForm.value.category_name,
      category_code: addForm.value.category_code,
      status: addForm.value.status,
    };

    // Use the specified POST endpoint for adding
    await api.post("/v1/admin/category/store", payload);
    alert("Category added successfully!");

    // Close modal and reset form
    hideModal('addCategoryModal');
    resetForm();

    // Re-fetch the list to refresh the table
    await fetchCategories();

  } catch (error) {
    console.error("Error adding category:", error);
    alert(`Failed to add category. Details: ${error.response?.data?.message || error.message}`);
  }
};

// Open modal for editing
const openEditModal = (category) => {
  // Populate the editForm with the selected category data
  editForm.value = { ...category };
  // Manually show the edit modal
  showModal('editCategoryModal');
};

// Handle Update Category (PUT/PATCH to v1/admin/category/update/{id})
const updateCategory = async () => {
  if (!editForm.value.category_name || !editForm.value.category_code) {
    alert("Please enter both Category Name and Code.");
    return;
  }

  try {
    const payload = {
      category_name: editForm.value.category_name,
      category_code: editForm.value.category_code,
      status: editForm.value.status,
    };

    // FIX APPLIED HERE: The '/update' segment is added to the route
    await api.put(`/v1/admin/category/update/${editForm.value.category_id}`, payload);
    alert("Category updated successfully!");

    // Close modal
    hideModal('editCategoryModal');

    // Re-fetch the list to refresh the table
    await fetchCategories();

  } catch (error) {
    console.error("Error updating category:", error);
    alert(`Failed to update category. Details: ${error.response?.data?.message || error.message}`);
  }
};

// Fetch categories on component mount
onMounted(() => {
  fetchCategories();
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
</style>