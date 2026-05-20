<template>
  <!-- ============================================================
       RodapePrincipal.vue
       Rodapé corporativo 4 colunas — integrado ao backend de newsletter.
  ============================================================ -->
  <footer class="rodape" aria-label="Rodapé da página">
    <div class="rodape__inner">

      <!-- ── GRID DE COLUNAS ─────────────────────────────────── -->
      <div class="rodape__grid">
        <nav
          v-for="coluna in colunas"
          :key="coluna.id"
          class="rodape-col"
          :aria-label="`Links de ${coluna.titulo}`"
        >
          <h4 class="rodape-col__titulo u-uppercase">{{ coluna.titulo }}</h4>
          <ul class="rodape-col__lista" role="list">
            <li v-for="link in coluna.links" :key="link.href" role="listitem">
              <a :href="link.href" class="rodape-col__link">{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <!-- ── COLUNA DE NEWSLETTER + REDES SOCIAIS ─────────── -->
        <div class="rodape-col rodape-col--newsletter">
          <h4 class="rodape-col__titulo u-uppercase">Newsletter</h4>
          <p class="rodape-col__subtitulo">
            Receba novidades e ofertas exclusivas.
          </p>

          <!-- FORMULÁRIO ──────────────────────────────────────── -->
          <form
            class="newsletter-form"
            @submit.prevent="handleNewsletter"
            aria-label="Formulário de newsletter"
            novalidate
          >
            <label for="newsletter-email" class="u-sr-only">Seu e-mail</label>
            <input
              id="newsletter-email"
              v-model="emailNewsletter"
              type="email"
              placeholder="Digite seu e-mail"
              class="newsletter-form__input"
              :class="{ 'newsletter-form__input--error': statusType === 'error' }"
              autocomplete="email"
              :disabled="loading"
              required
            />
            <button
              type="submit"
              class="newsletter-form__btn"
              :disabled="loading"
              aria-label="Assinar newsletter"
            >
              <!-- Spinner durante o loading -->
              <span v-if="loading" class="newsletter-form__spinner" aria-hidden="true" />
              <i v-else class="fas fa-arrow-right" aria-hidden="true" />
            </button>
          </form>

          <!-- MENSAGEM DE FEEDBACK ──────────────────────────── -->
          <transition name="fade">
            <p
              v-if="statusMessage"
              class="newsletter-feedback"
              :class="`newsletter-feedback--${statusType}`"
              role="alert"
              aria-live="polite"
            >
              <!-- ícone contextual -->
              <i
                :class="statusType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"
                aria-hidden="true"
              />
              {{ statusMessage }}
            </p>
          </transition>

          <!-- Redes Sociais ────────────────────────────────── -->
          <div class="rodape__sociais" role="list" aria-label="Redes sociais">
            <a
              v-for="rede in redesSociais"
              :key="rede.id"
              :href="rede.href"
              class="social-btn"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="rede.label"
              role="listitem"
            >
              <i :class="rede.icone" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- ── BOTTOM BAR ─────────────────────────────────────── -->
      <div class="rodape__bottom">
        <p class="rodape__copy">
          © 2026 adidas do Brasil Ltda. Todos os direitos reservados.
        </p>
        <img 
    src="../assets/image/adidas-logo.png" 
    alt="Logo Oficial" 
    class="header__logo-img"
  />
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/* ─────────────────────────────────────────────
   TIPOS
───────────────────────────────────────────── */
interface FooterLink  { label: string; href: string }
interface FooterColuna { id: number; titulo: string; links: FooterLink[] }
interface RedeSocial   { id: number; label: string; icone: string; href: string }

type StatusType = 'success' | 'error' | null

/* ─────────────────────────────────────────────
   CONFIGURAÇÃO
   ⚠️  Altere a URL caso o backend rode em outra porta/host
───────────────────────────────────────────── */
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

/* ─────────────────────────────────────────────
   ESTADO REATIVO
───────────────────────────────────────────── */
const emailNewsletter = ref<string>('')
const loading         = ref<boolean>(false)
const statusMessage   = ref<string>('')
const statusType      = ref<StatusType>(null)

/* ─────────────────────────────────────────────
   VALIDAÇÃO BÁSICA NO CLIENTE
   (o backend faz a validação definitiva)
───────────────────────────────────────────── */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
}

/* ─────────────────────────────────────────────
   HANDLER DO FORMULÁRIO
───────────────────────────────────────────── */
async function handleNewsletter(): Promise<void> {
  // Limpa mensagem anterior
  statusMessage.value = ''
  statusType.value    = null

  const email = emailNewsletter.value.trim()

  // Validação rápida no cliente
  if (!email) {
    setStatus('error', 'Por favor, insira seu e-mail.')
    return
  }
  if (!isValidEmail(email)) {
    setStatus('error', 'Informe um e-mail válido.')
    return
  }

  loading.value = true

  try {
    const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data: { success: boolean; message: string } = await response.json()

    if (response.ok && data.success) {
      setStatus('success', data.message || 'Inscrição realizada com sucesso!')
      emailNewsletter.value = '' // limpa o campo apenas no sucesso
    } else {
      // Erros de validação (400) ou servidor (500) com mensagem do backend
      setStatus('error', data.message || 'Erro ao realizar inscrição.')
    }
  } catch {
    // Erro de rede / servidor fora do ar
    setStatus('error', 'Não foi possível conectar ao servidor. Tente novamente.')
  } finally {
    loading.value = false
  }
}

/* ─────────────────────────────────────────────
   UTILITÁRIO: define e auto-limpa a mensagem
───────────────────────────────────────────── */
let statusTimer: ReturnType<typeof setTimeout> | null = null

function setStatus(type: StatusType, message: string, durationMs = 6000): void {
  statusType.value    = type
  statusMessage.value = message

  if (statusTimer) clearTimeout(statusTimer)
  statusTimer = setTimeout(() => {
    statusMessage.value = ''
    statusType.value    = null
  }, durationMs)
}

/* ─────────────────────────────────────────────
   DADOS ESTÁTICOS
───────────────────────────────────────────── */
const colunas = ref<FooterColuna[]>([
  {
    id: 1,
    titulo: 'Ajuda',
    links: [
      { label: 'Fale Conosco',         href: '#' },
      { label: 'Perguntas Frequentes', href: '#' },
      { label: 'Trocas e Devoluções',  href: '#' },
      { label: 'Formas de Pagamento',  href: '#' },
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Termos e Condições',   href: '#' },
    ],
  },
  {
    id: 2,
    titulo: 'Institucional',
    links: [
      { label: 'Sobre a adidas',    href: '#' },
      { label: 'Sustentabilidade',  href: '#' },
      { label: 'Trabalhe Conosco', href: '#' },
      { label: 'Imprensa',          href: '#' },
      { label: 'Investidores',      href: '#' },
    ],
  },
  {
    id: 3,
    titulo: 'Minha Conta',
    links: [
      { label: 'Minha Conta',      href: '#' },
      { label: 'Meus Pedidos',     href: '#' },
      { label: 'Lista de Desejos', href: '#' },
      { label: 'Endereços',        href: '#' },
      { label: 'Cupons',           href: '#' },
    ],
  },
])

const redesSociais = ref<RedeSocial[]>([
  { id: 1, label: 'Instagram', icone: 'fab fa-instagram',  href: 'https://instagram.com' },
  { id: 2, label: 'Facebook',  icone: 'fab fa-facebook-f', href: 'https://facebook.com' },
  { id: 3, label: 'YouTube',   icone: 'fab fa-youtube',    href: 'https://youtube.com'  },
  { id: 4, label: 'TikTok',    icone: 'fab fa-tiktok',     href: 'https://tiktok.com'   },
])
</script>

<style scoped>
/* ── BASE ────────────────────────────────────────────────────── */
.rodape {
  background: #000;
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 64px 0 0;
}
.rodape__inner {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── GRID ────────────────────────────────────────────────────── */
.rodape__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

/* ── COLUNAS ─────────────────────────────────────────────────── */
.rodape-col__titulo {
  font-size: 11px; font-weight: 800;
  letter-spacing: 2px; color: #fff;
  margin-bottom: 22px;
}
.u-uppercase { text-transform: uppercase; }
.u-sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap;
}
.rodape-col__lista {
  display: flex; flex-direction: column; gap: 10px;
  list-style: none;
}
.rodape-col__link {
  font-size: 12px; color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}
.rodape-col__link:hover { color: #fff; }

/* ── NEWSLETTER ──────────────────────────────────────────────── */
.rodape-col__subtitulo {
  font-size: 12px; color: #666;
  margin-bottom: 16px; line-height: 1.6;
}

/* Formulário */
.newsletter-form {
  display: flex;
  margin-bottom: 12px;
}
.newsletter-form__input {
  flex: 1;
  padding: 12px 14px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  border-right: none;
  color: #fff;
  font-family: inherit;
  font-size: 12px;
  border-radius: 0;
  outline: none;
  transition: border-color 0.3s ease;
}
.newsletter-form__input:focus {
  border-color: rgba(255,255,255,0.4);
}
.newsletter-form__input--error {
  border-color: #e53935 !important;
}
.newsletter-form__input::placeholder { color: #555; }
.newsletter-form__input:disabled { opacity: 0.5; cursor: not-allowed; }

.newsletter-form__btn {
  padding: 12px 18px;
  background: #fff;
  color: #000;
  font-size: 13px;
  border: 2px solid #fff;
  border-radius: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  transition: background 0.3s ease, color 0.3s ease;
}
.newsletter-form__btn:hover:not(:disabled) {
  background: transparent;
  color: #fff;
}
.newsletter-form__btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Spinner */
.newsletter-form__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0,0,0,0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Mensagem de feedback */
.newsletter-feedback {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 11px;
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 8px 10px;
}
.newsletter-feedback--success {
  color: #4caf50;
  background: rgba(76,175,80,0.08);
  border-left: 2px solid #4caf50;
}
.newsletter-feedback--error {
  color: #ef5350;
  background: rgba(239,83,80,0.08);
  border-left: 2px solid #ef5350;
}

/* Transição fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── REDES SOCIAIS ───────────────────────────────────────────── */
.rodape__sociais { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
.social-btn {
  width: 36px; height: 36px;
  background: #fff; color: #000;
  font-size: 13px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 0; text-decoration: none;
  transition: background 0.3s ease;
}
.social-btn:hover { background: #ccc; }

/* ── BOTTOM BAR ──────────────────────────────────────────────── */
.rodape__bottom {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 0;
}
.rodape__copy  { font-size: 11px; color: #444; }

/* LOGO */
.header__logo-img {
  width: 70px;
  height: auto;

  object-fit: contain;

  opacity: 0.9;

  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    filter 0.3s ease;
}

/* Hover elegante */
.header__logo-img:hover {
  opacity: 1;

  transform: scale(1.04);

  filter: brightness(1.15);
}

/* RESPONSIVO */
@media (max-width: 600px) {
  .header__logo-img {
    width: 72px;
  }
}

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 1000px) {
  .rodape__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .rodape__grid  { grid-template-columns: 1fr; gap: 32px; }
  .rodape__bottom { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
