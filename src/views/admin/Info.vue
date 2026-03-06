<template>
    <div class="admin-website-info">
        <div class="container-fluid px-1 px-md-4">
            <form @submit.prevent="submitForm">
                <div class="row mt-1">
                    <div class="col-lg-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="font-weight-bolder">Logo</h5>
                                <div class="row mt-3">
                                    <div class="col-12">
                                        <div class="proof">
                                            <div :class="['imgArea', { active: logoPreview }]"
                                                :data-title="logoFileName" @click="triggerLogoUpload">
                                                <input type="file" ref="logoInput" @change="handleLogoUpload" hidden
                                                    accept="image/*" />
                                                <template v-if="!logoPreview">
                                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                                    <h5>Upload image</h5>
                                                    <p>image size must be less than <span>1MB</span> & 400×120 px</p>
                                                </template>
                                                <img v-if="logoPreview" :src="logoPreview" alt="Logo Preview"
                                                    class="uploaded-image" />
                                            </div>
                                        </div>
                                        <p class="mb-0">logo size must be less than <span class="fw-bold">1MB</span> & 400×120 px
                                        </p>
                                    </div>

                                    <div class="col-12 mt-2">
                                        <label class="mt-2">Upload Title Logo</label>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="col-6">
                                                <input type="file" class="form-control" @change="handleTitleLogoUpload"
                                                    accept="image/*" />
                                            </div>
                                            <div class="col-6 d-flex justify-content-center">
                                                <img v-if="formData.titleLogoPreview" :src="formData.titleLogoPreview"
                                                    class="img-fluid rounded shadow-sm" style="max-height: 80px;" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-8 mt-lg-0 mt-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="font-weight-bolder">Website Information</h5>
                                <div class="row">
                                    <div class="col-12">
                                        <label>Website Name (Title Name)</label>
                                        <input v-model="formData.websiteName" class="form-control" type="text"
                                            placeholder="Enter your website name" required />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <label class="mt-2">Email</label>
                                        <input v-model="formData.email" class="form-control" type="email"
                                            placeholder="contact@example.com" required />
                                    </div>

                                    <div class="col-md-6">
                                        <label class="mt-2">Phone Number</label>
                                        <input v-model="formData.phone" class="form-control" type="tel"
                                            placeholder="+91 00 00 000 000" required />
                                    </div>

                                    <div class="col-md-6">
                                        <label class="mt-2">Address</label>
                                        <textarea v-model="formData.address" class="form-control"
                                            placeholder="Enter complete address" rows="5" required></textarea>
                                    </div>

                                    <div class="col-md-6">
                                        <label class="mt-2">Google Maps Link</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                            <input v-model="formData.mapLink" type="url" class="form-control"
                                                placeholder="https://maps.google.com/..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="font-weight-bolder">Contact Person Information</h5>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class="mt-2">Full Name</label>
                                        <input v-model="formData.contactPerson.name" class="form-control" type="text"
                                            placeholder="Contact person name" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="mt-2">Phone Number</label>
                                        <input v-model="formData.contactPerson.phone" class="form-control" type="tel"
                                            placeholder="+91 00 00 000 000" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="mt-2">WhatsApp Number</label>
                                        <input v-model="formData.contactPerson.whatsapp" class="form-control" type="tel"
                                            placeholder="+91 00 00 000 000" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 mt-sm-0 mt-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="font-weight-bolder">Website Social Media Links</h5>
                                <div class="row">
                                    <div class="col-md-6" v-for="(val, key) in socialKeys" :key="key">
                                        <label class="form-label text-capitalize">{{ socialLabels[key] || key }}</label>
                                        <input v-model="formData.socialMedia[key]" class="form-control"
                                            :placeholder="`Enter ${key} link/number`" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="font-weight-bolder">Add Banner Images</h5>
                                <div class="row">
                                    <div v-for="(banner, index) in formData.banners" :key="`banner-${index}`"
                                        class="col-md-4 mt-2">
                                        <label class="d-block">Large Screen size Banner {{ index + 1 }}</label>
                                        <input class="form-control" type="file"
                                            @change="handleBannerUpload(index, 'large', $event)" accept="image/*" />
                                        <small v-if="banner.large.name" class="text-success">Selected: {{
                                            banner.large.name }}</small>
                                        <div class="mt-2">
                                            <img v-if="banner.large.preview" :src="banner.large.preview"
                                                class="img-fluid rounded" style="max-height: 120px;" />
                                            <div v-else class="small text-muted">No large banner selected</div>
                                        </div>

                                        <label class="d-block mt-3">Mobile Screen size Banner {{ index + 1 }}</label>
                                        <input class="form-control" type="file"
                                            @change="handleBannerUpload(index, 'mobile', $event)" accept="image/*" />
                                        <small v-if="banner.mobile.name" class="text-success">Selected: {{
                                            banner.mobile.name }}</small>
                                        <div class="mt-2">
                                            <img v-if="banner.mobile.preview" :src="banner.mobile.preview"
                                                class="img-fluid rounded" style="max-height: 120px;" />
                                            <div v-else class="small text-muted">No mobile banner selected</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="font-weight-bolder">About Us Details</h5>
                                <div class="row">
                                    <div class="col-md-4 mt-2">
                                        <label>About Us Image</label>
                                        <input class="form-control" type="file" @change="handleAboutImageUpload"
                                            accept="image/*" />
                                        <img v-if="formData.aboutUs.imagePreview" :src="formData.aboutUs.imagePreview"
                                            class="img-fluid mt-2 rounded shadow-sm" style="max-height: 80px;" />
                                    </div>
                                    <div class="col-md-4 mt-2">
                                        <label>About Us Heading</label>
                                        <textarea v-model="formData.aboutUs.heading" class="form-control"
                                            rows="5"></textarea>
                                    </div>
                                    <div class="col-md-4 mt-2">
                                        <label>About Us Description</label>
                                        <textarea v-model="formData.aboutUs.description" class="form-control"
                                            rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
 
                <div class="row">
                    <div class="col-lg-4 ms-auto">
                        <button type="submit" class="btn btn-lg bg-gradient-dark mt-4 w-100" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Multiselect from 'vue-multiselect'
import { api } from "@/services/api"; // axios helper
import defaultimg from '@/assets/website/img/logo/logo.jpg'



// -------------------------------
// Refs & State
// -------------------------------
const logoInput = ref(null)
const logoPreview = ref('')
const logoFileName = ref('')
const isSubmitting = ref(false)
const availableItems = ref([]) // To store the list of selectable products

// validation
const fileTypes = [
    'image/apng', 'image/bmp', 'image/gif', 'image/jpeg',
    'image/pjpeg', 'image/png', 'image/svg+xml', 'image/tiff',
    'image/webp', 'image/x-icon', 'image/avif'
]
const validFileType = (file) => file && fileTypes.includes(file.type)
const validateImageSize = (file) => file && file.size <= 1097152 // 1MB

// social keys that map to backend fields
const socialKeys = { facebook: '', instagram: '', youtube: '', whatsappBusiness: '' }
const socialLabels = { whatsappBusiness: 'WhatsApp Business' }

// -------------------------------
// Form Data - MODIFIED: Added `items` object
// -------------------------------
const formData = reactive({
    websiteName: '',
    email: '',
    phone: '',
    address: '',
    mapLink: '',
    contactPerson: { name: '', phone: '', whatsapp: '' },
    socialMedia: { facebook: '', instagram: '', youtube: '', whatsappBusiness: '' },
    // banners: array of 3 banners each has large & mobile with file, name, preview
    banners: [
        { large: { file: null, name: '', preview: '' }, mobile: { file: null, name: '', preview: '' } },
        { large: { file: null, name: '', preview: '' }, mobile: { file: null, name: '', preview: '' } },
        { large: { file: null, name: '', preview: '' }, mobile: { file: null, name: '', preview: '' } }
    ],
    aboutUs: { heading: '', description: '', image: null, imagePreview: '' },
    logo: null,
    titleLogo: null,
    titleLogoPreview: '',
  
})

// -------------------------------
// Fetch Available Products
// -------------------------------
const fetchAvailableItems = async () => {
    try {
        const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
        const res = await api.get('v1/item/intermediate-view', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        // Store the items. The value should be a string or number, as the select's v-model expects.
        availableItems.value = res.data.data.map(item => ({
            item_id: item.item_id.toString(), // Convert to string to match JSON data type if needed, or keep as number
            item_name: item.item_name
        }))
    } catch (error) {
        console.error('Error fetching available items:', error)
        // Handle error, maybe show an alert
    }
}

// -------------------------------
// Fetch Existing Data - MODIFIED: Added items data loading
// -------------------------------
onMounted(async () => {
    // 1. Fetch items first so the lookup works
    await fetchAvailableItems()

    try {
        // Get token from localStorage (adjust key name if different)
        const token = localStorage.getItem('auth_token') || localStorage.getItem('token')

        const res = await api.get('v1/website-info', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        const data = res.data.data

        // ... (Other standard data loading remains the same)
        formData.websiteName = data.websiteName || ''
        formData.email = data.email || ''
        formData.phone = data.phone || ''
        formData.address = data.address || ''
        formData.mapLink = data.googleMapsLink || ''

        // Contact Person 
        formData.contactPerson.name = data.contactPerson?.fullName || ''
        formData.contactPerson.phone = data.contactPerson?.phone || ''
        formData.contactPerson.whatsapp = data.contactPerson?.whatsapp || ''

        // Social Media
        formData.socialMedia.facebook = data.socialMedia?.facebook || ''
        formData.socialMedia.instagram = data.socialMedia?.instagram || ''
        formData.socialMedia.youtube = data.socialMedia?.youtube || ''
        formData.socialMedia.whatsappBusiness = data.socialMedia?.whatsappBusiness || ''

        // About Us
        formData.aboutUs.heading = data.aboutUs?.heading || ''
        formData.aboutUs.description = data.aboutUs?.description || ''
        formData.aboutUs.imagePreview = data.aboutUs?.image || ''

        // Logos
        logoPreview.value = data.logo || defaultimg
        formData.titleLogoPreview = data.titleLogo || ''

        // Banners
        for (let i = 0; i < 3; i++) {
            const key = `banner${i + 1}`
            const bannerObj = data.banners?.[key] || {}
            formData.banners[i].large.preview = bannerObj.large || ''
            formData.banners[i].mobile.preview = bannerObj.small || ''
        }

        // 2. Home Page Items - FINAL FIX: Use the 'featuredItems' array for pre-selection
        const featuredItems = data.featuredItems || [];

        // Iterate through the first 8 slots
        

    } catch (error) {
        console.error('Error loading website data:', error)
        if (error.response?.status === 401) {
            alert('Session expired. Please login again.')
        }
    }
})

// -------------------------------
// Upload Handlers (No change, keeping for completeness)
// -------------------------------
const triggerLogoUpload = () => logoInput.value.click()

const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!validFileType(file)) { alert('Invalid file type.'); return }
    if (!validateImageSize(file)) { alert('Image too large (max 1MB).'); return }

    const reader = new FileReader()
    reader.onload = (ev) => { logoPreview.value = ev.target.result }
    reader.readAsDataURL(file)

    formData.logo = file
    logoFileName.value = file.name
}

const handleTitleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!validFileType(file)) { alert('Invalid file type.'); return }
    if (!validateImageSize(file)) { alert('Image too large (max 1MB).'); return }

    const reader = new FileReader()
    reader.onload = ev => { formData.titleLogoPreview = ev.target.result }
    reader.readAsDataURL(file)

    formData.titleLogo = file
}

const handleAboutImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!validFileType(file)) { alert('Invalid file type.'); return }
    if (!validateImageSize(file)) { alert('Image too large (max 1MB).'); return }

    const reader = new FileReader()
    reader.onload = ev => { formData.aboutUs.imagePreview = ev.target.result }
    reader.readAsDataURL(file)
    formData.aboutUs.image = file
}

// BANNER upload handler
const handleBannerUpload = (index, type, e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!validFileType(file)) { alert('Invalid file type.'); return }
    if (!validateImageSize(file)) { alert('Image too large (max 1MB).'); return }

    const reader = new FileReader()
    reader.onload = ev => {
        if (type === 'large') formData.banners[index].large.preview = ev.target.result
        else formData.banners[index].mobile.preview = ev.target.result
    }
    reader.readAsDataURL(file)

    if (type === 'large') {
        formData.banners[index].large.file = file
        formData.banners[index].large.name = file.name
    } else {
        formData.banners[index].mobile.file = file
        formData.banners[index].mobile.name = file.name
    }
}

// -------------------------------
// Submit (multipart/form-data) - MODIFIED: Added items to the FormData
// -------------------------------
const submitForm = async () => {
    isSubmitting.value = true
    try {
        // Get token from localStorage (adjust key name if different)
        const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
        const submitData = new FormData()

        // Basic fields
        submitData.append('websiteName', formData.websiteName)
        submitData.append('email', formData.email)
        submitData.append('phone', formData.phone)
        submitData.append('address', formData.address)
        submitData.append('googleMapsLink', formData.mapLink || '')

        // Contact Person
        submitData.append('contactPerson[fullName]', formData.contactPerson.name)
        submitData.append('contactPerson[phone]', formData.contactPerson.phone)
        submitData.append('contactPerson[whatsapp]', formData.contactPerson.whatsapp)

        // Social Media
        submitData.append('socialMedia[facebook]', formData.socialMedia.facebook)
        submitData.append('socialMedia[instagram]', formData.socialMedia.instagram)
        submitData.append('socialMedia[youtube]', formData.socialMedia.youtube)
        submitData.append('socialMedia[whatsappBusiness]', formData.socialMedia.whatsappBusiness || '')

        // About Us
        submitData.append('aboutUs[heading]', formData.aboutUs.heading)
        submitData.append('aboutUs[description]', formData.aboutUs.description)

        // Home Page Items - MODIFIED: Append item IDs to the request
        for (const key in formData.items) {
            const selectedItemObject = formData.items[key]

            if (selectedItemObject && typeof selectedItemObject === 'object' && selectedItemObject.item_id) {
                // If user selected an object, send its item_id
                submitData.append(`items[${key}]`, selectedItemObject.item_id)
            } else {
                // If null (deselected) or invalid object, send null
                submitData.append(`items[${key}]`, null)
            }
        }


        // Single file uploads
        if (formData.logo) submitData.append('logo', formData.logo)
        if (formData.titleLogo) submitData.append('titleLogo', formData.titleLogo)
        if (formData.aboutUs.image) submitData.append('aboutUs[image]', formData.aboutUs.image)

        // Banners - Use backend's expected field names
        formData.banners.forEach((banner, idx) => {
            const i = idx + 1
            if (banner.large.file) {
                submitData.append(`banner_${i}_large_size_image`, banner.large.file, banner.large.name)
            }
            if (banner.mobile.file) {
                submitData.append(`banner_${i}_small_size_image`, banner.mobile.file, banner.mobile.name)
            }
        })

        // Debug: Log FormData contents
        console.log('FormData contents:')
        for (let pair of submitData.entries()) {
            console.log(pair[0], pair[1])
        }

        const res = await api.post('v1/admin/website-info/store', submitData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        })

        alert(res?.data?.message || 'Website information updated successfully!')
    } catch (err) {
        console.error('Error submitting form:', err)
        if (err.response?.status === 401) {
            alert('Session expired. Please login again.')
        } else {
            const msg = err?.response?.data?.message || 'Failed to update website information.'
            alert(msg)
        }
    } finally {
        isSubmitting.value = false
    }
}

</script>

<style scoped>
/* Styles remain the same */
.imgArea {
    border: 2px dashed #ddd;
    border-radius: 10px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.imgArea:hover {
    border-color: #007bff;
    background-color: #f8f9ff;
}

.imgArea.active {
    border-color: #ebebeb;
    background-color: #f8fff8;
}

.imgArea i {
    font-size: 3rem;
    color: #6c757d;
    margin-bottom: 1rem;
}

.imgArea h5 {
    color: #495057;
    margin-bottom: 0.5rem;
}

.imgArea p {
    color: #6c757d;
    font-size: 0.9rem;
}

.imgArea p span {
    font-weight: 600;
    color: #dc3545;
}

.uploaded-image {
    max-width: 100%;
    max-height: 150px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.selectImage {
    margin-top: 1rem;
    width: 100%;
}



/* Loading state */
.btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.btn:disabled:hover {
    transform: none;
}

.multiselect {
    width: 100%;
    border-radius: 6px;
    min-height: 38px;
}

.multiselect__tags {
    padding: 6px 8px;
}

.multiselect__input {
    min-height: 28px;
}
</style>