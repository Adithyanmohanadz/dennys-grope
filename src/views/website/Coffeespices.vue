<template>
  <div class="coffee-spices-page">
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content w-100">
        <div class=" ">
          <div class="row justify-content-center">
            <div class=" text-center">
              <span class="hero-badge">Premium Quality</span>
              <h1 class="hero-title ">Wayanad Coffee & Hill Spices</h1>
              <p class="hero-subtitle">
                From the misty highlands of Wayanad to your cup and kitchen—
                authenticity you can taste, quality you can trust.
              </p>
              <div class="hero-cta-group">
                <a href="#products" class="btn-primary-custom">Explore Products</a> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Decorative Coffee Beans -->
      <div class="floating-bean bean-1"></div>
      <div class="floating-bean bean-2"></div>
      <div class="floating-bean bean-3"></div>
    </section>

    <!-- Coffee Excellence Section -->
    <section class="coffee-excellence-section">
      <div class="container">
        <div class="row align-items-center g-5">
          
          <div class="col-lg-6">
            <div class="content-block">
              <span class="section-eyebrow">Coffee Excellence</span>
              <h2 class="section-title">Arabica from<br/>Wayanad's Highlands</h2>
              <div class="title-divider"></div>
              
              <p class="lead-text">
                Our coffee journey begins at 900+ meters above sea level, where 
                cool climate and rich soil create the perfect conditions for premium Arabica.
              </p>
              
              <p class="body-text">
                We operate our own <strong>hulling, grading, and roasting units</strong>, 
                ensuring complete control from green bean to the final roast. Each batch is 
                carefully processed to preserve the natural oils, aroma, and distinctive flavor 
                notes that make Wayanad coffee legendary.
              </p>

              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <h4>In-House Processing</h4>
                    <p>Complete quality control from bean to roast</p>
                  </div>
                </div>
                
                <div class="feature-item">
                  <div class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Expert Roasting</h4>
                    <p>Precision roasting for consistent flavor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="image-composition">
              <img src="@/assets/website/img/banner/1.33.jpg" 
                   alt="Wayanad Coffee Beans" 
                   class="main-image"/>
              <div class="stat-card">
                <div class="stat-number">900+m</div>
                <div class="stat-label">Altitude</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Spices Section -->
    <section class="spices-section">
      <div class="container">
        <div class="row align-items-center g-5">
          
          <div class="col-lg-6 order-lg-2">
            <div class="content-block">
              <span class="section-eyebrow">Hill Spices</span>
              <h2 class="section-title">Cardamom, Pepper<br/>& Premium Spices</h2>
              <div class="title-divider"></div>
              
              <p class="lead-text">
                Our dedicated cardamom drying and sorting unit uses controlled methods 
                to preserve the natural oils, vibrant color, and intense aroma.
              </p>
              
              <p class="body-text">
                We procure directly from local farmers, ensuring fair prices and fresh quality. 
                Our range includes <strong>cardamom, black pepper, cloves, and cinnamon</strong>—
                all processed with care and marketed through our retail outlets, webstore, 
                and export channels.
              </p>

              <div class="spice-types">
                <div class="spice-chip">🌿 Cardamom</div>
                <div class="spice-chip">⚫ Black Pepper</div>
                <div class="spice-chip">🌰 Cloves</div>
                <div class="spice-chip">🍂 Cinnamon</div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 order-lg-1">
            <div class="spice-grid">
              <div class="spice-card">
                <img src="@/assets/website/img/banner/1.33.jpg" alt="Cardamom"/>
                <div class="spice-overlay">
                  <h4 class="text-white">Green Cardamom</h4>
                  <p>Queen of Spices</p>
                </div>
              </div>
              <div class="spice-card">
                <img src="@/assets/website/img/banner/1.33.jpg" alt="Black Pepper"/>
                <div class="spice-overlay">
                  <h4 class="text-white">Black Pepper</h4>
                  <p>King of Spices</p>
                </div>
              </div>
              <div class="spice-card">
                <img src="@/assets/website/img/banner/1.33.jpg" alt="Cloves"/>
                <div class="spice-overlay">
                  <h4 class="text-white">Cloves</h4>
                  <p>Aromatic Essence</p>
                </div>
              </div>
              <div class="spice-card">
                <img src="@/assets/website/img/banner/1.33.jpg" alt="Cinnamon"/>
                <div class="spice-overlay">
                  <h4 class="text-white">Cinnamon</h4>
                  <p>Sweet & Warm</p>
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
  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.content-block, .image-composition, .process-step, .market-card').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   VARIABLES & BASE
   ═══════════════════════════════════════════════════════ */
:root {
  --coffee-brown: #4A2C2A;
  --coffee-dark: #2C1810;
  --spice-green: #5F7A3E;
  --accent-gold: #D4A574;
  --cream: #FAF7F2;
  --warm-white: #FFF9F0;
}

.coffee-spices-page { 
  background: var(--cream);
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */
.hero-section {
  position: relative;
  min-height: 75vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #4A2C2A 0%, #6B4C3A 50%, #8B6B4A 100%);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(212, 165, 116, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(95, 122, 62, 0.1) 0%, transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 80px 0;
  color: #fff;
}

.hero-badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -1px;
  color: #fff;
}

.hero-subtitle {
  font-size: 1.15rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 40px;
}

.hero-cta-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary-custom {
  padding: 14px 32px;
  background: #D4A574;
  color: #2C1810;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary-custom:hover {
  background: #E5B685;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212, 165, 116, 0.3);
}

.btn-outline-custom {
  padding: 14px 32px;
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-outline-custom:hover {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Floating coffee beans animation */
.floating-bean {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50% 0 50% 0;
  background: rgba(212, 165, 116, 0.1);
  animation: float 6s ease-in-out infinite;
}

.bean-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.bean-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.bean-3 {
  bottom: 15%;
  left: 20%;
  width: 80px;
  height: 80px;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .floating-bean {
    display: none;
  }
}

/* ═══════════════════════════════════════════════════════════
   CONTENT SECTIONS
   ═══════════════════════════════════════════════════════ */
.coffee-excellence-section,
.spices-section {
  padding: 100px 0;
}

.section-eyebrow {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--spice-green);
  margin-bottom: 12px;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--coffee-dark);
  line-height: 1.2;
  margin-bottom: 16px;
}

.title-divider {
  width: 60px;
  height: 4px;
  background: var(--accent-gold);
  margin-bottom: 28px;
  border-radius: 2px;
}

.lead-text {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--coffee-brown);
  margin-bottom: 20px;
  font-weight: 500;
}

.body-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #5a5a5a;
  margin-bottom: 32px;
}

.body-text strong {
  color: var(--coffee-dark);
  font-weight: 600;
}

/* Features Grid */
.features-grid {
  display: grid;
  gap: 24px;
}

.feature-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.feature-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #5F7A3E, #7A9A5E);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-item h4 {
  font-size: 1.1rem;
  color: var(--coffee-dark);
  margin-bottom: 4px;
}

.feature-item p {
  font-size: 0.9rem;
  color: #6a6a6a;
  margin: 0;
  line-height: 1.5;
}

/* Image Composition */
.image-composition {
  position: relative;
}

.main-image {
  width: 100%;
  height: 550px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.stat-card {
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: white;
  padding: 24px 32px;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--spice-green);
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: #6a6a6a;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Spice Chips */
.spice-types {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.spice-chip {
  padding: 10px 20px;
  background: var(--warm-white);
  border: 2px solid #E5DDD5;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--coffee-brown);
  transition: all 0.3s ease;
}

.spice-chip:hover {
  background: var(--spice-green);
  color: white;
  border-color: var(--spice-green);
  transform: translateY(-2px);
}

/* Spice Grid */
.spice-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.spice-card {
  position: relative;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}

.spice-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.spice-card:hover img {
  transform: scale(1.1);
}

.spice-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  color: white;
}

.spice-overlay h4 {
  font-size: 1.2rem;
  margin-bottom: 4px;
}

.spice-overlay p {
  font-size: 0.85rem;
  opacity: 0.9;
  margin: 0;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .spice-grid {
    grid-template-columns: 1fr;
  }
}

/* ═══════════════════════════════════════════════════════════
   PROCESS TIMELINE
   ═══════════════════════════════════════════════════════ */
.process-section {
  padding: 100px 0;
  background: var(--warm-white);
}

.process-timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-top: 60px;
  position: relative;
}

.process-timeline::before {
  content: '';
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, var(--accent-gold), var(--spice-green));
  z-index: 0;
}

.process-step {
  text-align: center;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.process-step.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.step-number {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: white;
  border: 3px solid var(--accent-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--coffee-dark);
  position: relative;
  z-index: 1;
}

.step-content h3 {
  font-size: 1.2rem;
  color: var(--coffee-dark);
  margin-bottom: 8px;
}

.step-content p {
  font-size: 0.9rem;
  color: #6a6a6a;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .process-timeline::before {
    display: none;
  }
}

/* ═══════════════════════════════════════════════════════════
   MARKETS SECTION
   ═══════════════════════════════════════════════════════ */
.markets-section {
  padding: 100px 0;
}

.market-card {
  background: white;
  padding: 40px 32px;
  border-radius: 20px;
  border: 2px solid #E5DDD5;
  text-align: center;
  transition: all 0.4s ease;
  height: 100%;
}

.market-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  border-color: var(--accent-gold);
}

.market-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #5F7A3E, #7A9A5E);
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.market-card:hover .market-icon {
  transform: scale(1.1) rotate(5deg);
}

.market-card h3 {
  font-size: 1.5rem;
  color: var(--coffee-dark);
  margin-bottom: 16px;
}

.market-card p {
  font-size: 0.95rem;
  color: #6a6a6a;
  line-height: 1.7;
  margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════════════════ */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--spice-green) 0%, #7A9A5E 100%);
  color: rgb(119, 119, 119);
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.cta-text {
  font-size: 1.1rem;
  margin-bottom: 32px;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-section .btn-primary-custom {
  background: white;
  color: var(--spice-green);
}

.cta-section .btn-primary-custom:hover {
  background: var(--cream);
}

.cta-section .btn-outline-custom {
  border-color: rgba(255, 255, 255, 0.5);
}

.cta-section .btn-outline-custom:hover {
  border-color: white;
  background: rgba(255, 255, 255, 0.15);
}

/* ═══════════════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════════ */
.content-block,
.image-composition,
.market-card {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-block.animate-in,
.image-composition.animate-in,
.market-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>