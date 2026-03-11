<template>
  <section class="profile-page">

    <!-- ── Main Content ────────────────────────────────────────────────────── -->
    <div class="container profile-body">
      <div class="row g-4">

        <!-- ── Left: Sidebar ──────────────────────────────────────────────── -->
        <div class="col-lg-4">

          <!-- ── Profile Summary Card ─────────────────────────────────────── -->
          <div class="sidebar-card profile-summary-card" :class="isWholesale ? 'summary-ws' : 'summary-rt'">
            <div class="summary-bg-pattern"></div>
            <div class="summary-content">
              <div class="summary-avatar-wrap">
                <div class="summary-avatar">
                  <img :src="profile.image || profileImg" alt="profile" />
                </div>
                <div class="summary-avatar-badge" :class="isWholesale ? 'avb-ws' : 'avb-rt'">
                  <i :class="isWholesale ? 'fas fa-briefcase' : 'fas fa-user'"></i>
                </div>
              </div>
              <div class="summary-identity">
                <div class="summary-type-chip" :class="isWholesale ? 'chip-ws' : 'chip-rt'">
                  {{ isWholesale ? 'Wholesale Account' : 'Retail Account' }}
                </div>
                <h5 class="summary-name">{{ profile.user_name || 'My Profile' }}</h5>
                <p class="summary-email">{{ profile.email }}</p>
                <p class="summary-phone" v-if="profile.phone">
                  <i class="fas fa-phone me-1"></i>{{ profile.phone }}
                </p>
              </div>
              <div class="summary-perks" v-if="isWholesale">
                <div class="perk-pill"><i class="fas fa-tag"></i><span>Wholesale Pricing</span></div>
                <div class="perk-pill"><i class="fas fa-truck"></i><span>Priority Shipping</span></div>
                <div class="perk-pill"><i class="fas fa-headset"></i><span>Dedicated Support</span></div>
                <div class="perk-pill"><i class="fas fa-file-invoice"></i><span>B2B Invoicing</span></div>
              </div>
              <div class="summary-upgrade" v-else>
                <i class="fas fa-arrow-circle-up me-1"></i>
                Want wholesale pricing?
                <router-link to="/wholesale-registration" class="upgrade-link">Apply now →</router-link>
              </div>
            </div>
          </div>

          <!-- ── Account Type Card ─────────────────────────────────────────── -->
          <div class="sidebar-card type-card" :class="isWholesale ? 'type-ws' : 'type-rt'">
            <div class="type-card-top">
              <div class="type-card-icon">
                <i :class="isWholesale ? 'fas fa-briefcase' : 'fas fa-shopping-bag'"></i>
              </div>
              <div class="type-card-badge" :class="isWholesale ? 'badge-ws' : 'badge-rt'">
                {{ isWholesale ? 'Verified' : 'Retail' }}
              </div>
            </div>
            <div class="type-card-body">
              <div class="type-label">Account Type</div>
              <div class="type-value">{{ isWholesale ? 'Wholesale Buyer' : 'Retail Customer' }}</div>
              <div class="type-desc" v-if="isWholesale">
                Full B2B access with wholesale pricing and bulk ordering enabled across all products.
              </div>
              <div class="type-desc" v-else>
                Standard retail pricing. Upgrade to wholesale for better rates and priority support.
              </div>
            </div>
            <template v-if="isWholesale">
              <div class="ws-gst-row" v-if="profile.gst_number">
                <span class="gst-lbl"><i class="fas fa-id-card me-1"></i>GST</span>
                <span class="gst-val">{{ profile.gst_number }}</span>
              </div>
              <button class="btn-view-application" @click="showApplicationModal = true">
                <i class="fas fa-file-contract me-2"></i>View Wholesale Application
              </button>
            </template>
            <router-link v-else to="/wholesale-registration" class="upgrade-btn">
              <i class="fas fa-arrow-up me-1"></i> Upgrade to Wholesale
            </router-link>
          </div>

          <!-- ── Quick Links Card ──────────────────────────────────────────── -->
          <div class="sidebar-card links-card">
            <h6 class="sidebar-title">Quick Links</h6>
            <div class="quick-links">
              <router-link to="/orderview" class="quick-link">
                <div class="ql-icon orders"><i class="fas fa-box-open"></i></div>
                <div class="ql-text">
                  <span class="ql-label">My Orders</span>
                  <span class="ql-sub">View order history</span>
                </div>
                <i class="fas fa-chevron-right ql-arrow"></i>
              </router-link>
              <router-link to="/cart" class="quick-link">
                <div class="ql-icon cart"><i class="fas fa-shopping-cart"></i></div>
                <div class="ql-text">
                  <span class="ql-label">My Cart</span>
                  <span class="ql-sub">View saved items</span>
                </div>
                <i class="fas fa-chevron-right ql-arrow"></i>
              </router-link>
            </div>
          </div>

          <!-- ── Security Card ─────────────────────────────────────────────── -->
          <div class="sidebar-card security-card">
            <h6 class="sidebar-title">Security</h6>
            <p class="security-sub">Keep your account secure with a strong password</p>
            <button class="btn-change-pwd" @click="showPasswordModal = true">
              <i class="fas fa-lock me-2"></i> Change Password
            </button>
          </div>

        </div>

        <!-- ── Right: Form ──────────────────────────────────────────────────── -->
        <div class="col-lg-8">
          <div class="form-card">
            <div class="form-card-head">
              <h5 class="fc-title">Personal Information</h5>
              <p class="fc-sub">Update your account details and contact information</p>
            </div>

            <form @submit.prevent="updateProfile">
              <div class="row g-3">

                <div class="col-md-6">
                  <label class="f-label">{{ isWholesale ? 'Company / User Name' : 'Full Name' }}</label>
                  <input type="text" class="f-input" v-model="profile.user_name" placeholder="Enter your name" />
                </div>

                <div class="col-md-6">
                  <label class="f-label">Email Address</label>
                  <div class="input-locked">
                    <i class="fas fa-lock lock-icon"></i>
                    <input type="email" class="f-input locked" v-model="profile.email" disabled />
                  </div>
                  <p class="f-hint">Email cannot be changed. Contact support if needed.</p>
                </div>

                <div class="col-md-6">
                  <label class="f-label">Phone Number</label>
                  <input type="text" class="f-input" v-model="profile.phone" placeholder="+91 98765 43210" />
                </div>

                <div class="col-md-6">
                  <label class="f-label">WhatsApp Number</label>
                  <div class="input-with-same">
                    <input type="text" class="f-input" v-model="profile.whatsapp_number"
                      placeholder="+91 98765 43210" :readonly="sameAsPhone" />
                    <label class="same-tag">
                      <input type="checkbox" v-model="sameAsPhone" @change="onSamePhone" /> Same as phone
                    </label>
                  </div>
                </div>

                <!-- GST - only for wholesale -->
                <div class="col-md-6" v-if="isWholesale">
                  <label class="f-label">GST Number</label>
                  <input type="text" class="f-input" v-model="profile.gst_number"
                    placeholder="29ABCDE1234F1Z5" maxlength="15" />
                </div>

                <!-- ── Address Section Divider ── -->
                <div class="col-12">
                  <div class="section-divider"><span>Address Details</span></div>
                </div>

                <!-- ══════════════════════════════════════════════════════════
                     BILLING ADDRESS
                ══════════════════════════════════════════════════════════ -->
                <div class="col-12">
                  <div class="address-block">
                    <div class="address-block-header">
                      <div class="address-block-icon billing-icon">
                        <i class="fas fa-receipt"></i>
                      </div>
                      <span class="address-block-title">Billing Address</span>
                    </div>

                    <div class="row g-3">
                      <!-- Billing Line 1 -->
                      <div class="col-md-6">
                        <label class="f-label">Address Line 1</label>
                        <input type="text" class="f-input" v-model="profile.billing_address_line1"
                          placeholder="House / Flat no., Street name" />
                      </div>

                      <!-- Billing Line 2 -->
                      <div class="col-md-6">
                        <label class="f-label">Address Line 2</label>
                        <input type="text" class="f-input" v-model="profile.billing_address_line2"
                          placeholder="Area, Landmark (optional)" />
                      </div>

                      <!-- Billing State -->
                      <div class="col-md-4">
                        <label class="f-label">State</label>
                        <Multiselect
                          v-model="selectedBillingState"
                          :options="billingStates"
                          label="state"
                          track-by="state_id"
                          placeholder="Select State"
                          @select="onBillingStateChange"
                          class="ms-custom" />
                      </div>

                      <!-- Billing City -->
                      <div class="col-md-4">
                        <label class="f-label">City</label>
                        <Multiselect
                          v-model="selectedBillingCity"
                          :options="billingCities"
                          label="city"
                          track-by="city_id"
                          placeholder="Select City"
                          :disabled="!selectedBillingState"
                          class="ms-custom" />
                      </div>

                      <!-- Billing Pincode -->
                      <div class="col-md-2">
                        <label class="f-label">Pincode</label>
                        <input type="text" class="f-input" v-model="profile.billing_pincode"
                          placeholder="560001" maxlength="6" />
                      </div>

                      <!-- Billing Country -->
                      <div class="col-md-2">
                        <label class="f-label">Country</label>
                        <div class="country-static">🇮🇳 India</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ══════════════════════════════════════════════════════════
                     SHIPPING ADDRESS
                ══════════════════════════════════════════════════════════ -->
                <div class="col-12">
                  <div class="address-block">
                    <div class="address-block-header">
                      <div class="address-block-icon shipping-icon">
                        <i class="fas fa-truck"></i>
                      </div>
                      <span class="address-block-title">Shipping Address</span>
                      <!-- Same as Billing Toggle -->
                      <label class="same-delivery-check ms-auto">
                        <input type="checkbox" v-model="sameShippingAsBilling" @change="onSameShipping" />
                        Same as Billing Address
                      </label>
                    </div>

                    <div class="row g-3">
                      <!-- Shipping Line 1 -->
                      <div class="col-md-6">
                        <label class="f-label">Address Line 1</label>
                        <input type="text"
                          :class="['f-input', sameShippingAsBilling ? 'locked' : '']"
                          v-model="profile.shipping_address_line1"
                          placeholder="House / Flat no., Street name"
                          :readonly="sameShippingAsBilling" />
                      </div>

                      <!-- Shipping Line 2 -->
                      <div class="col-md-6">
                        <label class="f-label">Address Line 2</label>
                        <input type="text"
                          :class="['f-input', sameShippingAsBilling ? 'locked' : '']"
                          v-model="profile.shipping_address_line2"
                          placeholder="Area, Landmark (optional)"
                          :readonly="sameShippingAsBilling" />
                      </div>

                      <!-- Shipping State -->
                      <div class="col-md-4">
                        <label class="f-label">State</label>
                        <Multiselect
                          v-model="selectedShippingState"
                          :options="shippingStates"
                          label="state"
                          track-by="state_id"
                          placeholder="Select State"
                          @select="onShippingStateChange"
                          :disabled="sameShippingAsBilling"
                          :class="['ms-custom', sameShippingAsBilling ? 'ms-locked' : '']" />
                      </div>

                      <!-- Shipping City -->
                      <div class="col-md-4">
                        <label class="f-label">City</label>
                        <Multiselect
                          v-model="selectedShippingCity"
                          :options="shippingCities"
                          label="city"
                          track-by="city_id"
                          placeholder="Select City"
                          :disabled="sameShippingAsBilling || !selectedShippingState"
                          :class="['ms-custom', sameShippingAsBilling ? 'ms-locked' : '']" />
                      </div>

                      <!-- Shipping Pincode -->
                      <div class="col-md-2">
                        <label class="f-label">Pincode</label>
                        <input type="text"
                          :class="['f-input', sameShippingAsBilling ? 'locked' : '']"
                          v-model="profile.shipping_pincode"
                          placeholder="560001" maxlength="6"
                          :readonly="sameShippingAsBilling" />
                      </div>

                      <!-- Shipping Country -->
                      <div class="col-md-2">
                        <label class="f-label">Country</label>
                        <div class="country-static">🇮🇳 India</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div><!-- /.row -->

              <div class="form-footer">
                <button class="btn-save" type="submit" :disabled="loading">
                  <i class="fas fa-save me-2" v-if="!loading"></i>
                  <i class="fas fa-spinner fa-spin me-2" v-else></i>
                  {{ loading ? 'Saving...' : 'Save Changes' }}
                </button>
                <transition name="msg-fade">
                  <span v-if="saveMessage" class="save-msg" :class="saveOk ? 'ok' : 'err'">
                    <i :class="saveOk ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="me-1"></i>
                    {{ saveMessage }}
                  </span>
                </transition>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════════
         Wholesale Application View Modal
    ══════════════════════════════════════════════════════════════════════ -->
    <transition name="modal-fade">
      <div class="modal-overlay" v-if="showApplicationModal" @click.self="showApplicationModal = false">
        <div class="modal-box app-modal-box">
          <div class="app-modal-head">
            <div class="app-modal-icon"><i class="fas fa-file-contract"></i></div>
            <div class="app-modal-head-text">
              <h5 class="modal-title">Wholesale Application</h5>
              <p class="modal-sub">Your submitted wholesale registration details</p>
            </div>
            <div class="app-status-chip" :class="'chip-' + (wholesaleApplication.status || 'pending')">
              <i :class="{
                'fas fa-clock': wholesaleApplication.status === 'pending',
                'fas fa-check-circle': wholesaleApplication.status === 'approved',
                'fas fa-times-circle': wholesaleApplication.status === 'rejected'
              }" class="me-1"></i>
              {{ statusLabel(wholesaleApplication.status) }}
            </div>
            <button class="modal-close" @click="showApplicationModal = false">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="app-loading" v-if="applicationLoading">
            <div class="loading-dots"><span></span><span></span><span></span></div>
            <p>Loading application details...</p>
          </div>

          <div class="app-modal-body" v-else>
            <div class="rejection-notice"
              v-if="wholesaleApplication.status === 'rejected' && wholesaleApplication.rejection_reason">
              <i class="fas fa-exclamation-triangle me-2"></i>
              <div>
                <strong>Application Rejected</strong>
                <p>{{ wholesaleApplication.rejection_reason }}</p>
              </div>
            </div>

            <div class="app-section">
              <div class="app-section-title"><i class="fas fa-building me-2"></i>Company Details</div>
              <div class="app-grid">
                <div class="app-field">
                  <span class="app-field-lbl">Company Name</span>
                  <span class="app-field-val">{{ wholesaleApplication.company_name || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">Business Type</span>
                  <span class="app-field-val">{{ wholesaleApplication.business_type || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">GSTIN</span>
                  <span class="app-field-val mono">{{ wholesaleApplication.gstin || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">PAN</span>
                  <span class="app-field-val mono">{{ wholesaleApplication.pan || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">Year Established</span>
                  <span class="app-field-val">{{ wholesaleApplication.year_established || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">Website</span>
                  <span class="app-field-val">{{ wholesaleApplication.website || '—' }}</span>
                </div>
              </div>
            </div>

            <div class="app-section">
              <div class="app-section-title"><i class="fas fa-user-tie me-2"></i>Contact Person</div>
              <div class="app-grid">
                <div class="app-field">
                  <span class="app-field-lbl">Name</span>
                  <span class="app-field-val">{{ wholesaleApplication.contact_name || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">Designation</span>
                  <span class="app-field-val">{{ wholesaleApplication.designation || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">Mobile</span>
                  <span class="app-field-val">{{ wholesaleApplication.mobile || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">WhatsApp</span>
                  <span class="app-field-val">{{ wholesaleApplication.whatsapp || '—' }}</span>
                </div>
                <div class="app-field col-span-2">
                  <span class="app-field-lbl">Email</span>
                  <span class="app-field-val">{{ wholesaleApplication.contact_email || '—' }}</span>
                </div>
              </div>
            </div>

            <div class="app-section">
              <div class="app-section-title"><i class="fas fa-chart-bar me-2"></i>Business Information</div>
              <div class="app-grid">
                <div class="app-field">
                  <span class="app-field-lbl">Nature of Business</span>
                  <span class="app-field-val">{{ wholesaleApplication.nature_of_business || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">Monthly Requirement</span>
                  <span class="app-field-val">{{ wholesaleApplication.monthly_requirement || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">First Order Qty</span>
                  <span class="app-field-val">{{ wholesaleApplication.first_order_qty || '—' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">Private Label</span>
                  <span class="app-field-val">{{ wholesaleApplication.private_label ? 'Yes' : 'No' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">Long-term Contract</span>
                  <span class="app-field-val">{{ wholesaleApplication.long_term_contract ? 'Yes' : 'No' }}</span>
                </div>
                <div class="app-field">
                  <span class="app-field-lbl">Submitted On</span>
                  <span class="app-field-val">{{ formatDate(wholesaleApplication.submitted_at) }}</span>
                </div>
              </div>
            </div>

            <div class="app-section">
              <div class="app-section-title"><i class="fas fa-map-marker-alt me-2"></i>Address</div>
              <div class="app-grid">
                <div class="app-field col-span-2">
                  <span class="app-field-lbl">Billing Address</span>
                  <span class="app-field-val">{{ wholesaleApplication.billing_address || '—' }}</span>
                </div>
                <div class="app-field col-span-2">
                  <span class="app-field-lbl">Shipping Address</span>
                  <span class="app-field-val">{{ wholesaleApplication.shipping_address || '—' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="app-modal-footer">
            <button class="btn-modal-cancel" @click="showApplicationModal = false">Close</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ══════════════════════════════════════════════════════════════════════
         Change Password Modal
    ══════════════════════════════════════════════════════════════════════ -->
    <transition name="modal-fade">
      <div class="modal-overlay" v-if="showPasswordModal" @click.self="closePasswordModal">
        <div class="modal-box">
          <div class="modal-box-head">
            <div class="modal-icon"><i class="fas fa-lock"></i></div>
            <div>
              <h5 class="modal-title">Change Password</h5>
              <p class="modal-sub">Enter your current password to set a new one</p>
            </div>
            <button class="modal-close" @click="closePasswordModal"><i class="fas fa-times"></i></button>
          </div>

          <form @submit.prevent="changePassword" class="modal-form">
            <div class="mb-3">
              <label class="f-label">Current Password <span class="req">*</span></label>
              <div class="pwd-wrap">
                <input :type="showCurrent ? 'text' : 'password'" class="f-input pe-5"
                  v-model="passwordForm.current_password" placeholder="Enter current password" required />
                <button type="button" class="pwd-eye" @click="showCurrent = !showCurrent">
                  <i :class="showCurrent ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
            <div class="mb-3">
              <label class="f-label">New Password <span class="req">*</span></label>
              <div class="pwd-wrap">
                <input :type="showNew ? 'text' : 'password'" class="f-input pe-5"
                  v-model="passwordForm.password" placeholder="Min. 8 characters" minlength="8" required />
                <button type="button" class="pwd-eye" @click="showNew = !showNew">
                  <i :class="showNew ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
            <div class="mb-3">
              <label class="f-label">Confirm New Password <span class="req">*</span></label>
              <div class="pwd-wrap">
                <input :type="showConfirm ? 'text' : 'password'" class="f-input pe-5"
                  :class="pwdMismatch ? 'is-invalid' : (passwordForm.password_confirmation ? 'is-valid' : '')"
                  v-model="passwordForm.password_confirmation" placeholder="Re-enter new password" required />
                <button type="button" class="pwd-eye" @click="showConfirm = !showConfirm">
                  <i :class="showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <p class="f-error" v-if="pwdMismatch">Passwords do not match.</p>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn-modal-cancel" @click="closePasswordModal">Cancel</button>
              <button type="submit" class="btn-modal-submit" :disabled="passwordLoading || pwdMismatch">
                <i class="fas fa-spinner fa-spin me-2" v-if="passwordLoading"></i>
                {{ passwordLoading ? 'Updating...' : 'Update Password' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import profileImg from '@/assets/website/img/reviewer-1.png';
import { websiteApi } from '@/services/api';
import { useToast } from 'vue-toastification';

const toast = useToast();

// ── State ─────────────────────────────────────────────────────────────────────
const profile = ref({});
const loading = ref(false);
const sameAsPhone = ref(false);
const saveMessage = ref('');
const saveOk = ref(true);

// ── Billing Location ──────────────────────────────────────────────────────────
const billingStates = ref([]);
const billingCities = ref([]);
const selectedBillingState = ref(null);
const selectedBillingCity = ref(null);

// ── Shipping Location ─────────────────────────────────────────────────────────
const shippingStates = ref([]);
const shippingCities = ref([]);
const selectedShippingState = ref(null);
const selectedShippingCity = ref(null);
const sameShippingAsBilling = ref(false);

// Password modal
const passwordLoading = ref(false);
const showPasswordModal = ref(false);
const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);
const passwordForm = ref({ current_password: '', password: '', password_confirmation: '' });

// Wholesale application modal
const showApplicationModal = ref(false);
const applicationLoading = ref(false);
const wholesaleApplication = ref({});

// ── Computed ──────────────────────────────────────────────────────────────────
const isWholesale = computed(() => profile.value.user_type === 'wholesale');
const pwdMismatch = computed(() =>
  passwordForm.value.password_confirmation &&
  passwordForm.value.password !== passwordForm.value.password_confirmation
);

// ── Helpers ───────────────────────────────────────────────────────────────────
const onSamePhone = () => {
  if (sameAsPhone.value) profile.value.whatsapp_number = profile.value.phone;
};

const onSameShipping = () => {
  if (sameShippingAsBilling.value) {
    profile.value.shipping_address_line1 = profile.value.billing_address_line1;
    profile.value.shipping_address_line2 = profile.value.billing_address_line2;
    profile.value.shipping_pincode = profile.value.billing_pincode;
    selectedShippingState.value = selectedBillingState.value;
    selectedShippingCity.value = selectedBillingCity.value;
    profile.value.shipping_state_id = profile.value.billing_state_id;
    profile.value.shipping_city_id = profile.value.billing_city_id;
  } else {
    profile.value.shipping_address_line1 = '';
    profile.value.shipping_address_line2 = '';
    profile.value.shipping_pincode = '';
    selectedShippingState.value = null;
    selectedShippingCity.value = null;
    profile.value.shipping_state_id = '';
    profile.value.shipping_city_id = '';
  }
};

const showSaveMsg = (msg, ok = true) => {
  saveMessage.value = msg; saveOk.value = ok;
  setTimeout(() => saveMessage.value = '', 3500);
};
const statusLabel = (s) => ({ pending: 'Pending Review', approved: 'Approved', rejected: 'Rejected' }[s] || 'Pending Review');
const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

// ── API ───────────────────────────────────────────────────────────────────────
const getStates = async () => {
  try {
    const res = await websiteApi.get('/v1/state/active');
    if (res.data.success) {
      billingStates.value = res.data.data;
      shippingStates.value = res.data.data;
    }
  } catch (e) { console.error(e); }
};

const getBillingCities = async (stateId) => {
  try {
    const res = await websiteApi.get(`/v1/city/active/${stateId}`);
    if (res.data.success) billingCities.value = res.data.data;
  } catch (e) { billingCities.value = []; }
};

const getShippingCities = async (stateId) => {
  try {
    const res = await websiteApi.get(`/v1/city/active/${stateId}`);
    if (res.data.success) shippingCities.value = res.data.data;
  } catch (e) { shippingCities.value = []; }
};

const getProfile = async () => {
  try {
    const res = await websiteApi.get('/v1/user/profile/view');
    if (res.data.success) {
      profile.value = { ...res.data.data };
      sameShippingAsBilling.value = !!profile.value.same_shipping_as_billing;

      // Restore billing state + city
      if (profile.value.billing_state_id && billingStates.value.length > 0) {
        selectedBillingState.value = billingStates.value.find(s => s.state_id === profile.value.billing_state_id) || null;
        if (selectedBillingState.value) {
          await getBillingCities(profile.value.billing_state_id);
          selectedBillingCity.value = billingCities.value.find(c => c.city_id === profile.value.billing_city_id) || null;
        }
      }

      // Restore shipping state + city (only if different from billing)
      if (!sameShippingAsBilling.value && profile.value.shipping_state_id && shippingStates.value.length > 0) {
        selectedShippingState.value = shippingStates.value.find(s => s.state_id === profile.value.shipping_state_id) || null;
        if (selectedShippingState.value) {
          await getShippingCities(profile.value.shipping_state_id);
          selectedShippingCity.value = shippingCities.value.find(c => c.city_id === profile.value.shipping_city_id) || null;
        }
      }
    }
  } catch (e) {
    console.error(e);
    toast.error('Failed to load profile.');
  }
};

const onBillingStateChange = async () => {
  profile.value.billing_state_id = selectedBillingState.value?.state_id || '';
  selectedBillingCity.value = null;
  profile.value.billing_city_id = '';
  billingCities.value = [];
  if (selectedBillingState.value) await getBillingCities(selectedBillingState.value.state_id);
};

const onShippingStateChange = async () => {
  profile.value.shipping_state_id = selectedShippingState.value?.state_id || '';
  selectedShippingCity.value = null;
  profile.value.shipping_city_id = '';
  shippingCities.value = [];
  if (selectedShippingState.value) await getShippingCities(selectedShippingState.value.state_id);
};

// Sync city selections back to profile
watch(selectedBillingCity, (val) => { profile.value.billing_city_id = val?.city_id || ''; });
watch(selectedShippingCity, (val) => { profile.value.shipping_city_id = val?.city_id || ''; });

const updateProfile = async () => {
  loading.value = true;
  try {
    // If same shipping, copy billing fields
    if (sameShippingAsBilling.value) {
      profile.value.shipping_address_line1 = profile.value.billing_address_line1;
      profile.value.shipping_address_line2 = profile.value.billing_address_line2;
      profile.value.shipping_state_id = profile.value.billing_state_id;
      profile.value.shipping_city_id = profile.value.billing_city_id;
      profile.value.shipping_pincode = profile.value.billing_pincode;
    }

    const payload = { ...profile.value };

    const res = await websiteApi.put('/v1/user/profile/update', payload);
    if (res.data.success) {
      const userData = localStorage.getItem('website_user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          user.name = profile.value.user_name;
          user.email = profile.value.email;
          user.phone = profile.value.phone;
          localStorage.setItem('website_user', JSON.stringify(user));
          window.dispatchEvent(new Event('storage'));
        } catch (err) { console.error(err); }
      }
      showSaveMsg('Profile updated successfully!', true);
      toast.success('Profile updated!');
    } else {
      showSaveMsg(res.data.message || 'Failed to update profile.', false);
      toast.error(res.data.message || 'Failed to update.');
    }
  } catch (e) {
    showSaveMsg('An error occurred. Please try again.', false);
    toast.error('An error occurred. Please try again.');
  } finally {
    loading.value = false;
  }
};

// ── Wholesale Application ─────────────────────────────────────────────────────
const openApplicationModal = async () => {
  applicationLoading.value = true;
  try {
    const res = await websiteApi.get('/v1/user/wholesale-application');
    if (res.data.success) wholesaleApplication.value = res.data.data;
  } catch (e) {
    wholesaleApplication.value = {
      status: 'approved',
      company_name: profile.value.user_name,
      gstin: profile.value.gst_number,
    };
  } finally {
    applicationLoading.value = false;
  }
};

watch(showApplicationModal, (val) => {
  if (val && isWholesale.value) openApplicationModal();
});

// ── Password Modal ────────────────────────────────────────────────────────────
const closePasswordModal = () => {
  showPasswordModal.value = false;
  passwordForm.value = { current_password: '', password: '', password_confirmation: '' };
  showCurrent.value = false; showNew.value = false; showConfirm.value = false;
};

const changePassword = async () => {
  if (!passwordForm.value.current_password || !passwordForm.value.password || !passwordForm.value.password_confirmation) {
    toast.warning('Please fill all password fields.'); return;
  }
  if (pwdMismatch.value) { toast.warning('Passwords do not match!'); return; }
  passwordLoading.value = true;
  try {
    const res = await websiteApi.put('/v1/user/profile/password/update', {
      current_password: passwordForm.value.current_password,
      password: passwordForm.value.password,
      password_confirmation: passwordForm.value.password_confirmation,
    });
    if (res.data.success) {
      toast.success(res.data.message || 'Password updated successfully.');
      closePasswordModal();
    } else {
      toast.error(res.data.message || 'Failed to update password.');
    }
  } catch (e) {
    toast.error('An error occurred while changing your password.');
  } finally {
    passwordLoading.value = false;
  }
};

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(async () => {
  await getStates();
  await getProfile();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

.profile-page {
  background: #f6f7fa;
  min-height: 100vh;
  padding-bottom: 60px;
}

.profile-body { padding-top: 32px; }

/* ── Form Card ── */
.form-card {
  background: #fff;
  border-radius: 18px;
  padding: 32px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
}

.form-card-head {
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid #f5f5f5;
}

.fc-title {
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px;
}

.fc-sub { font-size: 0.82rem; color: #94a3b8; margin: 0; }

.f-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #64748b;
  margin-bottom: 5px;
  display: block;
}

.req { color: #ef4444; }

.f-input {
  width: 100%;
  padding: 9px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #1e293b;
  background: #fafafa;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.f-input:focus {
  border-color: #7c3c0d;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(124, 60, 13, 0.08);
}

.f-input.locked { background: #f1f5f9; color: #94a3b8; cursor: not-allowed; }
.f-input.is-valid { border-color: #22c55e; }
.f-input.is-invalid { border-color: #ef4444; }
.f-hint { font-size: 0.72rem; color: #94a3b8; margin-top: 4px; margin-bottom: 0; }
.f-error { font-size: 0.75rem; color: #ef4444; margin-top: 4px; }

.input-locked { position: relative; }
.lock-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #cbd5e1;
  font-size: 0.8rem;
  pointer-events: none;
}

.input-with-same { position: relative; }
.same-tag {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.72rem;
  color: #7c3c0d;
  font-weight: 600;
  cursor: pointer;
  background: #fff;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.same-tag input { accent-color: #7c3c0d; }

.section-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #94a3b8;
  font-size: 0.73rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin: 4px 0;
}
.section-divider::before,
.section-divider::after { content: ''; flex: 1; height: 1px; background: #f1f5f9; }

/* ── Address Blocks ── */
.address-block {
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px 20px;
  background: #fafafa;
}

.address-block-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.address-block-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.billing-icon { background: #eff6ff; color: #3b82f6; }
.shipping-icon { background: #f0fdf4; color: #22c55e; }

.address-block-title {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #475569;
}

/* Same as billing notice */
.same-billing-notice {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  color: #16a34a;
  font-size: 0.82rem;
  font-weight: 600;
}

.same-delivery-check {
  font-size: 0.75rem;
  color: #7c3c0d;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}
.same-delivery-check input { accent-color: #7c3c0d; }

.country-static {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  background: #f1f5f9;
  font-size: 0.9rem;
  color: #64748b;
  height: 40px;
}

/* Multiselect */
.ms-custom {
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 10px !important;
  background: #fafafa !important;
}
:deep(.multiselect__tags) {
  border: none !important;
  background: transparent !important;
  border-radius: 10px !important;
  padding: 6px 40px 0 10px !important;
  min-height: unset;
}
:deep(.multiselect__placeholder) { color: #adb5bd !important; font-size: 0.9rem; }
:deep(.multiselect__option--highlight) { background: #7c3c0d !important; }
:deep(.multiselect__option--selected) { background: #fdf6ef !important; color: #7c3c0d !important; }
:deep(.multiselect--disabled) { opacity: 0.5; }
.ms-locked { opacity: 0.6 !important; background: #f1f5f9 !important; }

/* Form footer */
.form-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #f5f5f5;
  flex-wrap: wrap;
}

.btn-save {
  padding: 10px 28px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #7c3c0d, #c0622a);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
}
.btn-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(124, 60, 13, 0.35); }
.btn-save:disabled { opacity: 0.55; cursor: not-allowed; }

.save-msg { font-size: 0.82rem; font-weight: 600; display: flex; align-items: center; }
.save-msg.ok { color: #16a34a; }
.save-msg.err { color: #dc2626; }

.msg-fade-enter-active, .msg-fade-leave-active { transition: opacity 0.3s; }
.msg-fade-enter-from, .msg-fade-leave-to { opacity: 0; }

/* ── Sidebar Common ── */
.sidebar-card {
  background: #fff;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  margin-bottom: 16px;
}
.sidebar-title {
  font-size: 0.88rem;
  font-weight: 800;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

/* ── Profile Summary Card ── */
.profile-summary-card { position: relative; overflow: hidden; padding: 0; border: none; }
.summary-ws { background: linear-gradient(135deg, #3b1f00 0%, #7c3c0d 55%, #c0622a 100%); }
.summary-rt { background: linear-gradient(135deg, #1e293b 0%, #334155 60%, #475569 100%); }
.summary-bg-pattern {
  position: absolute; inset: 0; z-index: 0;
  background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 1px, transparent 1px),
                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
.summary-content { position: relative; z-index: 1; padding: 24px 20px; display: flex; flex-direction: column; gap: 14px; }
.summary-avatar-wrap { position: relative; width: fit-content; }
.summary-avatar { width: 72px; height: 72px; border-radius: 18px; border: 3px solid rgba(255,255,255,0.25); overflow: hidden; background: rgba(255,255,255,0.1); }
.summary-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.summary-avatar-badge { position: absolute; bottom: -5px; right: -5px; width: 24px; height: 24px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 0.68rem; border: 2px solid transparent; }
.avb-ws { background: #c0622a; color: #fff; border-color: #3b1f00; }
.avb-rt { background: #475569; color: #fff; border-color: #1e293b; }
.summary-type-chip { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 99px; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 6px; }
.chip-ws { background: rgba(192,98,42,0.3); color: #fcd9b5; border: 1px solid rgba(192,98,42,0.4); }
.chip-rt { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.75); border: 1px solid rgba(255,255,255,0.2); }
.summary-name { font-family: 'Lora', serif; font-size: 1.05rem; font-weight: 700; color: #fff; margin: 0 0 3px; }
.summary-email { color: rgba(255,255,255,0.6); font-size: 0.82rem; margin: 0 0 2px; }
.summary-phone { color: rgba(255,255,255,0.5); font-size: 0.78rem; margin: 0; }
.summary-perks { display: flex; flex-wrap: wrap; gap: 6px; }
.perk-pill { display: inline-flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 7px; padding: 5px 10px; font-size: 0.72rem; color: rgba(255,255,255,0.8); font-weight: 500; }
.perk-pill i { color: #fcd9b5; font-size: 0.72rem; }
.summary-upgrade { font-size: 0.78rem; color: rgba(255,255,255,0.5); }
.upgrade-link { color: #93c5fd; font-weight: 600; text-decoration: none; margin-left: 4px; }
.upgrade-link:hover { text-decoration: underline; }

/* Type Card */
.type-card { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; }
.type-ws { border-color: #fcd9b5; background: linear-gradient(160deg, #fff9f4, #fff); }
.type-rt { border-color: #e2e8f0; }
.type-card-top { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%; }
.type-card-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
.type-ws .type-card-icon { background: linear-gradient(135deg, #7c3c0d, #c0622a); color: #fff; }
.type-rt .type-card-icon { background: #f1f5f9; color: #475569; }
.type-card-badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 99px; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
.badge-ws { background: #dcfce7; color: #16a34a; }
.badge-rt { background: #f1f5f9; color: #64748b; }
.type-card-body { width: 100%; }
.type-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; }
.type-value { font-size: 1rem; font-weight: 800; color: #1e293b; margin-top: 2px; }
.type-desc { font-size: 0.78rem; color: #64748b; line-height: 1.5; margin-top: 6px; }
.ws-gst-row { display: flex; align-items: center; justify-content: space-between; width: 100%; background: #fdf6ef; border: 1px solid #fcd9b5; border-radius: 8px; padding: 7px 12px; }
.gst-lbl { font-size: 0.72rem; font-weight: 700; color: #b45309; }
.gst-val { font-size: 0.82rem; font-weight: 700; color: #7c3c0d; font-family: monospace; }
.btn-view-application { width: 100%; padding: 10px 14px; border-radius: 10px; border: 1.5px solid #fcd9b5; background: linear-gradient(135deg, #7c3c0d, #c0622a); color: #fff; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; font-family: inherit; display: flex; align-items: center; justify-content: center; }
.btn-view-application:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(124,60,13,0.35); }
.upgrade-btn { display: inline-flex; align-items: center; background: linear-gradient(135deg, #1e293b, #334155); color: #fff; text-decoration: none; padding: 8px 18px; border-radius: 10px; font-size: 0.8rem; font-weight: 700; transition: all 0.2s; margin-top: 4px; }
.upgrade-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(30,41,59,0.25); color: #fff; }

/* Quick Links */
.quick-links { display: flex; flex-direction: column; gap: 4px; }
.quick-link { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; text-decoration: none; color: #334155; transition: background 0.15s; border: 1px solid transparent; }
.quick-link:hover { background: #f8fafc; border-color: #f1f5f9; color: #1e293b; }
.ql-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0; }
.ql-icon.orders { background: #eff6ff; color: #3b82f6; }
.ql-icon.cart { background: #f0fdf4; color: #22c55e; }
.ql-text { flex: 1; display: flex; flex-direction: column; }
.ql-label { font-weight: 700; font-size: 0.85rem; }
.ql-sub { font-size: 0.72rem; color: #94a3b8; }
.ql-arrow { color: #cbd5e1; font-size: 0.75rem; }

/* Security */
.security-sub { font-size: 0.8rem; color: #94a3b8; margin-bottom: 14px; }
.btn-change-pwd { width: 100%; padding: 10px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: #fff; color: #475569; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; font-family: inherit; display: flex; align-items: center; justify-content: center; }
.btn-change-pwd:hover { background: #1e293b; color: #fff; border-color: #1e293b; }

/* ── Modal Base ── */
.modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.55); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
.modal-box { background: #fff; border-radius: 20px; padding: 32px; width: 100%; max-width: 440px; box-shadow: 0 20px 60px rgba(0,0,0,0.18); }
.modal-box-head { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid #f5f5f5; }
.modal-icon { width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #7c3c0d, #c0622a); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.modal-title { font-size: 1rem; font-weight: 800; color: #1e293b; margin: 0 0 2px; }
.modal-sub { font-size: 0.78rem; color: #94a3b8; margin: 0; }
.modal-close { margin-left: auto; background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 0.9rem; padding: 4px; flex-shrink: 0; }
.modal-close:hover { color: #1e293b; }
.pwd-wrap { position: relative; }
.pwd-eye { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 0.85rem; }
.pwd-eye:hover { color: #475569; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
.btn-modal-cancel { padding: 9px 20px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: #fff; color: #64748b; font-weight: 600; font-size: 0.875rem; cursor: pointer; font-family: inherit; transition: background 0.15s; }
.btn-modal-cancel:hover { background: #f8fafc; }
.btn-modal-submit { padding: 9px 22px; border-radius: 10px; border: none; background: linear-gradient(135deg, #7c3c0d, #c0622a); color: #fff; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: inline-flex; align-items: center; transition: all 0.2s; font-family: inherit; }
.btn-modal-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(124,60,13,0.3); }
.btn-modal-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* ── Wholesale Application Modal ── */
.app-modal-box { max-width: 680px; padding: 0; overflow: hidden; display: flex; flex-direction: column; max-height: 90vh; }
.app-modal-head { display: flex; align-items: center; gap: 14px; flex-shrink: 0; padding: 24px 28px 20px; border-bottom: 1px solid #f5f5f5; background: linear-gradient(135deg, #fff9f4, #fff); }
.app-modal-icon { width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, #7c3c0d, #c0622a); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
.app-modal-head-text { flex: 1; }
.app-status-chip { display: inline-flex; align-items: center; padding: 5px 12px; border-radius: 99px; font-size: 0.73rem; font-weight: 800; letter-spacing: 0.3px; }
.chip-pending { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }
.chip-approved { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.chip-rejected { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.app-loading { padding: 40px; text-align: center; color: #94a3b8; font-size: 0.85rem; }
.loading-dots { display: flex; justify-content: center; gap: 6px; margin-bottom: 12px; }
.loading-dots span { width: 8px; height: 8px; border-radius: 50%; background: #fcd9b5; animation: bounce 0.8s infinite; }
.loading-dots span:nth-child(2) { animation-delay: 0.15s; }
.loading-dots span:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce { 0%,80%,100% { transform: scale(0.7) } 40% { transform: scale(1) } }
.app-modal-body { overflow-y: auto; padding: 24px 28px; flex: 1; }
.rejection-notice { display: flex; align-items: flex-start; gap: 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 14px 16px; margin-bottom: 20px; color: #dc2626; }
.rejection-notice i { flex-shrink: 0; margin-top: 2px; }
.rejection-notice strong { display: block; font-size: 0.85rem; margin-bottom: 3px; }
.rejection-notice p { font-size: 0.8rem; margin: 0; color: #b91c1c; }
.app-section { margin-bottom: 22px; }
.app-section:last-child { margin-bottom: 0; }
.app-section-title { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #7c3c0d; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1.5px solid #fdf3ea; display: flex; align-items: center; }
.app-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.app-field { background: #fafaf8; border: 1px solid #f0f0ee; border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 3px; }
.app-field.col-span-2 { grid-column: span 2; }
.app-field-lbl { font-size: 0.67rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #94a3b8; }
.app-field-val { font-size: 0.87rem; font-weight: 600; color: #1e293b; }
.app-field-val.mono { font-family: 'Courier New', monospace; }
.app-modal-footer { padding: 16px 28px; border-top: 1px solid #f5f5f5; display: flex; justify-content: flex-end; flex-shrink: 0; background: #fafaf8; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .form-card { padding: 20px 16px; }
  .app-modal-box { max-height: 95vh; }
  .app-modal-head { padding: 18px 18px 16px; flex-wrap: wrap; gap: 10px; }
  .app-modal-body { padding: 18px; }
  .app-modal-footer { padding: 14px 18px; }
  .app-grid { grid-template-columns: 1fr; }
  .app-field.col-span-2 { grid-column: span 1; }
  .address-block-header { flex-wrap: wrap; }
}
</style>