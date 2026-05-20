<template>
  <section
    id="vitrine"
    class="social"
    aria-labelledby="social-titulo"
  >
    <div class="container">

      <!-- HEADER -->
      <div class="social__header">
        <div>
          <p class="social__eyebrow">
            {{ eyebrow }}
          </p>

          <h2
            id="social-titulo"
            class="social__titulo"
          >
            {{ hashtag }}
          </h2>
        </div>

        <a
          :href="ctaHref"
          class="btn-social"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ ctaLabel }}

          <i
            class="fas fa-arrow-right"
            aria-hidden="true"
          ></i>
        </a>
      </div>

      <!-- GRID -->
      <div
        v-if="fotos.length"
        class="social__grid"
        role="list"
        aria-label="Feed do Instagram"
      >
        <a
          v-for="foto in fotos"
          :key="foto.id"
          :href="foto.href"
          class="social__foto"
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          :aria-label="`Ver no Instagram: ${foto.alt}`"
        >
          <!-- IMAGEM -->
          <img
            :src="foto.src"
            :alt="foto.alt"
            class="social__foto-img"
            loading="lazy"
          />

          <!-- OVERLAY -->
          <div
            class="social__overlay"
            aria-hidden="true"
          >
            <i class="fab fa-instagram"></i>
          </div>
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import mosaico01 from '../assets/image/mosaico/mosaico-01.png'
import mosaico02 from '../assets/image/mosaico/mosaico-02.png'
import mosaico03 from '../assets/image/mosaico/mosaico-03.png'
import mosaico04 from '../assets/image/mosaico/mosaico-04.png'
import mosaico05 from '../assets/image/mosaico/mosaico-05.png'

/* INTERFACE */
interface FotoSocial {
  id: number
  src: string
  alt: string
  href: string
}

/* PROPS */
withDefaults(
  defineProps<{
    eyebrow?: string
    hashtag?: string
    ctaLabel?: string
    ctaHref?: string
  }>(),
  {
    eyebrow: 'Inspiração que move',
    hashtag: '#AdidasBrasil',
    ctaLabel: 'Ver Mais Looks',
    ctaHref: 'https://instagram.com/adidasbrasil'
  }
)

/* DADOS */
const fotos = ref<FotoSocial[]>([
  {
    id: 1,
    src: mosaico01,
    alt: 'Look urbano 1 com VS Pace 2.0',
    href: '#'
  },

  {
    id: 2,
    src: mosaico02,
    alt: 'Look urbano 2 com VS Pace 2.0',
    href: '#'
  },

  {
    id: 3,
    src: mosaico03,
    alt: 'Look urbano 3 com VS Pace 2.0',
    href: '#'
  },

  {
    id: 4,
    src: mosaico04,
    alt: 'Look urbano 4 com VS Pace 2.0',
    href: '#'
  },

  {
    id: 5,
    src: mosaico05,
    alt: 'Look urbano 5 com VS Pace 2.0',
    href: '#'
  }
])
</script>

<style scoped>
.social {
  width: 100%;
  padding: 100px 0;

  background: #000;
}

/* CONTAINER */
.container {
  width: 100%;
  max-width: 1380px;

  margin: 0 auto;
  padding: 0 5%;
}

/* HEADER */
.social__header {
  display: flex;
  align-items: end;
  justify-content: space-between;

  gap: 30px;

  margin-bottom: 45px;
}

.social__eyebrow {
  margin-bottom: 12px;

  font-size: 0.72rem;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 3px;

  color: #666;
}

.social__titulo {
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 900;

  line-height: 1;

  text-transform: uppercase;

  color: #fff;
}

/* BOTÃO */
.btn-social {
  display: inline-flex;
  align-items: center;
  gap: 12px;

  height: 54px;

  padding: 0 28px;

  border: 1px solid rgba(255, 255, 255, 0.3);

  color: #fff;

  text-decoration: none;

  font-size: 0.75rem;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 2px;

  transition: 0.3s ease;
}

.btn-social:hover {
  background: #fff;
  color: #000;
}

/* GRID */
.social__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  gap: 4px;
}

/* FOTO */
.social__foto {
  position: relative;

  aspect-ratio: 1 / 1;

  overflow: hidden;

  background: #111;

  display: block;
}

/* IMAGEM */
.social__foto-img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;

  transition:
    transform 0.45s ease,
    opacity 0.45s ease;
}

.social__foto:hover .social__foto-img {
  transform: scale(1.08);
  opacity: 0.55;
}

/* OVERLAY */
.social__overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;

  transition: opacity 0.3s ease;

  pointer-events: none;
}

.social__overlay i {
  font-size: 2rem;

  color: #fff;
}

.social__foto:hover .social__overlay {
  opacity: 1;
}

/* RESPONSIVO */
@media (max-width: 1000px) {
  .social__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .social {
    padding: 80px 0;
  }

  .social__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .social__titulo {
    font-size: 2.8rem;
  }
}

@media (max-width: 580px) {
  .social__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .btn-social {
    width: 100%;
    justify-content: center;
  }
}
</style>