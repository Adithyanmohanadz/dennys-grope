<template>
    <div class="admin-item-info">
        <!-- Notification Toast -->
        <div v-if="showNotificationFlag" class="notification-toast" :class="`bg-${notificationType}`">
            <div class="d-flex align-items-center gap-2">
                <i class="fas" :class="{
                    'fa-check-circle': notificationType === 'success',
                    'fa-info-circle': notificationType === 'info',
                    'fa-exclamation-triangle': notificationType === 'warning',
                    'fa-exclamation-circle': notificationType === 'danger'
                }"></i>
                <span class="flex-grow-1">{{ notificationMessage }}</span>
                <button @click="closeNotification" class="btn-close btn-close-white ms-2" type="button"></button>
            </div>
        </div>

        <div class="container-fluid px-1 px-md-4">
            <form @submit.prevent="submitForm">
                <div class="row">
                    <div class="col-lg-12 mt-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="font-weight-bolder mb-0">Item Information</h5>

                                <div class="row mt-3">
                                    <div class="col-12 col-md-4">
                                        <div class="form-group">
                                            <label for="itemCategory">Select Category</label>
                                            <select v-model="formData.category" class="form-control" id="itemCategory"
                                                required @change="onCategoryChange">
                                                <option value="" disabled>Select Category</option>
                                                <option v-for="cat in categories" :key="cat.category_id"
                                                    :value="cat.category_id">
                                                    {{ cat.category_name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <label>Item Name</label>
                                        <input v-model="formData.itemName" class="form-control" type="text"
                                            placeholder="Item Name" required />
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <label>Item Alias</label>
                                        <input v-model="formData.itemAlias" class="form-control" type="text"
                                            placeholder="Item Alias" />
                                    </div>
                                </div>

                                <!-- ── Variants Section with Quantity Type Tabs ──────────────────────────────── -->
                                <div class="col-12 mt-4">
                                    <div class="card">
                                        <div class="card-header px-3 py-3">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <h5 class="fw-bolder mb-0">Variant Groups by Quantity Type</h5>
                                                    <p class="text-muted text-xs mb-0">
                                                        Organize variant combinations by Wholesale, Retail, or Sample
                                                        pricing
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card-body p-3">
                                            <!-- Quantity Type Tabs -->
                                            <ul class="nav nav-tabs qty-type-tabs mb-3" role="tablist">
                                                <li class="nav-item" v-for="qType in quantityTypes"
                                                    :key="qType.quantity_type_id">
                                                    <button class="nav-link qty-tab-btn" :class="{
                                                        'active': activeQtyTypeTab === qType.quantity_type_id,
                                                        'tab-retail': isRetailType(qType.quantity_type_id),
                                                        'tab-wholesale': isWholesaleType(qType.quantity_type_id),
                                                        'tab-sample': isSampleType(qType.quantity_type_id)
                                                    }" @click="activeQtyTypeTab = qType.quantity_type_id"
                                                        type="button">
                                                        <span class="qty-tab-emoji">{{ getQtyTypeEmoji(qType)
                                                        }}</span>
                                                        {{ qType.quantity_type_name }}
                                                        <span class="badge ms-2"
                                                            v-if="getVariantCountForQtyType(qType.quantity_type_id) > 0">
                                                            {{ getVariantCountForQtyType(qType.quantity_type_id) }}
                                                        </span>
                                                    </button>
                                                </li>
                                            </ul>

                                            <!-- Tab Content -->
                                            <div class="tab-content">
                                                <div v-for="qType in quantityTypes"
                                                    :key="`tab-${qType.quantity_type_id}`" class="tab-pane fade"
                                                    :class="{ 'show active': activeQtyTypeTab === qType.quantity_type_id }">

                                                    <!-- Add Variant Button -->
                                                    <div class="mb-3">
                                                        <button
                                                            @click="openAddVariantModalForQtyType(qType.quantity_type_id)"
                                                            type="button" class="btn btn-sm" :class="{
                                                                'btn-retail': isRetailType(qType.quantity_type_id),
                                                                'btn-wholesale': isWholesaleType(qType.quantity_type_id),
                                                                'btn-sample': isSampleType(qType.quantity_type_id)
                                                            }" :disabled="!formData.category">
                                                            <i class="fa-solid fa-plus me-1"></i>
                                                            Add {{ qType.quantity_type_name }} Variant Group
                                                        </button>
                                                        <small class="text-muted ms-2" v-if="!formData.category">
                                                            Select a category first
                                                        </small>
                                                    </div>

                                                    <!-- Variants Table for this Qty Type -->
                                                    <div v-if="getVariantsForQtyType(qType.quantity_type_id).length > 0"
                                                        class="table-responsive">
                                                        <table class="table table-flush align-items-center mb-0">
                                                            <thead class="bg-dark">
                                                                <tr>
                                                                    <th
                                                                        class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                                        #</th>
                                                                    <th
                                                                        class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                                        Variant Types</th>
                                                                    <th
                                                                        class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                                        Options Summary</th>
                                                                    <th
                                                                        class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                                        Combinations</th>
                                                                    <th
                                                                        class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                                        Price Range</th>
                                                                    <th
                                                                        class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                                        Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <template
                                                                    v-for="(variant, vIndex) in getVariantsForQtyType(qType.quantity_type_id)"
                                                                    :key="vIndex">
                                                                    <tr>
                                                                        <td class="align-middle text-center">
                                                                            <span class="text-xs font-weight-bold">{{
                                                                                vIndex + 1 }}</span>
                                                                        </td>

                                                                        <td class="align-middle">
                                                                            <div class="d-flex flex-wrap gap-1">
                                                                                <span
                                                                                    v-for="(vt, vtIdx) in variant.variantTypes"
                                                                                    :key="vtIdx"
                                                                                    class="badge aii-type-badge">
                                                                                    {{ vt.typeName ||
                                                                                        getVariantTypeLabel(vt.typeId) }}
                                                                                </span>
                                                                            </div>
                                                                        </td>

                                                                        <td class="align-middle">
                                                                            <div class="d-flex flex-wrap gap-1">
                                                                                <span
                                                                                    v-for="(vt, vtIdx) in variant.variantTypes"
                                                                                    :key="vtIdx"
                                                                                    class="text-xs text-muted">
                                                                                    <strong>{{ vt.typeName ||
                                                                                        getVariantTypeLabel(vt.typeId)
                                                                                        }}:</strong>
                                                                                    {{vt.options.map(o =>
                                                                                    o.label).join(', ') }}
                                                                                    <span
                                                                                        v-if="vtIdx < variant.variantTypes.length - 1">
                                                                                        &nbsp;|&nbsp;
                                                                                    </span>
                                                                                </span>
                                                                            </div>
                                                                        </td>

                                                                        <td class="align-middle">
                                                                            <div
                                                                                class="d-flex align-items-center gap-2">
                                                                                <span
                                                                                    class="badge badge-sm bg-gradient-info">
                                                                                    {{ variant.quantities.length }}
                                                                                    Combos
                                                                                </span>
                                                                                <a @click="toggleQuantityView(variant.originalIndex)"
                                                                                    href="javascript:;"
                                                                                    class="text-xs text-primary">
                                                                                    <i class="fas"
                                                                                        :class="expandedVariants.includes(variant.originalIndex) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                                                                                    {{
                                                                                        expandedVariants.includes(variant.originalIndex)
                                                                                            ? 'Hide' : 'View' }}
                                                                                </a>
                                                                            </div>
                                                                        </td>

                                                                        <td class="align-middle">
                                                                            <span class="text-xs fw-semibold">{{
                                                                                getPriceRange(variant) }}</span>
                                                                        </td>

                                                                        <td class="align-middle text-center">
                                                                            <a @click="openEditVariantModal(variant.originalIndex)"
                                                                                href="javascript:;" class="me-2"
                                                                                title="Edit">
                                                                                <i class="fas fa-edit text-primary"></i>
                                                                            </a>
                                                                            <a @click="removeVariant(variant.originalIndex)"
                                                                                href="javascript:;" title="Delete">
                                                                                <i class="fas fa-trash text-danger"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>

                                                                    <!-- Expandable Combinations Detail -->
                                                                    <tr
                                                                        v-if="expandedVariants.includes(variant.originalIndex)">
                                                                        <td :colspan="6" class="p-0">
                                                                            <div class="aii-combo-detail">
                                                                                <div class="table-responsive">
                                                                                    <table class="table table-sm mb-0">
                                                                                        <thead class="bg-light">
                                                                                            <tr>
                                                                                                <th
                                                                                                    class="text-xs fw-bold text-center">
                                                                                                    #</th>
                                                                                                <th v-for="(vt, vtIdx) in variant.variantTypes"
                                                                                                    :key="vtIdx"
                                                                                                    class="text-xs fw-bold">
                                                                                                    {{ vt.typeName ||
                                                                                                        getVariantTypeLabel(vt.typeId)
                                                                                                    }}
                                                                                                </th>
                                                                                                <th
                                                                                                    class="text-xs fw-bold text-center">
                                                                                                    Unit</th>
                                                                                                <th
                                                                                                    class="text-xs fw-bold text-center">
                                                                                                    Qty</th>
                                                                                                <th
                                                                                                    class="text-xs fw-bold text-center">
                                                                                                    Price</th>
                                                                                                <th
                                                                                                    class="text-xs fw-bold text-center">
                                                                                                    Discount</th>
                                                                                                <!-- NEW: Tax Included column -->
                                                                                                <th
                                                                                                    class="text-xs fw-bold text-center">
                                                                                                    Tax</th>
                                                                                                <th
                                                                                                    class="text-xs fw-bold text-center">
                                                                                                    Tax Type</th>
                                                                                                <th
                                                                                                    class="text-xs fw-bold text-center">
                                                                                                    Final Price</th>
                                                                                                <th
                                                                                                    class="text-center text-xs fw-bold">
                                                                                                    Action</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr v-for="(qty, qIndex) in variant.quantities"
                                                                                                :key="qIndex">
                                                                                                <td
                                                                                                    class="text-xs text-center">
                                                                                                    {{ qIndex + 1 }}
                                                                                                </td>
                                                                                                <td v-for="(vt, vtIdx) in variant.variantTypes"
                                                                                                    :key="vtIdx"
                                                                                                    class="text-xs ">
                                                                                                    <span
                                                                                                        class="aii-combo-tag">
                                                                                                        {{
                                                                                                            getOptionLabel(vt,
                                                                                                                qty.variantSelections[vtIdx])
                                                                                                        }}
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td
                                                                                                    class="text-xs text-center">
                                                                                                    {{
                                                                                                        getQtyUnitLabel(qty.unit)
                                                                                                    }}</td>
                                                                                                <td
                                                                                                    class="text-xs text-center">
                                                                                                    {{ qty.amount }}
                                                                                                </td>
                                                                                                <td
                                                                                                    class="text-xs text-center">
                                                                                                    ₹{{
                                                                                                        parseFloat(qty.price).toFixed(2)
                                                                                                    }}</td>
                                                                                                <td
                                                                                                    class="text-xs text-center">
                                                                                                    {{
                                                                                                        qty.discount
                                                                                                    }}%</td>
                                                                                                <!-- NEW: Tax Included badge -->
                                                                                                <td
                                                                                                    class="text-xs text-center">
                                                                                                    <span
                                                                                                        :class="qty.taxIncluded ? 'badge-tax-incl' : 'badge-tax-excl'"
                                                                                                        class="aii-tax-badge">
                                                                                                        {{
                                                                                                            qty.taxIncluded
                                                                                                                ? 'Incl.' :
                                                                                                                'Excl.' }}
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td
                                                                                                    class="text-xs text-center">
                                                                                                    {{
                                                                                                        getTaxTypeLabel(qty.taxTypeId)
                                                                                                    }}</td>
                                                                                                <td
                                                                                                    class="text-xs fw-bold text-success text-center">
                                                                                                    ₹{{
                                                                                                        calculateFinalPrice(qty)
                                                                                                    }}</td>
                                                                                                <td class="text-center">
                                                                                                    <a @click="removeQuantityFromVariant(variant.originalIndex, qIndex)"
                                                                                                        href="javascript:;"
                                                                                                        title="Delete"
                                                                                                        v-if="variant.quantities.length > 1">
                                                                                                        <i
                                                                                                            class="fas fa-trash text-danger text-xs"></i>
                                                                                                    </a>
                                                                                                    <span v-else
                                                                                                        class="text-muted text-xs">Required</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </template>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <!-- Empty State -->
                                                    <div v-else class="text-center py-5">
                                                        <i class="fas fa-layer-group fa-3x text-muted mb-3"></i>
                                                        <p class="text-muted mb-1 fw-semibold">No {{
                                                            qType.quantity_type_name }} variant groups yet</p>
                                                        <p class="text-muted text-xs mb-0">
                                                            Click "Add {{ qType.quantity_type_name }} Variant Group"
                                                            to create pricing combinations
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Description -->
                                <div class="row mt-3">
                                    <div class="col-12 col-md-6">
                                        <label class="mt-2">Description</label>
                                        <textarea v-model="formData.description" class="form-control"
                                            placeholder="Item Description" rows="3" required></textarea>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label class="mt-2">Additional Information</label>
                                        <textarea v-model="formData.additionalInfo" class="form-control"
                                            placeholder="Additional Information" rows="3"></textarea>
                                    </div>
                                </div>

                                <!-- Images Section -->
                                <div class="row mt-3">
                                    <div class="col-12 col-md-3 mt-2">
                                        <label class="mb-2">Main Image</label>
                                        <div class="proof">
                                            <div :class="['imgArea', { active: mainImagePreview }]"
                                                :data-title="mainImageFileName" @click="triggerMainImageUpload">
                                                <input type="file" ref="mainImageInput" @change="handleMainImageUpload"
                                                    hidden accept="image/*" />
                                                <template v-if="!mainImagePreview">
                                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                                    <h5>Upload image</h5>
                                                    <p>image size must be less than <span>1MB</span></p>
                                                </template>
                                                <img v-if="mainImagePreview" :src="mainImagePreview"
                                                    alt="Main Image Preview" class="uploaded-image" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-9 mt-2">
                                        <div class="card card-body py-2">
                                            <div class="d-flex justify-content-between align-items-center mb-2">
                                                <h5 class="font-weight-bolder mb-0">Sub Images</h5>
                                                <button type="button" class="btn btn-primary btn-sm"
                                                    @click="addSubImage">
                                                    + Add Sub Image
                                                </button>
                                            </div>
                                            <div class="row" v-if="formData.subImages.length > 0">
                                                <div v-for="(subImage, index) in formData.subImages"
                                                    :key="`subImage-${index}`" class="col-md-4 mt-2">
                                                    <div class="sub-image-container">
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mb-2">
                                                            <label class="mb-0">Sub Image {{ index + 1
                                                            }}</label>
                                                            <button type="button"
                                                                class="btn btn-danger btn-sm px-2 py-1 mb-0"
                                                                @click="removeSubImage(index)">
                                                                Remove
                                                            </button>
                                                        </div>
                                                        <input class="form-control" type="file"
                                                            @change="handleSubImageUpload(index, $event)"
                                                            accept="image/*" />
                                                        <div v-if="subImage.preview" class="mt-2">
                                                            <img :src="subImage.preview" alt="Sub Image Preview"
                                                                class="sub-image-preview" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else class="text-center py-4 text-muted">
                                                <p>No sub images added yet. Click "Add Sub Image" to add
                                                    images.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Submit -->
                <div class="row mt-3">
                    <div class="col-lg-4 ms-auto">
                        <button type="submit" class="btn btn-lg bg-gradient-dark w-100" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Submitting...' : 'Submit Item' }}
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <!-- Variant Modal -->
        <VariantModal :variant="editingVariant" :variantIndex="editingVariantIndex" :categoryId="formData.category"
            :taxTypes="taxTypes" :quantityTypes="quantityTypes" :units="units"
            :preSelectedQtyTypeId="preSelectedQtyTypeId" modalId="variantModal" @save="handleVariantSave" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { api } from '@/services/api'
import VariantModal from '@/views/components/admin/VariantModal.vue'

// ── State ──────────────────────────────────────────────────────────────────────
const mainImageInput = ref(null)
const mainImagePreview = ref('')
const mainImageFileName = ref('')
const isSubmitting = ref(false)
const editingVariant = ref(null)
const editingVariantIndex = ref(-1)
const preSelectedQtyTypeId = ref(null)
const notificationMessage = ref('')
const notificationType = ref('success')
const showNotificationFlag = ref(false)
const expandedVariants = ref([])
const activeQtyTypeTab = ref(null)

const categories = ref([])
const variantTypesMap = ref({})
const taxTypes = ref([])
const quantityTypes = ref([])
const units = ref([])

const formData = reactive({
    itemName: '',
    itemAlias: '',
    category: '',
    description: '',
    additionalInfo: '',
    mainImage: null,
    subImages: [],
    variants: []
})

// ── Lifecycle ──────────────────────────────────────────────────────────────────
onMounted(async () => {
    await Promise.all([
        fetchCategories(),
        fetchTaxTypes(),
        fetchQuantityTypes(),
        fetchUnits()
    ])
    if (quantityTypes.value.length > 0) {
        activeQtyTypeTab.value = quantityTypes.value[0].quantity_type_id
    }
})

// ── API calls ──────────────────────────────────────────────────────────────────
const fetchCategories = async () => {
    try {
        const response = await api.get('/v1/admin/category/active')
        if (response.data.success) categories.value = response.data.data
    } catch (error) {
        console.error('Error fetching categories:', error)
        showNotification('Failed to load categories', 'danger')
    }
}

const fetchTaxTypes = async () => {
    try {
        const response = await api.get('/v1/admin/tax-type/active')
        if (response.data.success) taxTypes.value = response.data.data
    } catch (error) {
        console.error('Error fetching tax types:', error)
        showNotification('Failed to load tax types', 'danger')
    }
}

const fetchQuantityTypes = async () => {
    try {
        const response = await api.get('/v1/admin/quantity-types')
        if (response.data.success) quantityTypes.value = response.data.data
    } catch (error) {
        console.error('Error fetching quantity types:', error)
        showNotification('Failed to load quantity types', 'danger')
    }
}

const fetchUnits = async () => {
    try {
        const response = await api.get('/v1/admin/units')
        if (response.data.success) units.value = response.data.data
    } catch (error) {
        console.error('Error fetching units:', error)
        showNotification('Failed to load units', 'danger')
    }
}

const onCategoryChange = () => {
    if (formData.variants.length > 0) {
        if (confirm('Changing category will clear all variant groups. Continue?')) {
            formData.variants = []
        }
    }
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const getVariantTypeLabel = (typeId) => {
    // First try to get from the variant's stored typeName
    // Otherwise search in variantTypesMap
    for (const categoryTypes of Object.values(variantTypesMap.value)) {
        const found = categoryTypes.find(vt => vt.variant_type_id == typeId)
        if (found) return found.variant_type
    }
    return `Type ${typeId}`
}

const getOptionLabel = (variantType, optionValue) => {
    const opt = variantType.options?.find(o => o.value == optionValue)
    return opt?.label || optionValue || '—'
}

const getQtyTypeLabel = (type) => {
    const found = quantityTypes.value.find(qt => qt.quantity_type_id == type)
    return found?.quantity_type_name || ({ '1': 'Retail', '2': 'Wholesale', '3': 'Sample' })[type] || 'Unknown'
}

const isRetailType = (typeId) => {
    const qType = quantityTypes.value.find(qt => qt.quantity_type_id == typeId)
    return qType?.quantity_type_name?.toLowerCase().includes('retail') || typeId === '1'
}

const isWholesaleType = (typeId) => {
    const qType = quantityTypes.value.find(qt => qt.quantity_type_id == typeId)
    return qType?.quantity_type_name?.toLowerCase().includes('wholesale') || typeId === '2'
}

const isSampleType = (typeId) => {
    const qType = quantityTypes.value.find(qt => qt.quantity_type_id == typeId)
    return qType?.quantity_type_name?.toLowerCase().includes('sample') || typeId === '3'
}

const getQtyTypeEmoji = (qType) => {
    const name = qType.quantity_type_name?.toLowerCase() || ''
    if (name.includes('retail')) return '🔵'
    if (name.includes('wholesale')) return '🟢'
    if (name.includes('sample')) return '🟡'
    return '⚪'
}

const getVariantsForQtyType = (qtyTypeId) => {
    return formData.variants
        .map((variant, index) => {
            if (variant.quantities.length === 0) return null
            const groupQtyType = variant.quantities[0].type
            if (groupQtyType != qtyTypeId) return null
            return { ...variant, originalIndex: index }
        })
        .filter(v => v !== null)
}

const getVariantCountForQtyType = (qtyTypeId) => getVariantsForQtyType(qtyTypeId).length

const getQtyUnitLabel = (unit) => {
    const found = units.value.find(u => u.unit_id == unit)
    return found?.unit_name || ({ '1': 'KG', '2': 'Package' })[unit] || 'Unknown'
}

const getTaxTypeLabel = (taxTypeId) => {
    if (!taxTypeId) return 'No Tax'
    const found = taxTypes.value.find(t => t.tax_type_id == taxTypeId)
    return found?.tax_type || `Tax ${taxTypeId}`
}

// ── NEW: Tax calculation logic ─────────────────────────────────────────────────
/**
 * Calculate final price based on taxIncluded flag:
 *
 * Tax EXCLUDED (taxIncluded = false) — traditional flow:
 *   discounted = price - (price * discount / 100)
 *   final = discounted + (discounted * gstRate / 100)
 *
 * Tax INCLUDED (taxIncluded = true) — price already has tax baked in:
 *   final = price - (price * discount / 100)
 *   (no additional tax is added; the price itself already contains GST)
 */
const calculateFinalPrice = (qty) => {
    const price = parseFloat(qty.price) || 0
    const discount = parseFloat(qty.discount) || 0
    const gstRate = parseFloat(qty.gstRate) || 0
    const discounted = price - (price * discount / 100)

    if (qty.taxIncluded) {
        // Price already includes tax; just apply discount
        return discounted.toFixed(2)
    } else {
        // Add GST on top of discounted price
        return (discounted + discounted * gstRate / 100).toFixed(2)
    }
}

/**
 * For Tax Included prices, back-calculate the GST-excluded base price.
 * base_excl = tax_incl_price / (1 + gstRate / 100)
 */
const calculateGstExcludedPrice = (qty) => {
    const price = parseFloat(qty.price) || 0
    const discount = parseFloat(qty.discount) || 0
    const gstRate = parseFloat(qty.gstRate) || 0
    const discounted = price - (price * discount / 100)

    if (qty.taxIncluded && gstRate > 0) {
        return parseFloat((discounted / (1 + gstRate / 100)).toFixed(2))
    }
    // Tax excluded: discounted price IS the GST-excluded price
    return parseFloat(discounted.toFixed(2))
}

const getPriceRange = (variant) => {
    if (!variant.quantities?.length) return 'N/A'
    const prices = variant.quantities.map(qty => parseFloat(calculateFinalPrice(qty)))
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    return min === max ? `₹${min.toFixed(2)}` : `₹${min.toFixed(2)} – ₹${max.toFixed(2)}`
}

// ── Duplicate detection ────────────────────────────────────────────────────────
const sameVariantTypeSet = (a, b) => {
    const aIds = a.variantTypes.map(vt => vt.typeId).sort().join(',')
    const bIds = b.variantTypes.map(vt => vt.typeId).sort().join(',')
    return aIds === bIds
}

const sameQuantity = (a, b) =>
    JSON.stringify(a.variantSelections) === JSON.stringify(b.variantSelections) &&
    a.type === b.type && a.unit === b.unit && a.amount === b.amount &&
    parseFloat(a.price) === parseFloat(b.price) &&
    parseFloat(a.discount) === parseFloat(b.discount) &&
    parseFloat(a.gstRate) === parseFloat(b.gstRate) &&
    !!a.taxIncluded === !!b.taxIncluded  // also compare taxIncluded flag

// ── Variant Modal ──────────────────────────────────────────────────────────────
const openAddVariantModalForQtyType = (qtyTypeId) => {
    if (!formData.category) {
        showNotification('Please select a category first', 'warning')
        return
    }
    editingVariant.value = null
    editingVariantIndex.value = -1
    preSelectedQtyTypeId.value = qtyTypeId
    const modal = new bootstrap.Modal(document.getElementById('variantModal'))
    modal.show()
}

const openEditVariantModal = (index) => {
    editingVariant.value = formData.variants[index]
    editingVariantIndex.value = index
    preSelectedQtyTypeId.value = null
    const modal = new bootstrap.Modal(document.getElementById('variantModal'))
    modal.show()
}

const handleVariantSave = ({ variant, index, isEditMode }) => {
    const qtyTypes = new Set(variant.quantities.map(q => q.type))
    if (qtyTypes.size > 1) {
        showNotification('All combinations must use the same Quantity Type', 'danger')
        return
    }
    if (qtyTypes.size === 0 || !variant.quantities[0].type) {
        showNotification('Please select a Quantity Type for all combinations', 'warning')
        return
    }

    variant.quantityTypeId = variant.quantities[0].type

    if (isEditMode) {
        formData.variants[index] = variant
        showNotification('Variant group updated successfully!', 'success')
    } else {
        const dupIdx = formData.variants.findIndex(v =>
            v.quantityTypeId == variant.quantityTypeId && sameVariantTypeSet(v, variant)
        )

        if (dupIdx !== -1) {
            const existing = formData.variants[dupIdx]
            const newQtys = []
            const dupQtys = []

            variant.quantities.forEach(newQty => {
                const isDup = existing.quantities.some(eq => sameQuantity(eq, newQty))
                isDup ? dupQtys.push(newQty) : newQtys.push(newQty)
            })

            if (newQtys.length > 0) existing.quantities.push(...newQtys)

            if (newQtys.length > 0 && dupQtys.length > 0) {
                showNotification(`${newQtys.length} new combinations added. ${dupQtys.length} duplicates skipped.`, 'warning')
            } else if (newQtys.length > 0) {
                showNotification(`${newQtys.length} combinations merged into existing variant group.`, 'info')
            } else {
                showNotification('All combinations already exist. No changes made.', 'warning')
            }
        } else {
            formData.variants.push(variant)
            showNotification(`Variant group added with ${variant.quantities.length} combinations!`, 'success')
        }
    }
    editingVariant.value = null
    editingVariantIndex.value = -1
}

const removeVariant = (index) => {
    if (confirm('Are you sure you want to delete this variant group?')) {
        formData.variants.splice(index, 1)
        showNotification('Variant group deleted.', 'success')
    }
}

// ── Expand/collapse ────────────────────────────────────────────────────────────
const toggleQuantityView = (variantIndex) => {
    const idx = expandedVariants.value.indexOf(variantIndex)
    idx > -1
        ? expandedVariants.value.splice(idx, 1)
        : expandedVariants.value.push(variantIndex)
}

const removeQuantityFromVariant = (variantIndex, qtyIndex) => {
    const variant = formData.variants[variantIndex]
    if (variant.quantities.length <= 1) {
        showNotification('Cannot delete the last combination.', 'warning')
        return
    }
    if (confirm('Delete this combination?')) {
        variant.quantities.splice(qtyIndex, 1)
        showNotification('Combination deleted.', 'success')
    }
}

// ── Notifications ──────────────────────────────────────────────────────────────
const showNotification = (message, type = 'success') => {
    notificationMessage.value = message
    notificationType.value = type
    showNotificationFlag.value = true
    setTimeout(() => { showNotificationFlag.value = false }, 4000)
}

const closeNotification = () => { showNotificationFlag.value = false }

// ── Images ─────────────────────────────────────────────────────────────────────
const triggerMainImageUpload = () => mainImageInput.value?.click()

const handleMainImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 1097152) { alert('Image must be less than 1MB'); return }
    const reader = new FileReader()
    reader.onload = (ev) => {
        mainImagePreview.value = ev.target.result
        mainImageFileName.value = file.name
        formData.mainImage = file
    }
    reader.readAsDataURL(file)
}

const addSubImage = () => formData.subImages.push({ file: null, preview: null })
const removeSubImage = (index) => formData.subImages.splice(index, 1)

const handleSubImageUpload = (index, event) => {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
        formData.subImages[index].file = file
        formData.subImages[index].preview = ev.target.result
    }
    reader.readAsDataURL(file)
}

// ── Submit ─────────────────────────────────────────────────────────────────────
const submitForm = async () => {
    if (formData.variants.length === 0) {
        alert('Please add at least one variant group before submitting.')
        return
    }

    isSubmitting.value = true
    try {
        const transformedData = transformToBackendFormat()
        const formDataToSend = new FormData()

        formDataToSend.append('item_name', transformedData.item_name)
        formDataToSend.append('item_alias_code', transformedData.item_alias_code)
        formDataToSend.append('category_id', transformedData.category_id)
        formDataToSend.append('description', transformedData.description)
        formDataToSend.append('additional_information', transformedData.additional_information)

        transformedData.item_variant_types.forEach((ivt, index) => {
            formDataToSend.append(`item_variant_types[${index}][quantity_type_id]`, ivt.quantity_type_id)
            ivt.variant_type_ids.forEach((vtId, vtIndex) => {
                formDataToSend.append(`item_variant_types[${index}][variant_type_ids][${vtIndex}]`, vtId)
            })
        })

        transformedData.sub_items.forEach((item, index) => {
            formDataToSend.append(`sub_items[${index}][quantity_type_id]`, item.quantity_type_id)
            formDataToSend.append(`sub_items[${index}][unit_id]`, item.unit_id)
            formDataToSend.append(`sub_items[${index}][quantity]`, item.quantity)
            formDataToSend.append(`sub_items[${index}][price]`, item.price)
            formDataToSend.append(`sub_items[${index}][discount]`, item.discount)
            formDataToSend.append(`sub_items[${index}][gst_excluded_price]`, item.gst_excluded_price)

            if (item.tax_type_id !== null && item.tax_type_id !== undefined) {
                formDataToSend.append(`sub_items[${index}][tax_type_id]`, item.tax_type_id)
            }

            formDataToSend.append(`sub_items[${index}][gst_included_price]`, item.gst_included_price)
            // NEW: send tax_included flag so backend knows whether price was entered with tax
            formDataToSend.append(`sub_items[${index}][tax_included]`, item.tax_included ? 1 : 0)

            item.variants.forEach((variantId, vIndex) => {
                formDataToSend.append(`sub_items[${index}][variants][${vIndex}]`, variantId)
            })
        })

        if (formData.mainImage) {
            formDataToSend.append('item_image', formData.mainImage)
        }

        formData.subImages.forEach((subImage, index) => {
            if (subImage.file) {
                formDataToSend.append(`images[${index}][image]`, subImage.file)
            }
        })

        console.log('=== Transformed Data (JSON) ===')
        console.log(JSON.stringify(transformedData, null, 2))

        const response = await api.post('/v1/admin/item/store', formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        if (response.data.success || response.data.status) {
            showNotification('Item created successfully!', 'success')
            setTimeout(() => { resetForm() }, 1500)
        } else {
            showNotification(response.data.message || 'Failed to create item', 'danger')
        }
    } catch (error) {
        console.error('Submission error:', error)
        if (error.response?.status === 422 && error.response?.data?.errors) {
            const errors = error.response.data.errors
            const errorMessages = Object.entries(errors)
                .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                .join('\n')
            alert(`Validation failed:\n\n${errorMessages}`)
            showNotification('Please fix validation errors', 'danger')
        } else {
            showNotification(error.response?.data?.message || 'Error submitting item. Please try again.', 'danger')
        }
    } finally {
        isSubmitting.value = false
    }
}

// ── NEW: Transform with proper tax-included/excluded price handling ────────────
const transformToBackendFormat = () => {
    const qtyTypeVariantMap = {}

    formData.variants.forEach(variantGroup => {
        const qtyTypesInGroup = [...new Set(variantGroup.quantities.map(q => q.type))]
        const variantTypeIds = variantGroup.variantTypes.map(vt => parseInt(vt.typeId))

        qtyTypesInGroup.forEach(qtyType => {
            if (!qtyTypeVariantMap[qtyType]) qtyTypeVariantMap[qtyType] = new Set()
            variantTypeIds.forEach(vtId => qtyTypeVariantMap[qtyType].add(vtId))
        })
    })

    const item_variant_types = Object.entries(qtyTypeVariantMap).map(([qtyTypeId, variantTypeIdsSet]) => ({
        quantity_type_id: parseInt(qtyTypeId),
        variant_type_ids: Array.from(variantTypeIdsSet)
    }))

    const sub_items = []

    formData.variants.forEach(variantGroup => {
        variantGroup.quantities.forEach(qty => {
            const price = parseFloat(qty.price) || 0
            const discount = parseFloat(qty.discount) || 0
            const gstRate = parseFloat(qty.gstRate) || 0
            const discounted = price - (price * discount / 100)

            let gst_excluded_price, gst_included_price

            if (qty.taxIncluded) {
                /**
                 * Tax Included flow:
                 *   - User entered price WITH tax already
                 *   - gst_included_price  = discounted (price after discount, tax still inside)
                 *   - gst_excluded_price  = back-calculated base = included / (1 + rate/100)
                 */
                gst_included_price = parseFloat(discounted.toFixed(2))
                gst_excluded_price = gstRate > 0
                    ? parseFloat((discounted / (1 + gstRate / 100)).toFixed(2))
                    : gst_included_price
            } else {
                /**
                 * Tax Excluded flow:
                 *   - User entered price WITHOUT tax
                 *   - gst_excluded_price = discounted
                 *   - gst_included_price = discounted + GST on top
                 */
                gst_excluded_price = parseFloat(discounted.toFixed(2))
                gst_included_price = parseFloat((discounted + discounted * gstRate / 100).toFixed(2))
            }

            sub_items.push({
                quantity_type_id: parseInt(qty.type),
                unit_id: parseInt(qty.unit),
                quantity: parseQuantityAmount(qty.amount),
                price,
                discount,
                gst_excluded_price,
                tax_type_id: qty.taxTypeId ? parseInt(qty.taxTypeId) : null,
                gst_included_price,
                tax_included: !!qty.taxIncluded,   // boolean flag for backend
                variants: qty.variantSelections.map(sel => parseInt(sel))
            })
        })
    })

    return {
        item_name: formData.itemName,
        item_alias_code: formData.itemAlias || `ITEM-${Date.now()}`,
        category_id: parseInt(formData.category),
        description: formData.description,
        additional_information: formData.additionalInfo || '',
        item_variant_types,
        sub_items
    }
}

const parseQuantityAmount = (amountStr) => {
    if (!amountStr) return 1
    const str = String(amountStr).toLowerCase().trim()
    const match = str.match(/^([\d.]+)\s*(kg|g|package|pkg)?$/)
    if (!match) return parseFloat(str) || 1
    const num = parseFloat(match[1])
    const unit = match[2]
    if (unit === 'g') return num / 1000
    if (unit === 'kg') return num
    return num
}

const resetForm = () => {
    formData.itemName = ''
    formData.itemAlias = ''
    formData.category = ''
    formData.description = ''
    formData.additionalInfo = ''
    formData.mainImage = null
    formData.subImages = []
    formData.variants = []
    mainImagePreview.value = ''
    mainImageFileName.value = ''
    expandedVariants.value = []
    showNotification('Form reset. You can add a new item.', 'info')
}
</script>

<style scoped>
/* Notification Toast */
.notification-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease-out;
    min-width: 300px;
    max-width: 500px;
}

@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.bg-success {
    background: linear-gradient(135deg, #28a745, #20c997);
}

.bg-info {
    background: linear-gradient(135deg, #17a2b8, #00c9ff);
}

.bg-warning {
    background: linear-gradient(135deg, #ffc107, #ff9800);
}

.bg-danger {
    background: linear-gradient(135deg, #dc3545, #e74c3c);
}

/* Image Upload */
.imgArea {
    border: 2px dashed #ddd;
    border-radius: 10px;
    cursor: pointer;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
}

.imgArea:hover {
    border-color: #5e72e4;
    background-color: #f0f2ff;
}

.imgArea.active {
    border-color: #5e72e4;
}

.uploaded-image {
    max-width: 100%;
    max-height: 200px;
    border-radius: 8px;
    object-fit: contain;
}

.sub-image-container {
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 15px;
    background-color: #f8f9fa;
}

.sub-image-preview {
    width: 100%;
    max-height: 120px;
    border-radius: 6px;
    object-fit: contain;
    border: 1px solid #dee2e6;
}

/* Labels */
label {
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.5rem;
}

/* Table */
.table-responsive {
    border-radius: 8px;
    overflow: hidden;
}

.table thead th {
    border: none;
}

.table tbody tr {
    transition: background-color 0.2s ease;
}

.table tbody tr:hover {
    background-color: #f8f9fa;
}

/* Variant type badges */
.aii-type-badge {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-size: 0.72rem;
    padding: 4px 8px;
    border-radius: 20px;
    font-weight: 500;
}

/* Combo detail expand */
.aii-combo-detail {
    background: #f8f9fb;
    padding: 1rem;
    border-top: 2px solid #e9ecef;
}

.aii-combo-detail .table {
    background: white;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0;
}

.aii-combo-detail .table thead {
    background: #f1f3f5;
}

/* Combo tag in expanded table */
.aii-combo-tag {
    display: inline-block;
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    padding: 1px 7px;
    border-radius: 12px;
    font-size: 0.73rem;
    font-weight: 500;
}

/* NEW: Tax Included / Excluded badge */
.aii-tax-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    white-space: nowrap;
}

.aii-tax-badge.badge-tax-incl {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    color: #065f46;
    border: 1px solid #6ee7b7;
}

.aii-tax-badge.badge-tax-excl {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    color: #991b1b;
    border: 1px solid #fca5a5;
}

/* Quantity Type Tabs */
.qty-type-tabs {
    border-bottom: 2px solid #e9ecef;
}

.qty-tab-btn {
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.qty-tab-btn .qty-tab-emoji {
    font-size: 1.1rem;
}

.qty-tab-btn:hover {
    background: #f8f9fa;
}

.qty-tab-btn.active {
    border-bottom-color: currentColor;
}

.qty-tab-btn.active.tab-retail {
    color: #1e40af;
    background: linear-gradient(to bottom, rgba(219, 234, 254, 0.3), transparent);
}

.qty-tab-btn.active.tab-wholesale {
    color: #065f46;
    background: linear-gradient(to bottom, rgba(209, 250, 229, 0.3), transparent);
}

.qty-tab-btn.active.tab-sample {
    color: #92400e;
    background: linear-gradient(to bottom, rgba(254, 243, 199, 0.3), transparent);
}

.qty-tab-btn .badge {
    background: #000;
    color: white;
    font-size: 0.7rem;
    padding: 3px 7px;
    border-radius: 10px;
}

/* Add Variant Buttons by Type */
.btn-retail {
    background: linear-gradient(135deg, #3b82f6, #1e40af);
    color: white;
    border: none;
}

.btn-retail:hover {
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    color: white;
}

.btn-wholesale {
    background: linear-gradient(135deg, #10b981, #065f46);
    color: white;
    border: none;
}

.btn-wholesale:hover {
    background: linear-gradient(135deg, #059669, #064e3b);
    color: white;
}

.btn-sample {
    background: linear-gradient(135deg, #f59e0b, #92400e);
    color: white;
    border: none;
}

.btn-sample:hover {
    background: linear-gradient(135deg, #d97706, #78350f);
    color: white;
}

/* Quantity type badges with color coding */
.aii-qty-type-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 0.72rem;
    font-weight: 600;
    border: 1px solid;
    white-space: nowrap;
}

.aii-qty-type-badge.qty-retail {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    color: #1e40af;
    border-color: #93c5fd;
}

.aii-qty-type-badge.qty-wholesale {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    color: #065f46;
    border-color: #6ee7b7;
}

.aii-qty-type-badge.qty-sample {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    color: #92400e;
    border-color: #fcd34d;
}

/* Cards */
.card {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: none;
}

.card-header {
    background-color: #fff;
    border-bottom: 1px solid #e9ecef;
}

/* Buttons */
.btn {
    transition: all 0.2s ease;
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

a:hover .fas {
    transform: scale(1.2);
}

@media (max-width: 768px) {
    .table-responsive {
        font-size: 0.875rem;
    }

    .btn-sm {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
    }
}
</style>