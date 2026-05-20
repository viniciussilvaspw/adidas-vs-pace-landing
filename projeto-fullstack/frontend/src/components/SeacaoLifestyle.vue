<template>
  <section
    id="lifestyle"
    class="lifestyle"
    aria-labelledby="lifestyle-titulo"
  >
    <!-- CONTAINER GLOBAL (CORRETO) -->
    <div class="container lifestyle__grid">

      <!-- ESQUERDA -->
      <div class="lifestyle__esquerda">
        <div class="lifestyle__texto">

          <p class="lifestyle__eyebrow">
            {{ eyebrow }}
          </p>

          <h2
            id="lifestyle-titulo"
            class="lifestyle__titulo"
            v-html="tituloHtml"
          ></h2>

          <p class="lifestyle__desc">
            {{ descricao }}
          </p>

          <a :href="ctaHref" class="btn-comprar">
            {{ ctaLabel }}
            <i class="fas fa-arrow-right" aria-hidden="true"></i>
          </a>

        </div>
      </div>

      <!-- DIREITA -->
      <div
        v-if="fotos && fotos.length >= 3"
        class="lifestyle__direita"
        aria-label="Fotos de estilo de vida"
      >
        <div class="lifestyle__photo lifestyle__photo--grande">
          <img :src="fotos[0].src" :alt="fotos[0].alt" />
        </div>

        <div class="lifestyle__photo">
          <img :src="fotos[1].src" :alt="fotos[1].alt" />
        </div>

        <div class="lifestyle__photo">
          <img :src="fotos[2].src" :alt="fotos[2].alt" />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import fotoLifestyle01 from '../assets/image/lifestyle-photo.png'
import fotoLifestyle02 from '../assets/image/adidas-lifesty-01.png'
import fotoLifestyleSkate from '../assets/image/adidas-lifesty-02.png'

interface FotoLifestyle {
  src: string
  alt: string
}

withDefaults(
  defineProps<{
    eyebrow?: string
    tituloHtml?: string
    descricao?: string
    ctaLabel?: string
    ctaHref?: string
    fotos?: FotoLifestyle[]
  }>(),
  {
    eyebrow: 'Para todas as ocasiões',
    tituloHtml: 'Estilo que<br>Acompanha<br>Você',
    descricao:
      'Do casual ao urbano, o VS Pace 2.0 é o tênis ideal para todas as ocasiões.',
    ctaLabel: 'Comprar Agora',
    ctaHref: '#comprar',
    fotos: () => [
      { src: fotoLifestyle01, alt: 'Lifestyle 1' },
      { src: fotoLifestyle02, alt: 'Lifestyle 2' },
      { src: fotoLifestyleSkate, alt: 'Lifestyle 3' }
    ]
  }
)
</script>

<style scoped>
/* =========================
   SECTION BASE
========================= */
.lifestyle {
  width: 100%;
  background: #f7f7f7;
}

/* =========================
   GRID PRINCIPAL (CORRETO)
========================= */
.lifestyle__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;

  width: 100%;
  min-height: 700px;

  align-items: stretch;
}

/* =========================
   ESQUERDA
========================= */
.lifestyle__esquerda {
  display: flex;
  align-items: center;
}

.lifestyle__texto {
  max-width: 420px;
}

/* =========================
   TEXTO
========================= */
.lifestyle__eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #888;
  margin-bottom: 18px;
  text-transform: uppercase;
}

.lifestyle__titulo {
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -2px;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.lifestyle__desc {
  font-size: 14px;
  line-height: 1.9;
  color: #777;
  margin-bottom: 40px;
}

/* =========================
   BOTÃO
========================= */
.btn-comprar {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;

  padding: 16px 30px;
  background: #000;
  color: #fff;

  border: 2px solid #000;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;

  transition: 0.3s ease;
}

.btn-comprar:hover {
  background: transparent;
  color: #000;
  transform: translateY(-2px);
}

/* =========================
   DIREITA (GRID VISUAL)
========================= */
.lifestyle__direita {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  gap: 4px;
}

/* imagem grande ocupa 2 linhas */
.lifestyle__photo--grande {
  grid-row: 1 / 3;
}

/* imagens */
.lifestyle__photo {
  overflow: hidden;
  background: #111;
}

.lifestyle__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.lifestyle__photo:hover img {
  transform: scale(1.06);
}

/* =========================
   RESPONSIVO
========================= */
@media (max-width: 1000px) {
  .lifestyle__grid {
    grid-template-columns: 1fr;
  }

  .lifestyle__direita {
    min-height: 600px;
  }

  .lifestyle__texto {
    max-width: 100%;
  }
}

@media (max-width: 700px) {
  .lifestyle__direita {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .lifestyle__photo--grande {
    grid-row: auto;
  }
}
</style>