<template>
    <div class="admin-enquiry-list">
        <div class="container-fluid py-1">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="d-flex align-items-center">
                                <div>
                                    <h5 class="fw-bolder">Business Enquiry Management List</h5>
                                </div>
                            </div>
                        </div>

                        <div class="p-2 py-0 m-2 my-0">
                            <div class="row">
                                <div class="col-4 mt-2">
                                    <label>Company Name Search</label>
                                    <input class="form-control" type="text" v-model="searchQuery.companyName"
                                        placeholder="Search by Company" />
                                </div>
                                <div class="col-4 mt-2">
                                    <label>Contact Person Search</label>
                                    <input class="form-control" type="text" v-model="searchQuery.contactName"
                                        placeholder="Search by Contact Name" />
                                </div>
                                <!-- <div class="col-4 mt-2">
                                    <label>Enquiry Type Filter</label>
                                    <select class="form-select" v-model="searchQuery.enquiryType">
                                        <option value="">All Types</option>
                                        <option value="Product Enquiry">Product Enquiry</option>
                                        <option value="Dealer Application">Dealer Application</option>
                                        <option value="Project Procurement">Project Procurement</option>
                                        <option value="B2B Supply">B2B Bulk Supply</option>
                                        <option value="Partnership">Strategic Partnership</option>
                                        <option value="Other">Other Enquiry</option>
                                    </select>
                                </div> -->
                                <div class="col-4 mt-2">
                                    <label>Verification Status</label>
                                    <select class="form-select" v-model="searchQuery.verificationStatus">
                                        <option value="">All Statuses</option>
                                        <option value="pending">Pending</option>
                                        <option value="verified">Verified</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="card-body p-0 mt-3">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover table-sm" id="enquiry-list">
                                    <thead class="thead-light bg-dark">
                                        <tr>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                SL/No</th>
                                            <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Company Name</th>
                                            <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Contact Person</th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Enquiry Type</th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Date</th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Verification Status</th>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="isLoading">
                                            <td colspan="7" class="text-center text-muted py-4">Loading business
                                                enquiries...</td>
                                        </tr>
                                        <tr v-else v-for="(enquiry, index) in filteredEnquiries"
                                            :key="enquiry.enquiry_id">
                                            <td class="align-middle text-center">
                                                <p class="text-xs font-weight-bold mb-0">{{ index + 1 }}</p>
                                            </td>
                                            <td class="align-middle">
                                                <p class="text-sm font-weight-bold mb-0 text-primary">{{
                                                    enquiry.company_name }}
                                                </p>
                                            </td>
                                            <td class="align-middle">
                                                <p class="text-sm font-weight-bold mb-0">{{ enquiry.contact_person }}
                                                </p>
                                                <p class="text-xs text-muted mb-0">{{ enquiry.phone }}</p>
                                            </td>
                                            <td class="align-middle text-center">
                                                <p class="text-sm font-weight-bold mb-0">{{ enquiry.enquiry_type }}</p>
                                            </td>
                                            <td class="align-middle text-center">
                                                <p class="text-sm font-weight-bold mb-0">{{ enquiry.created_date }}</p>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span
                                                    :class="['badge-custom', getVerificationBadgeClass(enquiry.verification_status)]">
                                                    {{ enquiry.verification_status }}
                                                </span>
                                            </td>
                                            <td class="align-middle text-center">
                                                <a href="javascript:;" class="mx-1" data-bs-toggle="modal"
                                                    data-bs-target="#enquiryDetailModal" title="View Details"
                                                    @click="setSelectedEnquiry(enquiry)">
                                                    <i class="fas fa-eye text-info"></i>
                                                </a>

                                                <a v-if="enquiry.verification_status.toLowerCase() !== 'verified'"
                                                    href="javascript:;" class="mx-1" title="Mark as Verified"
                                                    @click="updateEnquiryStatus(enquiry.enquiry_id, 'verified')">
                                                    <i class="fas fa-check-circle text-success"></i>
                                                </a>

                                                <a v-if="enquiry.verification_status.toLowerCase() !== 'rejected'"
                                                    href="javascript:;" class="mx-1" title="Mark as Rejected"
                                                    @click="updateEnquiryStatus(enquiry.enquiry_id, 'rejected')">
                                                    <i class="fas fa-times-circle text-danger"></i>
                                                </a>

                                                <a href="javascript:;" class="mx-1" title="Remove Enquiry"
                                                    @click="removeEnquiry(enquiry.enquiry_id)">
                                                    <i class="fas fa-trash text-secondary"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr v-if="!isLoading && filteredEnquiries.length === 0">
                                            <td colspan="7" class="text-center text-muted py-4">No business enquiries
                                                found matching filters.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="enquiryDetailModal" tabindex="-1" role="dialog"
            aria-labelledby="enquiryDetailModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="enquiryDetailModalLabel">Enquiry Details: {{
                            selectedEnquiry.company_name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="isModalLoading" class="text-center py-5">
                            <i class="fas fa-spinner fa-spin fa-2x text-primary"></i>
                            <p class="mt-2 text-primary">Loading details...</p>
                        </div>
                        <div v-else>
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Company:</strong> {{ selectedEnquiry.company_name }}</p>
                                    <p><strong>Enquiry Type:</strong> <span
                                            :class="['badge-custom', getStatusBadgeClass(selectedEnquiry.enquiry_type)]">{{
                                                selectedEnquiry.enquiry_type }}</span></p>
                                    <p><strong>Submission Date:</strong> {{ selectedEnquiry.created_date }}</p>
                                    <p><strong>Verification Status:</strong> <span
                                            :class="['badge-custom', getVerificationBadgeClass(selectedEnquiry.verification_status)]">{{
                                                selectedEnquiry.verification_status }}</span></p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Contact:</strong> {{ selectedEnquiry.contact_person }}</p>
                                    <p><strong>Email:</strong> {{ selectedEnquiry.email }}</p>
                                    <p><strong>Phone:</strong> {{ selectedEnquiry.phone }}</p>
                                </div>
                            </div>
                            <hr>
                            <h6>Project/Requirement Details:</h6>
                            <p class="text-muted">{{ selectedEnquiry.details || 'Detailed description not available.' }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        <button
                            v-if="selectedEnquiry.verification_status && selectedEnquiry.verification_status.toLowerCase() !== 'verified'"
                            type="button" class="btn btn-success" data-bs-dismiss="modal"
                            @click="updateEnquiryStatus(selectedEnquiry.enquiry_id, 'verified')">
                            <i class="fas fa-check"></i> Mark Verified
                        </button>

                        <button
                            v-if="selectedEnquiry.verification_status && selectedEnquiry.verification_status.toLowerCase() !== 'rejected'"
                            type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            @click="updateEnquiryStatus(selectedEnquiry.enquiry_id, 'rejected')">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { api } from "@/services/api"; // axios helper

// State
const allEnquiries = ref([])
const isLoading = ref(false)
const isModalLoading = ref(false);

// Search query
const searchQuery = reactive({
    companyName: '',
    contactName: '',
    enquiryType: '',
    verificationStatus: '',
})

// State for the modal
const selectedEnquiry = ref({
    enquiry_id: null,
    company_name: '',
    contact_person: '',
    enquiry_type: '',
    phone: '',
    email: '',
    message: '',
    details: '',
    verification_status: '',
    created_date: ''
})


// --- Helper Functions for Status and Filtering ---

/**
 * Returns the appropriate badge class based on the verification status string.
 */
const getVerificationBadgeClass = (status) => {
    if (!status) return 'badge-secondary';
    switch (status.toLowerCase()) {
        case 'verified': return 'badge-success';
        case 'pending': return 'badge-warning';
        case 'rejected': return 'badge-danger';
        default: return 'badge-secondary';
    }
};

/**
 * Returns a badge class for the enquiry type for visual differentiation in the modal.
 */
const getStatusBadgeClass = (enquiryType) => {
    switch (enquiryType) {
        case 'Dealer Application': return 'badge-info';
        case 'Project Procurement': return 'badge-primary';
        case 'B2B Supply': return 'badge-dark';
        case 'Product Enquiry': return 'badge-secondary';
        default: return 'badge-secondary';
    }
};

// --- Filtering Logic (Client-Side) ---

const filteredEnquiries = computed(() => {
    return allEnquiries.value.filter(enquiry => {
        // Filter by Company Name
        const companyMatch = enquiry.company_name.toLowerCase().includes(searchQuery.companyName.toLowerCase());

        // Filter by Contact Person
        const contactMatch = enquiry.contact_person.toLowerCase().includes(searchQuery.contactName.toLowerCase());

        // Filter by Enquiry Type
        const typeMatch = !searchQuery.enquiryType || enquiry.enquiry_type === searchQuery.enquiryType;

        // Filter by Verification Status
        const statusMatch = !searchQuery.verificationStatus || enquiry.verification_status.toLowerCase() === searchQuery.verificationStatus.toLowerCase();

        return companyMatch && contactMatch && typeMatch && statusMatch;
    });
});


// --- API Integration Functions ---

/**
 * Fetches the list of business enquiries from the API (GET /v1/admin/enquires).
 * The API already returns created_date formatted, so we use it directly.
 */
const fetchEnquiries = async () => {
    isLoading.value = true;
    try {
        const response = await api.get("/v1/admin/enquires");
        // Simply assign the data - created_date is already in the response
        allEnquiries.value = response.data.data;
        
        console.log('Fetched enquiries:', allEnquiries.value);
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        alert("Failed to load business enquiries.");
    } finally {
        isLoading.value = false;
    }
};

/**
 * Fetches the detailed enquiry data including the message.
 * API: GET v1/admin/enquiry/view/{id}
 * @param {number} id Enquiry ID.
 */
const fetchEnquiryDetails = async (id) => {
    isModalLoading.value = true;
    try {
        const response = await api.get(`/v1/admin/enquiry/view/${id}`);
        const data = response.data.data;

        // Update selectedEnquiry with the full data from the view API
        selectedEnquiry.value = {
            ...data,
            // Use created_date if it exists (API provides it formatted)
            created_date: data.created_date || 'N/A',
            // Map 'message' field from the view API response to 'details' for the modal's template binding
            details: data.message || data.details || 'No details available'
        };

    } catch (error) {
        console.error(`Error fetching enquiry details for ID ${id}:`, error);
        selectedEnquiry.value.details = 'Error loading message details.';
    } finally {
        isModalLoading.value = false;
    }
};

/**
 * Sets the currently selected enquiry and fetches its full details for the modal.
 * This is called when the eye icon is clicked.
 * @param {object} enquiry The enquiry object from the list.
 */
const setSelectedEnquiry = (enquiry) => {
    // Set key fields immediately for modal header and non-message fields
    selectedEnquiry.value = {
        ...enquiry,
        details: 'Loading message details...',
    };

    // Fetch the full details including the message body
    fetchEnquiryDetails(enquiry.enquiry_id);
};

/**
 * Updates enquiry verification status using PATCH v1/admin/enquiry/change-status/{id}.
 * @param {number} id Enquiry ID.
 * @param {'verified' | 'rejected'} newStatus The action to perform.
 */
const updateEnquiryStatus = async (id, newStatus) => {
    if (confirm(`Are you sure you want to change the status of enquiry ID ${id} to ${newStatus.toUpperCase()}?`)) {
        try {
            const payload = { action: newStatus };
            await api.patch(`/v1/admin/enquiry/change-status/${id}`, payload);

            alert(`Enquiry ${id} successfully marked as ${newStatus}!`);

            // Re-fetch the list to refresh the table
            await fetchEnquiries();
            
            // Update the status in the currently opened modal's object
            if (selectedEnquiry.value.enquiry_id === id) {
                 selectedEnquiry.value.verification_status = newStatus;
            }

        } catch (error) {
            console.error(`Error updating status for enquiry ${id}:`, error);
            alert(`Failed to mark enquiry as ${newStatus}. Details: ${error.response?.data?.message || error.message}`);
        }
    }
};

/**
 * Removes (soft-deletes) an enquiry using PATCH v1/admin/enquiry/remove/{id}.
 * @param {number} id Enquiry ID.
 */
const removeEnquiry = async (id) => {
    if (confirm(`Are you absolutely sure you want to remove enquiry ID ${id}? This action is usually irreversible.`)) {
        try {
            await api.patch(`/v1/admin/enquiry/remove/${id}`);

            alert(`Enquiry ${id} successfully removed! 🗑️`);
            
            // Re-fetch the list to remove the entry from the table
            await fetchEnquiries();

        } catch (error) {
            console.error(`Error removing enquiry ${id}:`, error);
            alert(`Failed to remove enquiry. Details: ${error.response?.data?.message || error.message}`);
        }
    }
};


// --- Lifecycle ---
onMounted(() => {
    fetchEnquiries();
});
</script>

<style scoped>
.badge-custom {
    display: inline-block;
    padding: 0.35em 0.6em;
    font-size: 0.65rem;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    border-radius: 0.35rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

/* Status-specific badge colors */
.badge-success {
    background-color: #28a745;
}

.badge-warning {
    background-color: #ffc107;
    color: #343a40;
}

.badge-danger {
    background-color: #dc3545;
}

/* Enquiry Type-specific colors */
.badge-primary {
    background-color: #007bff;
}

.badge-info {
    background-color: #17a2b8;
}

.badge-dark {
    background-color: #343a40;
}

.badge-secondary {
    background-color: #6c757d;
}

/* Custom icon styling for action buttons */
.fa-check-circle {
    color: #28a745;
    font-size: 1.1rem;
}

.fa-times-circle {
    color: #dc3545;
    font-size: 1.1rem;
}

.fa-eye {
    color: #17a2b8;
    font-size: 1.1rem;
}

.fa-trash {
    color: #6c757d;
    font-size: 1.1rem;
}

.text-primary {
    color: #007bff !important;
}

.font-weight-bolder {
    font-weight: 700 !important;
}
</style>