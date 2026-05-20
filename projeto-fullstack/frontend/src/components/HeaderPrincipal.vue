<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="container">
      <div class="header__inner">

       <a href="#home" class="header__logo" aria-label="Ir para o início">
 <div class="header__logo-container">
  <img 
    src="../assets/image/adidas-logo.png" 
    alt="Logo Oficial" 
    class="header__logo-img"
  />
</div>
</a>

        <nav class="header__nav" aria-label="Navegação principal">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': secaoAtiva === link.sectionId }"
            @click="fecharMenuMobile"
          >
            {{ link.label }}
          </a>
        </nav>

     <div class="header__actions">
  <button class="header__action-btn" aria-label="Buscar">
    <font-awesome-icon :icon="['fas', 'search']" aria-hidden="true" />
  </button>
  <button class="header__action-btn" aria-label="Minha conta">
    <font-awesome-icon :icon="['fas', 'user']" aria-hidden="true" />
  </button>
  <button class="header__action-btn" aria-label="Favoritos">
    <font-awesome-icon :icon="['fas', 'heart']" aria-hidden="true" />
  </button>
  <button class="header__action-btn sacola-btn" aria-label="Sacola de compras">
    <font-awesome-icon :icon="['fas', 'shopping-bag']" aria-hidden="true" />
    <span class="sacola-badge">0</span>
  </button>

  <button
    class="header__hamburger"
    :class="{ 'header__hamburger--active': menuAberto }"
    :aria-expanded="menuAberto"
    aria-controls="mobile-menu"
    aria-label="Abrir menu de navegação"
    @click="alternarMenu"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>

      </div>
    </div>

    <Transition name="slide-down">
      <nav
        v-if="menuAberto"
        id="mobile-menu"
        class="header__mobile-menu"
        aria-label="Menu mobile"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="header__mobile-link"
          :class="{ 'header__mobile-link--active': secaoAtiva === link.sectionId }"
          @click="fecharMenuMobile"
        >
          {{ link.label }}
        </a>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Declaração local da interface para evitar erros de dependência externa
interface NavLink {
  label: string
  href: string
  sectionId: string | undefined
}

// ── DADOS DO MENU EM CAIXA ALTA CONFORME A IMAGEM ─────────────────
const navLinks = ref<NavLink[]>([
  { label: 'Home',   href: '#home',          sectionId: 'home' },
  { label: 'Diferenciais',    href: '#diferenciais', sectionId: 'diferenciais' },
  { label: 'Lifestyle',    href: '#lifestyle',    sectionId: 'lifestyle' },
  { label: 'Detalhes', href: '#detalhes',     sectionId: 'detalhes' },
  { label: 'Comprar', href: '#comprar',     sectionId: 'comprar' },
  { label: 'Vitrine',     href: '#vitrine',      sectionId: 'vitrine' }
])

// ── ESTADO REATIVO ────────────────────────────────────────────
const menuAberto  = ref<boolean>(false)
const scrolled    = ref<boolean>(false)
const secaoAtiva  = ref<string | undefined>('home')

// ── LÓGICA HAMBÚRGUER ─────────────────────────────────────────
function alternarMenu(): void {
  menuAberto.value = !menuAberto.value
  document.body.style.overflow = menuAberto.value ? 'hidden' : ''
}

function fecharMenuMobile(): void {
  menuAberto.value = false
  document.body.style.overflow = ''
}

// ── SCROLL SPY ALINHADO COM OS IDS REAIS DO PROJETO ───────────
const secoesSpy = [
  'home',
  'diferenciais',
  'lifestyle',
  'detalhes',
  'comprar',
  'vitrine'
]

function atualizarScrollSpy(): void {
  scrolled.value = window.scrollY > 60

  const posicaoScroll = window.scrollY + 120

  for (const id of secoesSpy) {
    const secao = document.getElementById(id)

    if (!secao) continue

    const topoSecao = secao.offsetTop
    const alturaSecao = secao.offsetHeight

    if (
      posicaoScroll >= topoSecao &&
      posicaoScroll < topoSecao + alturaSecao
    ) {
      secaoAtiva.value = id
    }
  }
}

// ── LIFECYCLE ─────────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('scroll', atualizarScrollSpy, { passive: true })
  atualizarScrollSpy()
})

onUnmounted(() => {
  window.removeEventListener('scroll', atualizarScrollSpy)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ── CSS TOKENS LOCAIS ── */
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: 70px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.35s ease, box-shadow 0.35s ease;
}
.header--scrolled {
  background: rgba(0, 0, 0, 0.96);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

/* Container */
.container { max-width: 1300px; margin: 0 auto; padding: 0 24px; }
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  gap: 12px; 
  text-decoration: none;
  height: 100%; 
}

.header__logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 160px; 
  height: 44px;    
  overflow: hidden;
}

.header__logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  object-position: left center; 
}

/* Nav Desktop */
.header__nav { display: flex; align-items: center; gap: 28px; }
.header__nav-link {
  font-size: 11px; font-weight: 700;
  color: #888; text-transform: uppercase;
  letter-spacing: 1.5px; text-decoration: none;
  position: relative; padding: 6px 0;
  transition: color 0.3s ease;
}
.header__nav-link::after {
  content: '';
  position: absolute; bottom: 0; left: 0;
  width: 0; height: 2px;
  background: #fff;
  transition: width 0.25s ease;
}
.header__nav-link:hover,
.header__nav-link--active { color: #fff; }

.header__nav-link:hover::after,
.header__nav-link--active::after { width: 100%; }

/* Actions */
.header__actions {
  display: flex; align-items: center; gap: 20px;
}
.header__action-btn {
  color: #fff; font-size: 1.1rem;
  background: none; border: none; cursor: pointer;
  transition: transform 0.2s ease;
  display: flex; align-items: center;
  position: relative;
}
.header__action-btn:hover { transform: scale(1.1); }

.sacola-btn { position: relative; }
.sacola-badge {
  position: absolute;
  top: -6px; right: -8px;
  background: #fff; color: #000;
  font-size: 0.6rem; font-weight: 900;
  width: 15px; height: 15px;
  border-radius: 50% !important;
  display: flex; align-items: center; justify-content: center;
}

/* Hambúrguer */
.header__hamburger {
  display: none;
  flex-direction: column; gap: 5px;
  cursor: pointer; background: none; border: none; padding: 4px;
}
.header__hamburger span {
  display: block; width: 22px; height: 2px;
  background: #fff; transition: all 0.3s ease;
}
.header__hamburger--active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.header__hamburger--active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.header__hamburger--active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu */
.header__mobile-menu {
  position: fixed;
  top: 70px; left: 0; right: 0;
  background: rgba(11, 11, 11, 0.98);
  backdrop-filter: blur(16px);
  padding: 20px 24px 40px;
  display: flex; flex-direction: column;
  z-index: 999;
  border-bottom: 1px solid #1a1a1a;
}
.header__mobile-link {
  font-size: 16px; font-weight: 800;
  color: #666; text-transform: uppercase;
  letter-spacing: 1.5px; text-decoration: none;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: color 0.2s ease;
}
.header__mobile-link:hover,
.header__mobile-link--active { color: #fff; }

/* Transições do Dropdown */
.slide-down-enter-active,
.slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from,
.slide-down-leave-to { opacity: 0; transform: translateY(-10px); }

/* Grid de Responsividade */
@media (max-width: 900px) {
  .header__nav { display: none; }
  .header__hamburger { display: flex; }
}
@media (max-width: 580px) {
  /* Oculta botões menos importantes em mobile compacto para não amassar o topo */
  .header__action-btn:nth-child(2),
  .header__action-btn:nth-child(3) {
    display: none;
  }
}
</style>