<template>
  <div class="admin-page">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h4 class="page-title">User Management</h4>
        <p class="page-sub">Manage all registered users and their account status</p>
      </div>
      <div>
        <router-link to="user-wholesale-list" class="btn btn-primary me-2 mb-0">
          Wholesale list
        </router-link>
        <button class="btn-add" @click="addNewUser">
          <i class="fas fa-plus me-2"></i> New User
        </button>
      </div>
    </div>

    <!-- Stats Strip -->
    <div class="stats-strip">
      <div class="stat-card">
        <div class="stat-icon all"><i class="fas fa-users"></i></div>
        <div>
          <div class="stat-num">{{ users.length }}</div>
          <div class="stat-label">Total Users</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon retail"><i class="fas fa-user"></i></div>
        <div>
          <div class="stat-num">{{ countByType('retail') }}</div>
          <div class="stat-label">Retail</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon wholesale"><i class="fas fa-briefcase"></i></div>
        <div>
          <div class="stat-num">{{ countByType('wholesale') }}</div>
          <div class="stat-label">Wholesale</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon active"><i class="fas fa-check-circle"></i></div>
        <div>
          <div class="stat-num">{{ countByStatus('active') }}</div>
          <div class="stat-label">Active</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon deactive"><i class="fas fa-ban"></i></div>
        <div>
          <div class="stat-num">{{ countByStatus('deActive') }}</div>
          <div class="stat-label">Deactive</div>
        </div>
      </div>
    </div>

    <!-- Main Card -->
    <div class="main-card">

      <!-- Filters -->
      <div class="filters-row">
        <div class="search-wrap">
          <i class="fas fa-search search-icon"></i>
          <input class="filter-input" type="text" v-model="searchQuery.userName" placeholder="Search by name..." />
        </div>
        <div class="search-wrap">
          <i class="fas fa-envelope search-icon"></i>
          <input class="filter-input" type="text" v-model="searchQuery.email" placeholder="Search by email..." />
        </div>
        <select class="filter-select" v-model="searchQuery.status">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="deActive">Deactive</option>
        </select>
        <select class="filter-select" v-model="searchQuery.userType">
          <option value="">All Types</option>
          <option value="retail">Retail</option>
          <option value="wholesale">Wholesale</option>
        </select>
        <button class="btn-clear" @click="clearFilters" v-if="hasActiveFilters">
          <i class="fas fa-times me-1"></i> Clear
        </button>
      </div>

      <!-- Table -->
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th class="th-sl">#</th>
              <th class="sortable" @click="sortBy('user_name')">
                Name <i :class="getSortIcon('user_name')"></i>
              </th>
              <th class="sortable" @click="sortBy('email')">
                Email <i :class="getSortIcon('email')"></i>
              </th>
              <th>Phone</th>
              <th class="sortable" @click="sortBy('user_type')">
                User Type <i :class="getSortIcon('user_type')"></i>
              </th>
              <th>GST</th>
              <th class="sortable" @click="sortBy('registration_status')">
                Status <i :class="getSortIcon('registration_status')"></i>
              </th>
              <th class="th-action">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="8" class="empty-row">
                <div class="loading-dots"><span></span><span></span><span></span></div>
              </td>
            </tr>
            <tr v-else-if="paginatedUsers.length === 0">
              <td colspan="8" class="empty-row">
                <i class="fas fa-search fa-2x mb-2 d-block text-muted"></i>
                No users found matching your criteria.
              </td>
            </tr>
            <tr v-else v-for="(user, index) in paginatedUsers" :key="user.public_user_id" class="data-row">
              <td class="td-sl">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>
                <div class="user-cell">
                  <div class="user-avatar" :style="{ background: getAvatarColor(user.user_name) }">
                    {{ user.user_name.charAt(0).toUpperCase() }}
                  </div>
                  <span class="user-name">{{ user.user_name }}</span>
                </div>
              </td>
              <td class="td-email">{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>
                <span class="type-badge" :class="user.user_type">
                  <i :class="user.user_type === 'wholesale' ? 'fas fa-briefcase' : 'fas fa-user'" class="me-1"></i>
                  {{ user.user_type === 'wholesale' ? 'Wholesale' : 'Retail' }}
                </span>
              </td>
              <td class="td-gst">{{ user.gst_number || '—' }}</td>
              <td>
                <span class="status-badge" :class="user.registration_status">
                  {{ statusLabel(user.registration_status) }}
                </span>
              </td>
              <td >
                <div class="action-cell">
                <button class="action-btn edit" @click="editUser(user.public_user_id)" title="Edit User">
                  <i class="fas fa-pen"></i>
                </button>
                <button v-if="user.user_type === 'wholesale'" class="action-btn wholesale-view ms-1"
                  @click="viewWholesaleApp(user.public_user_id)" title="View Wholesale Application">
                  <i class="fas fa-file-contract"></i>
                </button>
                </div>
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
            <option :value="50">50</option>
          </select>
          <span class="entry-count">
            {{ startIndex + 1 }}–{{ endIndex }} of {{ filteredAndSortedUsers.length }} entries
          </span>
        </div>
        <div class="page-btns">
          <button class="page-btn" :disabled="currentPage === 1" @click="currentPage = 1"><i
              class="fas fa-angle-double-left"></i></button>
          <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--"><i
              class="fas fa-angle-left"></i></button>
          <button v-for="page in visiblePages" :key="page" class="page-btn" :class="{ active: currentPage === page }"
            @click="currentPage = page">
            {{ page }}
          </button>
          <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++"><i
              class="fas fa-angle-right"></i></button>
          <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage = totalPages"><i
              class="fas fa-angle-double-right"></i></button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)

// ── Dummy Data ────────────────────────────────────────────────────────────────
const users = ref([
  { public_user_id: 'U001', user_name: 'Ravi Kumar', email: 'ravi.kumar@gmail.com', phone: '9876543210', user_type: 'retail', gst_number: '', registration_status: 'active' },
  { public_user_id: 'U002', user_name: 'Priya Sharma', email: 'priya.s@yahoo.com', phone: '9123456789', user_type: 'wholesale', gst_number: '29ABCDE1234F1Z5', registration_status: 'active' },
  { public_user_id: 'U003', user_name: 'Sundar Coffee Co.', email: 'sundar@coffeeco.in', phone: '9988776655', user_type: 'wholesale', gst_number: '33XYZAB5678G2Z1', registration_status: 'active' },
  { public_user_id: 'U004', user_name: 'Meera Nair', email: 'meera.nair@outlook.com', phone: '9765432100', user_type: 'retail', gst_number: '', registration_status: 'deActive' },
  { public_user_id: 'U005', user_name: 'Arjun Menon', email: 'arjun.m@hotmail.com', phone: '8887776665', user_type: 'retail', gst_number: '', registration_status: 'active' },
  { public_user_id: 'U006', user_name: 'Brew House Pvt Ltd', email: 'admin@brewhouse.com', phone: '9040302010', user_type: 'wholesale', gst_number: '27BREWH9012H1Z3', registration_status: 'active' },
  { public_user_id: 'U007', user_name: 'Lakshmi Devi', email: 'lakshmi.d@gmail.com', phone: '9512347890', user_type: 'retail', gst_number: '', registration_status: 'deActive' },
  { public_user_id: 'U008', user_name: 'Thomas George', email: 'thomas.g@gmail.com', phone: '9634512870', user_type: 'retail', gst_number: '', registration_status: 'deActive' },
  { public_user_id: 'U009', user_name: 'Cafe Aroma', email: 'orders@cafearoma.in', phone: '9811223344', user_type: 'wholesale', gst_number: '32CAFAR6789K3Z7', registration_status: 'deActive' },
  { public_user_id: 'U010', user_name: 'Suresh Pillai', email: 'suresh.p@gmail.com', phone: '9700001234', user_type: 'retail', gst_number: '', registration_status: 'active' },
  { public_user_id: 'U011', user_name: 'Amina Beevi', email: 'amina.b@gmail.com', phone: '9600001111', user_type: 'retail', gst_number: '', registration_status: 'active' },
  { public_user_id: 'U012', user_name: 'Green Bean Traders', email: 'info@greenbean.com', phone: '9500002222', user_type: 'wholesale', gst_number: '19GREEN7890P4Z2', registration_status: 'active' },
])

// ── Search & Filter ───────────────────────────────────────────────────────────
const searchQuery = reactive({ userName: '', email: '', status: '', userType: '' })

const hasActiveFilters = computed(() =>
  searchQuery.userName || searchQuery.email || searchQuery.status || searchQuery.userType
)
const clearFilters = () => {
  searchQuery.userName = ''; searchQuery.email = ''; searchQuery.status = ''; searchQuery.userType = ''
}

// ── Sort ──────────────────────────────────────────────────────────────────────
const sortColumn = ref('')
const sortDirection = ref('asc')

const sortBy = (col) => {
  if (sortColumn.value === col) sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  else { sortColumn.value = col; sortDirection.value = 'asc' }
}
const getSortIcon = (col) => {
  if (sortColumn.value !== col) return 'fas fa-sort sort-icon muted'
  return sortDirection.value === 'asc' ? 'fas fa-sort-up sort-icon' : 'fas fa-sort-down sort-icon'
}

// ── Computed ──────────────────────────────────────────────────────────────────
const filteredAndSortedUsers = computed(() => {
  let result = users.value.filter(u => {
    const nameOk = u.user_name.toLowerCase().includes(searchQuery.userName.toLowerCase())
    const emailOk = u.email.toLowerCase().includes(searchQuery.email.toLowerCase())
    const statusOk = !searchQuery.status || u.registration_status === searchQuery.status
    const typeOk = !searchQuery.userType || u.user_type === searchQuery.userType
    return nameOk && emailOk && statusOk && typeOk
  })
  if (sortColumn.value) {
    result.sort((a, b) => {
      const av = String(a[sortColumn.value] || '').toLowerCase()
      const bv = String(b[sortColumn.value] || '').toLowerCase()
      return sortDirection.value === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })
  }
  return result
})

// ── Pagination ────────────────────────────────────────────────────────────────
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalPages = computed(() => Math.ceil(filteredAndSortedUsers.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredAndSortedUsers.value.length))
const paginatedUsers = computed(() => filteredAndSortedUsers.value.slice(startIndex.value, endIndex.value))

const visiblePages = computed(() => {
  const pages = []; const total = totalPages.value; const current = currentPage.value
  if (total <= 7) { for (let i = 1; i <= total; i++) pages.push(i) }
  else if (current <= 4) { for (let i = 1; i <= 5; i++) pages.push(i); pages.push('…'); pages.push(total) }
  else if (current >= total - 3) { pages.push(1); pages.push('…'); for (let i = total - 4; i <= total; i++) pages.push(i) }
  else { pages.push(1); pages.push('…'); for (let i = current - 1; i <= current + 1; i++) pages.push(i); pages.push('…'); pages.push(total) }
  return pages
})

watch([() => ({ ...searchQuery }), itemsPerPage], () => { currentPage.value = 1 })

// ── Helpers ───────────────────────────────────────────────────────────────────
const countByStatus = (s) => users.value.filter(u => u.registration_status === s).length
const countByType = (t) => users.value.filter(u => u.user_type === t).length

const statusLabel = (s) => ({ active: 'Active', deActive: 'Deactive' }[s] || s)

const avatarColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899']
const getAvatarColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length]

const addNewUser = () => router.push('/admin/user-creation')
const editUser = (id) => router.push(`/admin/user-edit/${id}`)
const viewWholesaleApp = (userId) => router.push(`/admin/user-wholesale-view/${userId}`)
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
  align-items: flex-start;
  margin-bottom: 24px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 4px;
}

.page-sub {
  color: #c7c7c7;
  font-size: 0.85rem;
  margin: 0;
}

.btn-add {
  background: linear-gradient(135deg, #1e293b, #334155);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(30, 41, 59, 0.3);
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
  min-width: 140px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
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

  background: #fffbeb;
  color: #f59e0b;
}

.stat-icon.active {
  background: #f0fdf4;
  color: #22c55e;
}

.stat-icon.retail {
  background: #eff6ff;
  color: #3b82f6;
}

.stat-icon.wholesale {
  background: #fdf4ff;
  color: #a855f7;
}

.stat-icon.deactive {
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

/* Main Card */
.main-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
  overflow: hidden;
}

/* Filters */
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
  min-width: 180px;
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
  transition: border-color 0.2s;
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
  cursor: pointer;
  min-width: 140px;
}

.filter-select:focus {
  border-color: #3b82f6;
}

.btn-clear {
  padding: 8px 14px;
  border: 1.5px solid #fecaca;
  background: #fef2f2;
  color: #ef4444;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
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
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.th-sl,
.th-action {
  text-align: center;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  color: #1e293b;
}

.sort-icon {
  margin-left: 4px;
  font-size: 0.65rem;
}

.sort-icon.muted {
  color: #cbd5e1;
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
  color: #334155;
  vertical-align: middle;
}

.td-sl {
  text-align: center;
  color: #94a3b8;
  font-size: 0.8rem;
}

.td-email {
  color: #64748b;
  font-size: 0.82rem;
}

.td-gst {
  font-family: monospace;
  font-size: 0.78rem;
  color: #64748b;
}

.td-action {
  text-align: center;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.user-name {
  font-weight: 600;
  color: #1e293b;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.73rem;
  font-weight: 700;
}

.type-badge.retail {
  background: #eff6ff;
  color: #3b82f6;
}

.type-badge.wholesale {
  background: #fdf4ff;
  color: #9333ea;
}

.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.73rem;
  font-weight: 700;
}

.status-badge.active {
  background: #f0fdf4;
  color: #16a34a;
}

.status-badge.deActive {
  background: #f1f5f9;
  color: #64748b;
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

.action-btn.edit {
  background: #f1f5f9;
  color: #475569;
}

.action-btn.edit:hover {
  background: #1e293b;
  color: #fff;
}

.action-btn.wholesale-view {
  background: #faf5ff;
  color: #9333ea;
}

.action-btn.wholesale-view:hover {
  background: #9333ea;
  color: #fff;
}

.empty-row {
  text-align: center;
  padding: 48px 16px;
  color: #94a3b8;
  font-size: 0.9rem;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #cbd5e1;
  animation: bounce 0.8s infinite;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.15s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0.7)
  }

  40% {
    transform: scale(1)
  }
}

/* Pagination */
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