<template>
    <section id="selling-product" class="single-product mt-0 mt-md-3">
        <div class="container-fluid">
            <div class="row g-5">
                <!-- Image Gallery Section -->
                <div class="col-lg-7">
                    <div class="row flex-column-reverse flex-lg-row">
                        <div class="col-md-12 col-lg-2">
                            <div class="product-thumbnail-slider">
                                <div class="thumbnail-wrapper">
                                    <div v-for="(image, index) in productImages" :key="index" class="thumbnail-slide"
                                        :class="{ 'active': currentImageIndex === index }"
                                        @click="setActiveImage(index)">
                                        <img :src="image.src" :alt="image.alt" class="thumb-image img-fluid">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-10">
                            <div class="product-large-slider">
                                <div class="main-image-wrapper">
                                    <div class="main-image-slide">
                                        <div class="image-zoom" @mousemove="handleMouseMove"
                                            @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
                                            <img :src="productImages[currentImageIndex].src"
                                                :alt="productImages[currentImageIndex].alt"
                                                class="img-fluid main-product-image">
                                            <div v-if="isZooming" class="zoom-overlay" :style="zoomStyle"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="slider-navigation">
                                    <button @click="previousImage" class="nav-btn prev-btn"
                                        :disabled="currentImageIndex === 0">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button @click="nextImage" class="nav-btn next-btn"
                                        :disabled="currentImageIndex === productImages.length - 1">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div class="slider-pagination">
                                    <span v-for="(image, index) in productImages" :key="index" class="pagination-dot"
                                        :class="{ 'active': currentImageIndex === index }"
                                        @click="setActiveImage(index)"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product Info Section -->
                <div class="col-lg-5">
                    <div class="product-info">
                        <!-- Product Title & Rating -->
                        <div class="element-header">
                            <span class="badge rounded-pill bg-success text-white mb-2">In Stock</span>
                            <h2 itemprop="name" class="mb-2">Robusta | Dark Roast | 500 g</h2> 
                        </div>

                        <!-- Price Section - Show/Hide based on purchase type -->
                        <div v-if="selectedPurchaseType !== 'wholesale'" class="product-price py-3 border-top border-bottom">
                            <div class="d-flex align-items-center gap-3 mb-2">
                                <strong class="text-dark display-6 fw-bold">₹12,855</strong>
                                <del class="text-muted fs-5">₹21,000</del>
                                <span class="badge bg-danger2">-39%</span>
                            </div>
                            <p class="text-xs text-muted mb-0">All Rates are Excluded Tax</p>
                        </div>

                        <!-- Product Meta -->
                        <div class="product-meta py-3 border-bottom">
                            <div class="meta-item mb-2">
                                <strong>Category:</strong>
                                <a href="#" class="text-decoration-none">Bean Type</a>,
                                <a href="#" class="text-decoration-none">Roast Level</a>,
                                <a href="#" class="text-decoration-none">Grind Type</a>
                            </div>
                            <div class="meta-item mb-2">
                                <strong>Tags:</strong>
                                <a href="#" class="badge bg-light text-dark me-1">Robusta</a>
                                <a href="#" class="badge bg-light text-dark me-1">Dark Roast</a>
                                <a href="#" class="badge bg-light text-dark me-1">Premium</a>
                            </div>
                        </div>

                        <!-- Product Options -->
                        <div class="product-options mt-4">
                            
                            <div class="row">
                            <!-- Bean Type -->
                            <div class=" col-md-4 option-group mb-3">
                                <label class="form-label fw-semibold mb-2">Bean Type</label>
                                <select class="form-select" v-model="selectedBeanType">
                                    <option value="arabica">Arabica 100%</option>
                                    <option value="robusta">Robusta 100%</option>
                                    <option value="blend">Arabica-Robusta Blend</option>
                                </select>
                            </div>

                            <!-- Roast Level -->
                            <div class=" col-md-4 option-group mb-3">
                                <label class="form-label fw-semibold mb-2">Roast Level</label>
                                <select class="form-select" v-model="selectedRoast">
                                    <option value="light">Light Roast</option>
                                    <option value="medium">Medium Roast</option>
                                    <option value="dark">Dark Roast</option>
                                </select>
                            </div>

                            <!-- Grind Type -->
                            <div class=" col-md-4 option-group mb-3">
                                <label class="form-label fw-semibold mb-2">Grind Type</label>
                                <select class="form-select" v-model="selectedGrindType">
                                    <option value="whole">Whole Bean</option>
                                    <option value="fine">Fine</option>
                                    <option value="medium">Medium</option>
                                    <option value="coarse">Coarse</option>
                                </select>
                            </div>
                            </div>

                            <!-- Purchase Type -->
                            <div class="purchase-type mb-4">
                                <label class="form-label fw-semibold mb-2">Purchase Type</label>
                                <div class="d-flex gap-2">
                                    <input type="radio" class="btn-check" name="purchaseType" id="retail" 
                                        v-model="selectedPurchaseType" value="retail">
                                    <label class="btn btn-outline-danger px-4" for="retail">Retail</label>

                                    <input type="radio" class="btn-check" name="purchaseType" id="wholesale"
                                        v-model="selectedPurchaseType" value="wholesale">
                                    <label class="btn btn-outline-danger px-4" for="wholesale">Wholesale</label>

                                    <input type="radio" class="btn-check" name="purchaseType" id="sample"
                                        v-model="selectedPurchaseType" value="sample">
                                    <label class="btn btn-outline-danger px-4" for="sample">Sample</label>
                                </div>
                            </div>

                            <!-- Quantity -->
                            <div class="option-group mb-4">
                                <label class="form-label fw-semibold mb-2">Quantity</label>
                                <div class="d-flex align-items-center gap-3">
                                    <select class="form-select" v-model="selectedWeight" style="max-width: 150px;">
                                        <option value="250">250g</option>
                                        <option value="500">500g</option>
                                        <option value="1000">1 Kg</option>
                                        <option value="5000">5 Kg</option>
                                    </select>
                                    <div class="quantity-selector d-flex align-items-center border rounded">
                                        <button class="btn btn-sm px-3" @click="decreaseQuantity"
                                            :disabled="quantity <= 1">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <input type="number" class="form-control border-0 text-center"
                                            v-model.number="quantity" min="1" style="width: 60px;">
                                        <button class="btn btn-sm px-3" @click="increaseQuantity">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="cart-wrap mt-4">
                            <div class="product-quantity">
                                <div class="stock-button-wrap">
                                    <div class="qty-button d-flex flex-column flex-sm-row gap-3 w-100">
                                        <!-- Show Add to Cart for Retail/Sample -->
                                        <button v-if="selectedPurchaseType !== 'wholesale'" type="button"
                                            class="btn btn-dark btn-lg py-3 px-4 text-uppercase flex-fill"
                                            @click="addToCart">
                                            <i class="fas fa-shopping-cart me-2"></i>Add to cart
                                        </button>
                                        
                                        <!-- Show View Price for Wholesale -->
                                        <button v-else type="button"
                                            class="btn btn-primary btn-lg py-3 px-4 text-uppercase flex-fill"
                                            @click="openWholesaleModal">
                                            <i class="fas fa-eye me-2"></i>View Price
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="product-info-tabs py-5">
        <div class="container-fluid">
            <div class="row">
                <div class="d-flex flex-column flex-md-row align-items-start gap-5">
                    <div class="nav flex-row flex-wrap flex-md-column nav-pills me-3 col-lg-3" id="v-pills-tab"
                        role="tablist" aria-orientation="vertical">
                        <button class="nav-link text-start" :class="{ active: activeTab === 'description' }"
                            @click="setActiveTab('description')" type="button" role="tab">
                            Description
                        </button>
                        <button class="nav-link text-start" :class="{ active: activeTab === 'additional' }"
                            @click="setActiveTab('additional')" type="button" role="tab">
                            Additional Information
                        </button>
                    </div>
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade" :class="{ 'show active': activeTab === 'description' }"
                            v-if="activeTab === 'description'" role="tabpanel">
                            <h5>Product Description</h5>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat
                                mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper
                                suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam
                                porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices
                                nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique
                                cursus.</p>
                            <ul style="list-style-type:disc;" class="list-unstyled ps-4">
                                <li>Donec nec justo eget felis facilisis fermentum.</li>
                                <li>Suspendisse urna viverra non, semper suscipit pede.</li>
                                <li>Aliquam porttitor mauris sit amet orci.</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat
                                mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper
                                suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam
                                porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices
                                nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique
                                cursus. </p>
                        </div>
                        <div class="tab-pane fade" :class="{ 'show active': activeTab === 'additional' }"
                            v-if="activeTab === 'additional'" role="tabpanel">
                            <p>It is Comfortable and Best</p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Wholesale Modal -->
    <div class="modal fade" id="wholesaleModal" tabindex="-1" aria-labelledby="wholesaleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold" id="wholesaleModalLabel">Wholesale Price Request</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <!-- Info Message -->
            <div class="alert alert-info mb-4" role="alert">
              <i class="fas fa-info-circle me-2"></i>
              <strong>Please fill in your company details.</strong> We will review your information and send the wholesale price view confirmation to your email address.
            </div>

            <form @submit.prevent="submitWholesaleRequest">
              <!-- Personal Details Section -->
              <div class="mb-4">
                <h6 class="fw-bold mb-3 text-primary">Personal Details</h6>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="firstName" class="form-label">First Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="firstName" v-model="wholesaleForm.firstName" required>
                  </div>
                  <div class="col-md-6">
                    <label for="lastName" class="form-label">Last Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="lastName" v-model="wholesaleForm.lastName" required>
                  </div>
                  <div class="col-md-6">
                    <label for="email" class="form-label">Email Address <span class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="email" v-model="wholesaleForm.email" required>
                  </div>
                  <div class="col-md-6">
                    <label for="phone" class="form-label">Phone Number <span class="text-danger">*</span></label>
                    <input type="tel" class="form-control" id="phone" v-model="wholesaleForm.phone" required>
                  </div>
                </div>
              </div>

              <!-- Company Details Section -->
              <div class="mb-4">
                <h6 class="fw-bold mb-3 text-primary">Company Details</h6>
                <div class="row g-3">
                  <div class="col-md-12">
                    <label for="companyName" class="form-label">Company Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="companyName" v-model="wholesaleForm.companyName" required>
                  </div>
                  <div class="col-md-6">
                    <label for="businessType" class="form-label">Business Type <span class="text-danger">*</span></label>
                    <select class="form-select" id="businessType" v-model="wholesaleForm.businessType" required>
                      <option value="">Select Business Type</option>
                      <option value="retailer">Retailer</option>
                      <option value="distributor">Distributor</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="gstNumber" class="form-label">GST Number</label>
                    <input type="text" class="form-control" id="gstNumber" v-model="wholesaleForm.gstNumber">
                  </div>
                  <div class="col-md-12">
                    <label for="address" class="form-label">Company Address <span class="text-danger">*</span></label>
                    <textarea class="form-control" id="address" rows="2" v-model="wholesaleForm.address" required></textarea>
                  </div>
                  <div class="col-md-6">
                    <label for="city" class="form-label">City <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="city" v-model="wholesaleForm.city" required>
                  </div>
                  <div class="col-md-6">
                    <label for="state" class="form-label">State <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="state" v-model="wholesaleForm.state" required>
                  </div>
                  <div class="col-md-6">
                    <label for="pincode" class="form-label">Pincode <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="pincode" v-model="wholesaleForm.pincode" required>
                  </div>
                  <div class="col-md-12">
                    <label for="additionalInfo" class="form-label">Additional Information</label>
                    <textarea class="form-control" id="additionalInfo" rows="3" v-model="wholesaleForm.additionalInfo" placeholder="Tell us about your wholesale requirements..."></textarea>
                  </div>
                </div>
              </div>

              <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary px-4">
                  <i class="fas fa-paper-plane me-2"></i> Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from "bootstrap"

import product1 from '@/assets/website/img/product/1.jpg'
import product2 from '@/assets/website/img/product/2.jpg'
import product3 from '@/assets/website/img/product/3.jpg'
import product4 from '@/assets/website/img/product/4.jpg'
import product5 from '@/assets/website/img/product/5.jpg'

defineOptions({
    name: 'ProductPage'
})

// Reactive data
const currentImageIndex = ref(0)
const activeTab = ref('description')
const isZooming = ref(false)
const zoomStyle = ref({})

// Product options
const selectedPurchaseType = ref('retail')
const selectedBeanType = ref('robusta')
const selectedRoast = ref('dark')
const selectedGrindType = ref('whole')
const selectedWeight = ref('500')
const quantity = ref(1)

// Modal reference
let wholesaleModalInstance = null

// Wholesale form data
const wholesaleForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  businessType: '',
  gstNumber: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  additionalInfo: ''
})

// Product images data
const productImages = ref([
    { src: product1, alt: 'Product Image 1' },
    { src: product2, alt: 'Product Image 2' },
    { src: product3, alt: 'Product Image 3' },
    { src: product4, alt: 'Product Image 4' },
    { src: product5, alt: 'Product Image 5' }
])

// Reviews data
const reviews = ref([
    {
        id: 1,
        name: 'Rajesh Kumar',
        rating: 5,
        date: 'Jan 15, 2026',
        comment: 'Excellent quality coffee! The dark roast is perfect for my morning espresso. Rich flavor with no bitterness.',
        helpful: 12
    },
    {
        id: 2,
        name: 'Priya Sharma',
        rating: 4,
        date: 'Jan 10, 2026',
        comment: 'Very good coffee, strong and aromatic. Delivery was quick and packaging was excellent.',
        helpful: 8
    },
    {
        id: 3,
        name: 'Amit Patel',
        rating: 5,
        date: 'Jan 5, 2026',
        comment: 'Best Robusta I have tried! The quality is consistent and the price is reasonable for wholesale orders.',
        helpful: 15
    }
])

const newReview = ref({
    rating: 0,
    name: '',
    comment: ''
})

// Related products
const relatedProducts = ref([
    { id: 1, name: 'Arabica Medium Roast', price: 899, originalPrice: 1200, image: product2 },
    { id: 2, name: 'Arabica Light Roast', price: 749, originalPrice: 999, image: product3 },
    { id: 3, name: 'Premium Blend', price: 649, originalPrice: 850, image: product4 },
    { id: 4, name: 'Espresso Blend', price: 799, originalPrice: 1050, image: product5 }
])

// Image switching methods
const setActiveImage = (index) => {
    currentImageIndex.value = index
}

const nextImage = () => {
    if (currentImageIndex.value < productImages.value.length - 1) {
        currentImageIndex.value++
    }
}

const previousImage = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--
    }
}

// Quantity methods
const increaseQuantity = () => {
    quantity.value++
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

// Tab methods
const setActiveTab = (tab) => {
    activeTab.value = tab
}

// Zoom functionality
const handleMouseEnter = () => {
    isZooming.value = true
}

const handleMouseLeave = () => {
    isZooming.value = false
}

const handleMouseMove = (event) => {
    if (!isZooming.value) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    zoomStyle.value = {
        backgroundImage: `url(${productImages.value[currentImageIndex.value].src})`,
        backgroundPosition: `${x}% ${y}%`,
        backgroundSize: '250%',
        display: 'block'
    }
}

// Review methods
const getStarPercentage = (star) => {
    const percentages = { 5: 65, 4: 20, 3: 10, 2: 3, 1: 2 }
    return percentages[star] || 0
}

const getStarCount = (star) => {
    const counts = { 5: 83, 4: 26, 3: 13, 2: 4, 1: 2 }
    return counts[star] || 0
}

const submitReview = () => {
    if (newReview.value.rating === 0) {
        alert('Please select a rating')
        return
    }

    reviews.value.unshift({
        id: reviews.value.length + 1,
        name: newReview.value.name,
        rating: newReview.value.rating,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        comment: newReview.value.comment,
        helpful: 0
    })

    // Reset form
    newReview.value = { rating: 0, name: '', comment: '' }
    alert('Thank you for your review!')
}

// Cart and purchase methods
const addToCart = () => {
    const cartItem = {
        purchaseType: selectedPurchaseType.value,
        beanType: selectedBeanType.value,
        roast: selectedRoast.value,
        grind: selectedGrindType.value,
        weight: selectedWeight.value,
        quantity: quantity.value
    }
    console.log('Adding to cart:', cartItem)
    alert(`Added ${quantity.value} item(s) to cart!`)
}

const buyNow = () => {
    console.log('Buy now:', quantity.value)
    alert(`Proceeding to checkout with ${quantity.value} item(s)`)
}

const addToWishlist = () => {
    alert('Added to wishlist!')
}

const shareProduct = () => {
    if (navigator.share) {
        navigator.share({
            title: 'Robusta Dark Roast Coffee',
            text: 'Check out this amazing coffee!',
            url: window.location.href
        })
    } else {
        alert('Share functionality not supported on this browser')
    }
}

// Open wholesale modal
const openWholesaleModal = () => {
  if (wholesaleModalInstance) {
    wholesaleModalInstance.show()
  }
}

// Submit wholesale request
const submitWholesaleRequest = () => {
  console.log('Wholesale request submitted:', wholesaleForm.value)
  
  // Here you would typically send this data to your backend
  // For now, just show a success message and close the modal
  alert('Thank you! Your wholesale request has been submitted. We will send pricing details to your email shortly.')
  
  // Reset form
  wholesaleForm.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    businessType: '',
    gstNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    additionalInfo: ''
  }
  
  // Close modal
  if (wholesaleModalInstance) {
    wholesaleModalInstance.hide()
  }
}

onMounted(() => {
  // Initialize the modal
  const modalElement = document.getElementById('wholesaleModal')
  if (modalElement) {
    wholesaleModalInstance = new Modal(modalElement)
  }
})
</script>

<style scoped>
/* Thumbnail styles */
.product-thumbnail-slider .thumbnail-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.thumbnail-slide {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    transition: border-color 0.3s ease;
}

.thumbnail-slide:hover,
.thumbnail-slide.active {
    border-color: #007bff;
}

.thumb-image {
    width: 100%;
    height: 80px;
    object-fit: cover;
}

/* Main image slider styles */
.product-large-slider {
    position: relative;
}

.main-image-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
}

.main-product-image {
    width: 100%;
    height: 500px;
    object-fit: cover;
    cursor: zoom-in;
}

/* Image zoom styles */
.image-zoom {
    position: relative;
    overflow: hidden;
}

.zoom-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    pointer-events: none;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(1px);
}

/* Navigation styles */
.slider-navigation {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

.nav-btn {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-btn:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.9);
}

.nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Pagination styles */
.slider-pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 15px;
}

.pagination-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ddd;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.pagination-dot.active,
.pagination-dot:hover {
    background-color: #007bff;
}

/* Quantity selector */
.quantity-selector input::-webkit-inner-spin-button,
.quantity-selector input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.quantity-selector input[type=number] {
    -moz-appearance: textfield;
}

/* Tab styles */
.nav-pills .nav-link {
    border-radius: 8px;
    padding: 12px 20px;
    margin-bottom: 8px;
    color: #666;
    transition: all 0.3s ease;
}

.nav-pills .nav-link:hover {
    background-color: #f8f9fa;
}

.nav-pills .nav-link.active {
    background-color: #212529;
    color: white;
}

/* Star rating */
.star-rating i {
    cursor: pointer;
    transition: color 0.2s ease;
}

.star-rating i:hover {
    color: #ffc107 !important;
}

.cursor-pointer {
    cursor: pointer;
}

/* Review card */
.review-item:last-child {
    border-bottom: none !important;
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
}

/* Product card hover effect */
.related-products .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.related-products .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Feature items */
.feature-item {
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
}

/* Modal Styling */
.modal-content {
  border-radius: 15px;
  border: none;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 1.5rem 1.5rem 0.5rem;
}

.alert-info {
  background-color: #e7f3ff;
  border-color: #b3d9ff;
  color: #004085;
  border-radius: 10px;
}

.form-label {
  font-weight: 500;
  font-size: 0.9rem;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-control, .form-select {
  border-radius: 8px;
  border: 1px solid #ced4da;
  padding: 0.6rem 0.75rem;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus, .form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.1);
}

.text-primary {
  color: #0d6efd !important;
}

.btn-primary {
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-weight: 500;
}

.btn-secondary {
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-weight: 500;
}

/* Responsive styles */
@media (max-width: 992px) {
    .product-thumbnail-slider {
        display: none;
    }

    .nav-pills {
        flex-direction: row !important;
    }
}

@media (max-width: 768px) {
    .thumbnail-wrapper {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 10px;
    }

    .product-thumbnail-slider {
        display: none;
    }

    .thumb-image {
        min-width: 60px;
        height: 60px;
    }

    .main-product-image {
        height: 350px;
    }

    .nav-btn {
        width: 35px;
        height: 35px;
    }

    .display-6 {
        font-size: 2rem;
    }
}
</style>