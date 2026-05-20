import { createApp } from 'vue'
import App from './App.vue'

import './style.css'

// ─────────────────────────────────────────────
// FONT AWESOME
// ─────────────────────────────────────────────
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Solid Icons
import {
  faSearch,
  faShoppingBag,
  faCheck,
  faBars,
  faXmark,
  faArrowRight,
  faTruck,
  faRotateLeft,
  faPercent,
  faLock,
  faUser,
  faHeart
} from '@fortawesome/free-solid-svg-icons'

// Brand Icons
import {
  faInstagram,
  faFacebookF,
  faYoutube,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

// Adiciona todos os ícones na library
library.add(
  faSearch,
  faShoppingBag,
  faCheck,
  faBars,
  faXmark,
  faArrowRight,
  faTruck,
  faRotateLeft,
  faPercent,
  faLock,
  faUser,
  faHeart,
  faInstagram,
  faFacebookF,
  faYoutube,
  faTwitter
)

// ─────────────────────────────────────────────
// CREATE APP
// ─────────────────────────────────────────────
const app = createApp(App)

// Componente global do Font Awesome
app.component('font-awesome-icon', FontAwesomeIcon)

// Mount
app.mount('#app')