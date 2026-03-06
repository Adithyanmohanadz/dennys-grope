<template>
  <div class="fly4tour-page">
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-parallax"></div>
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="hero-badge">International Travel</div>
            <h1 class="hero-title">Turn Your Journey<br/>Into Memories</h1>
            <p class="hero-subtitle">
              Curated travel experiences to Singapore and Malaysia. 
              Professional planning, seamless execution, unforgettable moments.
            </p>
            <div class="hero-cta-group">
              <a href="#destinations" class="btn-primary">Explore Destinations</a>
              <a href="#" class="btn-secondary">Plan Your Trip</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Floating Travel Elements -->
      <div class="float-element plane">✈️</div>
      <div class="float-element compass">🧭</div>
      <div class="float-element camera">📸</div>
    </section>

    <!-- Destinations Section -->
    <section id="destinations" class="destinations-section">
      <div class="container">
        <div class="text-center mb-5">
          <span class="section-eyebrow">Our Destinations</span>
          <h2 class="section-title">Where We Take You</h2>
          <div class="title-divider"></div>
          <p class="section-desc">
            Specialized itineraries crafted for the modern traveler
          </p>
        </div>

        <div class="row g-4">
          
          <!-- Singapore -->
          <div class="col-lg-6">
            <div class="destination-card singapore">
              <div class="dest-image">
                <img src="@/assets/website/img/banner/1.33.jpg" alt="Singapore"/>
                <div class="dest-badge">Most Popular</div>
              </div>
              <div class="dest-content">
                <h3>Singapore</h3>
                <p class="dest-tagline">The Lion City • Where Tradition Meets Tomorrow</p>
                <p class="dest-description">
                  Experience the perfect blend of futuristic skyline, multicultural neighborhoods, 
                  world-class dining, and tropical garden escapes.
                </p>
                
                <div class="dest-highlights">
                  <div class="highlight-item"> 
                    <span>Marina Bay & Gardens</span>
                  </div>
                  <div class="highlight-item"> 
                    <span>Hawker Food Tours</span>
                  </div>
                  <div class="highlight-item"> 
                    <span>Sentosa Island</span>
                  </div>
                  <div class="highlight-item"> 
                    <span>Cultural Districts</span>
                  </div>
                </div>
                
                <a href="#" class="btn-dest">View Singapore Packages →</a>
              </div>
            </div>
          </div>

          <!-- Malaysia -->
          <div class="col-lg-6">
            <div class="destination-card malaysia">
              <div class="dest-image">
                <img src="@/assets/website/img/banner/1.33.jpg" alt="Malaysia"/>
                <div class="dest-badge">Hidden Gems</div>
              </div>
              <div class="dest-content">
                <h3>Malaysia</h3>
                <p class="dest-tagline">Truly Asia • Diverse Cultures, Natural Wonders</p>
                <p class="dest-description">
                  From Kuala Lumpur's iconic Petronas Towers to Penang's heritage streets 
                  and Langkawi's pristine beaches—Malaysia offers endless discovery.
                </p>
                
                <div class="dest-highlights">
                  <div class="highlight-item"> 
                    <span>Kuala Lumpur</span>
                  </div>
                  <div class="highlight-item"> 
                    <span>Langkawi Islands</span>
                  </div>
                  <div class="highlight-item"> 
                    <span>George Town Heritage</span>
                  </div>
                  <div class="highlight-item"> 
                    <span>Nature Retreats</span>
                  </div>
                </div>
                
                <a href="#" class="btn-dest">View Malaysia Packages →</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <div class="text-center mb-5">
          <span class="section-eyebrow">What We Offer</span>
          <h2 class="section-title">Hassle-Free Travel Solutions</h2>
          <div class="title-divider"></div>
        </div>

        <div class="row g-4">
          
          <div class="col-lg-3 col-md-6">
            <div class="service-card">
              <div class="service-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>
                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"/>
                </svg>
              </div>
              <h4>Custom Itineraries</h4>
              <p>Personalized travel plans tailored to your interests, budget, and schedule</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="service-card">
              <div class="service-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h4>Flight Bookings</h4>
              <p>Competitive rates, flexible options, and direct airline partnerships</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="service-card">
              <div class="service-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <h4>Accommodation</h4>
              <p>Hotels, resorts, and boutique stays curated for comfort and value</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="service-card">
              <div class="service-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h4>Guided Tours</h4>
              <p>Expert local guides who bring destinations to life with insider knowledge</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="service-card">
              <div class="service-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h4>Visa Assistance</h4>
              <p>Complete documentation support and visa application guidance</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="service-card">
              <div class="service-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h4>Group Travel</h4>
              <p>Special packages for families, corporate teams, and large groups</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="service-card">
              <div class="service-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h4>24/7 Support</h4>
              <p>Round-the-clock assistance throughout your journey</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="service-card">
              <div class="service-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h4>Travel Insurance</h4>
              <p>Comprehensive coverage options for peace of mind</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-choose-section">
      <div class="container">
        <div class="row align-items-center g-5">
          
          <div class="col-lg-6">
            <div class="why-image-stack">
              <img src="@/assets/website/img/banner/1.33.jpg" alt="Happy Travelers" class="img-1"/>
              <img src="@/assets/website/img/banner/1.33.jpg" alt="Expert Guide" class="img-2"/>
              <div class="review-badge">
                <div class="stars">⭐⭐⭐⭐⭐</div>
                <div class="review-text">500+ Happy Travelers</div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <span class="section-eyebrow">Why Fly4Tour</span>
            <h2 class="section-title">Experience the<br/>Fly4Tour Difference</h2>
            <div class="title-divider"></div>
            
            <div class="why-features">
              <div class="why-item">
                <div class="why-number">01</div>
                <div class="why-content">
                  <h4>Regional Expertise</h4>
                  <p>Years of experience planning Singapore and Malaysia itineraries with insider access to hidden gems</p>
                </div>
              </div>

              <div class="why-item">
                <div class="why-number">02</div>
                <div class="why-content">
                  <h4>Value-Driven Packages</h4>
                  <p>Competitive pricing without compromising on quality, comfort, or experience</p>
                </div>
              </div>

              <div class="why-item">
                <div class="why-number">03</div>
                <div class="why-content">
                  <h4>Personalized Service</h4>
                  <p>Every itinerary is crafted around your preferences—not a one-size-fits-all template</p>
                </div>
              </div>

              <div class="why-item">
                <div class="why-number">04</div>
                <div class="why-content">
                  <h4>End-to-End Support</h4>
                  <p>From initial planning to safe return home, we're with you every step of the journey</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
 

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Parallax effect
  window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.hero-parallax')
    if (parallax) {
      const offset = window.pageYOffset
      parallax.style.transform = `translateY(${offset * 0.5}px)`
    }
  })

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.destination-card, .service-card, .why-item').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   VARIABLES
   ═══════════════════════════════════════════════════════ */
:root {
  --travel-blue: #0077CC;
  --travel-orange: #FF6B35;
  --travel-teal: #00C9A7;
  --travel-purple: #845EC2;
  --dark: #1A1A2E;
  --light-bg: #F8F9FA;
}

.fly4tour-page {
  font-family: 'Poppins', -apple-system, sans-serif;
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */
.hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0077CC 0%, #00C9A7 100%);
}

.hero-parallax {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920');
  background-size: cover;
  background-position: center;
  filter: brightness(0.3);
  will-change: transform;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 119, 204, 0.8) 0%, rgba(0, 201, 167, 0.7) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 80px 0;
}

.hero-badge {
  display: inline-block;
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -2px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  color: #ffffff;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  max-width: 600px;
  margin: 0 auto 40px;
}

.hero-cta-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 16px 36px;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.05rem;
}

.btn-primary {
  background: #FF6B35;
  color: white;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
}

.btn-primary:hover {
  background: #E55A28;
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(255, 107, 53, 0.4);
  color: white;
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: white;
  color: white;
}

/* Floating elements */
.float-element {
  position: absolute;
  font-size: 3rem;
  animation: float 6s ease-in-out infinite;
  opacity: 0.15;
}

.plane { top: 15%; left: 10%; }
.compass { top: 60%; right: 12%; animation-delay: 2s; }
.camera { bottom: 20%; left: 15%; animation-delay: 4s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.8rem; }
  .float-element { display: none; }
}

/* ═══════════════════════════════════════════════════════════
   DESTINATIONS
   ═══════════════════════════════════════════════════════ */
.destinations-section {
  padding: 100px 0;
  background: var(--light-bg);
}

.section-eyebrow {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #FF6B35;
  margin-bottom: 12px;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.title-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #FF6B35, #0077CC);
  margin: 0 auto 20px;
  border-radius: 2px;
}

.section-desc {
  font-size: 1.1rem;
  color: #6c757d;
}

.destination-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  opacity: 0;
  transform: translateY(30px);
}

.destination-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.destination-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.15);
}

.dest-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.dest-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.destination-card:hover .dest-image img {
  transform: scale(1.1);
}

.dest-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #FF6B35, #FF8C61);
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.dest-content {
  padding: 32px;
}

.dest-content h3 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 8px;
}

.dest-tagline {
  font-size: 0.95rem;
  color: #0077CC;
  font-weight: 600;
  margin-bottom: 16px;
}

.dest-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #6c757d;
  margin-bottom: 24px;
}

.dest-highlights {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #495057;
}

.highlight-icon {
  font-size: 1.3rem;
}

.btn-dest {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0077CC;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-dest:hover {
  gap: 12px;
  color: #005A9C;
}

/* ═══════════════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════════ */
.services-section {
  padding: 100px 0;
}

.service-card {
  background: white;
  padding: 32px 24px;
  border-radius: 16px;
  border: 2px solid #E9ECEF;
  text-align: center;
  transition: all 0.4s ease;
  height: 100%;
  opacity: 0;
  transform: translateY(20px);
}

.service-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.service-card:hover {
  border-color: #0077CC;
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 119, 204, 0.15);
}

.service-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #0077CC, #00C9A7);
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(135deg, #FF6B35, #FF8C61);
}

.service-card h4 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 12px;
}

.service-card p {
  font-size: 0.9rem;
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   WHY CHOOSE
   ═══════════════════════════════════════════════════════ */
.why-choose-section {
  padding: 100px 0;
  background: var(--light-bg);
}

.why-image-stack {
  position: relative;
  height: 500px;
}

.why-image-stack img {
  position: absolute;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.img-1 {
  width: 70%;
  height: 350px;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: 2;
}

.img-2 {
  width: 60%;
  height: 280px;
  object-fit: cover;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.review-badge {
  position: absolute;
  bottom: 120px;
  right: 60px;
  background: white;
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 3;
}

.stars {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.review-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--dark);
}

.why-features {
  display: grid;
  gap: 28px;
}

.why-item {
  display: flex;
  gap: 20px;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s ease;
}

.why-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.why-number {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #FF6B35, #FF8C61);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
}

.why-content h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 8px;
}

.why-content p {
  font-size: 0.95rem;
  color: #6c757d;
  line-height: 1.7;
  margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════ */
.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #0077CC 0%, #00C9A7 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.cta-content {
  position: relative;
  z-index: 2;
  color: white;
}

.cta-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.cta-subtitle {
  font-size: 1.15rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-cta-primary,
.btn-cta-secondary {
  padding: 18px 40px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-cta-primary {
  background: white;
  color: #0077CC;
}

.btn-cta-primary:hover {
  background: #F8F9FA;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
  color: #0077CC;
}

.btn-cta-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: white;
  color: white;
}

@media (max-width: 768px) {
  .cta-title { font-size: 2rem; }
}
</style>