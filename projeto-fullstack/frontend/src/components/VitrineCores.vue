<template>
  <section id="comprar" class="vitrine" aria-labelledby="vitrine-titulo">
    <div class="container">

      <div class="vitrine__header">
        <h2 id="vitrine-titulo" class="vitrine__titulo u-uppercase">
          Escolha o Seu
        </h2>
      </div>

      <div class="vitrine__grid" role="list">
        <article
          v-for="produto in produtos"
          :key="produto.id"
          class="produto-card"
          role="listitem"
          :aria-label="`${produto.nome} — ${formatarPreco(produto.preco)}`"
        >
          <div
            class="produto-card__img-wrap"
            @mouseenter="imagemAtiva[produto.id] = produto.imagemHover"
            @mouseleave="imagemAtiva[produto.id] = produto.imagemPrincipal"
          >
            <img
              :src="imagemAtiva[produto.id] ?? produto.imagemPrincipal"
              :alt="`${produto.nome} — imagem do produto`"
              class="produto-card__img"
              width="420" height="280"
              loading="lazy"
            />
          </div>

          <p class="produto-card__nome u-uppercase">{{ produto.nome }}</p>

          <p class="produto-card__preco">{{ formatarPreco(produto.preco) }}</p>

          <p class="produto-card__parcelas">
            ou {{ produto.parcelas }}x de
            {{ formatarPreco(produto.preco / produto.parcelas) }} sem juros
          </p>

          <div class="produto-card__swatches" role="list" aria-label="Variações de cor">
            <span
              v-for="swatch in produto.swatches"
              :key="swatch.label"
              class="swatch"
              :style="{ backgroundColor: swatch.cor }"
              :title="swatch.label"
              role="listitem"
              :aria-label="swatch.label"
            ></span>
          </div>

          <a
            :href="produto.linkCompra"
            class="produto-card__cta"
            :aria-label="`Adicionar ${produto.nome} à sacola`"
          >
            <i class="fas fa-shopping-bag" aria-hidden="true"></i>
            Adicionar à Sacola
          </a>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// ── IMPORTAÇÕES DE MÓDULO EXPLICITAS PARA O VITE ──────────────
import imgBrancoPreto from '../assets/image/cores/adidas-branco-preto.png'
import imgPretoBranco from '../assets/image/cores/adidas-preto-branco.png'
// Corrigido: Agora o Vite vai mapear, criar o hash e renderizar este arquivo físico
import imgMarinhoBranco from '../assets/image/cores/adidas-marinho-branco.png'

// ── INTERFACES LOCAIS ─────────────────────────────────────────
interface Swatch {
  cor: string
  label: string
}

interface Produto {
  id: number
  nome: string
  slug: string
  imagemPrincipal: string
  imagemHover: string
  preco: number
  parcelas: number
  swatches: Swatch[]
  linkCompra: string
}

// ── UTILITÁRIO ────────────────────────────────────────────────
function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// ── ESTADO: imagem ativa por produto (hover) ──────────────────
const imagemAtiva = reactive<Record<number, string>>({})

// ── DADOS REATIVOS ATUALIZADOS ────────────────────────────────
const produtos = ref<Produto[]>([
  {
    id: 1,
    nome: 'Branco / Preto',
    slug: 'vs-pace-branco-preto',
    imagemPrincipal: imgBrancoPreto, 
    imagemHover:     imgBrancoPreto, 
    preco: 299.99,
    parcelas: 10,
    swatches: [
      { cor: '#ffffff', label: 'Branco' },
      { cor: '#111111', label: 'Preto'  },
    ],
    linkCompra: '#checkout-branco-preto',
  },
  {
    id: 2,
    nome: 'Preto / Branco',
    slug: 'vs-pace-preto-branco',
    imagemPrincipal: imgPretoBranco, 
    imagemHover:     imgPretoBranco, 
    preco: 299.99,
    parcelas: 10,
    swatches: [
      { cor: '#111111', label: 'Preto'  },
      { cor: '#ffffff', label: 'Branco' },
    ],
    linkCompra: '#checkout-preto-branco',
  },
  {
    id: 3,
    nome: 'Marinho / Branco',
    slug: 'vs-pace-marinho-branco',
    // Injetando de forma limpa a variável do módulo importado
    imagemPrincipal: imgMarinhoBranco,
    imagemHover:     imgMarinhoBranco, 
    preco: 299.99,
    parcelas: 10,
    swatches: [
      { cor: '#1a2340', label: 'Marinho' },
      { cor: '#ffffff', label: 'Branco'  },
    ],
    linkCompra: '#checkout-marinho-branco',
  },
])
</script>

<style scoped>
.vitrine {
  background: #fff;
  padding: 100px 0;
  width: 100%;
}

.container { max-width: 1300px; margin: 0 auto; padding: 0 24px; }

/* Cabeçalho */
.vitrine__header { text-align: center; margin-bottom: 60px; }
.vitrine__titulo {
  font-size: clamp(20px, 2.5vw, 34px);
  font-weight: 900; letter-spacing: 4px;
  position: relative; display: inline-block;
  padding-bottom: 18px;
}
.vitrine__titulo::after {
  content: '';
  position: absolute; bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 36px; height: 2px; background: #000;
}

.u-uppercase { text-transform: uppercase; }

/* Grid */
.vitrine__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Card */
.produto-card {
  background: #f7f7f7;
  padding: 40px 24px 28px;
  text-align: center;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid transparent;
}
.produto-card:hover {
  border-color: #ddd;
  box-shadow: 0 6px 28px rgba(0,0,0,0.08);
}

/* Imagem */
.produto-card__img-wrap {
  height: 200px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 28px; overflow: hidden;
}
.produto-card__img {
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
}
.produto-card:hover .produto-card__img { transform: scale(1.06); }

/* Textos */
.produto-card__nome {
  font-size: 10px; font-weight: 800;
  letter-spacing: 2px; color: #000;
  margin-bottom: 12px;
}
.produto-card__preco {
  font-size: 22px; font-weight: 900;
  color: #000; margin-bottom: 6px;
}
.produto-card__parcelas {
  font-size: 11px; color: #999;
  margin-bottom: 20px;
}

/* Swatches */
.produto-card__swatches {
  display: flex; justify-content: center; gap: 8px;
  margin-bottom: 24px;
}
.swatch {
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(0,0,0,0.15);
  display: inline-block;
  transition: transform 0.2s ease;
  cursor: default;
}
.swatch:hover { transform: scale(1.3); }

/* CTA */
.produto-card__cta {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 13px 0;
  background: #000; color: #fff;
  font-family: inherit; font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.8px;
  text-decoration: none; border-radius: 0;
  border: 2px solid #000;
  transition: background 0.3s ease;
}
.produto-card__cta:hover { background: #333; }

/* ── RESPONSIVE ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  .vitrine__grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .vitrine__grid { grid-template-columns: 1fr; }
}
</style>