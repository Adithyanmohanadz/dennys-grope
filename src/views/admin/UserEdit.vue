<template>
  <div class="admin-page">

    <!-- Page Header -->
    <div class="page-header">
      <div class="header-left">
        <div>
          <h4 class="page-title">Edit User</h4>
          <p class="page-sub">Update user profile, status and credentials</p>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-dots"><span></span><span></span><span></span></div>
      <p>Loading user data...</p>
    </div>

    <div v-else class="edit-layout">

      <!-- Left: Profile Card -->
      <div class="profile-col">
        <div class="profile-card">
          <div class="profile-avatar" :style="{ background: avatarColor }">
            {{ user.user_name?.charAt(0)?.toUpperCase() }}
          </div>
          <div class="profile-name">{{ user.user_name }}</div>
          <div class="profile-email">{{ user.email }}</div>
          <div class="profile-phone">{{ user.phone }}</div>
          <div class="profile-badges">
            <span class="status-pill" :class="user.registration_status">{{ statusLabel(user.registration_status) }}</span>
            <span class="type-pill" :class="user.user_type">
              <i :class="user.user_type === 'wholesale' ? 'fas fa-briefcase' : 'fas fa-user'" class="me-1"></i>
              {{ user.user_type === 'wholesale' ? 'Wholesale' : 'Retail' }}
            </span>
          </div>
          <div class="profile-divider"></div>
          <nav class="profile-nav">
            <a v-for="tab in tabs" :key="tab.id" class="nav-item" :class="{ active: activeTab === tab.id }"
              @click="scrollTo(tab.id)">
              <i :class="tab.icon"></i>{{ tab.label }}
            </a>
          </nav>
        </div>
      </div>

      <!-- Right: Content -->
      <div class="content-col">

        <!-- ── Basic Info ── -->
        <div class="edit-card" id="basic-info">
          <div class="card-head">
            <div class="card-icon blue"><i class="fas fa-user-edit"></i></div>
            <div>
              <h6 class="card-title">Basic Information</h6>
              <p class="card-sub">Update contact details and address</p>
            </div>
            <span v-if="basicInfoMessage" class="inline-msg" :class="basicInfoStatus ? 'ok' : 'err'">
              <i :class="basicInfoStatus ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
              {{ basicInfoMessage }}
            </span>
          </div>

          <form @submit.prevent="updateBasicInfo">
            <div class="row g-3">
              <!-- Personal fields -->
              <div class="col-md-4">
                <label class="f-label">User Name <span class="req">*</span></label>
                <input type="text" class="f-input" v-model="basicInfo.user_name" required>
              </div>
              <div class="col-md-4">
                <label class="f-label">Email <span class="req">*</span></label>
                <input type="email" class="f-input" v-model="basicInfo.email" required>
              </div>
              <div class="col-md-4">
                <label class="f-label">Phone <span class="req">*</span></label>
                <input type="tel" class="f-input" v-model="basicInfo.phone" required>
              </div>
              <div class="col-md-4">
                <label class="f-label">
                  <i class="fab fa-whatsapp me-1 text-success"></i> WhatsApp
                </label>
                <div class="input-with-same">
                  <input type="tel" :class="['f-input', samePhone ? 'readonly-look' : '']"
                    v-model="basicInfo.whatsapp_number" :readonly="samePhone">
                  <label class="same-check">
                    <input type="checkbox" v-model="samePhone" @change="onSamePhone"> Same
                  </label>
                </div>
              </div>
              <div class="col-md-4">
                <label class="f-label">Account Status <span class="req">*</span></label>
                <select class="f-input" v-model="basicInfo.registration_status" required>
                  <option value="active">✅ Active</option>
                  <option value="deActive">🚫 Deactive</option>
                </select>
              </div>
            </div>

            <!-- Billing Address Block -->
            <div class="address-block mt-4 mb-3">
              <div class="address-block-header">
                <div class="address-block-icon billing-icon"><i class="fas fa-receipt"></i></div>
                <span class="address-block-title">Billing Address</span>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="f-label">Address Line 1</label>
                  <input type="text" class="f-input" v-model="basicInfo.billing_address_line1"
                    placeholder="House / Flat no., Street name">
                </div>
                <div class="col-md-6">
                  <label class="f-label">Address Line 2</label>
                  <input type="text" class="f-input" v-model="basicInfo.billing_address_line2"
                    placeholder="Area, Landmark (optional)">
                </div>
                <div class="col-md-4">
                  <label class="f-label">State</label>
                  <select class="f-input" v-model="basicInfo.billing_state_id">
                    <option value="">Select State</option>
                    <option v-for="s in states" :key="s.state_id" :value="s.state_id">{{ s.state }}</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="f-label">City</label>
                  <input type="text" class="f-input" v-model="basicInfo.billing_city"
                    placeholder="Enter city name">
                </div>
                <div class="col-md-2">
                  <label class="f-label">Pincode</label>
                  <input type="text" class="f-input" v-model="basicInfo.billing_pincode"
                    placeholder="682001" maxlength="6">
                </div>
                <div class="col-md-2">
                  <label class="f-label">Country</label>
                  <div class="country-static">🇮🇳 India</div>
                </div>
              </div>
            </div>

            <!-- Shipping Address Block -->
            <div class="address-block">
              <div class="address-block-header">
                <div class="address-block-icon shipping-icon"><i class="fas fa-truck"></i></div>
                <span class="address-block-title">Shipping Address</span>
                <label class="same-check-label ms-auto">
                  <input type="checkbox" v-model="sameShipping" @change="onSameShipping"> Same as Billing
                </label>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="f-label">Address Line 1</label>
                  <input type="text" :class="['f-input', sameShipping ? 'readonly-look' : '']"
                    v-model="basicInfo.shipping_address_line1" placeholder="House / Flat no., Street name"
                    :readonly="sameShipping">
                </div>
                <div class="col-md-6">
                  <label class="f-label">Address Line 2</label>
                  <input type="text" :class="['f-input', sameShipping ? 'readonly-look' : '']"
                    v-model="basicInfo.shipping_address_line2" placeholder="Area, Landmark (optional)"
                    :readonly="sameShipping">
                </div>
                <div class="col-md-4">
                  <label class="f-label">State</label>
                  <select class="f-input" v-model="basicInfo.shipping_state_id"
                    :disabled="sameShipping"
                    :class="sameShipping ? 'readonly-look' : ''">
                    <option value="">Select State</option>
                    <option v-for="s in states" :key="s.state_id" :value="s.state_id">{{ s.state }}</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="f-label">City</label>
                  <input type="text"
                    :class="['f-input', sameShipping ? 'readonly-look' : '']"
                    v-model="basicInfo.shipping_city"
                    placeholder="Enter city name"
                    :readonly="sameShipping">
                </div>
                <div class="col-md-2">
                  <label class="f-label">Pincode</label>
                  <input type="text" :class="['f-input', sameShipping ? 'readonly-look' : '']"
                    v-model="basicInfo.shipping_pincode" placeholder="682001" maxlength="6"
                    :readonly="sameShipping">
                </div>
                <div class="col-md-2">
                  <label class="f-label">Country</label>
                  <div class="country-static">🇮🇳 India</div>
                </div>
              </div>
            </div>

            <div class="card-footer-actions">
              <button type="submit" class="btn-save" :disabled="basicInfoLoading">
                <i class="fas fa-save me-2"></i>
                {{ basicInfoLoading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>

        <!-- ── Change Password ── -->
        <div class="edit-card" id="password">
          <div class="card-head">
            <div class="card-icon purple"><i class="fas fa-lock"></i></div>
            <div>
              <h6 class="card-title">Change Password</h6>
              <p class="card-sub">Set a new password for this user</p>
            </div>
            <span v-if="passwordMessage" class="inline-msg" :class="passwordStatus ? 'ok' : 'err'">
              <i :class="passwordStatus ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
              {{ passwordMessage }}
            </span>
          </div>
          <form @submit.prevent="updatePassword">
            <div class="row g-3">
              <div class="col-md-5">
                <label class="f-label">New Password <span class="req">*</span></label>
                <div class="pwd-wrap">
                  <input :type="showPwd ? 'text' : 'password'" class="f-input pe-5"
                    v-model="passwordForm.password" placeholder="Enter new password" required>
                  <button type="button" class="pwd-eye" @click="showPwd = !showPwd">
                    <i :class="showPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>
              <div class="col-md-5">
                <label class="f-label">Confirm Password <span class="req">*</span></label>
                <div class="pwd-wrap">
                  <input :type="showConfirm ? 'text' : 'password'" class="f-input pe-5"
                    :class="pwdMismatch ? 'is-invalid' : (passwordForm.password_confirmation ? 'is-valid' : '')"
                    v-model="passwordForm.password_confirmation" placeholder="Confirm new password" required>
                  <button type="button" class="pwd-eye" @click="showConfirm = !showConfirm">
                    <i :class="showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <p class="f-error-msg" v-if="pwdMismatch">Passwords do not match.</p>
              </div>
            </div>
            <div class="card-footer-actions">
              <button type="submit" class="btn-save purple-btn" :disabled="passwordLoading || pwdMismatch">
                <i class="fas fa-key me-2"></i>
                {{ passwordLoading ? 'Updating...' : 'Update Password' }}
              </button>
            </div>
          </form>
        </div>

        <!-- ── Delete Account ── -->
        <div class="edit-card danger-card" id="delete">
          <div class="card-head">
            <div class="card-icon red"><i class="fas fa-trash-alt"></i></div>
            <div>
              <h6 class="card-title">Delete Account</h6>
              <p class="card-sub">Once deleted, there is no going back. Please be certain.</p>
            </div>
          </div>
          <div class="delete-body">
            <div class="delete-warning">
              <i class="fas fa-exclamation-triangle me-2"></i>
              This action will permanently remove the user and all associated data.
            </div>
            <div class="delete-confirm-row">
              <label class="confirm-label">
                <input type="checkbox" v-model="deleteConfirmed">
                I understand and want to delete this account
              </label>
              <button class="btn-delete" @click="removeUser" :disabled="!deleteConfirmed || deleteLoading">
                <i class="fas fa-trash me-2"></i>
                {{ deleteLoading ? 'Deleting...' : 'Delete Account' }}
              </button>
            </div>
          </div>
          <span v-if="deleteMessage" class="inline-msg mt-2 d-block" :class="deleteStatus ? 'ok' : 'err'">
            <i :class="deleteStatus ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
            {{ deleteMessage }}
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/services/api'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const showPwd = ref(false)
const showConfirm = ref(false)
const samePhone = ref(false)
const sameShipping = ref(false)

// ── User data ─────────────────────────────────────────────────────────────────
const user = ref({})
const basicInfo = ref({})
const basicInfoLoading = ref(false)
const basicInfoMessage = ref('')
const basicInfoStatus = ref(false)

const passwordForm = ref({ password: '', password_confirmation: '' })
const passwordLoading = ref(false)
const passwordMessage = ref('')
const passwordStatus = ref(false)

const deleteConfirmed = ref(false)
const deleteLoading = ref(false)
const deleteMessage = ref('')
const deleteStatus = ref(false)

const activeTab = ref('basic-info')
const tabs = [
  { id: 'basic-info', icon: 'fas fa-user me-2', label: 'Basic Info' },
  { id: 'password',   icon: 'fas fa-lock me-2',  label: 'Password' },
  { id: 'delete',     icon: 'fas fa-trash me-2', label: 'Delete' },
]

// ── States ────────────────────────────────────────────────────────────────────
const states = ref([])

const fetchStates = async () => {
  try {
    const res = await api.get('/v1/state/active')
    states.value = res.data.data
  } catch (e) { console.error(e) }
}

// ── Same as Phone ─────────────────────────────────────────────────────────────
const onSamePhone = () => {
  if (samePhone.value) basicInfo.value.whatsapp_number = basicInfo.value.phone
  else basicInfo.value.whatsapp_number = ''
}

// ── Same as Billing ───────────────────────────────────────────────────────────
const onSameShipping = () => {
  if (sameShipping.value) {
    basicInfo.value.shipping_address_line1 = basicInfo.value.billing_address_line1
    basicInfo.value.shipping_address_line2 = basicInfo.value.billing_address_line2
    basicInfo.value.shipping_state_id = basicInfo.value.billing_state_id
    basicInfo.value.shipping_city = basicInfo.value.billing_city
    basicInfo.value.shipping_pincode = basicInfo.value.billing_pincode
  } else {
    basicInfo.value.shipping_address_line1 = ''
    basicInfo.value.shipping_address_line2 = ''
    basicInfo.value.shipping_state_id = ''
    basicInfo.value.shipping_city = ''
    basicInfo.value.shipping_pincode = ''
  }
}

// ── Computed ──────────────────────────────────────────────────────────────────
const avatarColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']
const avatarColor = computed(() => avatarColors[(user.value.user_name?.charCodeAt(0) || 0) % avatarColors.length])
const statusLabel = (s) => ({ active: 'Active', unconfirmed: 'Unconfirmed', deActive: 'Deactive', reject: 'Rejected' }[s] || s)
const pwdMismatch = computed(() =>
  passwordForm.value.password_confirmation && passwordForm.value.password !== passwordForm.value.password_confirmation
)

// ── Actions ───────────────────────────────────────────────────────────────────
const scrollTo = (id) => {
  activeTab.value = id
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const showMsg = (msgRef, statusRef, msg, ok, duration = 3500) => {
  msgRef.value = msg; statusRef.value = ok
  setTimeout(() => msgRef.value = '', duration)
}

const updateBasicInfo = async () => {
  basicInfoLoading.value = true
  try {
    // TODO: await api.put(`/v1/admin/user/update/${route.params.id}`, basicInfo.value)
    await new Promise(r => setTimeout(r, 800))
    user.value = { ...user.value, ...basicInfo.value }
    showMsg(basicInfoMessage, basicInfoStatus, 'User information updated successfully.', true)
  } catch (e) {
    showMsg(basicInfoMessage, basicInfoStatus, 'Failed to update. Please try again.', false)
  } finally {
    basicInfoLoading.value = false
  }
}

const updatePassword = async () => {
  if (pwdMismatch.value) return
  passwordLoading.value = true
  try {
    // TODO: await api.put(`/v1/admin/user/password/update/${route.params.id}`, passwordForm.value)
    await new Promise(r => setTimeout(r, 800))
    showMsg(passwordMessage, passwordStatus, 'Password updated successfully.', true)
    passwordForm.value = { password: '', password_confirmation: '' }
  } catch (e) {
    showMsg(passwordMessage, passwordStatus, 'Failed to update password.', false)
  } finally {
    passwordLoading.value = false
  }
}

const removeUser = async () => {
  if (!deleteConfirmed.value) return
  deleteLoading.value = true
  try {
    // TODO: await api.put(`/v1/admin/user/remove/${route.params.id}`)
    await new Promise(r => setTimeout(r, 1000))
    showMsg(deleteMessage, deleteStatus, 'User removed. Redirecting...', true)
    setTimeout(() => router.push('/admin/user-list'), 2000)
  } catch (e) {
    showMsg(deleteMessage, deleteStatus, 'Failed to delete user.', false)
  } finally {
    deleteLoading.value = false
  }
}

// ── Fetch user on mount ───────────────────────────────────────────────────────
onMounted(async () => {
  await fetchStates()
  try {
    // TODO: const res = await api.get(`/v1/admin/user/view/${route.params.id}`)
    // user.value = res.data.data
    // basicInfo.value = { ...res.data.data }
    await new Promise(r => setTimeout(r, 600))
    user.value = {
      public_user_id: 'U003', user_name: 'Sundar Coffee Co.',
      email: 'sundar@coffeeco.in', phone: '9988776655',
      whatsapp_number: '9988776655',
      billing_address_line1: '12, MG Road', billing_address_line2: 'Ernakulam',
      billing_state_id: '', billing_city: '', billing_pincode: '682001',
      shipping_address_line1: 'Warehouse 4, Industrial Area', shipping_address_line2: 'Kalamassery',
      shipping_state_id: '', shipping_city: '', shipping_pincode: '682001',
      country: 'India', registration_status: 'active', user_type: 'wholesale',
    }
    basicInfo.value = { ...user.value }
    samePhone.value = user.value.whatsapp_number === user.value.phone
  } catch (e) { console.error(e) }
  loading.value = false
})
</script>

<style scoped>
.admin-page {
  padding: 24px;
  padding-top: 0 !important;
  min-height: 100vh;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
}

.page-header { margin-bottom: 24px; }
.header-left { display: flex; align-items: center; gap: 14px; }
.page-title { font-size: 1.4rem; font-weight: 800; color: #ffffff; margin: 0 0 2px; }
.page-sub { color: #bdbdbd; font-size: 0.82rem; margin: 0; }

/* Loading */
.loading-state { text-align: center; padding: 80px 20px; color: #94a3b8; }
.loading-dots { display: flex; justify-content: center; gap: 6px; margin-bottom: 12px; }
.loading-dots span { width: 10px; height: 10px; border-radius: 50%; background: #cbd5e1; animation: bounce 0.8s infinite; }
.loading-dots span:nth-child(2) { animation-delay: 0.15s; }
.loading-dots span:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce { 0%,80%,100% { transform: scale(0.7) } 40% { transform: scale(1) } }

/* Layout */
.edit-layout { display: flex; gap: 24px; align-items: flex-start; }
.profile-col { width: 210px; flex-shrink: 0; position: sticky; top: 24px; }
.content-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 16px; }

/* Profile Card */
.profile-card {
  background: #fff; border-radius: 16px; padding: 24px 18px;
  text-align: center; box-shadow: 0 1px 12px rgba(0,0,0,0.06); border: 1px solid #f1f5f9;
}
.profile-avatar {
  width: 64px; height: 64px; border-radius: 18px; margin: 0 auto 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6rem; font-weight: 800; color: #fff;
}
.profile-name { font-weight: 700; color: #1e293b; font-size: 0.9rem; margin-bottom: 4px; }
.profile-email { color: #94a3b8; font-size: 0.72rem; margin-bottom: 2px; word-break: break-all; }
.profile-phone { color: #64748b; font-size: 0.78rem; }
.profile-badges { display: flex; flex-direction: column; gap: 6px; align-items: center; margin-top: 10px; }
.profile-divider { border: none; border-top: 1px solid #f1f5f9; margin: 14px 0; }

.status-pill { font-size: 0.7rem; font-weight: 700; padding: 3px 10px; border-radius: 99px; display: inline-block; }
.status-pill.active { background: #f0fdf4; color: #16a34a; }
.status-pill.unconfirmed { background: #fffbeb; color: #d97706; }
.status-pill.deActive { background: #f1f5f9; color: #64748b; }
.status-pill.reject { background: #fef2f2; color: #dc2626; }
.type-pill { font-size: 0.7rem; font-weight: 700; padding: 3px 10px; border-radius: 99px; display: inline-flex; align-items: center; }
.type-pill.retail { background: #eff6ff; color: #3b82f6; }
.type-pill.wholesale { background: #fdf4ff; color: #9333ea; }

.profile-nav { display: flex; flex-direction: column; gap: 4px; }
.nav-item {
  display: flex; align-items: center; gap: 8px; padding: 8px 12px;
  border-radius: 8px; font-size: 0.8rem; font-weight: 600; color: #64748b;
  cursor: pointer; transition: all 0.15s; text-decoration: none;
}
.nav-item:hover { background: #f1f5f9; color: #1e293b; }
.nav-item.active { background: #1e293b; color: #fff; }

/* Edit Cards */
.edit-card {
  background: #fff; border-radius: 16px; padding: 24px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04); border: 1px solid #f1f5f9;
}
.danger-card { border-color: #fecaca; }

.card-head {
  display: flex; align-items: flex-start; gap: 14px;
  margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f8fafc; flex-wrap: wrap;
}
.card-icon {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;
}
.card-icon.blue { background: #eff6ff; color: #3b82f6; }
.card-icon.purple { background: #faf5ff; color: #9333ea; }
.card-icon.red { background: #fef2f2; color: #ef4444; }
.card-title { font-size: 0.95rem; font-weight: 700; color: #1e293b; margin: 0 0 2px; }
.card-sub { font-size: 0.78rem; color: #94a3b8; margin: 0; }

.inline-msg {
  display: flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 600;
  padding: 4px 10px; border-radius: 8px; margin-left: auto; flex-shrink: 0;
}
.inline-msg.ok { background: #f0fdf4; color: #16a34a; }
.inline-msg.err { background: #fef2f2; color: #dc2626; }

/* ── Address Blocks ── */
.address-block {
  border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 16px 18px; background: #f8fafc;
}
.address-block-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #edf2f7;
}
.address-block-icon {
  width: 30px; height: 30px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;
}
.billing-icon { background: #eff6ff; color: #3b82f6; }
.shipping-icon { background: #f0fdf4; color: #22c55e; }
.address-block-title { font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; }

/* Fields */
.f-label {
  font-size: 0.73rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.4px; color: #64748b; margin-bottom: 5px; display: block;
}
.req { color: #ef4444; }
.f-input {
  width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0;
  border-radius: 10px; font-size: 0.875rem; color: #1e293b;
  background: #f8fafc; outline: none; transition: border-color 0.2s; font-family: inherit;
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
  font-size: 0.875rem; color: #64748b; height: 40px;
}

/* Password */
.pwd-wrap { position: relative; }
.pwd-eye {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 0.85rem; padding: 4px;
}
.pwd-eye:hover { color: #475569; }

/* Card footer */
.card-footer-actions {
  display: flex; justify-content: flex-end; margin-top: 20px;
  padding-top: 16px; border-top: 1px solid #f8fafc;
}
.btn-save {
  padding: 9px 22px; border-radius: 10px; border: none;
  background: linear-gradient(135deg, #1e293b, #334155); color: #fff;
  font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s;
}
.btn-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(30,41,59,0.25); }
.btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-save.purple-btn { background: linear-gradient(135deg, #7c3aed, #9333ea); }

/* Delete */
.delete-body { margin-top: 4px; }
.delete-warning {
  background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px;
  padding: 12px 16px; font-size: 0.85rem; color: #dc2626; font-weight: 500; margin-bottom: 16px;
}
.delete-confirm-row {
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
}
.confirm-label { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #475569; cursor: pointer; font-weight: 500; }
.confirm-label input { accent-color: #ef4444; }
.btn-delete {
  padding: 9px 20px; border-radius: 10px; border: none;
  background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff;
  font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s;
}
.btn-delete:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(239,68,68,0.3); }
.btn-delete:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

@media (max-width: 768px) {
  .edit-layout { flex-direction: column; }
  .profile-col { width: 100%; position: static; }
  .address-block-header { flex-wrap: wrap; }
}
</style>