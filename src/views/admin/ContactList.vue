<template>
    <div class="admin-contact-list">
        <div class="container-fluid py-1">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="d-flex align-items-center">
                                <div>
                                    <h5 class="fw-bolder">Customer Contact Message List</h5>
                                </div>
                            </div>
                        </div>

                        <div class="p-2 py-0 m-2 my-0">
                            <div class="row">
                                <div class="col-4 mt-2">
                                    <label>Customer Name Search</label>
                                    <input class="form-control" type="text" v-model="searchQuery.name"
                                        placeholder="Search by Name" />
                                </div>
                                <div class="col-4 mt-2">
                                    <label>Verification Status Filter</label>
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
                                <table class="table table-bordered table-hover table-sm" id="contact-list">
                                    <thead class="thead-light bg-dark">
                                        <tr>
                                            <th
                                                class="text-center text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                SL/No</th>
                                            <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Customer</th>
                                            <th class="text-uppercase text-white opacity-10 text-xs font-weight-bolder">
                                                Subject</th>
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
                                            <td colspan="6" class="text-center text-muted py-4">Loading contacts...</td>
                                        </tr>
                                        <tr v-else v-for="(contact, index) in filteredContacts" :key="contact.contact_id">
                                            <td class="align-middle text-center">
                                                <p class="text-xs font-weight-bold mb-0">{{ index + 1 }}</p>
                                            </td>
                                            <td class="align-middle">
                                                <p class="text-sm font-weight-bold mb-0 text-primary">{{ contact.contact_name }}
                                                </p>
                                                <p class="text-xs text-muted mb-0">{{ contact.phone }}</p>
                                            </td>
                                            <td class="align-middle">
                                                <p class="text-sm font-weight-bold mb-0">{{ contact.subject }}</p>
                                            </td>
                                            <td class="align-middle text-center">
                                                <p class="text-sm font-weight-bold mb-0">{{ contact.created_date }}</p>
                                            </td>
                                            <td class="align-middle text-center">
                                                <span :class="['badge-custom', getVerificationBadgeClass(contact.verification_status)]">
                                                    {{ contact.verification_status }}
                                                </span>
                                            </td>
                                            <td class="align-middle text-center">
                                                <a href="javascript:;" class="mx-1" data-bs-toggle="modal"
                                                    data-bs-target="#contactDetailModal" title="View Details"
                                                    @click="setSelectedContact(contact)">
                                                    <i class="fas fa-eye text-info"></i>
                                                </a>

                                                <a v-if="contact.verification_status.toLowerCase() !== 'verified'"
                                                    href="javascript:;" class="mx-1" title="Mark as Verified"
                                                    @click="updateContactStatus(contact.contact_id, 'verified')">
                                                    <i class="fas fa-check-circle text-success"></i>
                                                </a>

                                                <a v-if="contact.verification_status.toLowerCase() !== 'rejected'"
                                                    href="javascript:;" class="mx-1" title="Mark as Rejected"
                                                    @click="updateContactStatus(contact.contact_id, 'rejected')">
                                                    <i class="fas fa-times-circle text-danger"></i>
                                                </a>

                                                <a href="javascript:;" class="mx-1" title="Remove Contact"
                                                    @click="removeContact(contact.contact_id)">
                                                    <i class="fas fa-trash text-secondary"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr v-if="!isLoading && filteredContacts.length === 0">
                                            <td colspan="6" class="text-center text-muted py-4">
                                                No contact messages found matching your criteria.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="contactDetailModal" tabindex="-1" role="dialog"
            aria-labelledby="contactDetailModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="contactDetailModalLabel">
                            Message from {{ selectedContact.contact_name }}
                        </h5>
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
                                    <p><strong>Customer:</strong> {{ selectedContact.contact_name }}</p>
                                    <p><strong>Subject:</strong> {{ selectedContact.subject }}</p>
                                    <p><strong>Email:</strong>
                                        <a :href="'mailto:' + selectedContact.email">{{ selectedContact.email }}</a>
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Phone:</strong>
                                        <a :href="'tel:' + selectedContact.phone">{{ selectedContact.phone }}</a>
                                    </p>
                                    <p><strong>Submitted On:</strong> {{ selectedContact.created_date }}</p>
                                    <p><strong>Verification Status:</strong> 
                                        <span :class="['badge-custom', getVerificationBadgeClass(selectedContact.verification_status)]">
                                            {{ selectedContact.verification_status }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr>
                            <h6>Message:</h6>
                            <p class="text-muted">{{ selectedContact.message || 'No message content available.' }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        <button
                            v-if="selectedContact.verification_status && selectedContact.verification_status.toLowerCase() !== 'verified'"
                            type="button" class="btn btn-success" data-bs-dismiss="modal"
                            @click="updateContactStatus(selectedContact.contact_id, 'verified')">
                            <i class="fas fa-check"></i> Mark Verified
                        </button>

                        <button
                            v-if="selectedContact.verification_status && selectedContact.verification_status.toLowerCase() !== 'rejected'"
                            type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            @click="updateContactStatus(selectedContact.contact_id, 'rejected')">
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
const allContacts = ref([])
const isLoading = ref(false)
const isModalLoading = ref(false)

// Filters
const searchQuery = reactive({
    name: '',
    verificationStatus: '',
})

// Modal state
const selectedContact = ref({
    contact_id: null,
    contact_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    verification_status: '',
    created_date: ''
})

// --- Helper Functions ---

/**
 * Returns the appropriate badge class based on verification status.
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

// --- Filtering Logic ---

const filteredContacts = computed(() => {
    return allContacts.value.filter(contact => {
        // Filter by Name
        const nameMatch = contact.contact_name.toLowerCase().includes(searchQuery.name.toLowerCase());

        // Filter by Verification Status
        const statusMatch = !searchQuery.verificationStatus || 
                          contact.verification_status.toLowerCase() === searchQuery.verificationStatus.toLowerCase();

        return nameMatch && statusMatch;
    });
});

// --- API Integration Functions ---

/**
 * Fetches the list of contacts from the API (GET /v1/admin/contacts).
 */
const fetchContacts = async () => {
    isLoading.value = true;
    try {
        const response = await api.get("/v1/admin/contacts");
        // API already provides created_date formatted
        allContacts.value = response.data.data;
        
        console.log('Fetched contacts:', allContacts.value);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        alert("Failed to load customer contacts.");
    } finally {
        isLoading.value = false;
    }
};

/**
 * Fetches detailed contact information including the message.
 * API: GET v1/admin/contact/view/{id}
 * @param {number} id Contact ID.
 */
const fetchContactDetails = async (id) => {
    isModalLoading.value = true;
    try {
        const response = await api.get(`/v1/admin/contact/view/${id}`);
        const data = response.data.data;

        // Update selectedContact with full details
        selectedContact.value = {
            contact_id: data.contact_id,
            contact_name: data.name, // API returns 'name' in view endpoint
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
            verification_status: data.verification_status,
            // Format date from submitted_on
            created_date: data.submitted_on || 'N/A'
        };

    } catch (error) {
        console.error(`Error fetching contact details for ID ${id}:`, error);
        selectedContact.value.message = 'Error loading message details.';
    } finally {
        isModalLoading.value = false;
    }
};

/**
 * Sets the selected contact and fetches full details for the modal.
 * @param {object} contact The contact object from the list.
 */
const setSelectedContact = (contact) => {
    // Set basic info immediately for modal header
    selectedContact.value = {
        ...contact,
        message: 'Loading message details...',
    };

    // Fetch full details including message
    fetchContactDetails(contact.contact_id);
};

/**
 * Updates contact verification status.
 * API: PATCH v1/admin/contact/change-status/{id}
 * @param {number} id Contact ID.
 * @param {'verified' | 'rejected'} newStatus The action to perform.
 */
const updateContactStatus = async (id, newStatus) => {
    if (confirm(`Are you sure you want to mark this contact as ${newStatus.toUpperCase()}?`)) {
        try {
            const payload = { action: newStatus };
            await api.patch(`/v1/admin/contact/change-status/${id}`, payload);

            alert(`Contact ${id} successfully marked as ${newStatus}!`);

            // Re-fetch the list to refresh
            await fetchContacts();
            
            // Update modal if it's the same contact
            if (selectedContact.value.contact_id === id) {
                selectedContact.value.verification_status = newStatus;
            }

        } catch (error) {
            console.error(`Error updating status for contact ${id}:`, error);
            alert(`Failed to mark contact as ${newStatus}. Details: ${error.response?.data?.message || error.message}`);
        }
    }
};

/**
 * Removes (soft-deletes) a contact.
 * API: PATCH v1/admin/contact/remove/{id}
 * @param {number} id Contact ID.
 */
const removeContact = async (id) => {
    if (confirm(`Are you absolutely sure you want to remove contact ID ${id}? This action is usually irreversible.`)) {
        try {
            await api.patch(`/v1/admin/contact/remove/${id}`);

            alert(`Contact ${id} successfully removed! 🗑️`);
            
            // Re-fetch the list
            await fetchContacts();

        } catch (error) {
            console.error(`Error removing contact ${id}:`, error);
            alert(`Failed to remove contact. Details: ${error.response?.data?.message || error.message}`);
        }
    }
};

// --- Lifecycle ---
onMounted(() => {
    fetchContacts();
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

.badge-secondary {
    background-color: #6c757d;
}

.fa-eye {
    color: #17a2b8;
    font-size: 1.1rem;
}

.fa-check-circle {
    color: #28a745;
    font-size: 1.1rem;
}

.fa-times-circle {
    color: #dc3545;
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