<template>
  <div class="admin-user-list">
    <div class="container-fluid py-1">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <div>
                  <h5 class="fw-bolder">User List</h5>
                </div>
                <div class="ms-auto my-auto">
                  <button
                    type="button"
                    class="btn bg-gradient-primary btn-sm mb-0"
                    @click="addNewUser"
                  >
                    +&nbsp; New User
                  </button>
                </div>
              </div>
            </div>

            <!-- Search Filters -->
            <div class="p-2 py-0 m-2 my-0">
              <div class="row">
                <div class="col-4 mt-2">
                  <label>Name Search</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="searchQuery.userName"
                    placeholder="Search by name"
                  />
                </div>
                <div class="col-4 mt-2">
                  <label>Email Search</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="searchQuery.email"
                    placeholder="Search by email"
                  />
                </div>
                <div class="col-4 mt-2">
                  <label>Status Filter</label>
                  <select class="form-select" v-model="searchQuery.status">
                    <option value="">All Statuses</option>
                    <option value="unconfirmed">Unconfirmed</option>
                    <option value="active">Active</option>
                    <option value="deActive">Deactive</option>
                    <option value="reject">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Table -->
            <div class="card-body p-0 mt-3">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm" id="user-list">
                  <thead class="thead-light bg-dark">
                    <tr>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">SL/No</th>
                      <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable" @click="sortBy('user_name')">
                        User Name
                        <i :class="getSortIcon('user_name')"></i>
                      </th>
                      <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable" @click="sortBy('email')">
                        Email
                        <i :class="getSortIcon('email')"></i>
                      </th>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable" @click="sortBy('phone')">
                        Phone
                        <i :class="getSortIcon('phone')"></i>
                      </th>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable" @click="sortBy('gst_number')">
                        GST
                        <i :class="getSortIcon('gst_number')"></i>
                      </th>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder sortable" @click="sortBy('registration_status')">
                        Status
                        <i :class="getSortIcon('registration_status')"></i>
                      </th>
                      <th class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="isLoading">
                      <td colspan="7" class="text-center text-muted py-4">Loading users...</td>
                    </tr>
                    <tr v-else v-for="(user, index) in paginatedUsers" :key="user.public_user_id">
                      <td class="align-middle text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</p>
                      </td>
                      <td class="align-middle">
                        <p class="text-sm font-weight-bold mb-0">{{ user.user_name }}</p>
                      </td>
                      <td class="align-middle">
                        <p class="text-sm font-weight-bold mb-0">{{ user.email }}</p>
                      </td>
                      <td class="align-middle text-center">
                        <p class="text-sm font-weight-bold mb-0">{{ user.phone }}</p>
                      </td>
                      <td class="align-middle text-center">
                        <p class="text-sm font-weight-bold mb-0">{{ user.gst_number }}</p>
                      </td>
                      <td class="align-middle text-center">
                        <span
                          :class="['badge', getStatusBadgeClass(user.registration_status), 'badge-sm']"
                        >
                          {{ user.registration_status }}
                        </span>
                      </td>
                      <td class="align-middle text-center">
                        <a
                          href="javascript:void(0)"
                          class="mx-3"
                          data-bs-toggle="tooltip"
                          title="Edit User"
                          @click="editUser(user.public_user_id)"
                        >
                          <i class="fas fa-user-edit text-dark"></i>
                        </a>
                      </td>
                    </tr>
                    <tr v-if="!isLoading && filteredUsers.length === 0">
                      <td colspan="7" class="text-center text-muted py-4">
                        No users found matching your criteria.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pagination -->
            <div class="card-footer d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <label class="mb-0 me-2">Rows per page:</label>
                <select class="form-select form-select-sm" v-model="itemsPerPage" style="width: 80px;">
                  <option :value="10">10</option>
                  <option :value="25">25</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                </select>
                <span class="ms-3 text-sm text-muted">
                  Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredAndSortedUsers.length }} entries
                </span>
              </div>

              <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm mb-0">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="javascript:void(0)" @click="currentPage = 1">
                      <i class="fas fa-angle-double-left"></i>
                    </a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="javascript:void(0)" @click="currentPage--">
                      <i class="fas fa-angle-left"></i>
                    </a>
                  </li>
                  
                  <li 
                    v-for="page in visiblePages" 
                    :key="page"
                    class="page-item" 
                    :class="{ active: currentPage === page }"
                  >
                    <a class="page-link" href="javascript:void(0)" @click="currentPage = page">
                      {{ page }}
                    </a>
                  </li>

                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="javascript:void(0)" @click="currentPage++">
                      <i class="fas fa-angle-right"></i>
                    </a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="javascript:void(0)" @click="currentPage = totalPages">
                      <i class="fas fa-angle-double-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { api } from "@/services/api"

const router = useRouter()
const users = ref([])
const isLoading = ref(false)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sorting state
const sortColumn = ref('')
const sortDirection = ref('asc')

const searchQuery = reactive({
  userName: '',
  email: '',
  status: ''
})

// --- Badge Class Helper ---
const getStatusBadgeClass = (status) => {
  switch (status.toLowerCase()) {
    case 'active': return 'badge-active'
    case 'unconfirmed': return 'badge-unconfirmed'
    case 'deactive': return 'badge-deactive'
    case 'reject': return 'badge-rejected'
    default: return 'badge-default'
  }
}

// --- Sorting Methods ---
const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (column) => {
  if (sortColumn.value !== column) {
    return 'fas fa-sort text-white-50 ms-1'
  }
  return sortDirection.value === 'asc' 
    ? 'fas fa-sort-up text-white ms-1' 
    : 'fas fa-sort-down text-white ms-1'
}

// --- Computed Filter ---
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const nameMatch = user.user_name.toLowerCase().includes(searchQuery.userName.toLowerCase())
    const emailMatch = user.email.toLowerCase().includes(searchQuery.email.toLowerCase())
    const statusMatch = !searchQuery.status || user.registration_status.toLowerCase() === searchQuery.status.toLowerCase()
    return nameMatch && emailMatch && statusMatch
  })
})

// --- Filtered and Sorted Users ---
const filteredAndSortedUsers = computed(() => {
  let result = [...filteredUsers.value]

  if (sortColumn.value) {
    result.sort((a, b) => {
      let aVal = a[sortColumn.value]
      let bVal = b[sortColumn.value]

      // Handle strings
      aVal = String(aVal || '').toLowerCase()
      bVal = String(bVal || '').toLowerCase()

      if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})

// --- Pagination Computed Properties ---
const totalPages = computed(() => {
  return Math.ceil(filteredAndSortedUsers.value.length / itemsPerPage.value)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage.value, filteredAndSortedUsers.value.length)
})

const paginatedUsers = computed(() => {
  return filteredAndSortedUsers.value.slice(startIndex.value, endIndex.value)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages.filter(p => p !== '...' || pages.indexOf(p) === pages.lastIndexOf(p))
})

// Reset to page 1 when filters change
watch([searchQuery, itemsPerPage, sortColumn, sortDirection], () => {
  currentPage.value = 1
})

// --- Fetch API Data ---
const fetchUsers = async () => {
  isLoading.value = true
  try {
    const response = await api.get("/v1/admin/users")
    users.value = response.data.data
  } catch (error) {
    console.error("Error fetching users:", error)
    alert("Failed to load users. Check console for details.")
  } finally {
    isLoading.value = false
  }
}

// --- Navigation Methods ---
const addNewUser = () => {
  router.push("/admin/user-creation")
}

const editUser = (id) => {
  router.push(`/admin/user-edit/${id}`)
}

onMounted(fetchUsers)
</script>

<style scoped>
.badge-active {
  background-color: #28a745;
}
.badge-unconfirmed {
  background-color: #17a2b8;
}
.badge-deactive {
  background-color: #6c757d;
}
.badge-rejected {
  background-color: #dc3545;
}
.text-dark {
  color: #343a40 !important;
}

.pagination .page-link {
  color: #344767;
  border: 1px solid #dee2e6;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.pagination .page-item.active .page-link {
  background-color: #5e72e4;
  border-color: #5e72e4;
  color: white;
}

.pagination .page-item.disabled .page-link {
  opacity: 0.5;
  pointer-events: none;
}

.pagination .page-link:hover {
  background-color: #f8f9fa;
}

.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.sortable:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sortable i {
  font-size: 0.7rem;
  vertical-align: middle;
}
</style>