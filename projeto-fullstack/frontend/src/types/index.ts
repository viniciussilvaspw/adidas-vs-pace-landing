// =============================================================
// 📦 src/types/index.ts
// Interfaces globais do projeto — fonte única de verdade.
// Importe daqui em qualquer componente que precise de tipagem.
// =============================================================

// -------------------------------------------------------------
// NAV
// -------------------------------------------------------------
export interface NavLink {
  label: string
  href: string
  /** Usado pelo Scroll Spy para identificar a seção ativa */
  sectionId?: string
}

// -------------------------------------------------------------
// DIFERENCIAIS (Seção de Benefícios)
// -------------------------------------------------------------
export interface Diferencial {
  id: number
  /** Classe FontAwesome completa, ex: "fas fa-shoe-prints" */
  icone: string
  titulo: string
  descricao: string
}

// -------------------------------------------------------------
// PRODUTO / VITRINE DE CORES
// -------------------------------------------------------------
export interface Swatch {
  /** Valor CSS de cor, ex: "#ffffff" */
  cor: string
  label: string
}

export interface Produto {
  id: number
  nome: string
  slug: string
  /** Dimensão recomendada: 420 × 280 px */
  imagemPrincipal: string
  /** Dimensão recomendada: 420 × 280 px */
  imagemHover: string
  preco: number
  /** Número de parcelas sem juros */
  parcelas: number
  swatches: Swatch[]
  /** ✏️ ALTERE: link de afiliado, produto ou checkout */
  linkCompra: string
}

// -------------------------------------------------------------
// LOGÍSTICA (Faixa de Vantagens)
// -------------------------------------------------------------
export interface BeneficioLogistico {
  id: number
  /** Classe FontAwesome completa */
  icone: string
  titulo: string
  descricao: string
}

// -------------------------------------------------------------
// ESPECIFICAÇÕES TÉCNICAS
// -------------------------------------------------------------
export interface Especificacao {
  id: number
  texto: string
}

// -------------------------------------------------------------
// MOSAICO SOCIAL
// -------------------------------------------------------------
export interface FotoSocial {
  id: number
  /** Dimensão recomendada: 300 × 300 px */
  src: string
  alt: string
  href: string
}

// -------------------------------------------------------------
// RODAPÉ
// -------------------------------------------------------------
export interface FooterLink {
  label: string
  href: string
}

export interface FooterColuna {
  id: number
  titulo: string
  links: FooterLink[]
}

export interface RedeSocial {
  id: number
  label: string
  /** Classe FontAwesome Brands, ex: "fab fa-instagram" */
  icone: string
  href: string
}
