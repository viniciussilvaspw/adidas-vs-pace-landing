<template>
  <!-- ============================================================
       HeroSection.vue
       Hero premium adidas com carrossel no H1
  ============================================================ -->
  <section
    id="home"
    class="hero"
    aria-label="Apresentação do produto"
  >
    <div class="container">

      <!-- ── CONTEÚDO ───────────────────────────────────── -->
      <div class="hero__content">

        <!-- EYEBROW -->
        <p class="hero__eyebrow">
          {{ eyebrow }}
        </p>

        <!-- TÍTULO COM CARROSSEL -->
        <div class="hero__title-wrapper">

          <!-- TEXTO FIXO -->
          <h1 class="hero__title">
            VS PACE
          </h1>

          <!-- TEXTO DINÂMICO -->
          <div class="hero__title-slider">

            <transition
              name="fade-slide"
              mode="out-in"
            >
              <h1
                :key="fraseAtual"
                class="hero__title hero__title--dynamic"
              >
                {{ frases[fraseAtual] }}
              </h1>
            </transition>

          </div>

        </div>

        <!-- SUBTITLE -->
        <p class="hero__subtitle">
          {{ subtitle }}
        </p>

        <!-- DESCRIÇÃO -->
        <p class="hero__desc">
          {{ descricao }}
        </p>

        <!-- BOTÕES -->
        <div
          class="hero__cta-group"
          role="group"
          aria-label="Ações principais"
        >
          <a
            :href="ctaPrimario.href"
            class="btn btn--primary"
          >
            {{ ctaPrimario.label }}

            <i
              class="fas fa-arrow-right"
              aria-hidden="true"
            ></i>
          </a>

          <a
            :href="ctaSecundario.href"
            class="btn btn--outline"
          >
            {{ ctaSecundario.label }}
          </a>
        </div>

      </div>

      <!-- ── VISUAL ─────────────────────────────────────── -->
      <div
        class="hero__visual"
        aria-hidden="true"
      >

        <!-- IMAGEM -->
        <img
          class="hero__shoe"
          src="../assets/image/adidas-hero.png"
          :alt="imagemAlt"
          width="800"
          height="600"
          loading="eager"
          fetchpriority="high"
        />

        <!-- BADGE -->
        <div
          class="hero__badge"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                id="badge-arc"
                d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
              />
            </defs>

            <text
              font-size="7.5"
              font-family="Montserrat, sans-serif"
              font-weight="700"
              fill="rgba(255,255,255,0.55)"
              letter-spacing="3.2"
            >
              <textPath href="#badge-arc">
                {{ badgeTexto }}
              </textPath>
            </text>
          </svg>
        </div>

        <!-- INDICADOR -->
        <div
          class="hero__indicators"
          aria-label="Indicador de slide"
        >
          <span class="hero__ind-num">
            01
          </span>

          <div
            class="hero__ind-track"
            role="progressbar"
            aria-valuenow="33"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="hero__ind-fill"></div>
          </div>

          <span class="hero__ind-num">
            03
          </span>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

/* ── INTERFACES ───────────────────────────────────────── */
interface CtaButton {
  label: string
  href: string
}

/* ── PROPS ────────────────────────────────────────────── */
withDefaults(
  defineProps<{
    eyebrow?: string
    subtitle?: string
    descricao?: string
    imagemAlt?: string
    badgeTexto?: string
    ctaPrimario?: CtaButton
    ctaSecundario?: CtaButton
  }>(),
  {
    eyebrow: 'adidas',

    subtitle:
      'Clássico. Versátil. Atemporal.',

    descricao:
      'O estilo que combina com tudo. Design clean, conforto o dia todo e a qualidade adidas que você já conhece.',

    imagemAlt:
      'Tênis VS Pace 2.0 — vista lateral em perspectiva',

    badgeTexto:
      'NUNCA.RI.DO.ESTILO • VS PACE 2.0 • ',

    ctaPrimario: () => ({
      label: 'Comprar Agora',
      href: '#colors'
    }),

    ctaSecundario: () => ({
      label: 'Ver Detalhes',
      href: '#specs'
    })
  }
)

/* ── FRASES DO CARROSSEL ─────────────────────────────── */
const frases = [
  '2.0',
  'Street',
  'Classic'
]

const fraseAtual = ref(0)

let intervalId: number

onMounted(() => {
  intervalId = window.setInterval(() => {
    fraseAtual.value =
      (fraseAtual.value + 1) % frases.length
  }, 2500)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
/* ── HERO ─────────────────────────────────────────────── */
.hero {
  min-height: 100vh;

  background:
    linear-gradient(
      135deg,
      #181818 0%,
      #000 60%,
      #0a0a0a 100%
    );

  position: relative;

  overflow: hidden;

  padding-top: 70px;
}

.hero::before {
  content: '';

  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      ellipse 60% 70% at 70% 50%,
      rgba(255,255,255,0.035) 0%,
      transparent 70%
    );

  pointer-events: none;
}

/* ── CONTAINER ───────────────────────────────────────── */
.container {
  max-width: 1300px;

  margin: 0 auto;

  padding: 0 24px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  align-items: center;

  min-height: calc(100vh - 70px);

  gap: 40px;
}

/* ── CONTEÚDO ────────────────────────────────────────── */
.hero__content {
  padding: 80px 0;

  position: relative;

  z-index: 2;
}

.hero__eyebrow {
  font-size: 11px;

  font-weight: 600;

  text-transform: uppercase;

  letter-spacing: 4px;

  color: #666;

  margin-bottom: 14px;
}

/* ── TÍTULO ──────────────────────────────────────────── */
.hero__title-wrapper {
  margin-bottom: 26px;
}

.hero__title {
  font-size: clamp(58px, 7vw, 110px);

  font-weight: 900;

  color: #fff;

  line-height: 0.9;

  text-transform: uppercase;

  letter-spacing: -4px;
}

/* ÁREA DO CARROSSEL */
.hero__title-slider {
  position: relative;

  height: 110px;

  overflow: hidden;
}

/* TEXTO DINÂMICO */
.hero__title--dynamic {
  position: absolute;

  left: 0;
  top: 0;

  color: #5f5f5f;
}

/* ── ANIMAÇÃO ────────────────────────────────────────── */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(25px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}

/* ── SUBTITLE ───────────────────────────────────────── */
.hero__subtitle {
  font-size: 12px;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 3.5px;

  color: #aaa;

  margin-bottom: 28px;
}

/* ── DESCRIÇÃO ─────────────────────────────────────── */
.hero__desc {
  font-size: 14px;

  color: #666;

  line-height: 1.8;

  max-width: 340px;

  margin-bottom: 44px;
}

/* ── BOTÕES ─────────────────────────────────────────── */
.hero__cta-group {
  display: flex;

  gap: 12px;

  flex-wrap: wrap;
}

.btn {
  display: inline-flex;

  align-items: center;

  gap: 10px;

  padding: 14px 28px;

  font-size: 11px;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 2px;

  text-decoration: none;

  transition: all 0.3s ease;
}

.btn--primary {
  background: #fff;

  color: #000;

  border: 2px solid #fff;
}

.btn--primary:hover {
  background: transparent;

  color: #fff;
}

.btn--outline {
  background: transparent;

  color: #fff;

  border: 2px solid rgba(255,255,255,0.35);
}

.btn--outline:hover {
  border-color: #fff;

  background: rgba(255,255,255,0.06);
}

/* ── VISUAL ─────────────────────────────────────────── */
.hero__visual {
  position: relative;

  display: flex;

  align-items: center;

  justify-content: center;

  min-height: 520px;
}

.hero__shoe {
  width: 110%;

  max-width: 680px;

  object-fit: contain;

  transform:
    rotate(-8deg)
    translateX(40px);

  filter:
    drop-shadow(
      0 40px 80px rgba(0,0,0,0.65)
    );

  transition: transform 0.6s ease;
}

.hero__shoe:hover {
  transform:
    rotate(-5deg)
    translateX(28px)
    scale(1.03);
}

/* ── BADGE ──────────────────────────────────────────── */
.hero__badge {
  position: absolute;

  top: 18%;
  right: 0;

  width: 92px;
  height: 92px;

  border: 1px solid rgba(255,255,255,0.18);

  border-radius: 50%;

  animation: spin-badge 18s linear infinite;

  display: flex;

  align-items: center;

  justify-content: center;
}

.hero__badge svg {
  width: 100%;
  height: 100%;
}

@keyframes spin-badge {
  to {
    transform: rotate(360deg);
  }
}

/* ── INDICADORES ────────────────────────────────────── */
.hero__indicators {
  position: absolute;

  bottom: 32px;
  left: 50%;

  transform: translateX(-50%);

  display: flex;

  align-items: center;

  gap: 14px;
}

.hero__ind-num {
  font-size: 10px;

  font-weight: 700;

  letter-spacing: 2px;

  color: #555;
}

.hero__ind-track {
  width: 80px;

  height: 1px;

  background: rgba(255,255,255,0.1);

  overflow: hidden;

  position: relative;
}

.hero__ind-fill {
  position: absolute;

  top: 0;
  left: 0;

  width: 40%;
  height: 100%;

  background: #fff;
}

/* ── RESPONSIVO ─────────────────────────────────────── */
@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;

    text-align: center;

    padding-bottom: 40px;
  }

  .hero__desc {
    margin-inline: auto;
  }

  .hero__cta-group {
    justify-content: center;
  }

  .hero__visual {
    min-height: 300px;
  }

  .hero__shoe {
    width: 80%;

    transform: rotate(-4deg);
  }

  .hero__shoe:hover {
    transform:
      rotate(-2deg)
      scale(1.02);
  }

  .hero__badge,
  .hero__indicators {
    display: none;
  }

  .hero__title-slider {
    height: 70px;
  }

  .hero__title--dynamic {
    left: 50%;

    transform: translateX(-50%);
  }
}
</style>