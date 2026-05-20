<template>
  <section id="diferenciais" class="diferenciais" aria-labelledby="seacao-diferenciais-titulo">
    <div class="container">
      <div class="diferenciais__inner">

        <div class="diferenciais__grid" role="list">
          <article
            v-for="item in diferenciais"
            :key="item.id"
            class="diferencial-card"
            role="listitem"
          >
            <i
              :class="item.icone"
              class="diferencial-card__icon"
              aria-hidden="true"
            ></i>

            <h3 :id="item.id === 1 ? 'seacao-diferenciais-titulo' : undefined" class="diferencial-card__titulo">
              {{ item.titulo }}
            </h3>

            <p class="diferencial-card__desc">
              {{ item.descricao }}
            </p>
          </article>
        </div>

        <div class="diferenciais__visual">
          <img
            :src="imagemDetalhe"
            :alt="imagemDetalheAlt"
            class="diferenciais__foto"
            width="280"
            height="320"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 1. Importando a imagem como módulo para o Vite processar o hash do arquivo físico
import imagemSolaPadrao from '../assets/image/adidas-detalhe.png'

interface Diferencial {
  id: number
  icone: string
  titulo: string
  descricao: string
}

// 2. Passando a referência importada direto nas propriedades padrão
withDefaults(defineProps<{
  imagemDetalhe?:    string
  imagemDetalheAlt?: string
}>(), {
  imagemDetalhe:    imagemSolaPadrao, // Variável de escopo, sem aspas textuais
  imagemDetalheAlt: 'Detalhe da sola do VS Pace 2.0',
})

// 3. Array completo de diferenciais restaurado
const diferenciais = ref<Diferencial[]>([
  {
    id: 1,
    icone:    'far fa-circle-check',
    titulo:   'Conforto Durável',
    descricao: 'Palmilha macia que proporciona leveza e bem-estar durante todo o dia.',
  },
  {
    id: 2,
    icone:    'fas fa-shoe-prints',
    titulo:   'Design Clean',
    descricao: 'Visual minimalista e esportivo que combina com qualquer estilo.',
  },
  {
    id: 3,
    icone:    'fas fa-shield-halved',
    titulo:   'Resistência',
    descricao: 'Materiais de alta qualidade para mais durabilidade no seu uso diário.',
  },
  {
    id: 4,
    icone:    'fas fa-grip',
    titulo:   'Aderência',
    descricao: 'Solado em borracha que garante mais segurança em cada passo.',
  },
])
</script>

<style scoped>
.diferenciais {
  background: #fff;
  padding: 88px 0;
  width: 100%;
}

.diferenciais__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 56px;
  align-items: center;
}

/* Grid de cards */
.diferenciais__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

/* Card individual */
.diferencial-card { text-align: center; padding: 0 8px; }

.diferencial-card__icon {
  font-size: 26px;
  color: #000;
  opacity: 0.7;
  display: block;
  margin-bottom: 18px;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.diferencial-card:hover .diferencial-card__icon {
  opacity: 1;
  transform: translateY(-3px);
}

.diferencial-card__titulo {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #000;
  margin-bottom: 12px;
}

.diferencial-card__desc {
  font-size: 12px;
  color: #888;
  line-height: 1.75;
}

/* Imagem lateral */
.diferenciais__visual {
  width: 280px;
  height: 320px;
  overflow: hidden;
  flex-shrink: 0;
}
.diferenciais__foto {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.diferenciais__visual:hover .diferenciais__foto {
  transform: scale(1.04);
}

/* ── RESPONSIVE ─────────────────────────────────────────────── */
@media (max-width: 1100px) {
  .diferenciais__grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
}
@media (max-width: 900px) {
  .diferenciais__inner { grid-template-columns: 1fr; }
  .diferenciais__visual { width: 100%; height: 200px; }
  .diferenciais__foto { object-position: center 30%; }
}
@media (max-width: 600px) {
  .diferenciais__grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
}
</style>