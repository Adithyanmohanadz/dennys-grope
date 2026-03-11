<template>
    <section class="wholesale-page">

        <!-- Hero Banner -->
        <div class="hero-banner">
            <div class="hero-overlay"></div>
            <div class="hero-content container">
                <div class="hero-badge">B2B Wholesale Programme</div>
                <h1 class="hero-title">Wholesale Buyer<br>Registration</h1>
                <p class="hero-sub">Register your business to purchase premium coffee beans directly from Dennys Group
                    Company.</p>
            </div>
            <div class="hero-beans">
                <span class="bean bean-1">☕</span>
                <span class="bean bean-2">☕</span>
                <span class="bean bean-3">☕</span>
            </div>
        </div>

        <!-- Form Section -->
        <div class="container form-wrapper">

            <!-- Progress Steps -->
            <div class="step-bar">
                <div v-for="(step, i) in steps" :key="i" class="step-item"
                    :class="{ active: currentStep === i, done: currentStep > i }">
                    <div class="step-circle" @click="currentStep > i ? currentStep = i : null">
                        <i v-if="currentStep > i" class="fas fa-check"></i>
                        <span v-else>{{ i + 1 }}</span>
                    </div>
                    <span class="step-label">{{ step }}</span>
                </div>
                <div class="step-line"></div>
            </div>

            <div class="form-card">

                <!-- ── Step 0: Company Details ── -->
                <div v-show="currentStep === 0">
                    <div class="section-head">
                        <div class="section-icon"><i class="fas fa-building"></i></div>
                        <div>
                            <h4>Company / Business Details</h4>
                            <p>Tell us about your business so we can verify your wholesale eligibility.</p>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-12">
                            <label class="field-label">Company / Business Name <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.companyName"
                                placeholder="e.g. Sunrise Coffee Pvt. Ltd." required>
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">Business Type <span class="req">*</span></label>
                            <select class="field-input" v-model="form.businessType" required>
                                <option value="">Select Business Type</option>
                                <option>Coffee Roaster</option>
                                <option>Cafe</option>
                                <option>Coffee Shop</option>
                                <option>Distributor</option>
                                <option>Wholesaler</option>
                                <option>Retail Store</option>
                                <option>Hotel</option>
                                <option>Restaurant</option>
                                <option>Online Seller</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">Year of Establishment <span class="req">*</span></label>
                            <input type="number" class="field-input" v-model="form.yearEstablished"
                                placeholder="e.g. 2015" min="1900" :max="new Date().getFullYear()">
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">GSTIN Number <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.gstin" placeholder="22AAAAA0000A1Z5"
                                maxlength="15">
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">PAN Number <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.pan" placeholder="AAAAA0000A"
                                maxlength="10">
                        </div>
                        <div class="col-md-12">
                            <label class="field-label">Website</label>
                            <input type="url" class="field-input" v-model="form.website"
                                placeholder="https://yourcompany.com">
                        </div>
                    </div>
                </div>

                <!-- ── Step 1: Contact Person ── -->
                <div v-show="currentStep === 1">
                    <div class="section-head">
                        <div class="section-icon"><i class="fas fa-user-tie"></i></div>
                        <div>
                            <h4>Contact Person Details</h4>
                            <p>Who should we reach out to regarding your wholesale account?</p>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="field-label">Full Name <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.contactName"
                                placeholder="e.g. Ravi Kumar">
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">Designation <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.designation"
                                placeholder="e.g. Purchase Manager">
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">Mobile Number <span class="req">*</span></label>
                            <input type="tel" class="field-input" v-model="form.mobile" placeholder="+91 98765 43210">
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">WhatsApp Number</label>
                            <div class="input-with-check">
                                <input type="tel" class="field-input" v-model="form.whatsapp"
                                    placeholder="+91 98765 43210" :disabled="form.sameAsPhone">
                                <label class="same-check">
                                    <input type="checkbox" v-model="form.sameAsPhone" @change="onSamePhone"> Same as
                                    mobile
                                </label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label class="field-label">Email Address <span class="req">*</span></label>
                            <input type="email" class="field-input" v-model="form.email" placeholder="you@company.com">
                        </div>
                    </div>
                </div>

                <!-- ── Step 2: Addresses ── -->
                <div v-show="currentStep === 2">
                    <div class="section-head">
                        <div class="section-icon"><i class="fas fa-map-marker-alt"></i></div>
                        <div>
                            <h4>Billing &amp; Shipping Address</h4>
                            <p>We need your registered billing address and delivery location.</p>
                        </div>
                    </div>

                    <h6 class="sub-section-title">Billing Address</h6>
                    <div class="row g-3 mb-4">
                        <div class="col-md-12">
                            <label class="field-label">Address Line 1 <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.billingAddr1"
                                placeholder="Street / Building No.">
                        </div>
                        <div class="col-md-12">
                            <label class="field-label">Address Line 2</label>
                            <input type="text" class="field-input" v-model="form.billingAddr2"
                                placeholder="Area / Landmark">
                        </div>
                        <div class="col-md-4">
                            <label class="field-label">City <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.billingCity" placeholder="City">
                        </div>
                        <div class="col-md-4">
                            <label class="field-label">State <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.billingState" placeholder="State">
                        </div>
                        <div class="col-md-2">
                            <label class="field-label">Pincode <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.billingPincode" placeholder="560001"
                                maxlength="6">
                        </div>
                        <div class="col-md-2">
                            <label class="field-label">Country <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.billingCountry" placeholder="India">
                        </div>
                    </div>

                    <h6 class="sub-section-title">Shipping Address</h6>
                    <div class="same-shipping-check mb-3">
                        <label>
                            <input type="checkbox" v-model="form.shippingSameAsBilling"> Same as Billing Address
                        </label>
                    </div>

                    <div v-if="!form.shippingSameAsBilling" class="row g-3">
                        <div class="col-md-12">
                            <label class="field-label">Address Line 1 <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.shippingAddr1"
                                placeholder="Street / Building No.">
                        </div>
                        <div class="col-md-12">
                            <label class="field-label">Address Line 2</label>
                            <input type="text" class="field-input" v-model="form.shippingAddr2"
                                placeholder="Area / Landmark">
                        </div>
                        <div class="col-md-4">
                            <label class="field-label">City <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.shippingCity" placeholder="City">
                        </div>
                        <div class="col-md-4">
                            <label class="field-label">State <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.shippingState" placeholder="State">
                        </div>
                        <div class="col-md-2">
                            <label class="field-label">Pincode <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.shippingPincode" placeholder="560001"
                                maxlength="6">
                        </div>
                        <div class="col-md-2">
                            <label class="field-label">Country <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.shippingCountry" placeholder="India">
                        </div>
                    </div>
                </div>

                <!-- ── Step 3: Business Info ── -->
                <div v-show="currentStep === 3">
                    <div class="section-head">
                        <div class="section-icon"><i class="fas fa-coffee"></i></div>
                        <div>
                            <h4>Business &amp; Order Information</h4>
                            <p>Help us understand your purchasing requirements and preferences.</p>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-12">
                            <label class="field-label">Nature of Business <span class="req">*</span></label>
                            <textarea class="field-input" rows="2" v-model="form.natureOfBusiness"
                                placeholder="Briefly describe what your business does..."></textarea>
                        </div>
                        <div class="col-md-12">
                            <label class="field-label">Required Item(s) <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.requiredItems"
                                placeholder="e.g. Green Coffee Beans, Arabica, Robusta...">
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">Monthly Requirement <span class="req">*</span></label>
                            <select class="field-input" v-model="form.monthlyRequirement">
                                <option value="">Select Range</option>
                                <option>10–25 kg</option>
                                <option>25–50 kg</option>
                                <option>50–100 kg</option>
                                <option>100+ kg</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">Expected First Order Quantity <span class="req">*</span></label>
                            <input type="text" class="field-input" v-model="form.firstOrderQty"
                                placeholder="e.g. 50 kg">
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">How did you hear about Dennys Group?</label>
                            <select class="field-input" v-model="form.hearAboutUs">
                                <option value="">Select</option>
                                <option>Google Search</option>
                                <option>Social Media</option>
                                <option>Referral / Word of Mouth</option>
                                <option>Trade Fair / Exhibition</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">Interested in Private Label on Product?</label>
                            <div class="radio-group">
                                <label><input type="radio" v-model="form.privateLabel" value="Yes"> Yes</label>
                                <label><input type="radio" v-model="form.privateLabel" value="No"> No</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="field-label">Interested in Long Term Supply Contract?</label>
                            <div class="radio-group">
                                <label><input type="radio" v-model="form.longTermContract" value="Yes"> Yes</label>
                                <label><input type="radio" v-model="form.longTermContract" value="No"> No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ── Step 4: Documents & Declaration ── -->
                <div v-show="currentStep === 4">
                    <div class="section-head">
                        <div class="section-icon"><i class="fas fa-file-upload"></i></div>
                        <div>
                            <h4>Documents &amp; Declaration</h4>
                            <p>Upload your business documents and confirm your agreement.</p>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-4">
                            <label class="field-label">GST Certificate <span class="req">*</span></label>
                            <div class="upload-box" @click="$refs.gstFile.click()"
                                :class="{ uploaded: form.gstCertificate }">
                                <i class="fas"
                                    :class="form.gstCertificate ? 'fa-check-circle text-success' : 'fa-cloud-upload-alt'"></i>
                                <span>{{ form.gstCertificate ? form.gstCertificate.name : 'Click to upload' }}</span>
                                <input ref="gstFile" type="file" accept=".pdf,.jpg,.png" hidden
                                    @change="e => form.gstCertificate = e.target.files[0]">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="field-label">Business Registration Certificate <span
                                    class="req">*</span></label>
                            <div class="upload-box" @click="$refs.regFile.click()"
                                :class="{ uploaded: form.regCertificate }">
                                <i class="fas"
                                    :class="form.regCertificate ? 'fa-check-circle text-success' : 'fa-cloud-upload-alt'"></i>
                                <span>{{ form.regCertificate ? form.regCertificate.name : 'Click to upload' }}</span>
                                <input ref="regFile" type="file" accept=".pdf,.jpg,.png" hidden
                                    @change="e => form.regCertificate = e.target.files[0]">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="field-label">Visiting Card / Company Profile</label>
                            <div class="upload-box" @click="$refs.cardFile.click()"
                                :class="{ uploaded: form.visitingCard }">
                                <i class="fas"
                                    :class="form.visitingCard ? 'fa-check-circle text-success' : 'fa-cloud-upload-alt'"></i>
                                <span>{{ form.visitingCard ? form.visitingCard.name : 'Click to upload' }}</span>
                                <input ref="cardFile" type="file" accept=".pdf,.jpg,.png" hidden
                                    @change="e => form.visitingCard = e.target.files[0]">
                            </div>
                        </div>
                    </div>

                    <!-- Declaration -->
                    <div class="declaration-box">
                        <div class="declaration-icon"><i class="fas fa-shield-alt"></i></div>
                        <div class="declaration-text">
                            <strong>Declaration</strong>
                            <p>I confirm that the information provided is correct and agree to the wholesale purchasing
                                terms of Dennys Group Company.</p>
                            <label class="decl-check">
                                <input type="checkbox" v-model="form.declaration">
                                I accept the above declaration and wholesale purchasing terms
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="form-nav">
                    <button v-if="currentStep > 0" class="btn-nav btn-back" @click="currentStep--">
                        <i class="fas fa-arrow-left me-2"></i> Back
                    </button>
                    <div v-else></div>

                    <button v-if="currentStep < steps.length - 1" class="btn-nav btn-next" @click="nextStep">
                        Next <i class="fas fa-arrow-right ms-2"></i>
                    </button>
                    <button v-else class="btn-nav btn-submit" @click="submitForm"
                        :disabled="!form.declaration || submitting">
                        <span v-if="submitting"><i class="fas fa-spinner fa-spin me-2"></i> Submitting...</span>
                        <span v-else><i class="fas fa-paper-plane me-2"></i> Submit Registration</span>
                    </button>
                </div>

            </div><!-- /.form-card -->

            <!-- Trust Badges -->
            <div class="trust-strip">
                <div class="trust-item"><i class="fas fa-lock"></i><span>Secure &amp; Confidential</span></div>
                <div class="trust-item"><i class="fas fa-clock"></i><span>Response within 24 hrs</span></div>
                <div class="trust-item"><i class="fas fa-award"></i><span>Premium Quality Assured</span></div>
                <div class="trust-item"><i class="fas fa-headset"></i><span>Dedicated B2B Support</span></div>
            </div>

        </div><!-- /.container -->

        <!-- Success Overlay -->
        <transition name="fade">
            <div v-if="submitted" class="success-overlay">
                <div class="success-card">
                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                    <h3>Registration Submitted!</h3>
                    <p>Thank you, <strong>{{ form.contactName }}</strong>! Our team will review your application and
                        send the wholesale pricing details to <strong>{{ form.email }}</strong> within 24 hours.</p>
                    <router-link to="/shop" class="btn-nav btn-next mt-3 d-inline-block text-decoration-none">
                        <i class="fas fa-arrow-left me-2"></i> Back to Shop
                    </router-link>
                </div>
            </div>
        </transition>

    </section>
</template>

<script setup>
import { ref, reactive } from 'vue';

const steps = ['Company Details', 'Contact Person', 'Addresses', 'Business Info', 'Documents'];
const currentStep = ref(0);
const submitting = ref(false);
const submitted = ref(false);

const form = reactive({
    // Step 0
    companyName: '', businessType: '', yearEstablished: '', gstin: '', pan: '', website: '',
    // Step 1
    contactName: '', designation: '', mobile: '', whatsapp: '', sameAsPhone: false, email: '',
    // Step 2
    billingAddr1: '', billingAddr2: '', billingCity: '', billingState: '', billingPincode: '', billingCountry: 'India',
    shippingSameAsBilling: true,
    shippingAddr1: '', shippingAddr2: '', shippingCity: '', shippingState: '', shippingPincode: '', shippingCountry: 'India',
    // Step 3
    natureOfBusiness: '', requiredItems: '', monthlyRequirement: '', firstOrderQty: '',
    hearAboutUs: '', privateLabel: '', longTermContract: '',
    // Step 4
    gstCertificate: null, regCertificate: null, visitingCard: null,
    declaration: false,
});

const onSamePhone = () => {
    if (form.sameAsPhone) form.whatsapp = form.mobile;
    else form.whatsapp = '';
};

const nextStep = () => {
    if (currentStep.value < steps.length - 1) currentStep.value++;
};

const submitForm = async () => {
    if (!form.declaration) return;
    submitting.value = true;
    // TODO: replace with actual API call e.g. websiteApi.post('v1/wholesale/register', formData)
    await new Promise(r => setTimeout(r, 1500));
    submitting.value = false;
    submitted.value = true;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

.wholesale-page {
    font-family: 'DM Sans', sans-serif;
    background: #faf8f5;
    min-height: 100vh;
}

/* ── Hero ── */
.hero-banner {
    position: relative;
    background: linear-gradient(135deg, #1a0a00 0%, #3b1a08 50%, #5c2d0e 100%);
    padding: 80px 0 70px;
    overflow: hidden;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.hero-badge {
    display: inline-block;
    background: rgba(212, 160, 80, 0.2);
    color: #d4a050;
    border: 1px solid rgba(212, 160, 80, 0.4);
    border-radius: 20px;
    padding: 6px 18px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
}

.hero-title {
    /* font-family: 'Playfair Display', serif; */
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 14px;
}

.hero-sub {
    color: rgba(255, 255, 255, 0.65);
    font-size: 1.05rem;
    max-width: 520px;
    margin: 0 auto;
}

.hero-beans {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.bean {
    position: absolute;
    font-size: 3rem;
    opacity: 0.04;
    animation: floatBean 8s ease-in-out infinite;
}

.bean-1 {
    top: 15%;
    left: 8%;
    animation-delay: 0s;
}

.bean-2 {
    top: 50%;
    right: 10%;
    animation-delay: 3s;
}

.bean-3 {
    bottom: 10%;
    left: 50%;
    animation-delay: 5s;
}

@keyframes floatBean {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(15deg);
    }
}

/* ── Step Bar ── */
.form-wrapper {
    padding-top: 50px;
    padding-bottom: 60px;
    max-width: 900px;
}

.step-bar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    margin-bottom: 40px;
}

.step-line {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 2px;
    background: #e0d8d0;
    z-index: 0;
}

.step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 1;
    flex: 1;
}

.step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e0d8d0;
    color: #999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    border: 3px solid #e0d8d0;
    transition: all 0.3s;
}

.step-item.active .step-circle {
    background: #fff;
    color: #7c3c0d;
    border-color: #7c3c0d;
    box-shadow: 0 0 0 4px rgba(124, 60, 13, 0.15);
}

.step-item.done .step-circle {
    background: #7c3c0d;
    color: white;
    border-color: #7c3c0d;
    cursor: pointer;
}

.step-label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #999;
    text-align: center;
}

.step-item.active .step-label,
.step-item.done .step-label {
    color: #7c3c0d;
}

/* ── Form Card ── */
.form-card {
    background: #fff;
    border-radius: 24px;
    padding: 48px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.07);
    border: 1px solid #f0ebe4;
}

/* ── Section Head ── */
.section-head {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #f0ebe4;
}

.section-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #7c3c0d, #c0622a);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.section-head h4 {
    /* font-family: 'Playfair Display', serif; */
    font-size: 1.4rem;
    color: #1a0a00;
    margin-bottom: 4px;
}

.section-head p {
    color: #888;
    font-size: 0.9rem;
    margin: 0;
}

.sub-section-title {
    font-weight: 700;
    color: #7c3c0d;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
    margin-top: 8px;
}

/* ── Fields ── */
.field-label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #666;
    margin-bottom: 6px;
    display: block;
}

.req {
    color: #e05a2b;
}

.field-input {
    width: 100%;
    padding: 0.65rem 1rem;
    border: 1.5px solid #e8e2da;
    border-radius: 10px;
    background: #fdfcfb;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: #1a0a00;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
}

.field-input:focus {
    border-color: #7c3c0d;
    box-shadow: 0 0 0 3px rgba(124, 60, 13, 0.1);
    background: #fff;
}

select.field-input {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
}

textarea.field-input {
    resize: vertical;
}

/* WhatsApp same-as-phone */
.input-with-check {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.same-check {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    color: #666;
    cursor: pointer;
}

.same-check input {
    accent-color: #7c3c0d;
}

/* Shipping same */
.same-shipping-check label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #555;
    cursor: pointer;
}

.same-shipping-check input {
    accent-color: #7c3c0d;
    width: 16px;
    height: 16px;
}

/* Radio Group */
.radio-group {
    display: flex;
    gap: 24px;
    padding-top: 10px;
}

.radio-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #444;
    cursor: pointer;
}

.radio-group input {
    accent-color: #7c3c0d;
    width: 16px;
    height: 16px;
}

/* Upload Box */
.upload-box {
    border: 2px dashed #d4c9bc;
    border-radius: 12px;
    background: #fdfcfb;
    padding: 24px 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.upload-box:hover {
    border-color: #7c3c0d;
    background: #fdf6ef;
}

.upload-box.uploaded {
    border-color: #4caf80;
    background: #f0fdf4;
    border-style: solid;
}

.upload-box i {
    font-size: 1.8rem;
    color: #bbb;
}

.upload-box.uploaded i {
    color: #4caf80;
}

.upload-box span {
    font-size: 0.82rem;
    color: #888;
    word-break: break-all;
}

/* Declaration */
.declaration-box {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    background: linear-gradient(135deg, #fdf6ef, #fff9f4);
    border: 1.5px solid #f0dcc8;
    border-radius: 16px;
    padding: 24px;
}

.declaration-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #7c3c0d, #c0622a);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.declaration-text strong {
    font-size: 1rem;
    color: #1a0a00;
}

.declaration-text p {
    font-size: 0.88rem;
    color: #666;
    margin: 6px 0 12px;
}

.decl-check {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.88rem;
    color: #444;
    cursor: pointer;
    font-weight: 500;
}

.decl-check input {
    accent-color: #7c3c0d;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-top: 2px;
}

/* Navigation Buttons */
.form-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding-top: 28px;
    border-top: 1px solid #f0ebe4;
}

.btn-nav {
    padding: 12px 28px;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
}

.btn-back {
    background: #f5f0ea;
    color: #555;
}

.btn-back:hover {
    background: #ede6dc;
}

.btn-next {
    background: linear-gradient(135deg, #7c3c0d, #c0622a);
    color: white;
    box-shadow: 0 4px 16px rgba(124, 60, 13, 0.3);
}

.btn-next:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(124, 60, 13, 0.4);
}

.btn-submit {
    background: linear-gradient(135deg, #1a6b3c, #2d9b5a);
    color: white;
    box-shadow: 0 4px 16px rgba(26, 107, 60, 0.3);
}

.btn-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(26, 107, 60, 0.4);
}

.btn-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

/* Trust Strip */
.trust-strip {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
    margin-top: 40px;
    padding: 28px;
    background: #fff;
    border-radius: 16px;
    border: 1px solid #f0ebe4;
}

.trust-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #7c3c0d;
    font-weight: 600;
    font-size: 0.88rem;
}

.trust-item i {
    font-size: 1.1rem;
}

/* Success Overlay */
.success-overlay {
    position: fixed;
    inset: 0;
    background: rgba(26, 10, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
}

.success-card {
    background: #fff;
    border-radius: 24px;
    padding: 48px 40px;
    text-align: center;
    max-width: 480px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.success-icon {
    font-size: 4rem;
    color: #2d9b5a;
    margin-bottom: 16px;
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
    from {
        transform: scale(0);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.success-card h3 {
    /* font-family: 'Playfair Display', serif; */
    font-size: 1.8rem;
    color: #1a0a00;
    margin-bottom: 12px;
}

.success-card p {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Responsive */
@media (max-width: 767px) {
    .form-card {
        padding: 24px 20px;
    }

    .step-label {
        display: none;
    }

    .trust-strip {
        gap: 16px;
    }
}
</style>