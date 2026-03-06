<template>
    <div class="admin-variant-type">
        <div class="container-fluid py-1">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="fw-bolder mb-0">Variant Types</h5>
                            <button class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#addVariantTypeModal" @click="resetForm">
                                <i class="fa fa-plus"></i> Add Variant Type
                            </button>
                        </div>

                        <div class="card-body pt-0">
                            <table ref="variantTypesTable" class="table table-bordered table-hover table-sm"
                                style="width:100%">
                                <thead class="thead-light bg-dark">
                                    <tr>
                                        <th class="text-center text-white text-sm">SL/No</th>
                                        <th class="text-white text-sm">Category</th>
                                        <th class="text-white text-sm">Variant Type Name</th>
                                        <th class="text-center text-white text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="addVariantTypeModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <form @submit.prevent="addVariantTypes">
                        <div class="modal-header">
                            <h5 class="modal-title">Add New Variant Types</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group mb-3">
                                <label class="fw-bold">Select Category <span class="text-danger">*</span></label>
                                <select v-model="selectedCategory" class="form-select" required>
                                    <option value="">-- Select Category --</option>
                                    <option v-for="category in categories" :key="category.category_id"
                                        :value="category.category_id">
                                        {{ category.category_name }}
                                    </option>
                                </select>
                            </div>

                            <hr>

                            <div class="mb-3">
                                <label class="fw-bold">Variant Types</label>
                                <div class="row px-3">
                                    <div v-for="(variant, index) in addForm.variantTypes" :key="index"
                                        class="col-12 col-sm-6 border rounded p-3 mb-2 position-relative">

                                        <button v-if="addForm.variantTypes.length > 1" type="button"
                                            class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 px-2"
                                            @click="removeVariantField(index)">
                                            <i class="fa fa-times"></i>
                                        </button>

                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group mb-2">
                                                    <label>Variant Type Name <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="variant.variant_type_name"
                                                        class="form-control" required placeholder="e.g., Size, Color" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" class="btn btn-sm btn-outline-primary mt-2"
                                    @click="addMoreVariantField">
                                    <i class="fa fa-plus"></i> Add More Variant Type
                                </button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                                <i class="fa fa-save"></i> Save All Variant Types
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="editVariantTypeModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <form @submit.prevent="updateVariantType">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Variant Type</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group mb-3">
                                <label>Category <span class="text-danger">*</span></label>
                                <select v-model="editForm.category_id" class="form-select" required>
                                    <option value="">-- Select Category --</option>
                                    <option v-for="category in categories" :key="category.category_id"
                                        :value="category.category_id">
                                        {{ category.category_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group mb-3">
                                <label>Variant Type Name</label>
                                <input type="text" v-model="editForm.variant_type" class="form-control" required />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fa fa-save"></i> Update Variant Type
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
import { api } from "@/services/api";
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

// --- State ---
const categories = ref([]);
const variantTypes = ref([]);
const variantTypesTable = ref(null);
let dataTable = null;

const selectedCategory = ref("");
const addForm = ref({
    variantTypes: [{ variant_type_name: "" }]
});

const editForm = ref({
    variant_type_id: null,
    category_id: "",
    variant_type: ""
});

// --- API Methods ---

// Fetch Active Categories
const fetchCategories = async () => {
    try {
        const response = await api.get("/v1/admin/category/active");
        if (response.data.success) {
            categories.value = response.data.data;
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

// Fetch Variant Types List
const fetchVariantTypes = async () => {
    try {
        const response = await api.get("/v1/admin/variant-type");
        if (response.data.success) {
            variantTypes.value = response.data.data;
            refreshTable();
        }
    } catch (error) {
        console.error("Error loading variant types:", error);
    }
};

// Store Multiple Variants
const addVariantTypes = async () => {
    if (!selectedCategory.value) return alert("Please select a category.");

    const payload = {
        category_id: selectedCategory.value,
        variants: addForm.value.variantTypes
            .map(v => v.variant_type_name)
            .filter(name => name.trim() !== "")
    };

    if (payload.variants.length === 0) return alert("Enter at least one variant.");

    try {
        const response = await api.post("/v1/admin/variant-type/store", payload);
        if (response.data.success) {
            hideModal('addVariantTypeModal');
            alert(response.data.message);
            resetForm();
            await fetchVariantTypes();
        }
    } catch (error) {
        alert("Failed to save variant types.");
    }
};

// Update Single Variant
const updateVariantType = async () => {
    try {
        const payload = {
            category_id: editForm.value.category_id,
            variant_type: editForm.value.variant_type
        };
        const response = await api.put(`/v1/admin/variant-type/update/${editForm.value.variant_type_id}`, payload);
        if (response.data.success) {
            alert(response.data.message);
            hideModal('editVariantTypeModal');
            await fetchVariantTypes();
        }
    } catch (error) {
        console.error("Update failed:", error);
    }
};

// Remove Variant
const removeVariant = async (id) => {
    if (!confirm("Are you sure you want to remove this variant?")) return;
    try {
        const response = await api.put(`/v1/admin/variant-type/remove/${id}`);
        if (response.data.success) {
            alert(response.data.message);
            await fetchVariantTypes();
        }
    } catch (error) {
        console.error("Remove failed:", error);
    }
};

// --- Table Logic ---

const initializeDataTable = () => {
    dataTable = $(variantTypesTable.value).DataTable({
        data: variantTypes.value,
        columns: [
            { data: null, render: (d, t, r, m) => m.row + 1, className: 'text-center align-middle', width: '5%' },
            {
                data: 'category_id',
                className: 'align-middle',
                render: (id) => {
                    const cat = categories.value.find(c => c.category_id == id);
                    return cat ? cat.category_name : 'N/A';
                }
            },
            { data: 'variant_type', className: 'align-middle' },
             
            {
                data: null,
                className: 'text-center align-middle',
                orderable: false,
                width: '15%',
                render: (data, type, row) => `
                    <a href="javascript:;" class="mx-2 edit-btn" data-id="${row.variant_type_id}"><i class="fas fa-edit text-info"></i></a>
                    <a href="javascript:;" class="mx-2 delete-btn" data-id="${row.variant_type_id}"><i class="fas fa-trash text-danger"></i></a>`
            },
        ]
    });

    $(variantTypesTable.value).on('click', '.edit-btn', function () {
        const item = variantTypes.value.find(v => v.variant_type_id == $(this).data('id'));
        if (item) {
            editForm.value = {
                variant_type_id: item.variant_type_id,
                category_id: item.category_id,
                variant_type: item.variant_type
            };
            showModal('editVariantTypeModal');
        }
    });

    $(variantTypesTable.value).on('click', '.delete-btn', function () {
        removeVariant($(this).data('id'));
    });
};

const refreshTable = () => {
    if (dataTable) {
        dataTable.clear().rows.add(variantTypes.value).draw();
    } else {
        initializeDataTable();
    }
};

// --- Helpers ---
const resetForm = () => {
    selectedCategory.value = "";
    addForm.value.variantTypes = [{ variant_type_name: "" }];
};
const addMoreVariantField = () => addForm.value.variantTypes.push({ variant_type_name: "" });
const removeVariantField = (index) => addForm.value.variantTypes.splice(index, 1);

const showModal = (id) => {
    const el = document.getElementById(id);
    if (el) new bootstrap.Modal(el).show();
};
const hideModal = (id) => {
    const el = document.getElementById(id);
    bootstrap.Modal.getInstance(el);
};

onMounted(async () => {
    await fetchCategories(); // Get categories first for table rendering
    await fetchVariantTypes();
});

onBeforeUnmount(() => {
    if (dataTable) dataTable.destroy();
});
</script>

<style scoped>
.badge-success {
    background-color: #28a745 !important;
    color: white !important;
}

.badge {
    font-size: 0.75rem;
    padding: 0.4em 0.6em;
}
</style>