<template>
    <Navbar />

    <div class="register-page d-flex flex-column min-vh-85">
        <section class="flex-grow-1 d-flex align-items-center justify-content-center register-bg py-5">
            <div class="container px-3 px-md-4">
                <div class="row justify-content-center">
                    <div class="col-lg-9">

                        <!-- Header -->
                        <div class="text-center mb-4">
                            <h2 class="reg-title fw-bold">Create Your Account</h2>
                            <p class="text-muted mb-0">Sign up to manage your solar panel system &amp; track orders.</p>
                        </div>

                        <!-- Step Indicator -->
                        <div class="step-indicator mb-4">
                            <div v-for="(s, i) in sectionLabels" :key="i" class="step-dot"
                                :class="{ active: currentSection >= i, done: currentSection > i }">
                                <span>{{ i + 1 }}</span>
                                <div class="step-dot-label">{{ s }}</div>
                            </div>
                            <div class="step-connector"></div>
                        </div>

                        <div class="reg-card">

                            <!-- ── SECTION 0: Personal Info ── -->
                            <transition name="slide-fade" mode="out-in">
                                <div v-if="currentSection === 0" key="personal">
                                    <div class="section-header">
                                        <div class="section-icon"><i class="bi bi-person-fill"></i></div>
                                        <div>
                                            <h5 class="mb-0 fw-bold">Personal Info</h5>
                                            <small class="text-muted">Basic details about you</small>
                                        </div>
                                    </div>

                                    <div class="row g-3">
                                        <!-- Username -->
                                        <div class="col-md-6">
                                            <label class="reg-label">User Name <span class="req">*</span></label>
                                            <input type="text" class="reg-input" :class="fieldClass('user_name')"
                                                v-model="form.user_name" placeholder="Enter your name"
                                                @blur="touch('user_name')" />
                                        </div>

                                        <!-- Email -->
                                        <div class="col-md-6">
                                            <label class="reg-label">Email <span class="req">*</span></label>
                                            <div class="input-icon-wrap">
                                                <i class="bi bi-envelope input-icon"></i>
                                                <input type="email" class="reg-input has-icon"
                                                    :class="fieldClass('email')" v-model="form.email"
                                                    placeholder="you@example.com" @blur="touch('email')" />
                                            </div>
                                        </div>

                                        <!-- Phone -->
                                        <div class="col-md-6">
                                            <label class="reg-label">Phone Number <span class="req">*</span></label>
                                            <div class="input-icon-wrap">
                                                <i class="bi bi-telephone input-icon"></i>
                                                <input type="tel" class="reg-input has-icon"
                                                    :class="fieldClass('phone')" v-model="form.phone"
                                                    placeholder="e.g. +91 00000 00000" maxlength="15"
                                                    @blur="touch('phone'); if (sameWhatsApp) form.whatsapp_number = form.phone" />
                                            </div>
                                        </div>

                                        <!-- WhatsApp -->
                                        <div class="col-md-6">
                                            <div class="d-flex justify-content-between align-items-center mb-1">
                                                <label class="reg-label mb-0">
                                                    <i class="bi bi-whatsapp me-1 text-success"></i>
                                                    WhatsApp Number <span class="req">*</span>
                                                </label>
                                                <label class="same-toggle">
                                                    <input type="checkbox" v-model="sameWhatsApp"
                                                        @change="onSameWhatsApp">
                                                    Same as Phone
                                                </label>
                                            </div>
                                            <div class="input-icon-wrap">
                                                <i class="bi bi-whatsapp input-icon text-success"></i>
                                                <input type="tel" class="reg-input has-icon"
                                                    v-model="form.whatsapp_number" placeholder="e.g. +91 00000 00000"
                                                    maxlength="15" :readonly="sameWhatsApp"
                                                    :class="[fieldClass('whatsapp_number'), sameWhatsApp ? 'readonly-look' : '']"
                                                    @blur="touch('whatsapp_number')" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="section-nav">
                                        <div></div>
                                        <button class="btn-reg btn-reg-next" @click="goNext(0)">
                                            Next <i class="bi bi-arrow-right ms-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </transition>

                            <!-- ── SECTION 1: Security ── -->
                            <transition name="slide-fade" mode="out-in">
                                <div v-if="currentSection === 1" key="security">
                                    <div class="section-header">
                                        <div class="section-icon sec"><i class="bi bi-shield-lock-fill"></i></div>
                                        <div>
                                            <h5 class="mb-0 fw-bold">Security</h5>
                                            <small class="text-muted">Set a strong password for your account</small>
                                        </div>
                                    </div>

                                    <div class="row g-3">
                                        <!-- Password -->
                                        <div class="col-md-6">
                                            <label class="reg-label">Password <span class="req">*</span></label>
                                            <div class="input-icon-wrap">
                                                <i class="bi bi-lock input-icon"></i>
                                                <input :type="showPassword ? 'text' : 'password'"
                                                    class="reg-input has-icon has-toggle"
                                                    :class="fieldClass('password')" v-model="form.password"
                                                    placeholder="Min. 8 characters" minlength="8"
                                                    @blur="touch('password')" @input="touch('password')" />
                                                <button type="button" class="pwd-toggle"
                                                    @click="showPassword = !showPassword">
                                                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                                </button>
                                            </div>
                                            <div class="invalid-feedback">Password must be at least 8 characters.</div>

                                            <!-- Password Strength Bar -->
                                            <div class="strength-bar mt-2" v-if="form.password">
                                                <div class="strength-track">
                                                    <div class="strength-fill" :class="strengthClass"
                                                        :style="{ width: strengthWidth }"></div>
                                                </div>
                                                <span class="strength-label" :class="strengthClass">{{ strengthLabel
                                                    }}</span>
                                            </div>
                                            <!-- Strength hints -->
                                            <div class="pwd-hints mt-2" v-if="form.password">
                                                <span :class="form.password.length >= 8 ? 'hint-ok' : 'hint-bad'"><i
                                                        class="bi bi-check2-circle"></i> 8+ chars</span>
                                                <span :class="/[A-Z]/.test(form.password) ? 'hint-ok' : 'hint-bad'"><i
                                                        class="bi bi-check2-circle"></i> Uppercase</span>
                                                <span :class="/[0-9]/.test(form.password) ? 'hint-ok' : 'hint-bad'"><i
                                                        class="bi bi-check2-circle"></i> Number</span>
                                                <span
                                                    :class="/[^A-Za-z0-9]/.test(form.password) ? 'hint-ok' : 'hint-bad'"><i
                                                        class="bi bi-check2-circle"></i> Special char</span>
                                            </div>
                                        </div>

                                        <!-- Confirm Password -->
                                        <div class="col-md-6">
                                            <label class="reg-label">Confirm Password <span class="req">*</span></label>
                                            <div class="input-icon-wrap">
                                                <i class="bi bi-lock-fill input-icon"></i>
                                                <input :type="showConfirmPassword ? 'text' : 'password'"
                                                    class="reg-input has-icon has-toggle" :class="confirmClass"
                                                    v-model="form.password_confirmation" placeholder="Re-enter password"
                                                    minlength="8" @blur="touchedFields.add('password_confirmation')" />
                                                <button type="button" class="pwd-toggle"
                                                    @click="showConfirmPassword = !showConfirmPassword">
                                                    <i
                                                        :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                                </button>
                                            </div>
                                            <div class="invalid-feedback" v-if="passwordMismatch">Passwords do not
                                                match.</div>
                                            <div class="valid-feedback"
                                                v-if="form.password_confirmation && !passwordMismatch">Passwords match!
                                            </div>
                                        </div>
                                    </div>

                                    <div class="section-nav">
                                        <button class="btn-reg btn-reg-back" @click="currentSection--">
                                            <i class="bi bi-arrow-left me-1"></i> Back
                                        </button>
                                        <button class="btn-reg btn-reg-next" @click="goNext(1)">
                                            Next <i class="bi bi-arrow-right ms-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </transition>

                            <!-- ── SECTION 2: Address ── -->
                            <transition name="slide-fade" mode="out-in">
                                <div v-if="currentSection === 2" key="address">
                                    <div class="section-header">
                                        <div class="section-icon addr"><i class="bi bi-geo-alt-fill"></i></div>
                                        <div>
                                            <h5 class="mb-0 fw-bold">Address Info</h5>
                                            <small class="text-muted">Your delivery location</small>
                                        </div>
                                    </div>

                                    <!-- ── Address ── -->
                                    <div class="address-block">
                                        <div class="address-block-header">
                                            <div class="address-block-icon shipping-icon">
                                                <i class="bi bi-house-fill"></i>
                                            </div>
                                            <span class="address-block-title">Address</span>
                                        </div>

                                        <div class="row g-3">
                                            <!-- Address Line 1 -->
                                            <div class="col-md-6">
                                                <label class="reg-label">Address Line 1 <span
                                                        class="req">*</span></label>
                                                <input type="text" class="reg-input"
                                                    :class="fieldClass('address_line1')" v-model="form.address_line1"
                                                    placeholder="House / Flat no., Street name"
                                                    @blur="touch('address_line1')" />
                                            </div>

                                            <!-- Address Line 2 -->
                                            <div class="col-md-6">
                                                <label class="reg-label">Address Line 2</label>
                                                <input type="text" class="reg-input" v-model="form.address_line2"
                                                    placeholder="Area, Landmark (optional)" />
                                            </div>

                                            <!-- State -->
                                            <div class="col-md-4">
                                                <label class="reg-label">State <span class="req">*</span></label>
                                                <Multiselect v-model="selectedState" :options="states" label="state"
                                                    track-by="state_id" placeholder="Select State" :searchable="true"
                                                    :class="['multiselect-reg', stateError ? 'ms-invalid' : '']" />
                                                <div class="field-error" v-if="stateError">Please select a state.</div>
                                            </div>

                                            <!-- City -->
                                            <div class="col-md-4">
                                                <label class="reg-label">City <span class="req">*</span></label>
                                                <input type="text" class="reg-input" :class="fieldClass('city')"
                                                    v-model="form.city" placeholder="Enter city name"
                                                    @blur="touch('city')" />
                                            </div>

                                            <!-- Pincode -->
                                            <div class="col-md-2">
                                                <label class="reg-label">Pincode <span class="req">*</span></label>
                                                <input type="text" class="reg-input" :class="fieldClass('pincode')"
                                                    v-model="form.pincode" placeholder="000001" maxlength="6"
                                                    @blur="touch('pincode')" />
                                            </div>

                                            <!-- Country -->
                                            <div class="col-md-2">
                                                <label class="reg-label">Country</label>
                                                <div class="country-static">
                                                    <span class="fi fi-in me-2"></span>
                                                    <span>India</span>
                                                    <i class="bi bi-lock-fill ms-auto text-muted opacity-50 small"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="section-nav">
                                        <button class="btn-reg btn-reg-back" @click="currentSection--">
                                            <i class="bi bi-arrow-left me-1"></i> Back
                                        </button>
                                        <button class="btn-reg btn-reg-submit" @click="handleRegister"
                                            :disabled="isSubmitting || passwordMismatch">
                                            <span v-if="isSubmitting">
                                                <span class="spinner-border spinner-border-sm me-2"></span>Creating
                                                Account...
                                            </span>
                                            <span v-else>
                                                <i class="bi bi-person-check-fill me-2"></i>Create Account
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </transition>

                        </div><!-- /.reg-card -->

                        <!-- Toast Notification -->
                        <transition name="toast-slide">
                            <div v-if="toast.show" class="reg-toast" :class="toast.type">
                                <i
                                    :class="toast.type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'"></i>
                                {{ toast.message }}
                            </div>
                        </transition>

                        <p class="text-center mt-4 text-muted">
                            Already have an account?
                            <RouterLink to="/auth/login" class="login-link">Login here</RouterLink>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <AuthFooter />
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { api } from "@/services/api";
import Navbar from "@/views/components/website/Navbar.vue";
import AuthFooter from "@/views/components/website/AuthFooter.vue";

const router = useRouter();

// ─── State ───────────────────────────────────────────────────────────────────
const currentSection = ref(0);
const sectionLabels = ['Personal', 'Security', 'Address'];
const isSubmitting = ref(false);
const toast = reactive({ show: false, type: 'success', message: '' });

const form = reactive({
    user_name: '',
    email: '',
    phone: '',
    whatsapp_number: '',
    password: '',
    password_confirmation: '',
    country: 'India',
    // Address
    address_line1: '',
    address_line2: '',
    state_id: null,
    city: '',
    pincode: '',
});

// ─── WhatsApp Logic ──────────────────────────────────────────────────────────
const sameWhatsApp = ref(false);
const onSameWhatsApp = () => {
    if (sameWhatsApp.value) form.whatsapp_number = form.phone;
    else form.whatsapp_number = '';
};

// ─── Validation Helpers ───────────────────────────────────────────────────────
const touchedFields = reactive(new Set());
const touch = (field) => touchedFields.add(field);
const isEmpty = (v) => !v || !String(v).trim();
const fieldClass = (field) => {
    if (!touchedFields.has(field)) return '';
    return isEmpty(form[field]) ? 'is-invalid' : 'is-valid';
};

// ─── Password Logic ───────────────────────────────────────────────────────────
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordMismatch = computed(() =>
    form.password_confirmation ? form.password !== form.password_confirmation : false
);

const confirmClass = computed(() => {
    if (!touchedFields.has('password_confirmation') && !form.password_confirmation) return '';
    return (passwordMismatch.value || !form.password_confirmation) ? 'is-invalid' : 'is-valid';
});

const passwordStrength = computed(() => {
    const p = form.password;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
});
const strengthClass = computed(() => passwordStrength.value <= 1 ? 'weak' : passwordStrength.value <= 2 ? 'fair' : 'strong');
const strengthWidth = computed(() => `${(passwordStrength.value / 4) * 100}%`);
const strengthLabel = computed(() => ({ weak: 'Weak', fair: 'Fair', strong: 'Strong' }[strengthClass.value]));

// ─── Location Logic ───────────────────────────────────────────────────────────
const states = ref([]);
const selectedState = ref(null);
const stateError = ref(false);

watch(selectedState, (val) => {
    form.state_id = val?.state_id ?? null;
    stateError.value = false;
});

const fetchStates = async () => {
    try {
        const res = await api.get("/v1/state/active");
        states.value = res.data.data;
    } catch (e) { console.error("Error fetching states:", e); }
};

// ─── API Integration ──────────────────────────────────────────────────────────
const showToast = (message, type = 'success') => {
    toast.message = message; toast.type = type; toast.show = true;
    setTimeout(() => toast.show = false, 4000);
};

const goNext = (section) => {
    if (section === 0) {
        ['user_name', 'email', 'phone', 'whatsapp_number'].forEach(touch);
        if (['user_name', 'email', 'phone', 'whatsapp_number'].some(f => isEmpty(form[f])) || !form.email.includes('@')) return;
    }
    if (section === 1) {
        touch('password');
        touchedFields.add('password_confirmation');
        if (form.password.length < 3 || passwordMismatch.value) return;
    }
    currentSection.value++;
};

const handleRegister = async () => {
    // Validate address fields
    ['address_line1', 'city', 'pincode'].forEach(touch);
    stateError.value = !form.state_id;
    if (['address_line1', 'city', 'pincode'].some(f => isEmpty(form[f])) || stateError.value) return;

    // Construct API Payload
    const payload = {
        user_name: form.user_name,
        email: form.email,
        phone: form.phone,
        whatsapp_number: form.whatsapp_number,
        country: "India",
        password: form.password,
        password_confirmation: form.password_confirmation,
        addresses: [
            {
                address_line1: form.address_line1,
                address_line2: form.address_line2,
                city: form.city,
                state_id: form.state_id,
                postal_code: form.pincode,
                country: "India",
                label: "home",
                is_default: true
            }
        ]
    };

    isSubmitting.value = true;
    try {
        const res = await api.post("/v1/user/registration", payload);
        if (res.data.status === true) {
            showToast(res.data.message || 'Registration successful!', 'success');
            setTimeout(() => router.push('/auth/login'), 2000);
        } else {
            showToast(res.data.message || 'Registration failed.', 'error');
        }
    } catch (e) {
        const errorMsg = e.response?.data?.message || 'Server error occurred.';
        showToast(errorMsg, 'error');
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(fetchStates);
defineOptions({ name: 'RegisterPage' });
</script>

<style scoped>
/* ── Page ── */
.register-bg {
    background: linear-gradient(135deg, #f0f4f8 0%, #e8f5e9 100%);
}

.reg-title {
    font-size: 1.8rem;
    color: #1a1a1a;
    letter-spacing: -0.5px;
}

/* ── Step Indicator ── */
.step-indicator {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 0;
    position: relative;
}

.step-connector {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    width: 55%;
    height: 2px;
    background: #dee2e6;
    z-index: 0;
}

.step-dot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    max-width: 120px;
    position: relative;
    z-index: 1;
}

.step-dot span {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #e9ecef;
    color: #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    border: 2px solid #dee2e6;
    transition: all 0.3s;
}

.step-dot.active span {
    background: #198754;
    color: white;
    border-color: #198754;
    box-shadow: 0 0 0 4px rgba(25, 135, 84, 0.15);
}

.step-dot.done span {
    background: #d1e7dd;
    color: #198754;
    border-color: #198754;
}

.step-dot-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #aaa;
}

.step-dot.active .step-dot-label,
.step-dot.done .step-dot-label {
    color: #198754;
}

/* ── Card ── */
.reg-card {
    background: #fff;
    border-radius: 20px;
    padding: 40px 44px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid #f0f0f0;
    min-height: 380px;
}

@media (max-width: 576px) {
    .reg-card {
        padding: 24px 20px;
    }
}

/* ── Section Header ── */
.section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f5f5f5;
}

.section-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #198754, #20c997);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.section-icon.sec {
    background: linear-gradient(135deg, #0d6efd, #6610f2);
}

.section-icon.addr {
    background: linear-gradient(135deg, #fd7e14, #ffc107);
}

/* ── Address Block ── */
.address-block {
    border: 1.5px solid #e9ecef;
    border-radius: 14px;
    padding: 20px;
    background: #fdfdfd;
}

.address-block-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f0f0f0;
}

.address-block-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
}

.shipping-icon {
    background: linear-gradient(135deg, #19875422, #19875444);
    color: #198754;
}

.address-block-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* ── Fields ── */
.reg-label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #555;
    margin-bottom: 6px;
    display: block;
}

.req {
    color: #dc3545;
}

.reg-input {
    width: 100%;
    padding: 0.3rem 0.9rem;
    border: 1.5px solid #dee2e6;
    border-radius: 10px;
    font-size: 0.95rem;
    color: #212529;
    background: #fdfdfd;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    font-family: inherit;
}

.reg-input:focus {
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.12);
    background: #fff;
}

.reg-input.is-valid {
    border-color: #198754;
}

.reg-input.is-invalid {
    border-color: #dc3545;
}

.reg-input.is-invalid:focus {
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.12);
}

.reg-input.has-icon {
    padding-left: 2.4rem;
}

.reg-input.has-toggle {
    padding-right: 2.6rem;
}

.invalid-feedback {
    display: block;
    color: #dc3545;
    font-size: 0.8rem;
    margin-top: 4px;
}

.valid-feedback {
    display: block;
    color: #198754;
    font-size: 0.8rem;
    margin-top: 4px;
}

.field-error {
    color: #dc3545;
    font-size: 0.8rem;
    margin-top: 4px;
}

/* Input icon wrap */
.input-icon-wrap {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    font-size: 0.95rem;
    pointer-events: none;
}

.pwd-toggle {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6c757d;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    z-index: 2;
}

.pwd-toggle:hover {
    color: #333;
}

/* Password Strength */
.strength-bar {
    display: flex;
    align-items: center;
    gap: 10px;
}

.strength-track {
    flex: 1;
    height: 5px;
    background: #e9ecef;
    border-radius: 99px;
    overflow: hidden;
}

.strength-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.3s, background 0.3s;
}

.strength-fill.weak {
    background: #dc3545;
}

.strength-fill.fair {
    background: #fd7e14;
}

.strength-fill.strong {
    background: #198754;
}

.strength-label {
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 46px;
}

.strength-label.weak {
    color: #dc3545;
}

.strength-label.fair {
    color: #fd7e14;
}

.strength-label.strong {
    color: #198754;
}

/* Password hints */
.pwd-hints {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.pwd-hints span {
    font-size: 0.73rem;
    padding: 2px 8px;
    border-radius: 99px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 3px;
}

.hint-ok {
    background: #d1e7dd;
    color: #198754;
}

.hint-bad {
    background: #f8f9fa;
    color: #adb5bd;
}

/* Same WhatsApp toggle */
.same-toggle {
    font-size: 0.8rem;
    font-weight: 600;
    color: #198754;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    user-select: none;
    white-space: nowrap;
}

.same-toggle input {
    accent-color: #198754;
}

/* Country static field */
.country-static {
    display: flex;
    align-items: center;
    padding: 0.6rem 0.9rem;
    border: 1.5px solid #dee2e6;
    border-radius: 10px;
    background: #f8f9fa;
    font-size: 0.95rem;
    color: #555;
    gap: 8px;
    height: 42px;
}

/* Multiselect overrides */
.multiselect-reg {
    border: 1.5px solid #dee2e6 !important;
    border-radius: 10px !important;
    background: #fdfdfd !important;
    transition: border-color 0.2s;
}

.multiselect-reg.ms-invalid {
    border-color: #dc3545 !important;
}

:deep(.multiselect__tags) {
    border: none !important;
    background: transparent !important;
    border-radius: 10px !important;
    padding: 6px 40px 0 8px !important;
    min-height: unset;
}

:deep(.multiselect__placeholder) {
    color: #adb5bd !important;
    font-size: 0.95rem;
}

:deep(.multiselect__input) {
    font-size: 0.95rem !important;
}

:deep(.multiselect__option--highlight) {
    background: #198754 !important;
}

:deep(.multiselect__option--selected) {
    background: #d1e7dd !important;
    color: #198754 !important;
}

/* Navigation */
.section-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid #f5f5f5;
}

.btn-reg {
    padding: 11px 28px;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    transition: all 0.2s;
    font-family: inherit;
}

.btn-reg-back {
    background: #f0f0f0;
    color: #555;
}

.btn-reg-back:hover {
    background: #e2e2e2;
}

.btn-reg-next {
    background: #198754;
    color: #fff;
    box-shadow: 0 4px 14px rgba(25, 135, 84, 0.3);
}

.btn-reg-next:hover {
    background: #146c43;
    transform: translateY(-1px);
}

.btn-reg-submit {
    background: #0d6efd;
    color: #fff;
    box-shadow: 0 4px 14px rgba(13, 110, 253, 0.3);
}

.btn-reg-submit:hover:not(:disabled) {
    background: #0b5ed7;
    transform: translateY(-1px);
}

.btn-reg-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

/* Login link */
.login-link {
    color: #198754;
    font-weight: 600;
    text-decoration: none;
}

.login-link:hover {
    text-decoration: underline;
}

/* Toast */
.reg-toast {
    position: fixed;
    bottom: 28px;
    right: 28px;
    padding: 14px 22px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9999;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.reg-toast.success {
    background: #198754;
    color: #fff;
}

.reg-toast.error {
    background: #dc3545;
    color: #fff;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
    transition: all 0.3s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

/* Step transition */
.slide-fade-enter-active {
    transition: all 0.25s ease;
}

.slide-fade-leave-active {
    transition: all 0.15s ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>