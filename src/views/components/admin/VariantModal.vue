<template>
    <div class="modal fade" :id="modalId" tabindex="-1" aria-hidden="true" ref="modalRef">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content vm-modal-content">
                <div class="modal-header vm-header">
                    <div class="d-flex align-items-center gap-3">
                        <div class="vm-header-icon">
                            <i class="fas fa-layer-group"></i>
                        </div>
                        <div>
                            <h5 class="modal-title text-white mb-0">{{ isEditMode ? 'Edit Variant Group' : 'Add New Variant Group'
                                }}</h5>
                            <p class="text-muted text-xs mb-0">Define variant types and their combined pricing</p>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form @submit.prevent="handleSubmit">
                    <div class="modal-body vm-body">

                        <!-- STEP 1: Variant Types -->
                        <div class="vm-section mb-4">
                            <div class="vm-section-header d-flex align-items-center justify-content-between mb-3">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="vm-step-badge">1</span>
                                    <div>
                                        <h6 class="fw-bold mb-0">Variant Types</h6>
                                        <p class="text-muted text-xs mb-0">Add the types that define this variant group
                                            (e.g. Bean Type, Roast Level)</p>
                                    </div>
                                </div>
                                <button @click="addVariantType" type="button" class="btn vm-btn-add btn-sm mb-0">
                                    <i class="fas fa-plus me-1"></i> Add Variant Type
                                </button>
                            </div>

                            <div v-if="localVariant.variantTypes.length === 0" class="vm-empty-state py-3">
                                <i class="fas fa-tags fa-2x text-muted mb-2"></i>
                                <p class="text-muted text-sm mb-0">No variant types added. Add at least one to continue.
                                </p>
                            </div>

                            <div v-else class="row g-3">
                                <div v-for="(vt, vtIndex) in localVariant.variantTypes" :key="vtIndex" class="col-12">
                                    <div class="vm-type-card">
                                        <div class="row align-items-start g-2">
                                            <!-- Type selector -->
                                            <div class="col-12 col-md-3">
                                                <label class="vm-label">Variant Type</label>
                                                <select v-model="vt.typeId" class="form-control form-control-sm"
                                                    required @change="onVariantTypeChange(vtIndex)">
                                                    <option value="" disabled>Select Type</option>
                                                    <option v-for="opt in availableVariantTypeOptions(vtIndex)"
                                                        :key="opt.variant_type_id" :value="opt.variant_type_id">
                                                        {{ opt.variant_type }}
                                                    </option>
                                                </select>
                                            </div>

                                            <!-- Options for this type -->
                                            <div class="col-12 col-md-8">
                                                <label class="vm-label">Options for "{{ getVariantTypeLabel(vt.typeId)
                                                    }}"</label>
                                                <div v-if="vt.isLoadingOptions" class="text-center py-2">
                                                    <div class="spinner-border spinner-border-sm text-primary"
                                                        role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                                <div v-else class="d-flex flex-wrap gap-2 align-items-center">
                                                    <span v-for="(opt, oIndex) in vt.options" :key="oIndex"
                                                        class="vm-option-tag">
                                                        {{ opt.label }}
                                                        <button type="button" class="vm-option-remove"
                                                            @click="removeTypeOption(vtIndex, oIndex)"
                                                            :disabled="vt.options.length <= 1">
                                                            <i class="fas fa-times"></i>
                                                        </button>
                                                    </span>
                                                    <div v-if="vt.typeId && vt.availableOptions.length > 0"
                                                        class="d-flex align-items-center gap-1">
                                                        <select class="form-control form-control-sm vm-mini-select"
                                                            v-model="vt._newOptionValue">
                                                            <option value="" disabled>+ Add option</option>
                                                            <option v-for="catOpt in vt.availableOptions"
                                                                :key="catOpt.variant_id" :value="catOpt.variant_id"
                                                                :disabled="isOptionAlreadyAdded(vt, catOpt.variant_id)">
                                                                {{ catOpt.variant }}
                                                            </option>
                                                        </select>
                                                        <button type="button" class="btn btn-sm vm-btn-add-opt mb-0"
                                                            @click="addOptionToType(vtIndex)"
                                                            :disabled="!vt._newOptionValue">
                                                            <i class="fas fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Remove type -->
                                            <div class="col-12 col-md-1 d-flex align-items-end justify-content-end">
                                                <button type="button" class="btn btn-sm vm-btn-remove-type"
                                                    @click="removeVariantType(vtIndex)"
                                                    :disabled="localVariant.variantTypes.length <= 1"
                                                    title="Remove this variant type">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- STEP 2: Combination Quantities -->
                        <div class="vm-section" v-if="localVariant.variantTypes.length > 0 && allTypesConfigured">
                            <div class="vm-section-header d-flex align-items-center justify-content-between mb-3">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="vm-step-badge">2</span>
                                    <div>
                                        <h6 class="fw-bold mb-0">Combination Prices</h6>
                                        <p class="text-muted text-xs mb-0">Each row = one combination of variant options
                                            with its price</p>
                                    </div>
                                </div>
                                <div class="d-flex gap-2">
                                    <button @click="generateAllCombinations" type="button"
                                        class="btn vm-btn-generate btn-sm">
                                        <i class="fas fa-magic me-1"></i> Auto-Generate All
                                    </button>
                                    <button @click="addQuantity" type="button" class="btn vm-btn-add btn-sm">
                                        <i class="fas fa-plus me-1"></i> Add Row
                                    </button>
                                </div>
                            </div>

                            <!-- Color Legend -->
                            <!-- <div class="vm-legend mb-3" v-if="quantityTypes.length > 0">
                                <span class="text-xs text-muted me-3">Quantity Types:</span>
                                <template v-for="qType in quantityTypes" :key="qType.quantity_type_id">
                                    <span class="vm-legend-item" :class="{
                                        'vm-legend-retail': isRetailType(qType.quantity_type_id),
                                        'vm-legend-wholesale': isWholesaleType(qType.quantity_type_id),
                                        'vm-legend-sample': isSampleType(qType.quantity_type_id)
                                    }">
                                        {{ getQtyTypeEmoji(qType) }} {{ qType.quantity_type_name }}
                                    </span>
                                </template>
                            </div> -->

                            <!-- Locked Qty Type Alert -->
                            <!-- <div v-if="lockedQuantityType" class="alert alert-info py-2 mb-3">
                                <i class="fas fa-lock me-2"></i>
                                <strong>Quantity Type Locked:</strong> All combinations in this group must use
                                <strong>{{quantityTypes.find(qt => qt.quantity_type_id ==
                                    lockedQuantityType)?.quantity_type_name }}</strong>
                            </div> -->

                            <div v-if="localVariant.quantities.length === 0" class="vm-empty-state py-3">
                                <i class="fas fa-table fa-2x text-muted mb-2"></i>
                                <p class="text-muted text-sm mb-0">No combinations yet. Use "Auto-Generate All" or add
                                    rows manually.</p>
                            </div>

                            <div v-else class="table-responsive">
                                <table class="table vm-table table-flush mb-0">
                                    <thead>
                                        <tr>
                                            <th class="text-center">#</th>
                                            <th v-for="(vt, vtIndex) in localVariant.variantTypes" :key="vtIndex">
                                                {{ getVariantTypeLabel(vt.typeId) }}
                                            </th>
                                            <th>Qty Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                            <th>Unit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                            <th>Qty&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                            <th class="vm-th-center" style="min-width:90px">Tax Incl.?</th>
                                            <th style="min-width:130px">Tax Type</th>
                                            <th>Price (₹)</th>
                                            <th>Discount %</th>
                                            <th>GST Excl.</th>
                                            <th>Final Price</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(qty, qIndex) in localVariant.quantities" :key="qIndex"
                                            class="vm-qty-row">
                                            <td class="align-middle text-center">
                                                <span class="text-xs fw-bold">{{ qIndex + 1 }}</span>
                                            </td>

                                            <!-- Dynamic variant option selectors -->
                                            <td v-for="(vt, vtIndex) in localVariant.variantTypes" :key="vtIndex"
                                                class="align-middle">
                                                <select v-model="qty.variantSelections[vtIndex]"
                                                    class="form-control form-control-sm vm-combo-select" required>
                                                    <option value="" disabled>Select</option>
                                                    <option v-for="opt in vt.options" :key="opt.value"
                                                        :value="opt.value">
                                                        {{ opt.label }}
                                                    </option>
                                                </select>
                                            </td>

                                            <!-- Qty Type -->
                                            <td class="align-middle">
                                                <select v-model="qty.type"
                                                    class="form-control form-control-sm vm-qty-type-select" :class="{
                                                        'select-retail': isRetailType(qty.type),
                                                        'select-wholesale': isWholesaleType(qty.type),
                                                        'select-sample': isSampleType(qty.type)
                                                    }" :disabled="qIndex > 0 && !!lockedQuantityType"
                                                    @change="onQuantityTypeChange(qIndex)" required>
                                                    <option value="" disabled>Select</option>
                                                    <option v-for="qType in quantityTypes" :key="qType.quantity_type_id"
                                                        :value="qType.quantity_type_id">
                                                        {{ getQtyTypeEmoji(qType) }} {{ qType.quantity_type_name }}
                                                    </option>
                                                </select>
                                            </td>

                                            <!-- Unit -->
                                            <td class="align-middle">
                                                <select v-model="qty.unit" class="form-control form-control-sm"
                                                    required>
                                                    <option value="" disabled>Select</option>
                                                    <option v-for="u in units" :key="u.unit_id" :value="u.unit_id">
                                                        {{ u.unit_name }}
                                                    </option>
                                                </select>
                                            </td>

                                            <!-- Amount -->
                                            <td class="align-middle">
                                                <input v-model="qty.amount" class="form-control form-control-sm px-2"
                                                    type="text" placeholder="e.g. 500g" required />
                                            </td>

                                            <!-- Tax Included toggle -->
                                            <td class="align-middle text-center">
                                                <div class="vm-tax-toggle-wrap">
                                                    <div
                                                        class="form-check form-switch d-flex justify-content-center mb-1">
                                                        <input class="form-check-input vm-tax-switch" type="checkbox"
                                                            :id="`taxIncluded-${qIndex}`" v-model="qty.taxIncluded"
                                                            @change="onTaxIncludedChange(qty)" />
                                                    </div>
                                                    <span class="vm-tax-pill"
                                                        :class="qty.taxIncluded ? 'vm-tax-pill--yes' : 'vm-tax-pill--no'">
                                                        {{ qty.taxIncluded ? '✓ Yes' : '✗ No' }}
                                                    </span>
                                                </div>
                                            </td>

                                            <!-- Tax Type (enabled only when taxIncluded = true) -->
                                            <td class="align-middle">
                                                <select v-model="qty.taxTypeId" class="form-control form-control-sm"
                                                    :disabled="!qty.taxIncluded"
                                                    :class="{ 'vm-select-disabled': !qty.taxIncluded }"
                                                    @change="updateGstRate(qty)">
                                                    <option value="">{{ qty.taxIncluded ? 'No Tax' : 'N/A' }}</option>
                                                    <option v-for="tax in taxTypes" :key="tax.tax_type_id"
                                                        :value="tax.tax_type_id">
                                                        {{ tax.tax_type }}
                                                    </option>
                                                </select>
                                                <small v-if="!qty.taxIncluded" class="text-muted"
                                                    style="font-size:0.67rem;display:block;margin-top:2px">
                                                    Toggle to enable
                                                </small>
                                            </td>

                                            <!-- Price -->
                                            <td class="align-middle">
                                                <input v-model.number="qty.price"
                                                    class="form-control form-control-sm vm-price-input" type="number"
                                                    step="0.01" min="0" placeholder="0.00" required />
                                                <small class="text-muted"
                                                    style="font-size:0.67rem;display:block;margin-top:2px">
                                                    {{ qty.taxIncluded ? '(Tax in price)' : '(Tax excl.)' }}
                                                </small>
                                            </td>

                                            <!-- Discount -->
                                            <td class="align-middle">
                                                <input v-model.number="qty.discount"
                                                    class="form-control form-control-sm vm-discount-input" type="number"
                                                    step="0.01" min="0" max="100" placeholder="0" />
                                            </td>


                                            <!-- GST Excl. -->
                                            <td class="align-middle">
                                                <span class="vm-calc-badge">₹{{ calculateExPrice(qty) }}</span>
                                            </td>

                                            <!-- Final Price -->
                                            <td class="align-middle">
                                                <span class="vm-calc-badge vm-total-badge">
                                                    ₹{{ calculateFinalPrice(qty) }}
                                                </span>
                                                <span class="vm-tax-mode-badge"
                                                    :class="qty.taxIncluded ? 'vm-tax-mode--incl' : 'vm-tax-mode--excl'"
                                                    style="display:block;margin-top:2px">
                                                    {{ qty.taxIncluded ? 'Tax Incl.' : 'Tax Excl.' }}
                                                </span>
                                            </td>

                                            <!-- Delete row -->
                                            <td class="align-middle text-center">
                                                <button v-if="localVariant.quantities.length > 1" type="button"
                                                    class="btn btn-sm vm-btn-del-row" @click="removeQuantity(qIndex)"
                                                    title="Remove Row">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                                <span v-else class="text-muted text-xs">Required</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Summary -->
                            <div v-if="localVariant.quantities.length > 0" class="vm-summary mt-3">
                                <div class="row g-3 text-center">
                                    <div class="col-4">
                                        <div class="vm-stat">
                                            <div class="vm-stat-value">{{ localVariant.quantities.length }}</div>
                                            <div class="vm-stat-label">Combinations</div>
                                        </div>
                                    </div>
                                    <!-- <div class="col-4">
                                        <div class="vm-stat">
                                            <div class="vm-stat-value">₹{{ minPrice }}</div>
                                            <div class="vm-stat-label">Min Price</div>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="vm-stat">
                                            <div class="vm-stat-value">₹{{ maxPrice }}</div>
                                            <div class="vm-stat-label">Max Price</div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>

                        <!-- Warning when types not fully configured -->
                        <div v-if="localVariant.variantTypes.length > 0 && !allTypesConfigured" class="vm-warning mt-3">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            Please select a type and add at least one option to each variant type to proceed.
                        </div>

                    </div>

                    <div class="modal-footer vm-footer">
                        <button type="button" class="btn vm-btn-cancel" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn vm-btn-save"
                            :disabled="localVariant.variantTypes.length === 0 || !allTypesConfigured || localVariant.quantities.length === 0">
                            <i class="fas fa-save me-2"></i>
                            {{ isEditMode ? 'Update Variant Group' : 'Save Variant Group' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { api } from '@/services/api'

// ── Props & Emits ──────────────────────────────────────────────────────────────
const props = defineProps({
    variant: { type: Object, default: null },
    variantIndex: { type: Number, default: -1 },
    modalId: { type: String, default: 'variantModal' },
    categoryId: { type: [Number, String], required: true },
    taxTypes: { type: Array, default: () => [] },
    quantityTypes: { type: Array, default: () => [] },
    units: { type: Array, default: () => [] },
    preSelectedQtyTypeId: { type: [Number, String], default: null }
})
const emit = defineEmits(['save'])

// ── State ──────────────────────────────────────────────────────────────────────
const modalRef = ref(null)
const variantTypesList = ref([])

// ── Factory functions ──────────────────────────────────────────────────────────
function makeEmptyQtyRow(vtCount) {
    return {
        variantSelections: Array(vtCount).fill(''),
        type: '',
        unit: '',
        amount: '',
        price: 0,
        discount: 0,
        gstRate: 0,
        taxTypeId: '',
        taxIncluded: false   // default: Tax Excluded
    }
}

function makeEmptyVariantType() {
    return {
        typeId: '',
        options: [],
        availableOptions: [],
        isLoadingOptions: false,
        _newOptionValue: ''
    }
}

function makeEmptyVariant() {
    return { variantTypes: [makeEmptyVariantType()], quantities: [] }
}

const localVariant = reactive(makeEmptyVariant())

// Lock quantity type after first row is set
const lockedQuantityType = computed(() => {
    if (localVariant.quantities.length === 0) return null
    return localVariant.quantities[0].type || null
})

// ── Fetch variant types for category ──────────────────────────────────────────
watch(() => props.categoryId, async (newCategoryId) => {
    if (newCategoryId) await fetchVariantTypes(newCategoryId)
}, { immediate: true })

const fetchVariantTypes = async (categoryId) => {
    try {
        const response = await api.get(`/v1/admin/variant-type/fetch/${categoryId}`)
        if (response.data.success) {
            variantTypesList.value = response.data.data
        }
    } catch (error) {
        console.error('Error fetching variant types:', error)
        alert('Failed to load variant types')
    }
}

// ── Sync prop → local ──────────────────────────────────────────────────────────
watch(() => props.variant, (newVariant) => {
    if (newVariant) {
        const copy = JSON.parse(JSON.stringify(newVariant))
        copy.variantTypes = (copy.variantTypes || []).map(vt => ({
            ...vt,
            availableOptions: [],
            isLoadingOptions: false,
            _newOptionValue: ''
        }))
        // Backward compat: ensure taxIncluded field exists on all qty rows
        copy.quantities = (copy.quantities || []).map(qty => ({
            ...qty,
            taxIncluded: qty.taxIncluded ?? false,
            taxTypeId: qty.taxTypeId ?? '',
            gstRate: qty.gstRate ?? 0,
            discount: qty.discount ?? 0
        }))
        Object.assign(localVariant, copy)

        copy.variantTypes.forEach((vt, idx) => {
            if (vt.typeId) fetchVariantsForType(idx, vt.typeId)
        })
    } else {
        Object.assign(localVariant, makeEmptyVariant())
        if (props.preSelectedQtyTypeId) addQuantity()
    }
}, { immediate: true, deep: true })

watch(() => props.preSelectedQtyTypeId, (newQtyTypeId) => {
    if (newQtyTypeId && !isEditMode.value) {
        localVariant.quantities.forEach(qty => {
            if (!qty.type) qty.type = String(newQtyTypeId)
        })
    }
})

// ── Computed ───────────────────────────────────────────────────────────────────
const isEditMode = computed(() => props.variant !== null && props.variantIndex !== -1)

const allTypesConfigured = computed(() =>
    localVariant.variantTypes.length > 0 &&
    localVariant.variantTypes.every(vt => vt.typeId && vt.options.length > 0)
)

const allFinalPrices = computed(() =>
    localVariant.quantities.map(q => parseFloat(calculateFinalPrice(q)) || 0)
)
const minPrice = computed(() =>
    allFinalPrices.value.length ? Math.min(...allFinalPrices.value).toFixed(2) : '0.00'
)
const maxPrice = computed(() =>
    allFinalPrices.value.length ? Math.max(...allFinalPrices.value).toFixed(2) : '0.00'
)

// ── Variant Type helpers ───────────────────────────────────────────────────────
function getVariantTypeLabel(typeId) {
    const found = variantTypesList.value.find(vt => vt.variant_type_id == typeId)
    return found?.variant_type || typeId || '—'
}

function availableVariantTypeOptions(currentIndex) {
    const usedIds = localVariant.variantTypes
        .map((vt, i) => i !== currentIndex ? vt.typeId : null)
        .filter(Boolean)
    return variantTypesList.value.filter(vt => !usedIds.includes(vt.variant_type_id))
}

function isOptionAlreadyAdded(vt, optValue) {
    return vt.options.some(o => o.value == optValue)
}

async function onVariantTypeChange(vtIndex) {
    const vt = localVariant.variantTypes[vtIndex]
    vt.options = []
    vt.availableOptions = []
    vt._newOptionValue = ''
    if (vt.typeId) await fetchVariantsForType(vtIndex, vt.typeId)
    syncQuantitySelections()
}

async function fetchVariantsForType(vtIndex, typeId) {
    const vt = localVariant.variantTypes[vtIndex]
    vt.isLoadingOptions = true
    try {
        const response = await api.get(`/v1/admin/variant/fetch/${typeId}`)
        if (response.data.success) {
            vt.availableOptions = response.data.data
        }
    } catch (error) {
        console.error('Error fetching variants:', error)
        alert('Failed to load variant options')
    } finally {
        vt.isLoadingOptions = false
    }
}

function addVariantType() {
    localVariant.variantTypes.push(makeEmptyVariantType())
    syncQuantitySelections()
}

function removeVariantType(vtIndex) {
    if (localVariant.variantTypes.length <= 1) return
    localVariant.variantTypes.splice(vtIndex, 1)
    localVariant.quantities.forEach(q => q.variantSelections.splice(vtIndex, 1))
}

function addOptionToType(vtIndex) {
    const vt = localVariant.variantTypes[vtIndex]
    if (!vt._newOptionValue || isOptionAlreadyAdded(vt, vt._newOptionValue)) return
    const optDef = vt.availableOptions.find(o => o.variant_id == vt._newOptionValue)
    if (optDef) vt.options.push({ value: optDef.variant_id, label: optDef.variant })
    vt._newOptionValue = ''
}

function removeTypeOption(vtIndex, oIndex) {
    const vt = localVariant.variantTypes[vtIndex]
    if (vt.options.length <= 1) return
    vt.options.splice(oIndex, 1)
}

// ── Quantity helpers ───────────────────────────────────────────────────────────
function syncQuantitySelections() {
    const vtCount = localVariant.variantTypes.length
    localVariant.quantities.forEach(q => {
        while (q.variantSelections.length < vtCount) q.variantSelections.push('')
        while (q.variantSelections.length > vtCount) q.variantSelections.pop()
    })
}

function addQuantity() {
    const newQty = makeEmptyQtyRow(localVariant.variantTypes.length)
    if (props.preSelectedQtyTypeId && !isEditMode.value) {
        newQty.type = String(props.preSelectedQtyTypeId)
    }
    localVariant.quantities.push(newQty)
}

function removeQuantity(index) {
    if (localVariant.quantities.length > 1) localVariant.quantities.splice(index, 1)
}

function generateAllCombinations() {
    const typesWithOptions = localVariant.variantTypes.filter(vt => vt.options.length > 0)
    if (typesWithOptions.length === 0) return

    const cartesian = (...arrays) =>
        arrays.reduce((acc, arr) => acc.flatMap(x => arr.map(y => [...x, y])), [[]])

    const combos = cartesian(...typesWithOptions.map(vt => vt.options.map(o => o.value)))

    localVariant.quantities = combos.map(combo => {
        const selections = localVariant.variantTypes.map(vt => {
            const pos = typesWithOptions.indexOf(vt)
            return pos !== -1 ? combo[pos] : ''
        })
        return {
            variantSelections: selections,
            type: props.preSelectedQtyTypeId && !isEditMode.value ? String(props.preSelectedQtyTypeId) : '',
            unit: '',
            amount: '',
            price: 0,
            discount: 0,
            gstRate: 0,
            taxTypeId: '',
            taxIncluded: false
        }
    })
}

// ── Quantity type helpers ──────────────────────────────────────────────────────
function onQuantityTypeChange(rowIndex) {
    if (rowIndex === 0 && localVariant.quantities.length > 1) {
        const selectedType = localVariant.quantities[0].type
        if (selectedType) {
            localVariant.quantities.forEach((qty, idx) => {
                if (idx > 0) qty.type = selectedType
            })
        }
    }
}

function isRetailType(typeId) {
    return props.quantityTypes.find(qt => qt.quantity_type_id == typeId)
        ?.quantity_type_name?.toLowerCase().includes('retail')
}
function isWholesaleType(typeId) {
    return props.quantityTypes.find(qt => qt.quantity_type_id == typeId)
        ?.quantity_type_name?.toLowerCase().includes('wholesale')
}
function isSampleType(typeId) {
    return props.quantityTypes.find(qt => qt.quantity_type_id == typeId)
        ?.quantity_type_name?.toLowerCase().includes('sample')
}
function getQtyTypeEmoji(qType) {
    const name = qType.quantity_type_name?.toLowerCase() || ''
    if (name.includes('retail')) return '🔵'
    if (name.includes('wholesale')) return '🟢'
    if (name.includes('sample')) return '🟡'
    return '⚪'
}

// ── Tax Included / Excluded logic ─────────────────────────────────────────────
/**
 * When toggling Tax Included OFF → clear tax type & GST rate.
 */
function onTaxIncludedChange(qty) {
    if (!qty.taxIncluded) {
        qty.taxTypeId = ''
        qty.gstRate = 0
    }
}

/**
 * Pull GST rate from the selected tax type record.
 * Uses `selectedTax.tax` — matching the field name from the working old code.
 */
function updateGstRate(qty) {
    if (!qty.taxTypeId) { qty.gstRate = 0; return }
    const selectedTax = props.taxTypes.find(t => t.tax_type_id == qty.taxTypeId)
    if (selectedTax) qty.gstRate = parseFloat(selectedTax.tax) || 0
}

// ── Price calculations ─────────────────────────────────────────────────────────
/**
 * GST-excluded base price column.
 *
 * Tax EXCLUDED: base = price − discount%  (user entered tax-free price)
 * Tax INCLUDED: base = back-calculated = discounted ÷ (1 + rate/100)
 */
function calculateExPrice(qty) {
    const price = parseFloat(qty.price) || 0
    const discount = parseFloat(qty.discount) || 0
    const gstRate = parseFloat(qty.gstRate) || 0
    const discounted = price - (price * discount / 100)

    if (qty.taxIncluded && gstRate > 0) {
        return (discounted / (1 + gstRate / 100)).toFixed(2)
    }
    return discounted.toFixed(2)
}

/**
 * Final price shown to buyer.
 *
 * Tax EXCLUDED (default):
 *   final = (price − discount%) + GST on discounted price
 *
 * Tax INCLUDED:
 *   final = price − discount%   (GST already baked in; nothing added on top)
 */
function calculateFinalPrice(qty) {
    const price = parseFloat(qty.price) || 0
    const discount = parseFloat(qty.discount) || 0
    const gstRate = parseFloat(qty.gstRate) || 0
    const discounted = price - (price * discount / 100)

    if (qty.taxIncluded) {
        return discounted.toFixed(2)
    }
    return (discounted + discounted * gstRate / 100).toFixed(2)
}

// ── Submit ─────────────────────────────────────────────────────────────────────
function handleSubmit() {
    if (!allTypesConfigured.value) {
        alert('Please configure all variant types with at least one option each.')
        return
    }
    if (localVariant.quantities.length === 0) {
        alert('Please add at least one combination row.')
        return
    }

    const clean = JSON.parse(JSON.stringify(localVariant))

    clean.variantTypes = clean.variantTypes.map(vt => {
        const { _newOptionValue, availableOptions, isLoadingOptions, ...rest } = vt;
        return {
            ...rest,
            typeName: getVariantTypeLabel(vt.typeId) // Dynamically adding the name here
        };
    });

    emit('save', {
        variant: clean,
        index: props.variantIndex,
        isEditMode: isEditMode.value
    })

    const modal = window.bootstrap.Modal.getInstance(modalRef.value)
        || new window.bootstrap.Modal(modalRef.value)
    modal.hide()

    if (!isEditMode.value) {
        Object.assign(localVariant, makeEmptyVariant())
    }
}
</script>

<style scoped>
.vm-modal-content {
    border: none;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
}

.vm-header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: white;
    padding: 1.25rem 1.5rem;
    border-bottom: none;
}

.vm-header .text-muted {
    color: rgba(255, 255, 255, 0.55) !important;
}

.vm-header .btn-close {
    filter: invert(1) grayscale(1);
    opacity: 0.7;
}

.vm-header-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: #fff;
}

.vm-body {
    max-height: 72vh;
    overflow-y: auto;
    padding: 1.5rem;
    background: #f8f9fc;
}

.vm-section {
    background: #fff;
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid #e8ecf0;
}

.vm-step-badge {
    width: 28px;
    height: 28px;
    min-width: 28px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
}

.vm-type-card {
    background: #f8f9fc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1rem;
    transition: border-color 0.2s;
}

.vm-type-card:hover {
    border-color: #667eea;
}

.vm-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.4rem;
    display: block;
}

.vm-option-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #e8f4ff, #f0eaff);
    border: 1px solid #c7d8f7;
    color: #3b5bdb;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.78rem;
    font-weight: 500;
}

.vm-option-remove {
    background: none;
    border: none;
    padding: 0;
    color: #6b7280;
    cursor: pointer;
    line-height: 1;
    font-size: 0.65rem;
    transition: color 0.15s;
}

.vm-option-remove:hover {
    color: #dc2626;
}

.vm-option-remove:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.vm-mini-select {
    max-width: 160px;
    font-size: 0.78rem !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
}

.vm-btn-add {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.78rem;
    font-weight: 600;
    transition: opacity 0.2s, transform 0.15s;
}

.vm-btn-add:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    color: white;
}

.vm-btn-add-opt {
    background: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 0.75rem;
}

.vm-btn-add-opt:disabled {
    opacity: 0.4;
}

.vm-btn-generate {
    background: linear-gradient(135deg, #11998e, #38ef7d);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.78rem;
    font-weight: 600;
}

.vm-btn-generate:hover {
    opacity: 0.9;
    color: white;
}

.vm-btn-remove-type {
    background: #fff0f0;
    color: #dc2626;
    border: 1px solid #fecaca;
    border-radius: 7px;
    padding: 5px 10px;
}

.vm-btn-remove-type:hover:not(:disabled) {
    background: #dc2626;
    color: white;
}

.vm-btn-remove-type:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.vm-btn-del-row {
    background: #fff0f0;
    color: #dc2626;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 3px 8px;
    font-size: 0.75rem;
}

.vm-btn-del-row:hover {
    background: #dc2626;
    color: white;
}

/* Table */
.vm-table {
    font-size: 0.8rem;
}

.vm-table thead tr {
    background: #1a1a2e;
}

.vm-table thead th {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: none;
    padding: 0.7rem 0.6rem;
    white-space: nowrap;
}

.vm-table tbody td {
    padding: 0.5rem 0.6rem;
    vertical-align: middle;
}

.vm-qty-row:hover {
    background: #f8f9ff;
}

.vm-combo-select {
    min-width: 110px;
}

.vm-th-center {
    text-align: center;
}

/* Qty type select colors */
.vm-qty-type-select {
    font-weight: 600;
    border-width: 2px !important;
    transition: all 0.2s;
}

.vm-qty-type-select.select-retail {
    background: linear-gradient(to right, #dbeafe, #fff) !important;
    border-color: #60a5fa !important;
    color: #1e40af !important;
}

.vm-qty-type-select.select-wholesale {
    background: linear-gradient(to right, #d1fae5, #fff) !important;
    border-color: #34d399 !important;
    color: #065f46 !important;
}

.vm-qty-type-select.select-sample {
    background: linear-gradient(to right, #fef3c7, #fff) !important;
    border-color: #fbbf24 !important;
    color: #92400e !important;
}

.vm-price-input {
    min-width: 85px;
    border-color: #a5f3fc !important;
}

.vm-discount-input {
    min-width: 65px;
    border-color: #fed7aa !important;
}

/* Calculated badges */
.vm-calc-badge {
    display: inline-block;
    background: #f1f5f9;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #475569;
    white-space: nowrap;
}

.vm-total-badge {
    background: #dcfce7;
    color: #15803d;
}

/* Tax Included toggle */
.vm-tax-toggle-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
}

.vm-tax-switch {
    width: 2.2em;
    height: 1.2em;
    cursor: pointer;
}

.vm-tax-pill {
    font-size: 0.68rem;
    font-weight: 700;
    padding: 1px 7px;
    border-radius: 8px;
    white-space: nowrap;
}

.vm-tax-pill--yes {
    background: #d1fae5;
    color: #065f46;
}

.vm-tax-pill--no {
    background: #fee2e2;
    color: #991b1b;
}

/* Disabled tax type select */
.vm-select-disabled {
    background-color: #f3f4f6 !important;
    color: #9ca3af !important;
    cursor: not-allowed;
}

/* Tax mode badge */
.vm-tax-mode-badge {
    font-size: 0.65rem;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 8px;
}

.vm-tax-mode--incl {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    color: #065f46;
    border: 1px solid #6ee7b7;
}

.vm-tax-mode--excl {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    color: #1e40af;
    border: 1px solid #93c5fd;
}

/* Summary */
.vm-summary {
    background: linear-gradient(135deg, #f0f4ff, #faf5ff);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    border: 1px solid #e0e7ff;
}

.vm-stat-value {
    font-size: 1.1rem;
    font-weight: 700;
    color: #3730a3;
}

.vm-stat-label {
    font-size: 0.7rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.vm-warning {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 10px;
    padding: 0.75rem 1rem;
    color: #92400e;
    font-size: 0.85rem;
}

.vm-empty-state {
    text-align: center;
    background: #f8f9fc;
    border-radius: 10px;
    padding: 1.5rem;
}

/* Legend */
.vm-legend {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.vm-legend-item {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid;
}

.vm-legend-retail {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    color: #1e40af;
    border-color: #93c5fd;
}

.vm-legend-wholesale {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    color: #065f46;
    border-color: #6ee7b7;
}

.vm-legend-sample {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    color: #92400e;
    border-color: #fcd34d;
}

/* Footer */
.vm-footer {
    background: #fff;
    border-top: 1px solid #e8ecf0;
    padding: 1rem 1.5rem;
}

.vm-btn-cancel {
    background: #f1f5f9;
    color: #475569;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1.25rem;
    font-weight: 500;
}

.vm-btn-save {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1.5rem;
    font-weight: 600;
    transition: opacity 0.2s;
}

.vm-btn-save:hover:not(:disabled) {
    opacity: 0.88;
    color: white;
}

.vm-btn-save:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.vm-body::-webkit-scrollbar {
    width: 5px;
}

.vm-body::-webkit-scrollbar-track {
    background: #f1f5f9;
}

.vm-body::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

@media (max-width: 768px) {
    .vm-table {
        font-size: 0.72rem;
    }

    .vm-body {
        max-height: 80vh;
    }
}
</style>