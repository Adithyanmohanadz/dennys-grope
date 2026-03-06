<template>
  <div class="admin-item-brand">
    <div class="container-fluid py-1">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="fw-bolder mb-0">Item Brands</h5>
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addBrandModal"
                @click="resetForm">
                <i class="fa fa-plus"></i> Add Brand
              </button>
            </div>

            <div class="card-body pt-0">
              <table ref="brandsTable" class="table table-bordered table-hover table-sm" style="width:100%">
                <thead class="thead-light bg-dark">
                  <tr>
                    <th class="text-center text-white text-sm">SL/No</th>
                    <th class="text-white text-sm">Brand Name</th>
                    <th class="text-white text-sm">Brand Code</th>
                    <th class="text-white text-sm text-center">Status</th>
                    <th class="text-center text-white text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- DataTables will populate this -->
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addBrandModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="addBrand">
            <div class="modal-header">
              <h5 class="modal-title">Add New Brand</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>Brand Name</label>
                <input type="text" v-model="addForm.brand_name" class="form-control" required />
              </div>
              <div class="form-group mb-3">
                <label>Brand Code</label>
                <input type="text" v-model="addForm.brand_code" class="form-control" required />
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
                <i class="fa fa-save"></i> Save Brand
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editBrandModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form @submit.prevent="updateBrand">
            <div class="modal-header">
              <h5 class="modal-title">Edit Brand</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label>Brand Name</label>
                <input type="text" v-model="editForm.brand_name" class="form-control" required />
              </div>
              <div class="form-group mb-3">
                <label>Brand Code</label>
                <input type="text" v-model="editForm.brand_code" class="form-control" required />
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
                <i class="fa fa-save"></i> Update Brand
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
// Assuming your 'api' (axios instance with interceptors) is imported from a configuration file
import { api } from "@/services/api"; // axios helper

// State
const brands = ref([]);
const brandsTable = ref(null);
let dataTable = null;

// Separate form states for Add and Edit, using API field names
const defaultFormState = { item_brand_id: null, brand_name: "", brand_code: "", status: 1 };
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

// --- DataTables Initialization ---
const initializeDataTable = () => {
  if (dataTable) {
    dataTable.destroy();
  }

  dataTable = $(brandsTable.value).DataTable({
    data: brands.value,
    columns: [
      {
        data: null,
        render: (data, type, row, meta) => meta.row + 1,
        className: 'text-center align-middle',
        width: '5%',
        orderable: false,
      },
      {
        data: 'brand_name',
        className: 'align-middle'
      },
      {
        data: 'brand_code',
        className: 'align-middle'
      },
      {
        data: 'status',
        className: 'text-center align-middle',
        render: (data) => {
          if (data === 1) {
            return '<span class="badge badge-success">Active</span>';
          }
          return '<span class="badge badge-danger">Inactive</span>';
        }
      },
      {
        data: null,
        className: 'text-center align-middle',
        orderable: false,
        render: (data, type, row) => {
          return `<a href="javascript:;" class="mx-1 edit-btn" data-id="${row.item_brand_id}" title="Edit Brand">
                    <i class="fas fa-edit text-info"></i>
                  </a>`;
        }
      }
    ],
    responsive: true,
    pageLength: 10,
    language: {
      emptyTable: "No brands found.",
      loadingRecords: "Loading item brands...",
      processing: "Processing..."
    },
    order: [[1, '']] // Sort by brand name by default
  });

  // Handle edit button clicks
  $(brandsTable.value).on('click', '.edit-btn', function () {
    const id = $(this).data('id');
    const brand = brands.value.find(b => b.item_brand_id === id);
    if (brand) {
      openEditModal(brand);
    }
  });
};

// --- API Integration Functions ---

/**
 * Fetches item brands from the API (GET v1/admin/item-brand).
 */
const fetchBrands = async () => {
  try {
    const response = await api.get("/v1/admin/item-brand");
    // Filter out items marked as deleted (deleted: 0)
    brands.value = response.data.data.filter(b => b.deleted === 0);

    // Update DataTable with new data
    if (dataTable) {
      dataTable.clear();
      dataTable.rows.add(brands.value);
      dataTable.draw();
    } else {
      initializeDataTable();
    }
  } catch (error) {
    console.error("Error fetching item brands:", error);
    alert("Failed to load item brands. Check console for details.");
  }
};

/**
 * Handles Add New Brand (POST v1/admin/item-brand/store).
 */
const addBrand = async () => {
  if (!addForm.value.brand_name || !addForm.value.brand_code) {
    alert("Please enter both Brand Name and Code.");
    return;
  }

  try {
    const payload = {
      brand_name: addForm.value.brand_name,
      brand_code: addForm.value.brand_code,
      status: addForm.value.status,
    };

    await api.post("/v1/admin/item-brand/store", payload);
    alert("Item Brand added successfully! 🎉");

    // Close modal and reset form
    hideModal('addBrandModal');
    resetForm();

    // Re-fetch the list to refresh the table
    await fetchBrands();

  } catch (error) {
    console.error("Error adding item brand:", error);
    alert(`Failed to add item brand. Details: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Prepares the edit modal with selected brand data.
 */
const openEditModal = (brand) => {
  // Populate the editForm with the selected brand data
  editForm.value = { ...brand };
  // Manually show the edit modal
  showModal('editBrandModal');
};

/**
 * Handles Update Brand (Assumed PUT/PATCH to v1/admin/item-brand/{id}).
 */
const updateBrand = async () => {
  if (!editForm.value.brand_name || !editForm.value.brand_code) {
    alert("Please enter both Brand Name and Code.");
    return;
  }

  try {
    const payload = {
      brand_name: editForm.value.brand_name,
      brand_code: editForm.value.brand_code,
      status: editForm.value.status,
    };

    // FIX APPLIED HERE: Added '/update' to the route
    await api.put(`/v1/admin/item-brand/update/${editForm.value.item_brand_id}`, payload);
    alert("Item Brand updated successfully! 👍");

    // Close modal
    hideModal('editBrandModal');

    // Re-fetch the list to refresh the table
    await fetchBrands();

  } catch (error) {
    console.error("Error updating item brand:", error);
    alert(`Failed to update item brand. Details: ${error.response?.data?.message || error.message}`);
  }
};

// Fetch brands on component mount
onMounted(() => {
  fetchBrands();
});

// Cleanup DataTable on component unmount
onBeforeUnmount(() => {
  if (dataTable) {
    $(brandsTable.value).off('click', '.edit-btn');
    dataTable.destroy();
    dataTable = null;
  }
});
</script>

<style>
.badge {
  font-size: 0.65rem !important;
  padding: 0.4em 0.7em !important;
}

.badge-success {
  background-color: #28a745 !important;
  color: white !important;
}

.badge-danger {
  background-color: #dc3545 !important;
  color: white !important;
}
</style>