<template>
    <div class="admin-page">

        <!-- Header -->
        <div class="page-header">
            <div class="header-left">
                <!-- <button class="btn-back" @click="router.push('/admin/wholesale-applications')">
                    <i class="fas fa-arrow-left"></i>
                </button> -->
                <div>
                    <h4 class="page-title">Application Review</h4>
                    <p class="page-sub">Review wholesale buyer application details</p>
                </div>
            </div>
            <!-- Status badge -->
            <span class="big-status" :class="application.status">
                <span class="status-dot-lg"></span>
                {{ statusLabel(application.status) }}
            </span>
        </div>

        <div class="review-layout">

            <!-- ── Left: Application Details ── -->
            <div class="details-col">

                <!-- Company Card -->
                <div class="detail-card">
                    <div class="detail-card-head">
                        <div class="dch-icon orange"><i class="fas fa-building"></i></div>
                        <h6 class="dch-title">Company / Business Details</h6>
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-key">Company Name</span>
                            <span class="info-val strong">{{ application.company_name }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Business Type</span>
                            <span class="biz-badge">{{ application.business_type }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">GSTIN</span>
                            <span class="info-val mono">{{ application.gstin || '—' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">PAN Number</span>
                            <span class="info-val mono">{{ application.pan || '—' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Year Established</span>
                            <span class="info-val">{{ application.year_established }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Website</span>
                            <a :href="application.website" target="_blank" class="info-link" v-if="application.website">
                                {{ application.website }}
                            </a>
                            <span class="info-val" v-else>—</span>
                        </div>
                    </div>
                </div>

                <!-- Contact Card -->
                <div class="detail-card">
                    <div class="detail-card-head">
                        <div class="dch-icon blue"><i class="fas fa-user-tie"></i></div>
                        <h6 class="dch-title">Contact Person Details</h6>
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-key">Contact Name</span>
                            <span class="info-val strong">{{ application.contact_name }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Designation</span>
                            <span class="info-val">{{ application.designation }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Mobile</span>
                            <span class="info-val">{{ application.phone }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">WhatsApp</span>
                            <span class="info-val">{{ application.whatsapp || application.phone }}</span>
                        </div>
                        <div class="info-item full">
                            <span class="info-key">Email</span>
                            <span class="info-val">{{ application.email }}</span>
                        </div>
                    </div>
                </div>

                <!-- Address Card -->
                <div class="detail-card">
                    <div class="detail-card-head">
                        <div class="dch-icon green"><i class="fas fa-map-marker-alt"></i></div>
                        <h6 class="dch-title">Billing & Shipping Address</h6>
                    </div>
                    <div class="address-cols">
                        <div class="address-block">
                            <div class="addr-label">Billing Address</div>
                            <div class="addr-text">
                                {{ application.billing_address }}<br>
                                {{ application.billing_city }}, {{ application.billing_state }} – {{
                                application.billing_pincode }}<br>
                                {{ application.billing_country }}
                            </div>
                        </div>
                        <div class="addr-divider"></div>
                        <div class="address-block">
                            <div class="addr-label">Shipping Address</div>
                            <div class="addr-text" v-if="application.shipping_same">
                                <span class="same-tag"><i class="fas fa-link me-1"></i>Same as Billing</span>
                            </div>
                            <div class="addr-text" v-else>
                                {{ application.shipping_address }}<br>
                                {{ application.shipping_city }}, {{ application.shipping_state }} – {{
                                application.shipping_pincode }}<br>
                                {{ application.shipping_country }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Business Info Card -->
                <div class="detail-card">
                    <div class="detail-card-head">
                        <div class="dch-icon purple"><i class="fas fa-coffee"></i></div>
                        <h6 class="dch-title">Business & Order Information</h6>
                    </div>
                    <div class="info-grid">
                        <div class="info-item full">
                            <span class="info-key">Nature of Business</span>
                            <span class="info-val">{{ application.nature_of_business }}</span>
                        </div>
                        <div class="info-item full">
                            <span class="info-key">Required Items</span>
                            <span class="info-val">{{ application.required_items }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Monthly Requirement</span>
                            <span class="qty-badge">{{ application.monthly_requirement }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Expected First Order</span>
                            <span class="info-val">{{ application.first_order_qty }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Heard About Us</span>
                            <span class="info-val">{{ application.hear_about_us || '—' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Interested In Private Label</span>
                            <span class="bool-tag" :class="application.private_label === 'Yes' ? 'yes' : 'no'">
                                {{ application.private_label }}
                            </span>
                        </div>
                        <div class="info-item">
                            <span class="info-key">Long Term Contract</span>
                            <span class="bool-tag" :class="application.long_term_contract === 'Yes' ? 'yes' : 'no'">
                                {{ application.long_term_contract }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Documents Card -->
                <div class="detail-card">
                    <div class="detail-card-head">
                        <div class="dch-icon teal"><i class="fas fa-file-alt"></i></div>
                        <h6 class="dch-title">Uploaded Documents</h6>
                    </div>
                    <div class="docs-grid">
                        <div class="doc-item" v-for="doc in application.documents" :key="doc.name">
                            <div class="doc-icon"><i :class="doc.icon"></i></div>
                            <div class="doc-info">
                                <div class="doc-name">{{ doc.name }}</div>
                                <div class="doc-size">{{ doc.size }}</div>
                            </div>
                            <button class="doc-view-btn" title="View document">
                                <i class="fas fa-external-link-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- ── Right: Review Panel ── -->
            <div class="review-col">

                <!-- Applicant Summary -->
                <div class="review-card summary-card">
                    <div class="summary-avatar" :style="{ background: '#7c3aed' }">
                        {{ application.company_name?.charAt(0) }}
                    </div>
                    <div class="summary-company">{{ application.company_name }}</div>
                    <div class="summary-person">{{ application.contact_name }} · {{ application.designation }}</div>
                    <div class="summary-meta">
                        <span><i class="fas fa-envelope me-1"></i>{{ application.email }}</span>
                        <span><i class="fas fa-phone me-1"></i>{{ application.phone }}</span>
                    </div>
                    <div class="summary-submitted">
                        Submitted on {{ formatDate(application.submitted_at) }}
                    </div>
                </div>

                <!-- ── Pending Actions ── -->
                <div class="review-card action-card" v-if="application.status === 'pending'">
                    <h6 class="action-title">Review Decision</h6>
                    <p class="action-sub">Carefully review the application details before approving or rejecting.</p>

                    <!-- Approve -->
                    <div class="action-section approve-section">
                        <div class="action-label approve-label">
                            <i class="fas fa-check-circle"></i> Approve Application
                        </div>
                        <p class="action-desc">The user's account will be upgraded to <strong>Wholesale</strong> and a
                            confirmation email will be sent automatically.</p>
                        <button class="btn-approve" @click="confirmApprove" :disabled="actionLoading">
                            <i class="fas fa-check me-2"></i>
                            {{ actionLoading && pendingAction === 'approve' ? 'Processing...' : 'Approve & Activate Wholesale' }}
                        </button>
                    </div>

                    <div class="action-divider"><span>or</span></div>

                    <!-- Reject -->
                    <div class="action-section reject-section">
                        <div class="action-label reject-label">
                            <i class="fas fa-times-circle"></i> Reject Application
                        </div>
                        <p class="action-desc">Provide a reason to help the applicant understand why their application
                            was rejected.</p>
                        <textarea class="rejection-reason" v-model="rejectionReason" rows="3"
                            placeholder="Enter reason for rejection (optional but recommended)..."></textarea>
                        <button class="btn-reject" @click="confirmReject" :disabled="actionLoading">
                            <i class="fas fa-times me-2"></i>
                            {{ actionLoading && pendingAction === 'reject' ? 'Processing...' : 'Reject Application' }}
                        </button>
                    </div>
                </div>

                <!-- ── Already Approved ── -->
                <div class="review-card resolved-card approved" v-else-if="application.status === 'approved'">
                    <div class="resolved-icon"><i class="fas fa-check-circle"></i></div>
                    <h6 class="resolved-title">Application Approved</h6>
                    <p class="resolved-text">This application was approved on <strong>{{
                        formatDate(application.reviewed_at) }}</strong> by <strong>{{ application.reviewed_by
                            }}</strong>.</p>
                    <div class="resolved-actions">
                        <div class="notification-sent">
                            <i class="fas fa-envelope-open-text me-2"></i> Confirmation email sent to user
                        </div>
                        <button class="btn-revoke" @click="confirmRevoke">
                            <i class="fas fa-undo me-2"></i> Revoke Wholesale Status
                        </button>
                    </div>
                </div>

                <!-- ── Already Rejected ── -->
                <div class="review-card resolved-card rejected" v-else-if="application.status === 'rejected'">
                    <div class="resolved-icon red"><i class="fas fa-times-circle"></i></div>
                    <h6 class="resolved-title">Application Rejected</h6>
                    <p class="resolved-text">This application was rejected on <strong>{{
                        formatDate(application.reviewed_at) }}</strong> by <strong>{{ application.reviewed_by
                            }}</strong>.</p>
                    <div class="rejection-note" v-if="application.rejection_reason">
                        <strong>Reason given:</strong> {{ application.rejection_reason }}
                    </div>
                    <button class="btn-reconsider" @click="reconsider">
                        <i class="fas fa-redo me-2"></i> Reconsider (Move to Pending)
                    </button>
                </div>

                <!-- Timeline -->
                <div class="review-card timeline-card">
                    <h6 class="timeline-title">Activity Timeline</h6>
                    <div class="timeline">
                        <div class="tl-item" v-for="event in timeline" :key="event.time">
                            <div class="tl-dot" :class="event.type"></div>
                            <div class="tl-content">
                                <div class="tl-event">{{ event.event }}</div>
                                <div class="tl-time">{{ event.time }}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Confirm Modal -->
        <transition name="fade">
            <div class="modal-overlay" v-if="showConfirmModal" @click.self="showConfirmModal = false">
                <div class="modal-box">
                    <div class="modal-icon" :class="pendingAction">
                        <i
                            :class="pendingAction === 'approve' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'"></i>
                    </div>
                    <h5 class="modal-title">{{ pendingAction === 'approve' ? 'Approve Application?' : 'Reject Application?' }}</h5>
                    <p class="modal-text" v-if="pendingAction === 'approve'">
                        This will upgrade <strong>{{ application.contact_name }}</strong>'s account to
                        <strong>Wholesale</strong> and automatically send a confirmation email to <strong>{{
                            application.email }}</strong>.
                    </p>
                    <p class="modal-text" v-else>
                        This will mark the application as rejected{{ rejectionReason ? ' with the reason you provided' :
                        '' }}. A notification email will be sent to the applicant.
                    </p>
                    <div class="modal-actions">
                        <button class="modal-cancel" @click="showConfirmModal = false">Cancel</button>
                        <button class="modal-confirm" :class="pendingAction" @click="executeAction"
                            :disabled="actionLoading">
                            <i class="fas fa-spinner fa-spin me-2" v-if="actionLoading"></i>
                            {{ pendingAction === 'approve' ? 'Yes, Approve' : 'Yes, Reject' }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ── Dummy Application Data ─────────────────────────────────────────────────────
const application = ref({
    application_id: 'WA001',
    status: 'pending',
    company_name: 'Brew House Pvt Ltd',
    business_type: 'Coffee Roaster',
    gstin: '27BREWH9012H1Z3',
    pan: 'BREWH1234K',
    year_established: 2018,
    website: 'https://brewhouse.com',
    contact_name: 'Anil Sharma',
    designation: 'Purchase Manager',
    phone: '9876543210',
    whatsapp: '9876543210',
    email: 'anil@brewhouse.com',
    billing_address: '45, Industrial Area, Andheri East',
    billing_city: 'Mumbai', billing_state: 'Maharashtra', billing_pincode: '400093', billing_country: 'India',
    shipping_same: false,
    shipping_address: 'Warehouse 7, MIDC, Bhiwandi',
    shipping_city: 'Thane', shipping_state: 'Maharashtra', shipping_pincode: '421302', shipping_country: 'India',
    nature_of_business: 'We are a mid-scale coffee roasting company supplying roasted beans to cafes and retail chains across Maharashtra.',
    required_items: 'Green Arabica Beans, Robusta Blend',
    monthly_requirement: '50–100 kg',
    first_order_qty: '75 kg',
    hear_about_us: 'Google Search',
    private_label: 'Yes',
    long_term_contract: 'Yes',
    documents: [
        { name: 'GST Certificate', size: '320 KB', icon: 'fas fa-file-pdf text-danger' },
        { name: 'Business Registration', size: '240 KB', icon: 'fas fa-file-pdf text-danger' },
        { name: 'Company Profile', size: '1.2 MB', icon: 'fas fa-file-image text-blue-500' },
    ],
    submitted_at: '2025-01-15',
    reviewed_at: null,
    reviewed_by: null,
    rejection_reason: null,
})

const rejectionReason = ref('')
const actionLoading = ref(false)
const pendingAction = ref('')
const showConfirmModal = ref(false)

const timeline = ref([
    { event: 'Application submitted by Anil Sharma', time: '15 Jan 2025, 10:42 AM', type: 'submit' },
    { event: 'Application reviewed by Admin', time: '15 Jan 2025, 11:00 AM', type: 'review' },
    { event: 'Awaiting final decision', time: 'Pending', type: 'pending' },
])

const statusLabel = (s) => ({ pending: 'Pending Review', approved: 'Approved', rejected: 'Rejected' }[s] || s)
const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

const confirmApprove = () => { pendingAction.value = 'approve'; showConfirmModal.value = true }
const confirmReject = () => { pendingAction.value = 'reject'; showConfirmModal.value = true }

const executeAction = async () => {
    actionLoading.value = true
    await new Promise(r => setTimeout(r, 1200))

    if (pendingAction.value === 'approve') {
        application.value.status = 'approved'
        application.value.reviewed_at = new Date().toISOString()
        application.value.reviewed_by = 'Admin'
        timeline.value.push({ event: 'Application approved — User upgraded to Wholesale. Email sent.', time: 'Just now', type: 'approve' })
    } else {
        application.value.status = 'rejected'
        application.value.reviewed_at = new Date().toISOString()
        application.value.reviewed_by = 'Admin'
        application.value.rejection_reason = rejectionReason.value || null
        timeline.value.push({ event: 'Application rejected. Notification email sent.', time: 'Just now', type: 'reject' })
    }

    actionLoading.value = false
    showConfirmModal.value = false
    pendingAction.value = ''
}

const confirmRevoke = () => {
    if (confirm('Revoke wholesale status? The user will revert to Retail.')) {
        application.value.status = 'pending'
        timeline.value.push({ event: 'Wholesale status revoked by Admin', time: 'Just now', type: 'reject' })
    }
}

const reconsider = () => {
    application.value.status = 'pending'
    application.value.rejection_reason = null
    timeline.value.push({ event: 'Application moved back to Pending for reconsideration', time: 'Just now', type: 'review' })
}
</script>

<style scoped>
.admin-page {
    padding: 24px;
    padding-top: 0!important;
    /* background: #f4f6fb; */
    min-height: 100vh;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
}

/* Header */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 14px;
}

.btn-back {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #475569;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.btn-back:hover {
    background: #f1f5f9;
}

.page-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 2px;
}

.page-sub {
    color: #bebebe;
    font-size: 0.82rem;
    margin: 0;
}

.big-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 700;
}

.big-status.pending {
    background: #fffbeb;
    color: #d97706;
    border: 1.5px solid #fde68a;
}

.big-status.approved {
    background: #f0fdf4;
    color: #16a34a;
    border: 1.5px solid #bbf7d0;
}

.big-status.rejected {
    background: #fef2f2;
    color: #dc2626;
    border: 1.5px solid #fecaca;
}

.status-dot-lg {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
}

/* Layout */
.review-layout {
    display: flex;
    gap: 24px;
    align-items: flex-start;
}

.details-col {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.review-col {
    width: 320px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: sticky;
    top: 24px;
}

/* Detail Cards */
.detail-card {
    background: #fff;
    border-radius: 16px;
    padding: 22px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
    border: 1px solid #f1f5f9;
}

.detail-card-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    /* padding-bottom: 14px;
     */
    border-bottom: 1px solid #f8fafc;
}

.dch-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    flex-shrink: 0;
}

.dch-icon.orange {
    background: #fff7ed;
    color: #ea580c;
}

.dch-icon.blue {
    background: #eff6ff;
    color: #3b82f6;
}

.dch-icon.green {
    background: #f0fdf4;
    color: #16a34a;
}

.dch-icon.purple {
    background: #faf5ff;
    color: #9333ea;
}

.dch-icon.teal {
    background: #f0fdfa;
    color: #0d9488;
}

.dch-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

/* Info Grid */
.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.info-item.full {
    grid-column: 1 / -1;
}

.info-key {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #94a3b8;
}

.info-val {
    font-size: 0.875rem;
    color: #334155;
    font-weight: 500;
}

.info-val.strong {
    font-weight: 700;
    color: #1e293b;
}

.info-val.mono {
    font-family: monospace;
    font-size: 0.82rem;
}

.info-link {
    font-size: 0.82rem;
    color: #3b82f6;
    text-decoration: none;
}

.info-link:hover {
    text-decoration: underline;
}

.biz-badge {
    display: inline-block;
    background: #f1f5f9;
    color: #475569;
    border-radius: 6px;
    padding: 3px 10px;
    font-size: 0.75rem;
    font-weight: 600;
}

.qty-badge {
    display: inline-block;
    background: #fffbeb;
    color: #d97706;
    border-radius: 6px;
    padding: 3px 10px;
    font-size: 0.75rem;
    font-weight: 700;
}

.bool-tag {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
}

.bool-tag.yes {
    background: #f0fdf4;
    color: #16a34a;
}

.bool-tag.no {
    background: #fef2f2;
    color: #dc2626;
}

/* Address */
.address-cols {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 16px;
}

.addr-divider {
    width: 1px;
    background: #f1f5f9;
}

.addr-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #94a3b8;
    margin-bottom: 8px;
}

.addr-text {
    font-size: 0.85rem;
    color: #475569;
    line-height: 1.6;
}

.same-tag {
    display: inline-flex;
    align-items: center;
    background: #eff6ff;
    color: #3b82f6;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
}

/* Documents */
.docs-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.doc-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: #f8fafc;
    border-radius: 10px;
    border: 1px solid #f1f5f9;
}

.doc-icon {
    font-size: 1.4rem;
    width: 32px;
    text-align: center;
    flex-shrink: 0;
}

.doc-info {
    flex: 1;
}

.doc-name {
    font-weight: 600;
    font-size: 0.85rem;
    color: #1e293b;
}

.doc-size {
    font-size: 0.73rem;
    color: #94a3b8;
}

.doc-view-btn {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #64748b;
    cursor: pointer;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.doc-view-btn:hover {
    background: #3b82f6;
    color: #fff;
    border-color: #3b82f6;
}

/* Review Cards */
.review-card {
    background: #fff;
    border-radius: 16px;
    padding: 22px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
    border: 1px solid #f1f5f9;
}

/* Summary */
.summary-card {
    text-align: center;
}

.summary-avatar {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
    margin: 0 auto 12px;
}

.summary-company {
    font-weight: 800;
    color: #1e293b;
    font-size: 1rem;
    margin-bottom: 4px;
}

.summary-person {
    color: #64748b;
    font-size: 0.8rem;
    margin-bottom: 10px;
}

.summary-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
}

.summary-meta span {
    font-size: 0.78rem;
    color: #64748b;
}

.summary-submitted {
    font-size: 0.73rem;
    color: #94a3b8;
}

/* Action Card */
.action-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 4px;
}

.action-sub {
    font-size: 0.8rem;
    color: #94a3b8;
    margin-bottom: 16px;
}

.action-section {
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 4px;
}

.approve-section {
    background: #f0fdf4;
    border: 1.5px solid #bbf7d0;
}

.reject-section {
    background: #fef2f2;
    border: 1.5px solid #fecaca;
}

.action-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.approve-label {
    color: #16a34a;
}

.reject-label {
    color: #dc2626;
}

.action-desc {
    font-size: 0.78rem;
    color: #64748b;
    margin-bottom: 12px;
    line-height: 1.5;
}

.rejection-reason {
    width: 100%;
    padding: 9px 12px;
    border: 1.5px solid #fecaca;
    border-radius: 10px;
    font-size: 0.85rem;
    outline: none;
    resize: vertical;
    background: #fff;
    font-family: inherit;
    margin-bottom: 12px;
}

.rejection-reason:focus {
    border-color: #ef4444;
}

.btn-approve {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #16a34a, #22c55e);
    color: #fff;
    font-weight: 700;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-approve:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
}

.btn-approve:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-reject {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #dc2626, #ef4444);
    color: #fff;
    font-weight: 700;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-reject:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3);
}

.btn-reject:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.action-divider {
    text-align: center;
    color: #94a3b8;
    font-size: 0.78rem;
    margin: 12px 0;
    position: relative;
}

.action-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #f1f5f9;
}

.action-divider span {
    background: #fff;
    padding: 0 8px;
    position: relative;
}

/* Resolved */
.resolved-card {
    text-align: center;
}

.resolved-card.approved {
    border-color: #bbf7d0;
    background: linear-gradient(135deg, #f0fdf4, #fff);
}

.resolved-card.rejected {
    border-color: #fecaca;
    background: linear-gradient(135deg, #fef2f2, #fff);
}

.resolved-icon {
    font-size: 2.5rem;
    color: #22c55e;
    margin-bottom: 12px;
}

.resolved-icon.red {
    color: #ef4444;
}

.resolved-title {
    font-weight: 800;
    color: #1e293b;
    font-size: 1rem;
    margin-bottom: 8px;
}

.resolved-text {
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 16px;
}

.resolved-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notification-sent {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eff6ff;
    color: #3b82f6;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.78rem;
    font-weight: 600;
}

.rejection-note {
    background: #fef9c3;
    border: 1px solid #fde68a;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 0.8rem;
    color: #854d0e;
    text-align: left;
    margin-bottom: 12px;
}

.btn-revoke {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #64748b;
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
}

.btn-revoke:hover {
    background: #f1f5f9;
}

.btn-reconsider {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1.5px solid #ddd6fe;
    background: #faf5ff;
    color: #7c3aed;
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
}

.btn-reconsider:hover {
    background: #ede9fe;
}

/* Timeline */
.timeline-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 14px;
}

.timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.tl-item {
    display: flex;
    gap: 12px;
    padding-bottom: 14px;
    position: relative;
}

.tl-item:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 20px;
    bottom: 0;
    width: 1.5px;
    background: #f1f5f9;
}

.tl-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 2px;
}

.tl-dot.submit {
    background: #3b82f6;
}

.tl-dot.review {
    background: #f59e0b;
}

.tl-dot.pending {
    background: #e2e8f0;
    border: 2px dashed #94a3b8;
}

.tl-dot.approve {
    background: #22c55e;
}

.tl-dot.reject {
    background: #ef4444;
}

.tl-event {
    font-size: 0.8rem;
    font-weight: 600;
    color: #334155;
}

.tl-time {
    font-size: 0.72rem;
    color: #94a3b8;
    margin-top: 2px;
}

/* Confirm Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
}

.modal-box {
    background: #fff;
    border-radius: 20px;
    padding: 36px 32px;
    max-width: 420px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.modal-icon {
    font-size: 3rem;
    margin-bottom: 16px;
}

.modal-icon.approve {
    color: #22c55e;
}

.modal-icon.reject {
    color: #ef4444;
}

.modal-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 12px;
}

.modal-text {
    font-size: 0.88rem;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 24px;
}

.modal-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.modal-cancel {
    padding: 10px 24px;
    border-radius: 10px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #64748b;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
}

.modal-cancel:hover {
    background: #f8fafc;
}

.modal-confirm {
    padding: 10px 24px;
    border-radius: 10px;
    border: none;
    color: #fff;
    font-weight: 700;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
}

.modal-confirm.approve {
    background: linear-gradient(135deg, #16a34a, #22c55e);
}

.modal-confirm.reject {
    background: linear-gradient(135deg, #dc2626, #ef4444);
}

.modal-confirm:disabled {
    opacity: 0.5;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 900px) {
    .review-layout {
        flex-direction: column;
    }

    .review-col {
        width: 100%;
        position: static;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }

    .address-cols {
        grid-template-columns: 1fr;
    }

    .addr-divider {
        display: none;
    }
}
</style>