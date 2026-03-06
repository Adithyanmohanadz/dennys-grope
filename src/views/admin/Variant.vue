<template>
    <div class="admin-variant">
        <div class="container-fluid py-1">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="fw-bolder mb-0">Variants</h5>
                            <button class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#addVariantModal" @click="resetForm">
                                <i class="fa fa-plus"></i> Add Variant
                            </button>
                        </div>

                        <div class="card-body pt-0">
                            <table ref="variantsTable" class="table table-bordered table-hover table-sm"
                                style="width:100%">
                                <thead class="thead-light bg-dark">
                                    <tr>
                                        <th class="text-center text-white text-sm">SL/No</th>
                                        <th class="text-white text-sm">Category</th>
                                        <th class="text-white text-sm">Variant Type</th>
                                        <th class="text-white text-sm">Variant Name</th>
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

        <div class="modal fade" id="addVariantModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <form @submit.prevent="addVariants">
                        <div class="modal-header">
                            <h5 class="modal-title">Add New Variants</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="form-group mb-3 col-12 col-md-6">
                                    <label class="fw-bold">Select Category <span class="text-danger">*</span></label>
                                    <select v-model="selectedCategory" @change="onCategoryChange" class="form-select"
                                        required>
                                        <option value="">-- Select Category --</option>
                                        <option v-for="category in activeCategories" :key="category.category_id"
                                            :value="category.category_id">
                                            {{ category.category_name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group mb-3 col-12 col-md-6">
                                    <label class="fw-bold">Select Variant Type <span
                                            class="text-danger">*</span></label>
                                    <select v-model="selectedVariantType" class="form-select" required
                                        :disabled="!selectedCategory || loadingVariantTypes">
                                        <option value="">
                                            {{ loadingVariantTypes ? 'Loading...' : '-- Select Variant Type --' }}
                                        </option>
                                        <option v-for="variantType in filteredVariantTypes"
                                            :key="variantType.variant_type_id" :value="variantType.variant_type_id">
                                            {{ variantType.variant_type }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="fw-bold">Variants</label>
                                <div class="row px-3">
                                    <div v-for="(variant, index) in addForm.variants" :key="index"
                                        class="col-12 col-md-6 border rounded p-3 mb-2 position-relative">
                                        <button v-if="addForm.variants.length > 1" type="button"
                                            class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 px-2"
                                            @click="removeVariantField(index)">
                                            <i class="fa fa-times"></i>
                                        </button>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group mb-2">
                                                    <label>Variant Name <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="variant.variant_name"
                                                        class="form-control" required placeholder="e.g., Small, Red" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-sm btn-outline-primary mt-2"
                                    @click="addMoreVariantField">
                                    <i class="fa fa-plus"></i> Add More Variant
                                </button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary" :disabled="addLoading">
                                <span v-if="addLoading" class="spinner-border spinner-border-sm me-1"></span>
                                <i v-else class="fa fa-save"></i> Save All Variants
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="editVariantModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <form @submit.prevent="updateVariant">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Variant</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group mb-3">
                                <label>Category <span class="text-danger">*</span></label>
                                <select v-model="editForm.category_id" @change="onEditCategoryChange"
                                    class="form-select" required>
                                    <option value="">-- Select Category --</option>
                                    <option v-for="category in activeCategories" :key="category.category_id"
                                        :value="category.category_id">
                                        {{ category.category_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group mb-3">
                                <label>Variant Type <span class="text-danger">*</span></label>
                                <select v-model="editForm.variant_type_id" class="form-select" required
                                    :disabled="loadingEditVariantTypes">
                                    <option value="">
                                        {{ loadingEditVariantTypes ? 'Loading...' : '-- Select Variant Type --' }}
                                    </option>
                                    <option v-for="variantType in editFilteredVariantTypes"
                                        :key="variantType.variant_type_id" :value="variantType.variant_type_id">
                                        {{ variantType.variant_type }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group mb-3">
                                <label>Variant Name <span class="text-danger">*</span></label>
                                <input type="text" v-model="editForm.variant" class="form-control" required />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary" :disabled="editLoading">
                                <span v-if="editLoading" class="spinner-border spinner-border-sm me-1"></span>
                                <i v-else class="fa fa-save"></i> Update Variant
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import { adminApi } from "@/services/api";

// ─── Reactive State ───────────────────────────────────────────────────────────
const categories = ref([]);
const variants = ref([]);
const filteredVariantTypes = ref([]);
const editFilteredVariantTypes = ref([]);

const selectedCategory = ref("");
const selectedVariantType = ref("");

const loadingVariantTypes = ref(false);
const loadingEditVariantTypes = ref(false);
const addLoading = ref(false);
const editLoading = ref(false);

const variantsTable = ref(null);
let dataTable = null;

// ─── Form States ──────────────────────────────────────────────────────────────
const addForm = ref({ variants: [{ variant_name: "" }] });
const editForm = ref({ variant_id: null, category_id: "", variant_type_id: "", variant: "" });

// ─── Computed ─────────────────────────────────────────────────────────────────
const activeCategories = computed(() => categories.value);

// ─── API Calls ────────────────────────────────────────────────────────────────

const fetchCategories = async () => {
    try {
        const response = await adminApi.get('/v1/admin/category/active');
        if (response.data.success) categories.value = response.data.data;
    } catch (error) { console.error("Category fetch error:", error); }
};

const fetchVariantTypesByCategory = async (categoryId) => {
    if (!categoryId) return [];
    try {
        const response = await adminApi.get(`/v1/admin/variant-type/fetch/${categoryId}`);
        return response.data.success ? response.data.data : [];
    } catch (error) { return []; }
};

const fetchAllVariants = async () => {
    try {
        const response = await adminApi.get('/v1/admin/variant');
        if (response.data.success) {
            variants.value = response.data.data;
            refreshTable();
        }
    } catch (error) { console.error("Variant fetch error:", error); }
};

const storeVariants = (payload) => adminApi.post('/v1/admin/variant/store', payload);
const updateVariantAPI = (id, payload) => adminApi.put(`/v1/admin/variant/update/${id}`, payload);
const removeVariantAPI = (id) => adminApi.put(`/v1/admin/variant/remove/${id}`);

// ─── Utility Functions ────────────────────────────────────────────────────────

const resetForm = () => {
    selectedCategory.value = "";
    selectedVariantType.value = "";
    filteredVariantTypes.value = [];
    addForm.value = { variants: [{ variant_name: "" }] };
};

const onCategoryChange = async () => {
    selectedVariantType.value = "";
    filteredVariantTypes.value = [];
    if (!selectedCategory.value) return;
    loadingVariantTypes.value = true;
    filteredVariantTypes.value = await fetchVariantTypesByCategory(selectedCategory.value);
    loadingVariantTypes.value = false;
};

const onEditCategoryChange = async () => {
    editForm.value.variant_type_id = "";
    editFilteredVariantTypes.value = [];
    if (!editForm.value.category_id) return;
    loadingEditVariantTypes.value = true;
    editFilteredVariantTypes.value = await fetchVariantTypesByCategory(editForm.value.category_id);
    loadingEditVariantTypes.value = false;
};

const addMoreVariantField = () => addForm.value.variants.push({ variant_name: "" });
const removeVariantField = (index) => addForm.value.variants.splice(index, 1);

const hideModal = (id) => {
    const modalEl = document.getElementById(id);
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }
};

const showModal = (id) => {
    const modalEl = document.getElementById(id);
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
};

// ─── DataTable Logic ──────────────────────────────────────────────────────────

const initializeDataTable = () => {
    if (dataTable) dataTable.destroy();

    // 🔥 REMOVE old events before adding new ones
    $(variantsTable.value).off('click', '.edit-btn');
    $(variantsTable.value).off('click', '.delete-btn');

    dataTable = $(variantsTable.value).DataTable({
        data: variants.value,
        columns: [
            { data: null, render: (d, t, r, meta) => meta.row + 1, className: 'text-center align-middle' },
            { data: 'category_name', className: 'align-middle' },
            { data: 'variant_type_name', className: 'align-middle' },
            { data: 'variant', className: 'align-middle' },
            {
                data: null,
                className: 'text-center align-middle',
                orderable: false,
                render: (data, type, row) => {
                    return `
                        <a href="javascript:;" class="mx-1 edit-btn" data-id="${row.variant_id}" title="Edit">
                            <i class="fas fa-edit text-info"></i>
                        </a>
                        <a href="javascript:;" class="mx-1 delete-btn" data-id="${row.variant_id}" title="Delete">
                            <i class="fas fa-trash text-danger"></i>
                        </a>`;
                }
            }
        ],
        responsive: true,
        order: [[1, 'asc']]
    });

    // Attach events (only once now)
    $(variantsTable.value).on('click', '.edit-btn', function () {
        const id = parseInt($(this).data('id'));
        const variant = variants.value.find(v => v.variant_id === id);
        if (variant) openEditModal(variant);
    });

    $(variantsTable.value).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        confirmDelete(id);
    });
};

const refreshTable = () => {
    if (dataTable) {
        dataTable.clear().rows.add(variants.value).draw();
    } else {
        initializeDataTable();
    }
};

// ─── CRUD Operations ──────────────────────────────────────────────────────────

const addVariants = async () => {
    const variantNames = addForm.value.variants.map(v => v.variant_name.trim()).filter(n => n);
    if (!selectedVariantType.value || variantNames.length === 0) return alert("Missing required fields");

    addLoading.value = true;
    try {
        const res = await storeVariants({ variant_type_id: selectedVariantType.value, variants: variantNames });
        if (res.data.success) {
            hideModal('addVariantModal');
            resetForm();
            await fetchAllVariants();
        }
    } catch (e) { alert("Failed to save"); }
    finally { addLoading.value = false; }
};

const openEditModal = async (variant) => {
    editForm.value = { ...variant, variant: variant.variant };
    loadingEditVariantTypes.value = true;
    editFilteredVariantTypes.value = await fetchVariantTypesByCategory(variant.category_id);
    loadingEditVariantTypes.value = false;
    showModal('editVariantModal');
};

const updateVariant = async () => {
    editLoading.value = true;
    try {
        const res = await updateVariantAPI(editForm.value.variant_id, {
            variant_type_id: editForm.value.variant_type_id,
            variant: editForm.value.variant
        });
        if (res.data.success) {
            hideModal('editVariantModal');
            await fetchAllVariants();
        }
    } catch (e) { alert("Update failed"); }
    finally { editLoading.value = false; }
};

const confirmDelete = async (id) => {
    if (confirm("Are you sure you want to remove this variant?")) {
        try {
            const res = await removeVariantAPI(id);
            if (res.data.success) {
                await fetchAllVariants();
            } else {
                alert(res.data.message);
            }
        } catch (e) { alert("Delete failed"); }
    }
};

onMounted(async () => {
    await fetchCategories();
    await fetchAllVariants();
    initializeDataTable();
});

onBeforeUnmount(() => {
    if (dataTable) {
        $(variantsTable.value).off('click', '.edit-btn');
        $(variantsTable.value).off('click', '.delete-btn');
        dataTable.destroy();
    }
});
</script>

<style scoped>
.badge {
    font-size: 0.65rem !important;
    padding: 0.4em 0.7em !important;
}

.text-info {
    cursor: pointer;
}

.text-danger {
    cursor: pointer;
}
</style>