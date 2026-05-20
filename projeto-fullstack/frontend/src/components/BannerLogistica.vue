<template>
  <section class="logistica" aria-label="Benefícios de compra">
    <div class="container">
      <ul class="logistica__grid" role="list">
        <li
          v-for="item in beneficios"
          :key="item.id"
          class="logistica-item"
          role="listitem"
        >
          <i
            :class="item.icone"
            class="logistica-item__icone"
            aria-hidden="true"
          ></i>
          <div>
            <p class="logistica-item__titulo">{{ item.titulo }}</p>
            <p class="logistica-item__desc">{{ item.subtitulo }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Interface local que resolve definitivamente o erro de falta de módulo externo
interface BeneficioLogistico {
  id: number
  icone: string
  titulo: string
  subtitulo: string
}

// Array de dados reativos perfeitamente tipado e mapeado para o template
const beneficios = ref<BeneficioLogistico[]>([
  {
    id: 1,
    icone: 'fas fa-truck',
    titulo: 'FRETE GRÁTIS',
    subtitulo: 'Para compras acima de R$ 299'
  },
  {
    id: 2,
    icone: 'fas fa-arrows-rotate',
    titulo: 'TROCA GRÁTIS',
    subtitulo: 'Até 30 dias para devolver'
  },
  {
    id: 3,
    icone: 'fas fa-percent',
    titulo: '10% OFF NA PRIMEIRA COMPRA',
    subtitulo: 'Assine a nossa newsletter'
  },
  {
    id: 4,
    icone: 'fas fa-credit-card',
    titulo: 'PARCELAMENTO',
    subtitulo: 'Em até 10x sem juros'
  }
])
</script>

<style scoped>
.logistica {
  background: #f7f7f7;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 40px 0;
  width: 100%;
}

.logistica__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  list-style: none;
}

.logistica-item {
  display: flex; 
  align-items: center; 
  gap: 16px;
}

.logistica-item__icone {
  font-size: 20px; 
  color: #000;
  flex-shrink: 0; 
  width: 28px;
  text-align: center;
}

.logistica-item__titulo {
  font-size: 11px; 
  font-weight: 800;
  text-transform: uppercase; 
  letter-spacing: 1.5px;
  color: #000; 
  margin-bottom: 4px;
}

.logistica-item__desc {
  font-size: 11px; 
  color: #888;
  line-height: 1.4;
}

/* ── RESPONSIVIDADE DE ALTA PERFORMANCE ─────────────────────── */
@media (max-width: 900px) {
  .logistica__grid { 
    grid-template-columns: repeat(2, 1fr); 
    gap: 28px; 
  }
}

@media (max-width: 480px) {
  .logistica__grid { 
    grid-template-columns: 1fr; 
    gap: 24px; 
  }
}
</style>