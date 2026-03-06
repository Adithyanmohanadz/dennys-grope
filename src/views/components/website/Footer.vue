<template>
  <footer class="bg-light footer-text pt-5 pb-3">
    <div class="container">
      <div class="row">
        <!-- ===== Left Column: Logo + About + Social Links ===== -->
        <div class="col-lg-4 col-md-12 mb-5 mb-lg-0">
          <div class="footer-brand">
            <img
              :src="footerData.logo || defaultLogo"
              alt="Website Logo"
              class="img-fluid mb-4"
              width="200"
            />
            <p class="text-sm text-muted mb-4">
              Since 1998 we have been providing our customers with state-of-the-art solar technology
              and the best value for their investment using the highest quality solar products and
              services.
            </p>

            <h6 class="text-primary mb-3">Follow Us</h6>
            <div class="social-links">
              <ul class="d-flex list-unstyled gap-3">
                <!-- Facebook -->
                <li v-if="footerData.socialMedia?.facebook">
                  <a
                    :href="footerData.socialMedia?.facebook"
                    target="_blank"
                    class="footer-text social-icon"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.05.28-1.73 1.76-1.73Z"
                      />
                    </svg>
                  </a>
                </li>

                <!-- YouTube -->
                <li v-if="footerData.socialMedia?.youtube">
                  <a
                    :href="footerData.socialMedia?.youtube"
                    target="_blank"
                    class="footer-text social-icon"
                    aria-label="YouTube"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23 9.71a8.5 8.5 0 0 0-.91-4.13a2.92 2.92 0 0 0-1.72-1A78.36 78.36 0 0 0 12 4.27a78.45 78.45 0 0 0-8.34.3a2.87 2.87 0 0 0-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 0 0 0 6.48a9.55 9.55 0 0 0 .3 2a3.14 3.14 0 0 0 .71 1.36a2.86 2.86 0 0 0 1.49.78a45.18 45.18 0 0 0 6.5.33c3.5.05 6.57 0 10.2-.28a2.88 2.88 0 0 0 1.53-.78a2.49 2.49 0 0 0 .61-1a10.58 10.58 0 0 0 .52-3.4c.04-.56.04-3.94.04-4.54ZM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08Z"
                      />
                    </svg>
                  </a>
                </li>

                <!-- Instagram -->
                <li v-if="footerData.socialMedia?.instagram">
                  <a
                    :href="footerData.socialMedia?.instagram"
                    target="_blank"
                    class="footer-text social-icon"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2Zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43a4.94 4.94 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.78 4.78 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.78 4.78 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.61 5.61 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.19 3.19 0 0 1-1.15.75a5.61 5.61 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.73 5.73 0 0 1-1.94-.3a3.27 3.27 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.54 5.54 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.54 5.54 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.14 3.14 0 0 1 1.1-.8A5.73 5.73 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.61 5.61 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.06 3.06 0 0 1 .75 1.1a5.61 5.61 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87Zm0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33Z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ===== Middle Column: Quick Links ===== -->
        <div class="col-lg-2 col-md-6 col-sm-6 mb-5 mb-lg-0">
          <h5 class="footer-text mb-4 border-bottom border-primary pb-2">Quick Links</h5>
          <ul class="list-unstyled footer-link-list">
            <li>
              <router-link to="/" class="text-muted text-decoration-none d-block mb-2 hover-link"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/about"
                class="text-muted text-decoration-none d-block mb-2 hover-link"
                >About Us</router-link
              >
            </li>
            <li>
              <router-link
                to="/business-enquiry"
                class="text-muted text-decoration-none d-block mb-2 hover-link"
                >Business Enquiry</router-link
              >
            </li>
            <li>
              <router-link
                to="/shop"
                class="text-muted text-decoration-none d-block mb-2 hover-link"
                >Shop</router-link
              >
            </li>
            <li>
              <router-link
                to="/contact"
                class="text-muted text-decoration-none d-block mb-2 hover-link"
                >Contact Us</router-link
              >
            </li>
          </ul>
        </div>

        <!-- ===== Right Column: Contact Info ===== -->
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div class="row">
            <div class="col-lg-7 col-md-12 mb-4">
              <h5 class="footer-text mb-4 border-bottom border-primary pb-2">Get in Touch</h5>

              <div class="d-flex align-items-start mb-3" v-if="footerData.address">
                <i class="fas fa-map-marker-alt text-primary me-3 mt-1 fs-5"></i>
                <div>
                  <p class="footer-text mb-0 fw-semibold">Address</p>
                  <p class="text-sm text-muted mb-0">{{ footerData.address }}</p>
                </div>
              </div>

              <div
                class="d-flex align-items-start mb-3"
                v-if="footerData.phone || footerData.contactPerson?.phone"
              >
                <i class="fas fa-phone-alt text-primary me-3 mt-1 fs-5"></i>
                <div>
                  <p class="footer-text mb-0 fw-semibold">Phone</p>
                  <p v-if="footerData.phone" class="text-sm text-muted mb-0">
                    <a
                      :href="`tel:${footerData.phone}`"
                      class="text-muted text-decoration-none hover-link"
                    >
                      {{ formatPhoneNumber(footerData.phone) }}
                    </a>
                  </p>
                  <p v-if="footerData.contactPerson?.phone" class="text-sm text-muted mb-0">
                    <a
                      :href="`tel:${footerData.contactPerson.phone}`"
                      class="text-muted text-decoration-none hover-link"
                    >
                      {{ formatPhoneNumber(footerData.contactPerson.phone) }}
                    </a>
                  </p>
                </div>
              </div>

              <div class="d-flex align-items-start" v-if="footerData.email">
                <i class="fas fa-envelope text-primary me-3 mt-1 fs-5"></i>
                <div>
                  <p class="footer-text mb-0 fw-semibold">Email</p>
                  <p class="text-sm text-muted mb-0">
                    <a
                      :href="`mailto:${footerData.email}`"
                      class="text-muted text-decoration-none hover-link"
                    >
                      {{ footerData.email }}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-5 col-md-12">
              <h5 class="footer-text mb-4 border-bottom border-primary pb-2">Info & Legal</h5>
              <ul class="list-unstyled footer-link-list">
                <li>
                  <router-link
                    to="/faq"
                    class="text-muted text-decoration-none d-block mb-2 hover-link"
                    >FAQ</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/terms-conditions"
                    class="text-muted text-decoration-none d-block mb-2 hover-link"
                    >Terms & Conditions</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/privacy-policy"
                    class="text-muted text-decoration-none d-block mb-2 hover-link"
                    >Privacy Policy</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/shipping-policy"
                    class="text-muted text-decoration-none d-block mb-2 hover-link"
                    >Shipping Policy</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/returns-refunds"
                    class="text-muted text-decoration-none d-block mb-2 hover-link"
                    >Returns & Refunds</router-link
                  >
                </li>
              </ul>

              <h6 class="footer-text fw-semibold mt-4 mb-2">Operating Hours</h6>
              <p class="text-sm text-muted mb-0">Mon - Fri: 9:00 AM - 7:00 PM IST</p>
              <p class="text-sm text-muted mb-0">Saturday: 9:00 AM - 5:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- ===== Bottom Bar ===== -->
  <div class=" py-3 border-top border-secondary" style="background: linear-gradient(135deg, #4A6B35 0%, #5F7A3E 100%);">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center text-md-start">
          <p class="text-sm text-white mb-0">
            &copy; {{ new Date().getFullYear() }} {{ footerData.websiteName}}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- whatsapp -->
  <a
    :href="
      footerData.socialMedia?.whatsappBusiness
        ? `https://api.whatsapp.com/send?phone=${footerData.socialMedia.whatsappBusiness.replace(/[^0-9]/g, '')}&text=Hello%2C%20I'm%20here%20`
        : '#'
    "
    target="_blank"
    class="whatsapp-btn"
    v-if="footerData.socialMedia?.whatsappBusiness"
  >
    <i class="bi bi-whatsapp"></i>
  </a>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { websiteApi } from "@/services/api";

const defaultLogo = "@/assets/website/img/logo/logo.jpg";
const footerData = ref({
  logo: "",
  address: "",
  phone: "",
  email: "",
  websiteName: "",
  socialMedia: { facebook: "", instagram: "", youtube: "" },
  contactPerson: {},
});

onMounted(async () => {
  try {
    const res = await websiteApi.get("v1/website-info");
    const info = res.data?.data;
    if (info) footerData.value = info;
  } catch (err) {
    console.error("Failed to load footer data:", err);
  }
});

// Format phone numbers like +91 987 654 3210
function formatPhoneNumber(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10)
    return `+91 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return phone;
}
</script>

<style scoped>
.bg-footer {
  background-color: #ececec !important;
}

.bg-darker {
  background-color: #0d1246 !important;
}

.text-primary {
  color: #ffb300 !important;
}

.footer-text {
  color: #10440f !important;
}

.text-muted {
  color: #696969 !important;
}

.hover-link {
  transition: color 0.3s ease;
}

.hover-link:hover {
  color: var(--bs-primary) !important;
}

.social-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #a4a9c6;
  transition: all 0.3s ease;
  color: #10440f;
}

.social-icon:hover {
  background-color: #ffb300;
  border-color: #ffb300;
  color: #1a237e !important;
}

.border-primary {
  border-color: #ffb300 !important;
}

.footer-link-list li {
  margin-bottom: 0.5rem;
}

/*Estilos generales del boton whatsapp*/
.whatsapp-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25d366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  animation: breathe 2s ease-in-out infinite;
}

/*Estilos solo al icono whatsapp*/
.whatsapp-btn i {
  color: #fff;
  font-size: 24px;
  animation: beat 2s ease-in-out infinite;
  text-decoration: none;
}

/*Estilos con animation contorno respirando*/
@keyframes breathe {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
  }

  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

/*Estilos de animacion del icono latiendo*/
@keyframes beat {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
