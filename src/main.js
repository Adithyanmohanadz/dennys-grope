
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "vue-multiselect/dist/vue-multiselect.css";

import App from './App.vue'
import router from './router'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Import Vue Toastification
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

// Import the print plugin
import print from 'vue3-print-nb'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast, {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false, 
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true
})

app.use(print)

app.mount('#app')
