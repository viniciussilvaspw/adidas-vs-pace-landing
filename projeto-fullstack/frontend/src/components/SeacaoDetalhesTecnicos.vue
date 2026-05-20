<template>
  <section id="detalhes" class="specs" aria-labelledby="specs-titulo">

    <div class="specs__visual">
      <img
        :src="imagemCloseup"
        :alt="imagemCloseupAlt"
        class="specs__foto"
        width="650"
        height="500"
        loading="lazy"
      />
    </div>

    <div class="specs__conteudo">
      <p class="specs__eyebrow">{{ eyebrow }}</p>

      <h2 id="specs-titulo" class="specs__titulo" v-html="tituloHtml"></h2>

      <ul class="specs__lista" role="list">
        <li
          v-for="spec in especificacoes"
          :key="spec.id"
          class="spec-item"
          role="listitem"
        >
          <i class="fas fa-check spec-item__icone" aria-hidden="true"></i>
          <span class="spec-item__texto">{{ spec.texto }}</span>
        </li>
      </ul>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 1. Importação explícita do arquivo físico para o Vite compilar corretamente
import imgQualidadePadrao from '../assets/image/adidas-qualidade.png'

// Declaração local da interface
interface Especificacao {
  id: number
  texto: string
}

// ── PROPS COM INJEÇÃO ESTÁTICA DO VITE ────────────────────────
withDefaults(defineProps<{
  eyebrow?:          string
  tituloHtml?:       string
  imagemCloseup?:    string
  imagemCloseupAlt?: string
}>(), {
  eyebrow:         'Detalhes que fazem a diferença',
  tituloHtml:      'Qualidade em<br>Cada Detalhe',
  imagemCloseup:    imgQualidadePadrao, // Variável injetada sem aspas textuais
  imagemCloseupAlt: 'VS Pace 2.0 — closeup em alta definição',
})

// ── DADOS REATIVOS TIPIFICADOS LOCALMENTE ─────────────────────
const especificacoes = ref<Especificacao[]>([
  { id: 1, texto: 'Cabedal em material sintético resistente' },
  { id: 2, texto: 'Forro interno em tecido macio' },
  { id: 3, texto: 'Fechamento em cadarço para ajuste perfeito' },
  { id: 4, texto: 'Solado de borracha vulcanizada' },
  { id: 5, texto: 'Logo adidas lateral e na língua' },
])
</script>

<style scoped>
.specs {
  background: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
  width: 100%;
}

/* ── VISUAL ─────────────────────────────────────────────────── */
.specs__visual { overflow: hidden; position: relative; }
.specs__foto {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: brightness(0.82);
  transition: filter 0.4s ease, transform 0.5s ease;
  display: block;
}
.specs__visual:hover .specs__foto {
  filter: brightness(0.95);
  transform: scale(1.03);
}

/* ── CONTEÚDO ───────────────────────────────────────────────── */
.specs__conteudo {
  display: flex; flex-direction: column; justify-content: center;
  padding: 80px 64px;
}
.specs__eyebrow {
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 4px;
  color: #555; margin-bottom: 14px;
}
.specs__titulo {
  font-size: clamp(28px, 2.5vw, 44px);
  font-weight: 900; color: #fff;
  text-transform: uppercase;
  line-height: 1.04; letter-spacing: -1px;
  margin-bottom: 44px;
}

/* Lista de specs */
.specs__lista { display: flex; flex-direction: column; gap: 0; }

.spec-item {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.25s ease;
}
.spec-item:first-child { border-top: 1px solid rgba(255, 255, 255, 0.06); }

.spec-item__icone {
  color: #fff; font-size: 12px;
  margin-top: 2px; flex-shrink: 0;
}
.spec-item__texto {
  font-size: 13px; color: #ccc; line-height: 1.5;
}

/* ── RESPONSIVE ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  .specs { grid-template-columns: 1fr; }
  .specs__visual { min-height: 260px; }
  .specs__conteudo { padding: 60px 32px; }
}
@media (max-width: 480px) {
  .specs__conteudo { padding: 48px 20px; }
}
</style>