<template>
  <div class="home-page">

    <!-- Hero Carousel with Parallax -->
    <section class="hero-carousel-section" style="background-color: #FFFFFF;">
      <div class="conta iner px-3 px-md-4">
        <div class="row">
          <div class="col-md-12">
            <!-- Responsive Carousel Slider with fade animation -->
            <div id="homeCarousel" class="carousel slide carousel-fade banner-ad large"  
                 style="background: none; padding: 0;">
              <div class="carousel-inner" style="border-radius: 1rem; overflow: hidden; min-height: 500px; max-height: 600px;">
                <div class="carousel-item active" data-bs-interval="5000">
                  <picture>
                    <source media="(max-width: 576px)" srcset="@/assets/website/img/banner/m-1.jpg">
                    <source media="(max-width: 992px)" srcset="@/assets/website/img/banner/m-1.jpg">
                    <img src="@/assets/website/img/banner/1.jpg" class="d-block w-100 carousel-image" alt="Banner 1"
                      loading="eager" decoding="async">
                  </picture> 
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                  <picture>
                    <source media="(max-width: 576px)" srcset="@/assets/website/img/banner/m-2.jpg">
                    <source media="(max-width: 992px)" srcset="@/assets/website/img/banner/m-2.jpg">
                    <img src="@/assets/website/img/banner/2.jpg" class="d-block w-100 carousel-image" alt="Banner 2"
                      loading="lazy" decoding="async">
                  </picture>
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                  <picture>
                    <source media="(max-width: 576px)" srcset="@/assets/website/img/banner/m-3.jpg">
                    <source media="(max-width: 992px)" srcset="@/assets/website/img/banner/m-3.jpg">
                    <img src="@/assets/website/img/banner/3.jpg" class="d-block w-100 carousel-image" alt="Banner 3"
                      loading="lazy" decoding="async">
                  </picture>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section with Scroll Animations -->
    <section class="about-section py-5 scroll-reveal" style="background-color: #FFFFFF;">
      <div class="container">
        <div class="row align-items-center">

          <div class="col-lg-6 mb-5 mb-lg-0 reveal-left">
            <div class="position-relative image-hover-zoom">
              <img src="@/assets/website/img/banner/1.33.jpg" alt="Wayanad Landscapes" loading="lazy" decoding="async"
                class="img-fluid rounded-4 shadow">

              <div class="quote-card position-absolute bg-white p-4 shadow rounded-3 border-top border-success border-4 float-in">
                <h5 class="fw-bolder text-success mb-1">"Quality is our heritage."</h5>
                <p class="fst-italic mb-0">- Denny P Joseph, Founder</p>
              </div>
            </div>
          </div>

          <div class="col-lg-5 offset-lg-1 reveal-right">
            <h6 class="text-uppercase ls-wide mb-2 fade-in" style="letter-spacing: 2px;">About Us</h6>
            <h2 class="display-5 fw-bolder mb-4 serif-font slide-in">Rooted in Tradition,<br>Aiming for the Future</h2>
            <hr class="border-brown border-3 opacity-100 mb-4 line-expand" style="width: 50px;">
            <p class="text-muted mb-4 fade-in-delayed">
              Established in 2013 with its headquarters in the lush landscapes of Wayanad, Kerala, Dennys Group has
              grown from a local visionary project into a diversified conglomerate.
            </p>
            <p class="text-muted mb-5 fade-in-delayed-2">
              Our journey began with a simple promise: to bring the authentic quality of Kerala's spices and coffee to
              the world, while maintaining transparency and fair value for our farmers.
            </p>

            <router-link to="/about" class="text-decoration-none fw-bold text-brown hover-arrow">
              Read our full story <span class="ms-2 arrow">→</span>
            </router-link>
          </div>

        </div>
      </div>
    </section>

    <!-- Stats Section with Counter Animation -->
    <section class="stats-section py-5 text-white scroll-reveal" 
             style="background: linear-gradient(135deg, #5F7A3E 0%, #4A6B35 100%);">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 col-6 mb-4 mb-md-0">
            <div class="stat-box reveal-scale">
              <h2 class="display-4 fw-black counter text-white" data-target="25">0</h2>
              <p class="stat-label">Years Experience</p>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4 mb-md-0">
            <div class="stat-box reveal-scale" style="animation-delay: 0.1s">
              <h2 class="display-4 fw-black counter text-white" data-target="2013">0</h2>
              <p class="stat-label">Established</p>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="stat-box reveal-scale" style="animation-delay: 0.2s">
              <h2 class="display-4 fw-black counter text-white" data-target="5">0</h2>
              <p class="stat-label">Business Verticals</p>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="stat-box reveal-scale" style="animation-delay: 0.3s">
              <h2 class="display-4 fw-black counter text-white" data-target="10">0</h2>
              <p class="stat-label">Export Markets</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Section with Reveal -->
    <section class="video-section py-5 scroll-reveal" style="background-color: #FAF7F2;">
      <div class="conta iner px-3 px-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="position-relative rounded-4 overflow-hidden shadow-lg">
              <video class="w-100 d-block" controls autoplay muted loop poster="@/assets/website/img/banner/1.jpg">
                <source src="@/assets/website/video/1.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Business Verticals Section with Stagger Animation -->
    <section class="py-5 business-verticals-section scroll-reveal" style="background-color: #FFFFFF;">
      <div class="container">

        <!-- Header with Fade In -->
        <div class="text-center mb-5 reveal-fade">
          <p class="verticals-eyebrow">DIVERSE EXCELLENCE</p>
          <h2 class="verticals-title">Our Business Verticals</h2>
          <div class="verticals-divider"></div>
        </div>

        <!-- Grid with Stagger Animation -->
        <div class="row g-4">

          <!-- Card 1: Coffee & Spices -->
          <div class="col-lg-4 col-md-6">
            <div class="vertical-card card-hover-lift reveal-card" style="animation-delay: 0.1s">
              <div class="vertical-card-top">
                <div class="vertical-icon-wrap icon-bounce">
                  <Coffee :size="24" />
                </div>
                <Coffee class="vertical-card-bg-icon" :size="110" />
              </div>
              <h3 class="vertical-card-title">Coffee &amp; Spices</h3>
              <p class="vertical-card-desc">Authentic Wayanad Arabica coffee and premium hill spices. We handle hulling,
                grading, and roasting in-house to ensure perfection.</p>
              <a href="#" class="vertical-card-link">Explore Division <span class="arrow-slide">→</span></a>
            </div>
          </div>

          <!-- Card 2: Flour Mill -->
          <div class="col-lg-4 col-md-6">
            <div class="vertical-card card-hover-lift reveal-card" style="animation-delay: 0.2s">
              <div class="vertical-card-top">
                <div class="vertical-icon-wrap icon-bounce">
                  <Factory :size="24" />
                </div>
                <Factory class="vertical-card-bg-icon" :size="110" />
              </div>
              <h3 class="vertical-card-title">Flour Mill</h3>
              <p class="vertical-card-desc">State-of-the-art 304-grade stainless steel machinery producing hygienic,
                high-quality powder-based food products.</p>
              <a href="#" class="vertical-card-link">View Manufacturing <span class="arrow-slide">→</span></a>
            </div>
          </div>

          <!-- Card 3: Fly4Tour -->
          <div class="col-lg-4 col-md-6">
            <div class="vertical-card card-hover-lift reveal-card" style="animation-delay: 0.3s">
              <div class="vertical-card-top">
                <div class="vertical-icon-wrap icon-bounce">
                  <Plane :size="24" />
                </div>
                <Plane class="vertical-card-bg-icon" :size="110" />
              </div>
              <h3 class="vertical-card-title">Fly4Tour</h3>
              <p class="vertical-card-desc">Curated international travel experiences focusing on Singapore and Malaysia.
                We turn journeys into memories.</p>
              <a href="#" class="vertical-card-link">Discover Travel <span class="arrow-slide">→</span></a>
            </div>
          </div>

          <!-- Card 4: Fly4Study -->
          <div class="col-lg-4 col-md-6">
            <div class="vertical-card card-hover-lift reveal-card" style="animation-delay: 0.4s">
              <div class="vertical-card-top">
                <div class="vertical-icon-wrap icon-bounce">
                  <GraduationCap :size="24" />
                </div>
                <GraduationCap class="vertical-card-bg-icon" :size="110" />
              </div>
              <h3 class="vertical-card-title">Fly4Study</h3>
              <p class="vertical-card-desc">Guiding students toward academic futures in Germany and Singapore with
                comprehensive admission and documentation support.</p>
              <a href="#" class="vertical-card-link">Education Services <span class="arrow-slide">→</span></a>
            </div>
          </div>

          <!-- Card 5: Visit Our Hubs -->
          <div class="col-lg-8 col-md-6">
            <div class="vertical-card vertical-card-hub card-hover-lift reveal-card" style="animation-delay: 0.5s">
              <div class="vertical-hub-content">
                <h3 class="text-white">Dennys Spice Hub & Cafe</h3>
                <p class="vertical-hub-desc">Experience our products firsthand at our retail outlets. Taste authentic
                  Wayanad Filter Coffee and shop for premium spices directly from the source.</p>
                <a href="#" class="vertical-hub-btn mt-auto pulse-on-hover">Visit Our Hubs</a>
              </div>
              <div class="vertical-hub-image">
                <img src="@/assets/website/img/banner/1.34.jpeg" loading="lazy" decoding="async" alt="Our Hubs" class="image-zoom-hover"/>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Testimonials with Fade Transition -->
    <section class="testimonials-section">
      <div class="testimonials-bg"></div>
      <div class="testimonials-overlay"></div>

      <div class="container position-relative">
        <div class="row justify-content-center">
          <div class="col-lg-8">

            <!-- Quote Icon -->
            <div class="testimonial-quote-icon fade-in">❝</div>

            <!-- Testimonial Text with Fade Transition -->
            <transition name="testimonial-fade" mode="out-in">
              <div :key="activeTestimonial" class="testimonial-content">
                <p class="testimonial-text">
                  {{ testimonials[activeTestimonial].quote }}
                </p>

                <!-- Author Info -->
                <div class="testimonial-author">
                  <img :src="testimonials[activeTestimonial].avatar" :alt="testimonials[activeTestimonial].name"
                    loading="lazy" decoding="async" class="author-avatar" />
                  <div class="author-details">
                    <h4 class="author-name">{{ testimonials[activeTestimonial].name }}</h4>
                    <p class="author-subtitle">{{ testimonials[activeTestimonial].role }}</p>
                  </div>
                </div>
              </div>
            </transition>

            <!-- Carousel Dots -->
            <div class="testimonial-dots">
              <button v-for="(item, index) in testimonials" :key="index"
                :class="['dot', { active: index === activeTestimonial }]" @click="activeTestimonial = index"
                :aria-label="`View testimonial ${index + 1}`"></button>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section with Pulse Animation -->
    <section class="cta-section py-5 text-white scroll-reveal" 
             style="background: linear-gradient(135deg, #4A2C2A 0%, #6B4423 100%);">
      <div class="container text-center">
        <h2 class="display-5 fw-bolder mb-4 reveal-fade text-white">Start Your Journey with Dennys Group</h2>
        <p class="lead mb-4 reveal-fade" style="animation-delay: 0.1s">Whether you're looking for premium coffee, international travel, or global education</p>
        <div class="cta-buttons d-flex gap-3 justify-content-center flex-wrap reveal-fade" style="animation-delay: 0.2s">
          <a href="/contact" class="btn btn-light btn-lg button-pop">Contact Us</a> 
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Coffee, Plane, GraduationCap, Factory } from 'lucide-vue-next'

import { Carousel } from 'bootstrap'

// Testimonials Data
const activeTestimonial = ref(0)
const testimonials = ref([
  {
    quote: "Working with Dennys Group has been transformative for our business. Their commitment to quality and transparency is unmatched in the industry. Every interaction reinforces why they're leaders in sustainable agriculture.",
    name: "Sarah Mitchell",
    role: "CEO, Green Valley Exports",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    quote: "The team at Dennys Group doesn't just deliver products—they deliver peace of mind. Their meticulous attention to detail and dedication to ethical sourcing make them our preferred partner.",
    name: "Rajesh Kumar",
    role: "Director, Spice Trade Alliance",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    quote: "From our first meeting to ongoing collaboration, Dennys Group has exceeded expectations. Their innovative approach to traditional products sets them apart in a crowded market.",
    name: "Emma Thompson",
    role: "Founder, Organic Foods Co.",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
])

// 2. Reference for the Bootstrap instance
let bsCarousel = null 

onMounted(() => {
  // 3. Manually initialize the carousel
  const carouselEl = document.getElementById('homeCarousel')
  if (carouselEl) {
    bsCarousel = new Carousel(carouselEl, {
      interval: 5000,
      ride: 'carousel',
      pause: 'hover'
    })
  }

  setupScrollAnimations()
  setupCounterAnimations()
  
  testimonialInterval = setInterval(() => {
    activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.value.length
  }, 6000)
})

// Auto-rotate testimonials
let testimonialInterval
onMounted(() => {
  // Scroll reveal animations
  setupScrollAnimations()
  
  // Counter animations
  setupCounterAnimations()
  
  // Auto-rotate testimonials every 6 seconds
  testimonialInterval = setInterval(() => {
    activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.value.length
  }, 6000)
})

onUnmounted(() => {

  // 4. Clean up the carousel instance and intervals
  if (bsCarousel) {
    bsCarousel.dispose()
  }

  if (testimonialInterval) {
    clearInterval(testimonialInterval)
  }
})

// Scroll Animation Setup
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  // Observe all elements with scroll-reveal class
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el)
  })

  // Observe individual reveal elements
  document.querySelectorAll('.reveal-left, .reveal-right, .reveal-fade, .reveal-scale, .reveal-card').forEach(el => {
    observer.observe(el)
  })
}

// Counter Animation
function setupCounterAnimations() {
  const counterElements = document.querySelectorAll('.counter')
  
  const observerOptions = {
    threshold: 0.5
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target)
        entry.target.classList.add('counted')
      }
    })
  }, observerOptions)

  counterElements.forEach(counter => {
    observer.observe(counter)
  })
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'))
  const duration = 2000 // 2 seconds
  const increment = target / (duration / 16) // 60fps
  let current = 0

  const updateCounter = () => {
    current += increment
    if (current < target) {
      element.textContent = Math.floor(current) + (target > 100 ? '' : '+')
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + (target > 100 ? '' : '+')
    }
  }

  updateCounter()
}
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   CAROUSEL ANIMATIONS
   ═══════════════════════════════════════════════════════ */

/* Fade transition for carousel */
.carousel-fade .carousel-item {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.carousel-fade .carousel-item.active {
  opacity: 1;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 8s ease-out;
}

.carousel-item.active .carousel-image {
  transform: scale(1.05); /* Ken Burns effect */
}

/* Carousel Caption Animation */
.carousel-caption-custom {
  position: absolute;
  bottom: 20%;
  left: 10%;
  text-align: left;
  color: white;
  text-shadow: 0 2px 10px rgba(0,0,0,0.7);
}

.slide-in-left {
  animation: slideInLeft 1s ease-out;
}

.slide-in-right {
  animation: slideInRight 1s ease-out 0.3s backwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL ANIMATIONS
   ═══════════════════════════════════════════════════════ */

.reveal-left,
.reveal-right,
.reveal-fade,
.reveal-scale,
.reveal-card {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-left {
  transform: translateX(-50px);
}

.reveal-left.visible {
  opacity: 1;
  transform: translateX(0);
}

.reveal-right {
  transform: translateX(50px);
}

.reveal-right.visible {
  opacity: 1;
  transform: translateX(0);
}

.reveal-fade {
  transform: translateY(30px);
}

.reveal-fade.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-scale {
  transform: scale(0.9);
}

.reveal-scale.visible {
  opacity: 1;
  transform: scale(1);
}

.reveal-card {
  transform: translateY(40px);
}

.reveal-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ═══════════════════════════════════════════════════════════
   IMAGE HOVER EFFECTS
   ═══════════════════════════════════════════════════════ */

.image-hover-zoom img {
  transition: transform 0.6s ease;
}

.image-hover-zoom:hover img {
  transform: scale(1.05);
}

.image-zoom-hover {
  transition: transform 0.6s ease;
}

.image-zoom-hover:hover {
  transform: scale(1.1);
}

/* ═══════════════════════════════════════════════════════════
   QUOTE CARD FLOAT ANIMATION
   ═══════════════════════════════════════════════════════ */

.quote-card {
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 90%;
  animation: float 3s ease-in-out infinite;
}

@media (min-width: 992px) {
  .quote-card {
    left: auto;
    right: -40px;
    transform: none;
    max-width: 320px;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* ═══════════════════════════════════════════════════════════
   HOVER ARROW ANIMATION
   ═══════════════════════════════════════════════════════ */

.hover-arrow .arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}

.hover-arrow:hover .arrow {
  transform: translateX(8px);
}

/* ═══════════════════════════════════════════════════════════
   LINE EXPAND ANIMATION
   ═══════════════════════════════════════════════════════ */

.line-expand {
  width: 0 !important;
  transition: width 1s ease 0.3s;
}

.reveal-right.visible .line-expand {
  width: 50px !important;
}

/* ═══════════════════════════════════════════════════════════
   STATS COUNTER STYLES
   ═══════════════════════════════════════════════════════ */

.stat-box {
  transition: transform 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-10px);
}

.counter {
  transition: color 0.3s ease;
}

.stat-label {
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.stat-box:hover .stat-label {
  opacity: 1;
}

/* ═══════════════════════════════════════════════════════════
   VIDEO REVEAL ANIMATION
   ═══════════════════════════════════════════════════════ */

.video-reveal {
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.8s ease;
}

.scroll-reveal.visible .video-reveal {
  opacity: 1;
  transform: scale(1);
}

/* ═══════════════════════════════════════════════════════════
   BUSINESS CARDS ANIMATIONS
   ═══════════════════════════════════════════════════════ */

.card-hover-lift {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover-lift:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
}

/* Icon Bounce on Hover */
.icon-bounce {
  transition: transform 0.3s ease;
}

.vertical-card:hover .icon-bounce {
  animation: iconBounce 0.6s ease;
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-10px); }
  50% { transform: translateY(-5px); }
  75% { transform: translateY(-8px); }
}

/* Arrow Slide Animation */
.arrow-slide {
  display: inline-block;
  transition: transform 0.3s ease;
}

.vertical-card-link:hover .arrow-slide {
  transform: translateX(5px);
}

/* Pulse on Hover for Hub Button */
.pulse-on-hover {
  transition: all 0.3s ease;
}

.pulse-on-hover:hover {
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIAL FADE TRANSITION
   ═══════════════════════════════════════════════════════ */

.testimonial-fade-enter-active,
.testimonial-fade-leave-active {
  transition: all 0.5s ease;
}

.testimonial-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.testimonial-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.testimonial-content {
  min-height: 300px;
}

/* ═══════════════════════════════════════════════════════════
   CTA BUTTON ANIMATIONS
   ═══════════════════════════════════════════════════════ */

.button-pop {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.button-pop::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.button-pop:hover::before {
  width: 300px;
  height: 300px;
}

.button-pop:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* ═══════════════════════════════════════════════════════════
   EXISTING STYLES (Keep all your original styles)
   ═══════════════════════════════════════════════════════ */

/* Quote Card Base Styles */
@media (max-width: 991.98px) {
  .quote-card {
    position: relative !important;
    transform: none !important;
    left: 0 !important;
    margin: -40px auto 0;
  }
}

/* Business Verticals */
.business-verticals-section .verticals-eyebrow {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #6b4c3b;
  margin-bottom: 8px;
}

.verticals-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.verticals-divider {
  width: 50px;
  height: 3px;
  background: #3a6b45;
  margin: 0 auto;
  border-radius: 2px;
}

.vertical-card {
  background: #FAF7F2;
  border: 1px solid #e8e4df;
  border-radius: 16px;
  padding: 28px 24px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.vertical-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
  position: relative;
}

.vertical-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #eef5ef;
  color: #3a6b45;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
}

.vertical-card-bg-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 110px;
  height: 110px;
  color: #e8e4df;
  pointer-events: none;
  z-index: 0;
}

.vertical-card-title {
  font-size: 1.18rem;
  font-weight: 700;
  color: #3a6b45;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}

.vertical-card-desc {
  font-size: 0.88rem;
  color: #6c757d;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
}

.vertical-card-link {
  font-size: 0.85rem;
  font-weight: 700;
  color: #6b4c3b;
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
  z-index: 1;
}

.vertical-card-link:hover {
  color: #3a6b45;
}

/* Hub Banner Card */
.vertical-card-hub {
  background: #2e5339;
  border-color: #2e5339;
  padding: 0;
  flex-direction: row;
  min-height: 240px;
}

.vertical-hub-content {
  flex: 1;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
}

.vertical-hub-desc {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.65;
  margin: 16px 0 24px;
}

.vertical-hub-btn {
  display: inline-block;
  width: fit-content;
  background: #fff;
  color: #2e5339;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 10px 22px;
  border-radius: 8px;
  text-decoration: none;
}

.vertical-hub-image {
  width: 280px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 0 16px 16px 0;
}

.vertical-hub-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 991px) {
  .vertical-card-hub {
    flex-direction: column;
  }

  .vertical-hub-image {
    width: 100%;
    height: 200px;
    border-radius: 0 0 16px 16px;
    order: 2;
  }

  .vertical-hub-content {
    order: 1;
  }
}

/* Testimonials Section */
.testimonials-section {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  padding: 80px 20px;
  overflow: hidden;
}

.testimonials-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/website/img/banner/1.34.jpeg');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.testimonials-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  z-index: 2;
}

.container {
  z-index: 3;
}

.testimonial-quote-icon {
  font-size: 4rem;
  color: #f5a623;
  line-height: 1;
  margin-bottom: 20px;
  font-family: Georgia, serif;
}

.testimonial-text {
  font-size: 1.15rem;
  color: #fff;
  line-height: 1.8;
  margin-bottom: 32px;
  max-width: 700px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid #f5a623;
  object-fit: cover;
}

.author-details {
  text-align: left;
}

.author-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f5a623;
  margin: 0 0 2px;
}

.author-subtitle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.testimonial-dots {
  display: flex;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.dot.active {
  background: #f5a623;
  transform: scale(1.2);
}

.dot:hover {
  background: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .testimonials-section {
    padding: 60px 20px;
    min-height: 400px;
  }

  .testimonial-text {
    font-size: 1rem;
  }

  .testimonial-quote-icon {
    font-size: 3rem;
  }

  .verticals-title {
    font-size: 1.7rem;
  }

  .vertical-card {
    padding: 22px 18px 20px;
  }

  .vertical-hub-content {
    padding: 24px 20px;
  }
}

/* Fade In Animations - Initial State */
.fade-in,
.fade-in-delayed,
.fade-in-delayed-2 {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.fade-in-delayed {
  transition-delay: 0.2s;
}

.fade-in-delayed-2 {
  transition-delay: 0.4s;
}

.reveal-right.visible .fade-in,
.reveal-right.visible .fade-in-delayed,
.reveal-right.visible .fade-in-delayed-2,
.reveal-left.visible .fade-in {
  opacity: 1;
  transform: translateY(0);
}

.slide-in {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s ease;
}

.reveal-right.visible .slide-in {
  opacity: 1;
  transform: translateX(0);
}
</style>