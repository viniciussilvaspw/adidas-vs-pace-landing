<script setup lang="ts">
// ─────────────────────────────────────────────
// COMPONENTES
// ─────────────────────────────────────────────
import HeaderPrincipal from './components/HeaderPrincipal.vue'
import HeroSection from './components/HeroSection.vue'
import SeacaoDiferenciais from './components/SeacaoDiferenciais.vue'
import SeacaoLifestyle from './components/SeacaoLifestyle.vue'
import SeacaoDetalhesTecnicos from './components/SeacaoDetalhesTecnicos.vue'
import VitrineCores from './components/VitrineCores.vue'
import BannerLogistica from './components/BannerLogistica.vue'
import MosaicoSocial from './components/MosaicoSocial.vue'
import RodapePrincipal from './components/RodapePrincipal.vue'
</script>

<template>
  <div class="app-container">
    
    <!-- HEADER -->
    <HeaderPrincipal />

    <!-- MAIN -->
    <main class="main-content">
      <HeroSection />

      <SeacaoDiferenciais />

      <SeacaoLifestyle />

      <SeacaoDetalhesTecnicos />

      <VitrineCores />

      <BannerLogistica />

      <MosaicoSocial />
    </main>

    <!-- FOOTER -->
    <RodapePrincipal />

  </div>
</template>

<style scoped>
/* ─────────────────────────────────────────────
   APP LAYOUT
───────────────────────────────────────────── */
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: #000;
}

/* MAIN */
.main-content {
  flex: 1;
  width: 100%;
}
</style>