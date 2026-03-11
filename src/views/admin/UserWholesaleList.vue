<template>
    <div class="admin-page">

        <!-- Header -->
        <div class="page-header">
            <div>
                <h4 class="page-title">Wholesale Applications</h4>
                <p class="page-sub">Review and approve B2B wholesale buyer registrations</p>
            </div>
        </div>

        <!-- Stats -->
        <div class="stats-strip">
            <div class="stat-card" v-for="s in statCards" :key="s.label"
                :class="{ 'active-filter': filterStatus === s.filter }"
                @click="filterStatus = filterStatus === s.filter ? '' : s.filter" style="cursor:pointer">
                <div class="stat-icon" :class="s.color"><i :class="s.icon"></i></div>
                <div>
                    <div class="stat-num">{{ s.count }}</div>
                    <div class="stat-label">{{ s.label }}</div>
                </div>
                <div class="stat-active-dot" v-if="filterStatus === s.filter"></div>
            </div>
        </div>

        <!-- Main Card -->
        <div class="main-card">

            <!-- Filters -->
            <div class="filters-row">
                <div class="search-wrap">
                    <i class="fas fa-search search-icon"></i>
                    <input class="filter-input" type="text" v-model="searchQuery"
                        placeholder="Search company, name, email..." />
                </div>
                <select class="filter-select" v-model="filterStatus">
                    <option value="">All Applications</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <select class="filter-select" v-model="sortKey">
                    <option value="submitted_at_desc">Newest First</option>
                    <option value="submitted_at_asc">Oldest First</option>
                    <option value="company_asc">Company A–Z</option>
                </select>
            </div>

            <!-- Table -->
            <div class="table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th class="th-sl">#</th>
                            <th>Company Name</th>
                            <th>Contact Person</th>
                            <th>Email</th>
                            <th>Business Type</th>
                            <th>Monthly Req.</th>
                            <th>Submitted</th>
                            <th>Status</th>
                            <th class="th-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredApplications.length === 0">
                            <td colspan="9" class="empty-row">
                                <i class="fas fa-inbox fa-2x mb-2 d-block text-muted"></i>
                                No applications found.
                            </td>
                        </tr>
                        <tr v-else v-for="(app, i) in paginatedApps" :key="app.application_id" class="data-row">
                            <td class="td-sl">{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>
                            <td>
                                <div class="company-cell">
                                    <div class="company-icon"><i class="fas fa-building"></i></div>
                                    <div>
                                        <div class="company-name">{{ app.company_name }}</div>
                                        <div class="company-gstin">{{ app.gstin || 'No GST' }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="contact-name">{{ app.contact_name }}</div>
                                <div class="contact-phone">{{ app.phone }}</div>
                            </td>
                            <td class="td-email">{{ app.email }}</td>
                            <td><span class="biz-badge">{{ app.business_type }}</span></td>
                            <td><span class="qty-badge">{{ app.monthly_requirement }}</span></td>
                            <td class="td-date">{{ formatDate(app.submitted_at) }}</td>
                            <td>
                                <span class="status-badge" :class="app.status">
                                    <span class="status-dot"></span>
                                    {{ statusLabel(app.status) }}
                                </span>
                            </td>
                            <td class="td-action">
                                <button class="action-btn view" @click="viewApplication(app.application_id)"
                                    title="View & Review">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="pagination-row">
                <div class="pagination-info">
                    <label>Rows:</label>
                    <select class="rows-select" v-model="itemsPerPage">
                        <option :value="10">10</option>
                        <option :value="25">25</option>
                    </select>
                    <span class="entry-count">{{ startIndex + 1 }}–{{ endIndex }} of {{ filteredApplications.length
                        }}</span>
                </div>
                <div class="page-btns">
                    <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--"><i
                            class="fas fa-angle-left"></i></button>
                    <button v-for="page in visiblePages" :key="page" class="page-btn"
                        :class="{ active: currentPage === page }" @click="currentPage = page">{{ page }}</button>
                    <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++"><i
                            class="fas fa-angle-right"></i></button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ── Dummy Data ────────────────────────────────────────────────────────────────
const applications = ref([
    { application_id: 'WA001', company_name: 'Brew House Pvt Ltd', contact_name: 'Anil Sharma', phone: '9876543210', email: 'anil@brewhouse.com', business_type: 'Coffee Roaster', gstin: '27BREWH9012H1Z3', monthly_requirement: '50–100 kg', submitted_at: '2025-01-15', status: 'pending' },
    { application_id: 'WA002', company_name: 'Cafe Aroma', contact_name: 'Meena Krishnan', phone: '9811223344', email: 'orders@cafearoma.in', business_type: 'Cafe', gstin: '32CAFAR6789K3Z7', monthly_requirement: '25–50 kg', submitted_at: '2025-01-14', status: 'pending' },
    { application_id: 'WA003', company_name: 'Sundar Coffee Co.', contact_name: 'Sundar Raj', phone: '9988776655', email: 'sundar@coffeeco.in', business_type: 'Distributor', gstin: '33XYZAB5678G2Z1', monthly_requirement: '100+ kg', submitted_at: '2025-01-10', status: 'approved' },
    { application_id: 'WA004', company_name: 'Green Bean Traders', contact_name: 'Rakesh Nair', phone: '9500002222', email: 'info@greenbean.com', business_type: 'Wholesaler', gstin: '19GREEN7890P4Z2', monthly_requirement: '100+ kg', submitted_at: '2025-01-08', status: 'approved' },
    { application_id: 'WA005', company_name: 'Morning Sip Co.', contact_name: 'Priya Thomas', phone: '9700003333', email: 'priya@morningsip.com', business_type: 'Online Seller', gstin: '', monthly_requirement: '10–25 kg', submitted_at: '2025-01-18', status: 'pending' },
    { application_id: 'WA006', company_name: 'Hotel Grand Regency', contact_name: 'Suresh Kumar', phone: '9600004444', email: 'purchase@grandregency.com', business_type: 'Hotel', gstin: '29HOTEL1234K5Z9', monthly_requirement: '25–50 kg', submitted_at: '2025-01-05', status: 'rejected' },
    { application_id: 'WA007', company_name: 'Roast & Grind LLP', contact_name: 'Fathima Beevi', phone: '9900005555', email: 'fathima@roastgrind.com', business_type: 'Coffee Roaster', gstin: '27ROAST5678M2Z4', monthly_requirement: '50–100 kg', submitted_at: '2025-01-20', status: 'pending' },
])

// ── Filters ───────────────────────────────────────────────────────────────────
const searchQuery = ref('')
const filterStatus = ref('')
const sortKey = ref('submitted_at_desc')

const filteredApplications = computed(() => {
    let res = applications.value.filter(a => {
        const q = searchQuery.value.toLowerCase()
        const matchQ = !q || a.company_name.toLowerCase().includes(q) || a.contact_name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
        const matchS = !filterStatus.value || a.status === filterStatus.value
        return matchQ && matchS
    })
    if (sortKey.value === 'submitted_at_desc') res.sort((a, b) => b.submitted_at.localeCompare(a.submitted_at))
    else if (sortKey.value === 'submitted_at_asc') res.sort((a, b) => a.submitted_at.localeCompare(b.submitted_at))
    else if (sortKey.value === 'company_asc') res.sort((a, b) => a.company_name.localeCompare(b.company_name))
    return res
})

// ── Stats ─────────────────────────────────────────────────────────────────────
const statCards = computed(() => [
    { label: 'Total', count: applications.value.length, icon: 'fas fa-layer-group', color: 'all', filter: '' },
    { label: 'Pending', count: applications.value.filter(a => a.status === 'pending').length, icon: 'fas fa-hourglass-half', color: 'pending', filter: 'pending' },
    { label: 'Approved', count: applications.value.filter(a => a.status === 'approved').length, icon: 'fas fa-check-circle', color: 'active', filter: 'approved' },
    { label: 'Rejected', count: applications.value.filter(a => a.status === 'rejected').length, icon: 'fas fa-times-circle', color: 'rejected', filter: 'rejected' },
])

// ── Pagination ────────────────────────────────────────────────────────────────
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredApplications.value.length / itemsPerPage.value)))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredApplications.value.length))
const paginatedApps = computed(() => filteredApplications.value.slice(startIndex.value, endIndex.value))
const visiblePages = computed(() => { const pages = []; for (let i = 1; i <= totalPages.value; i++) pages.push(i); return pages })
watch([searchQuery, filterStatus, itemsPerPage], () => { currentPage.value = 1 })

// ── Helpers ───────────────────────────────────────────────────────────────────
const statusLabel = (s) => ({ pending: 'Pending', approved: 'Approved', rejected: 'Rejected' }[s] || s)
const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
const viewApplication = (id) => router.push(`/admin/user-wholesale-view/${id}`)
</script>

<style scoped>
.admin-page {
    padding: 24px;
    padding-top: 0!important;
    /* background: #f4f6fb; */
    min-height: 100vh;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
}

.page-header {
    margin-bottom: 24px;
}

.page-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 4px;
}

.page-sub {
    color: #bebebe;
    font-size: 0.85rem;
    margin: 0;
}

/* Stats */
.stats-strip {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.stat-card {
    background: #fff;
    border-radius: 14px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    flex: 1;
    min-width: 130px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
    border: 1.5px solid #f1f5f9;
    transition: all 0.2s;
    position: relative;
}

.stat-card:hover {
    border-color: #e2e8f0;
    transform: translateY(-1px);
}

.stat-card.active-filter {
    border-color: #3b82f6 !important;
    background: #eff6ff;
}

.stat-active-dot {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3b82f6;
}

.stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.stat-icon.all {
    background: #f1f5f9;
    color: #475569;
}

.stat-icon.pending {
    background: #fffbeb;
    color: #f59e0b;
}

.stat-icon.active {
    background: #f0fdf4;
    color: #22c55e;
}

.stat-icon.rejected {
    background: #fef2f2;
    color: #ef4444;
}

.stat-num {
    font-size: 1.4rem;
    font-weight: 800;
    color: #1e293b;
    line-height: 1;
}

.stat-label {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 500;
    margin-top: 2px;
}

/* Card */
.main-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
    border: 1px solid #f1f5f9;
    overflow: hidden;
}

.filters-row {
    display: flex;
    gap: 10px;
    padding: 20px;
    flex-wrap: wrap;
    border-bottom: 1px solid #f1f5f9;
}

.search-wrap {
    position: relative;
    flex: 1;
    min-width: 200px;
}

.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #cbd5e1;
    font-size: 0.8rem;
}

.filter-input {
    width: 100%;
    padding: 8px 12px 8px 30px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    outline: none;
    background: #f8fafc;
}

.filter-input:focus {
    border-color: #3b82f6;
    background: #fff;
}

.filter-select {
    padding: 8px 12px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    outline: none;
    background: #f8fafc;
    min-width: 150px;
}

/* Table */
.table-wrap {
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
}

.data-table thead tr {
    background: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
}

.data-table th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 700;
    color: #475569;
    font-size: 0.73rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
}

.th-sl,
.th-action {
    text-align: center;
}

.data-row {
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.15s;
}

.data-row:hover {
    background: #f8fafc;
}

.data-table td {
    padding: 12px 16px;
    vertical-align: middle;
    color: #334155;
}

.td-sl {
    text-align: center;
    color: #94a3b8;
    font-size: 0.8rem;
}

.td-email {
    font-size: 0.8rem;
    color: #64748b;
}

.td-date {
    font-size: 0.8rem;
    color: #64748b;
    white-space: nowrap;
}

.td-action {
    text-align: center;
}

.company-cell {
    display: flex;
    align-items: center;
    gap: 10px;
}

.company-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #f1f5f9;
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    flex-shrink: 0;
}

.company-name {
    font-weight: 700;
    color: #1e293b;
    font-size: 0.875rem;
}

.company-gstin {
    font-size: 0.72rem;
    color: #94a3b8;
    font-family: monospace;
}

.contact-name {
    font-weight: 600;
    color: #334155;
    font-size: 0.85rem;
}

.contact-phone {
    font-size: 0.75rem;
    color: #94a3b8;
}

.biz-badge {
    display: inline-block;
    background: #f1f5f9;
    color: #475569;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.72rem;
    font-weight: 600;
}

.qty-badge {
    display: inline-block;
    background: #fffbeb;
    color: #d97706;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.72rem;
    font-weight: 700;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 0.73rem;
    font-weight: 700;
}

.status-badge.pending {
    background: #fffbeb;
    color: #d97706;
}

.status-badge.approved {
    background: #f0fdf4;
    color: #16a34a;
}

.status-badge.rejected {
    background: #fef2f2;
    color: #dc2626;
}

.status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
}

.action-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.action-btn.view {
    background: #eff6ff;
    color: #3b82f6;
}

.action-btn.view:hover {
    background: #3b82f6;
    color: #fff;
}

.empty-row {
    text-align: center;
    padding: 48px 16px;
    color: #94a3b8;
    font-size: 0.9rem;
}

.pagination-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-top: 1px solid #f1f5f9;
    flex-wrap: wrap;
    gap: 12px;
}

.pagination-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.8rem;
    color: #64748b;
}

.rows-select {
    padding: 4px 8px;
    border: 1.5px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.8rem;
    outline: none;
}

.entry-count {
    color: #94a3b8;
}

.page-btns {
    display: flex;
    gap: 4px;
}

.page-btn {
    width: 32px;
    height: 32px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    border-radius: 8px;
    font-size: 0.8rem;
    color: #475569;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-btn:hover:not(:disabled) {
    background: #f1f5f9;
}

.page-btn.active {
    background: #1e293b;
    color: #fff;
    border-color: #1e293b;
    font-weight: 700;
}

.page-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}
</style>