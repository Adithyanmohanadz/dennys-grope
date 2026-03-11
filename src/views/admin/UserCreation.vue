<template>
  <div class="admin-page">

    <!-- Page Header -->
    <div class="page-header">
      <div class="header-left">
        <div>
          <h4 class="page-title">Create New User</h4>
          <p class="page-sub">Manually register and configure a new user profile</p>
        </div>
      </div>
    </div>

    <div class="form-layout">

      <!-- Left: Preview Card -->
      <div class="preview-col">
        <div class="preview-card sticky-top">
          <div class="preview-avatar" :style="{ background: avatarColor }">
            {{ previewInitial }}
          </div>
          <div class="preview-name">{{ form.user_name || 'New User' }}</div>
          <div class="preview-email">{{ form.email || 'email@example.com' }}</div>
          <div class="preview-phone">{{ form.phone || '—' }}</div>
          <div class="preview-divider"></div>
          <div class="preview-meta">
            <div class="meta-row">
              <span class="meta-key">Status</span>
              <span class="status-pill" :class="form.registration_status">
                {{ statusLabel(form.registration_status) }}
              </span>
            </div>
            <div class="meta-row">
              <span class="meta-key">User Type</span>
              <span class="type-pill retail"><i class="fas fa-user me-1"></i>Retail</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="form-col">

        <!-- ── Section 1: Personal Info ── -->
        <div class="form-section">
          <div class="section-head">
            <div class="section-num">1</div>
            <div>
              <h6 class="section-title">Personal Information</h6>
              <p class="section-sub">Basic contact details for this user</p>
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="f-label">Company / User Name <span class="req">*</span></label>
              <input type="text" class="f-input" :class="fieldClass('user_name')" v-model="form.user_name"
                placeholder="e.g. Ravi Kumar" @blur="touch('user_name')">
              <div class="f-error-msg" v-if="touched('user_name') && !form.user_name">Name is required.</div>
            </div>
            <div class="col-md-6">
              <label class="f-label">Email Address <span class="req">*</span></label>
              <input type="email" class="f-input" :class="fieldClass('email')" v-model="form.email"
                placeholder="user@example.com" @blur="touch('email')">
              <div class="f-error-msg" v-if="touched('email') && !form.email">Valid email is required.</div>
            </div>
            <div class="col-md-6">
              <label class="f-label">Phone Number <span class="req">*</span></label>
              <input type="tel" class="f-input" :class="fieldClass('phone')" v-model="form.phone"
                placeholder="+91 98765 43210" @blur="touch('phone')">
              <div class="f-error-msg" v-if="touched('phone') && !form.phone">Phone number is required.</div>
            </div>
            <div class="col-md-6">
              <label class="f-label">
                <i class="fab fa-whatsapp me-1 text-success"></i>
                WhatsApp Number <span class="req">*</span>
              </label>
              <div class="input-with-same">
                <input type="tel" class="f-input" :class="['f-input', samePhone ? 'readonly-look' : fieldClass('whatsapp_number')]"
                  v-model="form.whatsapp_number" placeholder="+91 98765 43210"
                  :readonly="samePhone" @blur="touch('whatsapp_number')">
                <label class="same-check">
                  <input type="checkbox" v-model="samePhone" @change="onSamePhone"> Same
                </label>
              </div>
              <div class="f-error-msg" v-if="touched('whatsapp_number') && !form.whatsapp_number">WhatsApp number is required.</div>
            </div>
          </div>
        </div>

        <!-- ── Section 2: Address ── -->
        <div class="form-section">
          <div class="section-head">
            <div class="section-num">2</div>
            <div>
              <h6 class="section-title">Address Information</h6>
              <p class="section-sub">Billing and shipping location details</p>
            </div>
          </div>

          <!-- Billing Address Block -->
          <div class="address-block mb-4">
            <div class="address-block-header">
              <div class="address-block-icon billing-icon">
                <i class="fas fa-receipt"></i>
              </div>
              <span class="address-block-title">Billing Address</span>
            </div>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="f-label">Address Line 1 <span class="req">*</span></label>
                <input type="text" class="f-input" :class="fieldClass('billing_address_line1')"
                  v-model="form.billing_address_line1" placeholder="House / Flat no., Street name"
                  @blur="touch('billing_address_line1')">
                <div class="f-error-msg" v-if="touched('billing_address_line1') && !form.billing_address_line1">Address Line 1 is required.</div>
              </div>
              <div class="col-md-6">
                <label class="f-label">Address Line 2</label>
                <input type="text" class="f-input" v-model="form.billing_address_line2"
                  placeholder="Area, Landmark (optional)">
              </div>
              <div class="col-md-4">
                <label class="f-label">State <span class="req">*</span></label>
                <select class="f-input" v-model="form.billing_state_id">
                  <option value="">Select State</option>
                  <option v-for="s in states" :key="s.state_id" :value="s.state_id">{{ s.state }}</option>
                </select>
                <div class="f-error-msg" v-if="billingStateError">Please select a state.</div>
              </div>
              <div class="col-md-4">
                <label class="f-label">City <span class="req">*</span></label>
                <input type="text" class="f-input" :class="fieldClass('billing_city')"
                  v-model="form.billing_city" placeholder="Enter city name"
                  @blur="touch('billing_city')">
                <div class="f-error-msg" v-if="touched('billing_city') && !form.billing_city">City is required.</div>
              </div>
              <div class="col-md-2">
                <label class="f-label">Pincode <span class="req">*</span></label>
                <input type="text" class="f-input" :class="fieldClass('billing_pincode')"
                  v-model="form.billing_pincode" placeholder="682001" maxlength="6"
                  @blur="touch('billing_pincode')">
              </div>
              <div class="col-md-2">
                <label class="f-label">Country</label>
                <div class="country-static"><span>🇮🇳</span> India</div>
              </div>
            </div>
          </div>

          <!-- Shipping Address Block -->
          <div class="address-block">
            <div class="address-block-header">
              <div class="address-block-icon shipping-icon">
                <i class="fas fa-truck"></i>
              </div>
              <span class="address-block-title">Shipping Address</span>
              <label class="same-check-label ms-auto">
                <input type="checkbox" v-model="sameShipping" @change="onSameShipping">
                Same as Billing
              </label>
            </div>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="f-label">Address Line 1 <span class="req">*</span></label>
                <input type="text"
                  :class="['f-input', sameShipping ? 'readonly-look' : fieldClass('shipping_address_line1')]"
                  v-model="form.shipping_address_line1" placeholder="House / Flat no., Street name"
                  :readonly="sameShipping" @blur="touch('shipping_address_line1')">
              </div>
              <div class="col-md-6">
                <label class="f-label">Address Line 2</label>
                <input type="text" :class="['f-input', sameShipping ? 'readonly-look' : '']"
                  v-model="form.shipping_address_line2" placeholder="Area, Landmark (optional)"
                  :readonly="sameShipping">
              </div>
              <div class="col-md-4">
                <label class="f-label">State <span class="req">*</span></label>
                <select class="f-input" v-model="form.shipping_state_id"
                  :disabled="sameShipping"
                  :class="sameShipping ? 'readonly-look' : ''">
                  <option value="">Select State</option>
                  <option v-for="s in states" :key="s.state_id" :value="s.state_id">{{ s.state }}</option>
                </select>
                <div class="f-error-msg" v-if="!sameShipping && shippingStateError">Please select a state.</div>
              </div>
              <div class="col-md-4">
                <label class="f-label">City <span class="req">*</span></label>
                <input type="text"
                  :class="['f-input', sameShipping ? 'readonly-look' : fieldClass('shipping_city')]"
                  v-model="form.shipping_city"
                  placeholder="Enter city name"
                  :readonly="sameShipping"
                  @blur="touch('shipping_city')">
                <div class="f-error-msg" v-if="!sameShipping && touched('shipping_city') && !form.shipping_city">City is required.</div>
              </div>
              <div class="col-md-2">
                <label class="f-label">Pincode <span class="req">*</span></label>
                <input type="text"
                  :class="['f-input', sameShipping ? 'readonly-look' : fieldClass('shipping_pincode')]"
                  v-model="form.shipping_pincode" placeholder="682001" maxlength="6"
                  :readonly="sameShipping" @blur="touch('shipping_pincode')">
              </div>
              <div class="col-md-2">
                <label class="f-label">Country</label>
                <div class="country-static"><span>🇮🇳</span> India</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Section 3: Password ── -->
        <div class="form-section">
          <div class="section-head">
            <div class="section-num admin">3</div>
            <div>
              <h6 class="section-title">Password</h6>
              <p class="section-sub">Set the initial login password for this user</p>
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-5">
              <label class="f-label">Password <span class="req">*</span></label>
              <div class="pwd-wrap">
                <input :type="showPwd ? 'text' : 'password'" class="f-input pe-5" v-model="form.password"
                  placeholder="Min. 8 characters" minlength="8">
                <button type="button" class="pwd-eye" @click="showPwd = !showPwd">
                  <i :class="showPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <p class="f-hint">Minimum 8 characters. This will be the user's initial login password.</p>
            </div>
            <div class="col-md-5">
              <label class="f-label">Confirm Password <span class="req">*</span></label>
              <div class="pwd-wrap">
                <input :type="showConfirm ? 'text' : 'password'" class="f-input pe-5"
                  :class="pwdMismatch ? 'is-invalid' : (form.password_confirmation ? 'is-valid' : '')"
                  v-model="form.password_confirmation" placeholder="Re-enter password">
                <button type="button" class="pwd-eye" @click="showConfirm = !showConfirm">
                  <i :class="showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <p class="f-error-msg" v-if="pwdMismatch">Passwords do not match.</p>
              <p class="f-hint ok" v-else-if="form.password_confirmation && !pwdMismatch">
                <i class="fas fa-check-circle me-1"></i>Passwords match
              </p>
            </div>
            <div class="col-md-2">
              <label class="f-label">Status <span class="req">*</span></label>
              <select class="f-input" v-model="form.registration_status">
                <option value="active">✅ Active</option>
                <option value="deActive">🚫 Deactive</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="router.push('/admin/user-list')">Cancel</button>
          <button type="button" class="btn-submit" @click="createUser" :disabled="isSubmitting || pwdMismatch">
            <span v-if="isSubmitting"><i class="fas fa-spinner fa-spin me-2"></i>Creating...</span>
            <span v-else><i class="fas fa-user-plus me-2"></i>Create User</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'

const router = useRouter()
const isSubmitting = ref(false)
const showPwd = ref(false)
const showConfirm = ref(false)
const samePhone = ref(false)
const sameShipping = ref(false)

// ── Form ──────────────────────────────────────────────────────────────────────
const form = reactive({
  user_name: '', email: '', phone: '', whatsapp_number: '',
  // Billing
  billing_address_line1: '', billing_address_line2: '',
  billing_state_id: '', billing_city: '', billing_pincode: '',
  // Shipping
  shipping_address_line1: '', shipping_address_line2: '',
  shipping_state_id: '', shipping_city: '', shipping_pincode: '',
  country: 'India',
  password: '', password_confirmation: '',
  registration_status: 'active',
})

// ── Touch / Validation ────────────────────────────────────────────────────────
const touchedFields = reactive(new Set())
const touch = (f) => touchedFields.add(f)
const touched = (f) => touchedFields.has(f)
const fieldClass = (f) => {
  if (!touchedFields.has(f)) return ''
  return !form[f] ? 'is-invalid' : 'is-valid'
}

const pwdMismatch = computed(() =>
  form.password_confirmation && form.password !== form.password_confirmation
)

// ── Same as Phone ─────────────────────────────────────────────────────────────
const onSamePhone = () => {
  if (samePhone.value) form.whatsapp_number = form.phone
  else form.whatsapp_number = ''
}

// ── States ────────────────────────────────────────────────────────────────────
const states = ref([])
const billingStateError = ref(false)
const shippingStateError = ref(false)

const fetchStates = async () => {
  try {
    const res = await api.get('/v1/state/active')
    states.value = res.data.data
  } catch (e) { console.error(e) }
}

// ── Same as Billing ───────────────────────────────────────────────────────────
const onSameShipping = () => {
  if (sameShipping.value) {
    form.shipping_address_line1 = form.billing_address_line1
    form.shipping_address_line2 = form.billing_address_line2
    form.shipping_state_id = form.billing_state_id
    form.shipping_city = form.billing_city
    form.shipping_pincode = form.billing_pincode
  } else {
    form.shipping_address_line1 = ''
    form.shipping_address_line2 = ''
    form.shipping_state_id = ''
    form.shipping_city = ''
    form.shipping_pincode = ''
  }
}

// ── Preview ───────────────────────────────────────────────────────────────────
const avatarColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
const previewInitial = computed(() => form.user_name ? form.user_name.charAt(0).toUpperCase() : '?')
const avatarColor = computed(() => avatarColors[previewInitial.value.charCodeAt(0) % avatarColors.length])
const statusLabel = (s) => ({ active: 'Active', deActive: 'Deactive' }[s] || s)

// ── Submit ────────────────────────────────────────────────────────────────────
const createUser = async () => {
  ['user_name', 'email', 'phone', 'whatsapp_number',
   'billing_address_line1', 'billing_city', 'billing_pincode',
   'shipping_address_line1', 'shipping_city', 'shipping_pincode'].forEach(touch)

  billingStateError.value = !form.billing_state_id
  if (!sameShipping.value) {
    shippingStateError.value = !form.shipping_state_id
  }

  if (pwdMismatch.value) return
  if (billingStateError.value) return
  if (!sameShipping.value && shippingStateError.value) return

  isSubmitting.value = true
  try {
    // TODO: await api.post('/v1/admin/user/store', { ...form })
    await new Promise(r => setTimeout(r, 1000))
    router.push('/admin/user-list')
  } catch (e) {
    console.error(e)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(fetchStates)
</script>

<style scoped>
.admin-page {
  padding: 24px;
  padding-top: 0 !important;
  min-height: 100vh;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
}

/* Header */
.page-header { margin-bottom: 24px; }
.header-left { display: flex; align-items: center; gap: 14px; }
.page-title { font-size: 1.4rem; font-weight: 800; color: #ffffff; margin: 0 0 2px; }
.page-sub { color: #bebebe; font-size: 0.82rem; margin: 0; }

/* Layout */
.form-layout { display: flex; gap: 24px; align-items: flex-start; }
.preview-col { width: 220px; flex-shrink: 0; }
.form-col { flex: 1; min-width: 0; }

/* Preview Card */
.preview-card {
  background: #fff; border-radius: 16px; padding: 28px 20px;
  text-align: center; box-shadow: 0 1px 12px rgba(0,0,0,0.06);
  border: 1px solid #f1f5f9;
}
.preview-avatar {
  width: 64px; height: 64px; border-radius: 18px; display: flex;
  align-items: center; justify-content: center; font-size: 1.6rem;
  font-weight: 800; color: #fff; margin: 0 auto 12px;
}
.preview-name { font-weight: 700; color: #1e293b; font-size: 0.95rem; margin-bottom: 4px; word-break: break-word; }
.preview-email { color: #94a3b8; font-size: 0.75rem; margin-bottom: 2px; word-break: break-all; }
.preview-phone { color: #64748b; font-size: 0.8rem; }
.preview-divider { border: none; border-top: 1px solid #f1f5f9; margin: 14px 0; }
.preview-meta { text-align: left; }
.meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; gap: 8px; }
.meta-key { font-size: 0.72rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; flex-shrink: 0; }
.status-pill { font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 99px; }
.status-pill.active { background: #f0fdf4; color: #16a34a; }
.status-pill.deActive { background: #f1f5f9; color: #64748b; }
.type-pill { font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 99px; }
.type-pill.retail { background: #eff6ff; color: #3b82f6; }

/* Form Section */
.form-section {
  background: #fff; border-radius: 16px; padding: 24px;
  margin-bottom: 16px; box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  border: 1px solid #f1f5f9;
}
.section-head {
  display: flex; align-items: flex-start; gap: 14px;
  margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f8fafc;
}
.section-num {
  width: 30px; height: 30px; border-radius: 8px; background: #1e293b;
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 0.85rem; flex-shrink: 0;
}
.section-num.admin { background: linear-gradient(135deg, #ef4444, #f97316); }
.section-title { font-size: 0.95rem; font-weight: 700; color: #1e293b; margin: 0 0 2px; }
.section-sub { font-size: 0.78rem; color: #94a3b8; margin: 0; }

/* ── Address Blocks ── */
.address-block {
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px 18px;
  background: #f8fafc;
}
.address-block-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #edf2f7;
}
.address-block-icon {
  width: 30px; height: 30px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; flex-shrink: 0;
}
.billing-icon { background: #eff6ff; color: #3b82f6; }
.shipping-icon { background: #f0fdf4; color: #22c55e; }
.address-block-title {
  font-size: 0.78rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.5px; color: #475569;
}

/* Fields */
.f-label {
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.4px; color: #64748b; margin-bottom: 5px; display: block;
}
.req { color: #ef4444; }
.f-input {
  width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0;
  border-radius: 10px; font-size: 0.9rem; color: #1e293b;
  background: #f8fafc; outline: none; transition: border-color 0.2s;
  font-family: inherit;
}
.f-input:focus { border-color: #3b82f6; background: #fff; }
.f-input.is-valid { border-color: #22c55e; }
.f-input.is-invalid { border-color: #ef4444; }
.f-input.readonly-look { background: #f1f5f9; color: #64748b; cursor: default; }
select.f-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px;
}
select.f-input:disabled { background-color: #f1f5f9; color: #94a3b8; cursor: default; }
.f-hint { font-size: 0.73rem; color: #94a3b8; margin-top: 4px; margin-bottom: 0; }
.f-hint.ok { color: #16a34a; }
.f-error-msg { font-size: 0.75rem; color: #ef4444; margin-top: 3px; }

/* WhatsApp same */
.input-with-same { position: relative; }
.same-check {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  font-size: 0.72rem; color: #3b82f6; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; gap: 4px; background: #fff; padding: 2px 4px;
}
.same-check input { accent-color: #3b82f6; }
.same-check-label {
  font-size: 0.75rem; color: #3b82f6; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; gap: 4px; white-space: nowrap;
}
.same-check-label input { accent-color: #3b82f6; }

/* Country */
.country-static {
  display: flex; align-items: center; gap: 8px; padding: 9px 12px;
  border: 1.5px solid #e2e8f0; border-radius: 10px; background: #f1f5f9;
  font-size: 0.9rem; color: #64748b; height: 40px;
}

/* Password */
.pwd-wrap { position: relative; }
.pwd-eye {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 0.85rem; padding: 4px;
}
.pwd-eye:hover { color: #475569; }

/* Actions */
.form-actions { display: flex; justify-content: flex-end; gap: 12px; padding-top: 4px; }
.btn-cancel {
  padding: 10px 22px; border-radius: 10px; border: 1.5px solid #e2e8f0;
  background: #fff; color: #64748b; font-weight: 600; font-size: 0.875rem; cursor: pointer;
}
.btn-cancel:hover { background: #f8fafc; }
.btn-submit {
  padding: 10px 22px; border-radius: 10px; border: none;
  background: linear-gradient(135deg, #1e293b, #334155); color: #fff;
  font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s;
}
.btn-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(30,41,59,0.3); }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 768px) {
  .form-layout { flex-direction: column; }
  .preview-col { width: 100%; }
  .address-block-header { flex-wrap: wrap; }
}
</style>