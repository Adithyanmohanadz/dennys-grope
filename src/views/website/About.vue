<template>
  <div class="about">
    <!-- <section class="py-4">
      <div class="container py-5">
        <div v-if="isLoading" class="text-center">
          <p>Loading About Us content...</p>
        </div>
        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>
        <div class="row align-items-center">
          <div class="col-md-6 mb-md-0 mb-4">
            <p class="mb-0 text-dark font-weight-bold">WHAT WE DO</p>
            <h2 class="">{{ aboutUs.heading }}</h2>
            <p class="mb-4">{{ aboutUs.description }}</p>
          </div>
          <div class="col-md-6">
            <div class="card p-0 rounded-3">
              <img :src="aboutUs.image" :alt="aboutUs.heading" class="img-fluid rounded shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Hero Header Section -->
  <section class="about-hero">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <h1 class="about-hero-title text-white">About Dennys Group</h1>
          <p class="about-hero-subtitle">
            A legacy of quality, transparency, and value built over decades of
            entrepreneurial spirit.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content Section -->
  <section class="about-content-section py-5">
    <div class="container">
      <div class="row g-5">

        <!-- Left Column: Image + Quote Card -->
        <div class="col-lg-5">
          <div class="about-image-wrap">
            <img 
              src="@/assets/website/img/banner/1.33.jpg" 
              alt="Denny P Joseph" 
              class="about-founder-img"
            />
            
            <!-- Floating Quote Card -->
            <div class="about-quote-card">
              <div class="quote-icon">❝</div>
              <p class="quote-text">
                "We create a region–specific product on our offering, modeled
                to you and your home."
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Story + Values -->
        <div class="col-lg-7">
          
          <!-- Story Header -->
          <div class="story-header mb-4">
            <p class="story-eyebrow">OUR FOUNDER</p>
            <h2 class="story-title">The Visionary Behind the Brand</h2>
            <hr class="border-brown border-3 opacity-100 mb-4" style="width: 70px;">
          </div>

          <!-- Story Content -->
          <div class="story-content mb-5">
            <p class="story-para">
              <strong>Denny P Joseph</strong>, aged 48, is the driving force behind Dennys Group. His entrepreneurial journey began 25 years ago, fueled by a passion for trade and a commitment to his community in Wayanad.
            </p>
            <p class="story-para">
              In 2013, he formally established Dennys Group with a clear mission: to organize the rich agricultural output of the region and present it to the world with the respect it deserves. His hands-on approach ensures that every vertical—from spice trading to international travel—operates with integrity and excellence.
            </p>
            <p class="story-para">
             Under his leadership, the group has diversified without losing its core identity. Whether it's sourcing the finest Arabica beans or guiding a student to a university in Germany, Denny's philosophy of "Quality, Transparency, and Value" remains the cornerstone of every operation.
            </p> 
          </div>

        </div>
        
        <!-- Three Value Cards -->
        <div class="row g-3 mt-5 py-4">
          
          <!-- Card 1: Quality First -->
          <div class="col-md-4">
            <div class="value-card">
              <div class="value-number">01</div>
              <h4 class="value-title">Quality First</h4>
              <p class="value-desc">
                We never compromise on the standard of our products. From the farm to the shelf, every step undergoes rigorous quality checks.
              </p>
            </div>
          </div>

          <!-- Card 2: Transparency -->
          <div class="col-md-4">
            <div class="value-card">
              <div class="value-number">02</div>
              <h4 class="value-title">Transparency</h4>
              <p class="value-desc">
                We believe in open, honest relationships with our farmers, partners, and customers. No hidden costs, just fair value.
              </p>
            </div>
          </div>

          <!-- Card 3: Innovation -->
          <div class="col-md-4">
            <div class="value-card">
              <div class="value-number">03</div>
              <h4 class="value-title">Innovation</h4>
              <p class="value-desc">
                While rooted in tradition, we constantly evolve—adopting stainless steel machinery for hygiene or exploring new global markets.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  

    <section class="team-section py-5">
      <div class="container">

        <!-- Section Header -->
        <div class="text-center mb-5">
          <p class="team-eyebrow">OUR PEOPLE</p>
          <h2 class="team-title">Meet the Team</h2>
          <div class="team-divider"></div>
        </div>

        <!-- Team Grid -->
        <div class="row g-4 justify-content-center">

          <div v-for="(member, index) in teamMembers" :key="index" class="col-lg-3 col-md-4 col-sm-6">
            <div class="team-card">
              <div class="team-card-image-wrap">
                <!-- <img :src="member.photo" :alt="member.name" class="team-card-image" /> -->
                <!-- Hover Overlay -->
                <div class="team-card-overlay">
                  <div class="team-social-links">
                    <a v-if="member.linkedin" :href="member.linkedin" class="social-link">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a v-if="member.email" :href="`mailto:${member.email}`" class="social-link">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div class="team-card-content">
                <h4 class="team-member-name">{{ member.name }}</h4>
                <p class="team-member-role">{{ member.role }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
// Assuming your 'api' (axios instance with interceptors) is imported from a configuration file
import { api } from "@/services/api"; // axios helper

// State to hold the data
const aboutUs = ref({
  heading: 'Loading...',
  description: 'Loading website information...',
  image: '' // Will be replaced by API image URL
});

const isLoading = ref(false);
const error = ref(null);

/**
 * Fetches website info and extracts the aboutUs section.
 * API Endpoint: GET /v1/website-info
 */
const fetchAboutUsData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await api.get("/v1/website-info");

    // Check if the required data path exists
    if (response.data && response.data.data && response.data.data.aboutUs) {
      // Extract the aboutUs object
      aboutUs.value = response.data.data.aboutUs;
    } else {
      error.value = "Website info data structure is invalid.";
    }
  } catch (err) {
    console.error("Error fetching website info:", err);
    error.value = `Failed to load data. Status: ${err.response?.status || 'Network Error'}`;
  } finally {
    isLoading.value = false;
  }
};

// Team Members Data
const teamMembers = ref([
  {
    name: "Denny P Joseph",
    role: "Founder & CEO",
    photo: "https://i.pravatar.cc/400?img=33",
    linkedin: "#",
    email: "denny@dennysgroup.com"
  },
  {
    name: "Anita Sharma",
    role: "Operations Director",
    photo: "https://i.pravatar.cc/400?img=47",
    linkedin: "#",
    email: "anita@dennysgroup.com"
  },
  {
    name: "Michael Chen",
    role: "Export Manager",
    photo: "https://i.pravatar.cc/400?img=14",
    linkedin: "#",
    email: "michael@dennysgroup.com"
  },
  {
    name: "Priya Nair",
    role: "Quality Assurance Lead",
    photo: "https://i.pravatar.cc/400?img=29",
    linkedin: "#",
    email: "priya@dennysgroup.com"
  },
  {
    name: "James Anderson",
    role: "Business Development",
    photo: "https://i.pravatar.cc/400?img=51",
    linkedin: "#",
    email: "james@dennysgroup.com"
  },
  {
    name: "Lakshmi Iyer",
    role: "Supply Chain Head",
    photo: "https://i.pravatar.cc/400?img=45",
    linkedin: "#",
    email: "lakshmi@dennysgroup.com"
  },
  {
    name: "David Martinez",
    role: "Marketing Director",
    photo: "https://i.pravatar.cc/400?img=68",
    linkedin: "#",
    email: "david@dennysgroup.com"
  },
  {
    name: "Sneha Reddy",
    role: "Finance Manager",
    photo: "https://i.pravatar.cc/400?img=38",
    linkedin: "#",
    email: "sneha@dennysgroup.com"
  }
])

onMounted(() => {
  fetchAboutUsData();
});
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   ABOUT HERO SECTION
   ═══════════════════════════════════════════════════════════ */
.about-hero {
  background: linear-gradient(135deg, #865e30 0%, #6b5a3a 100%);
  padding: 90px 0px;
  color: #fff;
}

.about-hero-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 12px; 
  letter-spacing: -0.5px;
}

.about-hero-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  max-width: 560px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .about-hero {
    padding: 40px 20px;
  }

  .about-hero-title {
    font-size: 1.75rem;
  }

  .about-hero-subtitle {
    font-size: 0.92rem;
  }
}

/* ═══════════════════════════════════════════════════════════
   MAIN CONTENT SECTION
   ═══════════════════════════════════════════════════════════ */
.about-content-section {
  background: #f5f2ed;
}

/* ─── Left Column: Image + Quote ─── */
.about-image-wrap {
  position: relative;
}

.about-founder-img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.about-quote-card {
  position: absolute;
  bottom: -30px;
  left: 80%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #e8e4df;
  border-radius: 12px;
  padding: 20px 24px;
  width: 320px;
  max-width: 320px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.quote-icon {
  font-size: 2.2rem;
  color: #3a6b45;
  line-height: 1;
  margin-bottom: 8px;
  font-family: Georgia, serif;
}

.quote-text {
  font-size: 0.88rem;
  color: #2c3e50;
  line-height: 1.55;
  font-style: italic;
  margin: 0;
}

@media (max-width: 991px) {
  .about-quote-card {
    position: relative;
    left: 0;
    transform: none;
    bottom: 0;
    margin-top: 20px;
  }
}

/* ─── Right Column: Story ─── */
.story-header {
  margin-bottom: 24px;
}

.story-eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #6b4c3b;
  margin-bottom: 6px;
}

.story-title {
  font-size: 2.1rem;
  font-weight: 700;
  color: #1a1a1a; 
  letter-spacing: -0.5px;
}

.story-content {
  margin-bottom: 32px;
}

.story-para {
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 16px;
}

.story-para strong {
  color: #2c3e50;
  font-weight: 600;
}

.story-para.italic {
  font-style: italic;
  color: #6b4c3b;
}

/* ─── Value Cards ─── */
.value-card {
  background: #fff;
  border: 1px solid #e8e4df;
  border-radius: 12px;
  padding: 24px 20px;
  height: 100%;
  transition: box-shadow 0.25s, transform 0.25s;
}

.value-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}

.value-number {
  font-size: 1.1rem;
  font-weight: 700;
  color: #3a6b45;
  background: #eef5ef;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.value-title {
  font-size: 1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.value-desc {
  font-size: 0.84rem;
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .story-title {
    font-size: 1.5rem;
  }

  .story-para {
    font-size: 0.88rem;
  }
}

/* ═══════════════════════════════════════════════════════════
   TEAM SECTION
   ═══════════════════════════════════════════════════════ */
.team-section {
  background: #f5f2ed;
}

/* Header */
.team-eyebrow {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #6b4c3b;
  margin-bottom: 8px;
}

.team-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px; 
}

.team-divider {
  width: 50px;
  height: 3px;
  background: #3a6b45;
  margin: 0 auto;
  border-radius: 2px;
}

/* Team Card */
.team-card {
  background: #fff;
  border: 1px solid #e8e4df;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.team-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

/* Image Wrapper */
.team-card-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
}

.team-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.team-card:hover .team-card-image {
  transform: scale(1.08);
}

/* Hover Overlay */
.team-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(46, 83, 57, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.team-card:hover .team-card-overlay {
  opacity: 1;
}

/* Social Links */
.team-social-links {
  display: flex;
  gap: 14px;
}

.social-link {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

/* Card Content */
.team-card-content {
  padding: 20px 16px;
  text-align: center;
}

.team-member-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 4px;
}

.team-member-role {
  font-size: 0.84rem;
  color: #6c757d;
  margin: 0;
}

@media (max-width: 768px) {
  .team-title {
    font-size: 1.7rem;
  }
}
</style>