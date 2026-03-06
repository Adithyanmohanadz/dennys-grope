<template>
  <div class="flour-mill-page">
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-grid">
        <div class="hero-content">
          <span class="hero-badge">304-Grade Stainless Steel</span>
          <h1 class="hero-title ">Dennys<br/>Flour Mill</h1>
          <p class="hero-subtitle">
            State-of-the-art powder manufacturing with uncompromising hygiene 
            and food safety standards.
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">304</div>
              <div class="stat-label">Grade Steel</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Hygienic</div>
            </div>
          </div>
          <a href="#facility" class="btn-explore mb-4">
            Explore Facility
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
        <div class="hero-image">
          <img src="@/assets/website/img/banner/1.33.jpg" alt="Flour Mill Facility"/>
          <div class="quality-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>ISO Certified</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Facility Overview -->
    <section class="facility-section">
      <div class="container">
        <div class="row align-items-center g-5">
          
          <div class="col-lg-6">
            <span class="section-eyebrow">Advanced Manufacturing</span>
            <h2 class="section-title">Precision-Engineered<br/>for Purity</h2>
            <div class="title-divider"></div>
            
            <p class="lead-text">
              Our flour mill is equipped with fully furnished machinery made 
              from <strong>304-grade stainless steel</strong>—the industry gold 
              standard for food processing.
            </p>
            
            <p class="body-text">
              Every component, from hoppers to grinders, is designed to prevent 
              contamination, ensure consistent particle size, and maintain the 
              nutritional integrity of the final product. The facility operates 
              in a clean, climate-controlled atmosphere with strict sanitation protocols.
            </p>

            <div class="features-list">
              <div class="feature-item">
                <div class="feature-check">✓</div>
                <div>
                  <h4>304-Grade Machinery</h4>
                  <p>Corrosion-resistant, non-reactive, and easy to sanitize</p>
                </div>
              </div>
              
              <div class="feature-item">
                <div class="feature-check">✓</div>
                <div>
                  <h4>Climate-Controlled</h4>
                  <p>Optimal temperature and humidity for product stability</p>
                </div>
              </div>
              
              <div class="feature-item">
                <div class="feature-check">✓</div>
                <div>
                  <h4>Quality Assurance</h4>
                  <p>Rigorous testing at every stage of production</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="facility-gallery">
              <div class="gallery-main">
                <img src="@/assets/website/img/banner/1.33.jpg" alt="Stainless Steel Machinery"/>
              </div>
              <div class="gallery-grid">
                <img src="@/assets/website/img/banner/1.33.jpg" alt="Processing"/>
                <img src="@/assets/website/img/banner/1.33.jpg" alt="Quality Check"/>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products-section">
      <div class="container">
        <div class="text-center mb-5">
          <span class="section-eyebrow">Our Range</span>
          <h2 class="section-title">Powder-Based Food Products</h2>
          <div class="title-divider mx-auto"></div>
          <p class="section-description">
            From traditional flours to specialty blends, all manufactured under 
            stringent hygiene standards.
          </p>
        </div>

        <div class="row g-4">
          
          <div class="col-lg-3 col-md-6">
            <div class="product-card">
              <div class="product-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3>Wheat Flour</h3>
              <p>Premium quality whole wheat and refined flour for all baking needs</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="product-card">
              <div class="product-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <h3>Rice Flour</h3>
              <p>Fine-milled rice flour for traditional and contemporary recipes</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="product-card">
              <div class="product-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Spice Powders</h3>
              <p>Ground spices preserving natural oils and aromatics</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="product-card">
              <div class="product-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <h3>Specialty Blends</h3>
              <p>Custom formulations for specific culinary applications</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section id="facility" class="process-section">
      <div class="process-container">
        <div class="text-center mb-5">
          <span class="section-eyebrow">Production Flow</span>
          <h2 class="section-title">Grain to Powder Excellence</h2>
          <div class="title-divider mx-auto"></div>
        </div>

        <div class="process-flow">
          <div class="flow-step">
            <div class="flow-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h4>Raw Material Inspection</h4>
            <p>Thorough quality checks on all incoming grains</p>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="flow-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6"/>
                <path d="M17.2 6.8l-4.2 4.2m0 2l4.2 4.2"/>
                <path d="M6.8 6.8l4.2 4.2m0 2l-4.2 4.2"/>
              </svg>
            </div>
            <h4>Cleaning & Sorting</h4>
            <p>Remove impurities and foreign particles</p>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="flow-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h4>Precision Milling</h4>
            <p>Stainless steel grinders ensure uniform particle size</p>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="flow-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <h4>Quality Testing</h4>
            <p>Moisture, fineness, and purity verification</p>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="flow-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
            </div>
            <h4>Packaging</h4>
            <p>Food-grade materials in controlled environment</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Standards Section -->
    <section class="standards-section">
      <div class="container">
        <div class="row align-items-center g-5">
          
          <div class="col-lg-6">
            <div class="standards-visual">
              <div class="standard-badge large">
                <div class="badge-icon">ISO</div>
                <div class="badge-text">9001:2015</div>
              </div>
              <div class="standard-badge small badge-1">
                <div class="badge-icon">ZED</div>
                <div class="badge-text">Certified</div>
              </div>
              <div class="standard-badge small badge-2">
                <div class="badge-icon">FSSAI</div>
                <div class="badge-text">Approved</div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <span class="section-eyebrow">Compliance & Safety</span>
            <h2 class="section-title">Certified<br/>Quality Standards</h2>
            <div class="title-divider"></div>
            
            <p class="lead-text">
              Our facility operates under stringent quality management systems 
              and regulatory compliance frameworks.
            </p>

            <div class="standards-list">
              <div class="standard-item">
                <div class="standard-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <h4>ISO 9001:2015</h4>
                  <p>Quality Management System certification ensuring consistent product excellence</p>
                </div>
              </div>

              <div class="standard-item">
                <div class="standard-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <h4>ZED Certification</h4>
                  <p>Zero Defect Zero Effect - Government of India quality initiative</p>
                </div>
              </div>

              <div class="standard-item">
                <div class="standard-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div>
                  <h4>FSSAI Licensed</h4>
                  <p>Full compliance with Food Safety and Standards Authority of India</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <h2 class="cta-title">Looking for Bulk Supply?</h2>
              <p class="cta-text">
                We supply to hotels, restaurants, food manufacturers, and institutional buyers. 
                Contact us for wholesale pricing and custom requirements.
              </p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <a href="/contact" class="btn-cta">Get Quote</a>
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

  document.querySelectorAll('.facility-section, .product-card, .flow-step, .standards-visual, .standards-list').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   VARIABLES
   ═══════════════════════════════════════════════════════ */
:root {
  --steel-blue: #3B5672;
  --steel-dark: #1E2D3D;
  --steel-light: #6B8CAE;
  --accent-orange: #E67E22;
  --clean-white: #FFFFFF;
  --light-gray: #F5F7FA;
  --border-gray: #E1E8ED;
}

.flour-mill-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--clean-white);
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */
.hero-section {
  background: linear-gradient(135deg, #1E2D3D 0%, #3B5672 100%);
  padding: 60px 0 0;
}

.hero-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 0 40px;
}

.hero-content {
  color: white;
}

.hero-badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(230, 126, 34, 0.2);
  border: 1px solid rgba(230, 126, 34, 0.4);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 24px;
  color: #E67E22;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 24px;
  letter-spacing: -2px;
  color: #FFFFFF;
}

.hero-subtitle {
  font-size: 1.15rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px;
  max-width: 480px;
}

.hero-stats {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.stat-item {
  text-align: left;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  color: #E67E22;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-explore {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: #E67E22;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-explore:hover {
  background: #D35400;
  transform: translateX(4px);
  color: white;
}

.hero-image {
  position: relative;
}

.hero-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.3);
}

.quality-badge {
  position: absolute;
  top: 30px;
  right: 30px;
  background: white;
  padding: 16px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.quality-badge svg {
  color: #27AE60;
}

.quality-badge span {
  font-weight: 700;
  color: var(--steel-dark);
  font-size: 0.9rem;
}

@media (max-width: 992px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-image img {
    height: 350px;
  }
}

/* ═══════════════════════════════════════════════════════════
   CONTENT SECTIONS
   ═══════════════════════════════════════════════════════ */
.facility-section,
.products-section,
.standards-section {
  padding: 100px 0;
}

.section-eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #E67E22;
  margin-bottom: 12px;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--steel-dark);
  line-height: 1.1;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.title-divider {
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #E67E22, #D35400);
  margin-bottom: 28px;
  border-radius: 2px;
}

.lead-text {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--steel-blue);
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
  color: var(--steel-dark);
  font-weight: 700;
}

.section-description {
  font-size: 1.05rem;
  color: #6a6a6a;
  max-width: 600px;
  margin: 0 auto 50px;
}

/* Features List */
.features-list {
  display: grid;
  gap: 24px;
}

.feature-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.feature-check {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #27AE60, #2ECC71);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.feature-item h4 {
  font-size: 1.05rem;
  color: var(--steel-dark);
  margin-bottom: 4px;
  font-weight: 700;
}

.feature-item p {
  font-size: 0.9rem;
  color: #6a6a6a;
  margin: 0;
  line-height: 1.5;
}

/* Facility Gallery */
.facility-gallery {
  display: grid;
  gap: 20px;
}

.gallery-main img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.gallery-grid img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* ═══════════════════════════════════════════════════════════
   PRODUCTS SECTION
   ═══════════════════════════════════════════════════════ */
.products-section {
  background: var(--light-gray);
}

.product-card {
  background: white;
  padding: 40px 28px;
  border-radius: 16px;
  border: 2px solid var(--border-gray);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  border-color: #E67E22;
}

.product-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #3B5672, #6B8CAE);
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.product-card:hover .product-icon {
  background: linear-gradient(135deg, #E67E22, #D35400);
  transform: scale(1.1);
}

.product-card h3 {
  font-size: 1.3rem;
  color: var(--steel-dark);
  margin-bottom: 12px;
  font-weight: 700;
}

.product-card p {
  font-size: 0.9rem;
  color: #6a6a6a;
  line-height: 1.6;
  margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   PROCESS FLOW
   ═══════════════════════════════════════════════════════ */
.process-section {
  padding: 100px 0;
  background: white;
}

.process-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.process-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  flex-wrap: wrap;
  gap: 20px;
}

.flow-step {
  flex: 1;
  min-width: 150px;
  text-align: center;
}

.flow-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #3B5672, #6B8CAE);
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

.flow-step:hover .flow-icon {
  background: linear-gradient(135deg, #E67E22, #D35400);
  transform: scale(1.15) rotate(5deg);
}

.flow-step h4 {
  font-size: 1.05rem;
  color: var(--steel-dark);
  margin-bottom: 8px;
  font-weight: 700;
}

.flow-step p {
  font-size: 0.85rem;
  color: #6a6a6a;
  line-height: 1.5;
  margin: 0;
}

.flow-arrow {
  font-size: 2rem;
  color: #E67E22;
  font-weight: 700;
}

@media (max-width: 992px) {
  .flow-arrow {
    display: none;
  }
  
  .process-flow {
    flex-direction: column;
  }
}

/* ═══════════════════════════════════════════════════════════
   STANDARDS SECTION
   ═══════════════════════════════════════════════════════ */
.standards-visual {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.standard-badge {
  background: white;
  border: 3px solid var(--border-gray);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.standard-badge.large {
  position: absolute;
  width: 280px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.standard-badge.large:hover {
  border-color: #E67E22;
  transform: scale(1.05);
}

.standard-badge.small {
  position: absolute;
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.badge-1 {
  top: 20px;
  left: 20px;
}

.badge-2 {
  bottom: 20px;
  right: 20px;
}

.badge-icon {
  font-size: 2.5rem;
  font-weight: 900;
  color: #E67E22;
  margin-bottom: 12px;
}

.standard-badge.large .badge-icon {
  font-size: 4rem;
}

.badge-text {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--steel-dark);
}

.standard-badge.large .badge-text {
  font-size: 1.3rem;
}

.standards-list {
  display: grid;
  gap: 28px;
}

.standard-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 24px;
  background: var(--light-gray);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.standard-item:hover {
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateX(8px);
}

.standard-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #27AE60, #2ECC71);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.standard-item h4 {
  font-size: 1.1rem;
  color: var(--steel-dark);
  margin-bottom: 6px;
  font-weight: 700;
}

.standard-item p {
  font-size: 0.9rem;
  color: #6a6a6a;
  margin: 0;
  line-height: 1.6;
}

/* ═══════════════════════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════════════════ */
.cta-section {
  padding: 100px 0;
  background: var(--light-gray);
}

.cta-card {
  background: linear-gradient(135deg, #3B5672 0%, #1E2D3D 100%);
  padding: 60px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.cta-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 12px;
}

.cta-text {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin: 0;
}

.btn-cta {
  display: inline-block;
  padding: 16px 40px;
  background: #E67E22;
  color: white;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-cta:hover {
  background: #D35400;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(230, 126, 34, 0.4);
  color: white;
}

@media (max-width: 992px) {
  .cta-card {
    padding: 40px 30px;
    text-align: center;
  }
  
  .cta-title {
    font-size: 1.8rem;
  }
  
  .btn-cta {
    margin-top: 24px;
  }
}

/* ═══════════════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════════ */
.facility-section,
.product-card,
.flow-step,
.standards-visual,
.standards-list {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.facility-section.animate-in,
.product-card.animate-in,
.flow-step.animate-in,
.standards-visual.animate-in,
.standards-list.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>