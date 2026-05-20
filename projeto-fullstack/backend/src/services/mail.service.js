// ──────────────────────────────────────────────────────────────
//  src/services/mail.service.js
//  Transporter Nodemailer + template HTML do email de boas-vindas
// ──────────────────────────────────────────────────────────────
import nodemailer from 'nodemailer'

// ── TRANSPORTER ────────────────────────────────────────────────
// Criado uma única vez e reutilizado em todas as chamadas.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Senha de App do Google (não a senha normal)
  },
})

// Verifica a conexão ao iniciar o servidor (evita descobrir o erro só em produção)
transporter.verify((error) => {
  if (error) {
    console.error('❌  Falha na conexão com o servidor de e-mail:', error.message)
    console.error('    Verifique EMAIL_USER e EMAIL_PASS no arquivo .env')
  } else {
    console.log('✅  Servidor de e-mail conectado com sucesso.')
  }
})

// ── TEMPLATE HTML ──────────────────────────────────────────────
/**
 * Gera o HTML do email de boas-vindas.
 * @param {string} email  - email do destinatário
 * @returns {string}      - HTML completo
 */
function buildWelcomeEmailHtml(email) {
  const brand = process.env.BRAND_NAME || 'Nossa Marca'
  const year  = new Date().getFullYear()

  return /* html */ `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bem-vindo à Newsletter — ${brand}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #f4f4f4;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #222;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
    }

    /* ── HEADER ── */
    .header {
      background: #000;
      padding: 40px 48px 32px;
      text-align: center;
    }
    .header__brand {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      color: #fff;
      text-transform: uppercase;
    }

    /* ── HERO ── */
    .hero {
      background: #000;
      padding: 0 48px 56px;
      text-align: center;
      border-bottom: 4px solid #fff;
    }
    .hero__title {
      font-size: 38px;
      font-weight: 900;
      color: #fff;
      line-height: 1.1;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }
    .hero__subtitle {
      font-size: 14px;
      color: #999;
      line-height: 1.8;
      max-width: 380px;
      margin: 0 auto 32px;
    }
    .hero__cta {
      display: inline-block;
      padding: 14px 36px;
      background: #fff;
      color: #000;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-decoration: none;
    }

    /* ── BENEFÍCIOS ── */
    .benefits {
      padding: 48px;
      background: #fff;
    }
    .benefits__title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #000;
      margin-bottom: 24px;
    }
    .benefits__grid {
      display: table;
      width: 100%;
      border-collapse: separate;
      border-spacing: 12px;
    }
    .benefit {
      display: table-cell;
      width: 33%;
      background: #f8f8f8;
      padding: 20px 16px;
      text-align: center;
      vertical-align: top;
    }
    .benefit__icon {
      font-size: 24px;
      margin-bottom: 8px;
    }
    .benefit__label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #000;
    }
    .benefit__desc {
      font-size: 11px;
      color: #666;
      margin-top: 4px;
      line-height: 1.5;
    }

    /* ── CONFIRMAÇÃO ── */
    .confirm {
      background: #000;
      padding: 32px 48px;
      text-align: center;
    }
    .confirm__text {
      font-size: 12px;
      color: #999;
      line-height: 1.7;
    }
    .confirm__email {
      color: #fff;
      font-weight: 700;
    }

    /* ── FOOTER ── */
    .footer {
      background: #111;
      padding: 24px 48px;
      text-align: center;
    }
    .footer__text {
      font-size: 11px;
      color: #444;
      line-height: 1.8;
    }
    .footer__unsubscribe {
      font-size: 11px;
      color: #555;
      text-decoration: underline;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- HEADER -->
    <div class="header">
      <div class="header__brand">${brand}</div>
    </div>

    <!-- HERO -->
    <div class="hero">
      <h1 class="hero__title">Você está<br />dentro.</h1>
      <p class="hero__subtitle">
        Bem-vindo à newsletter exclusiva. Você será o primeiro a saber sobre
        lançamentos, ofertas e conteúdos que só chegam por aqui.
      </p>
      <a href="#" class="hero__cta">Explorar coleção</a>
    </div>

    <!-- BENEFÍCIOS -->
    <div class="benefits">
      <div class="benefits__title">O que você vai receber</div>
      <table class="benefits__grid">
        <tr>
          <td class="benefit">
            <div class="benefit__icon">🚀</div>
            <div class="benefit__label">Lançamentos</div>
            <div class="benefit__desc">Acesso antecipado a novidades</div>
          </td>
          <td class="benefit">
            <div class="benefit__icon">🏷️</div>
            <div class="benefit__label">Ofertas</div>
            <div class="benefit__desc">Descontos exclusivos para assinantes</div>
          </td>
          <td class="benefit">
            <div class="benefit__icon">⚡</div>
            <div class="benefit__label">Conteúdo</div>
            <div class="benefit__desc">Dicas, inspirações e tendências</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- CONFIRMAÇÃO -->
    <div class="confirm">
      <p class="confirm__text">
        Este e-mail foi enviado para<br />
        <span class="confirm__email">${email}</span><br /><br />
        Guarde este endereço na sua lista de contatos para não<br />
        perder nenhuma novidade.
      </p>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <p class="footer__text">
        © ${year} ${brand}. Todos os direitos reservados.<br />
        <span class="footer__unsubscribe">Cancelar inscrição</span>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim()
}

// ── FUNÇÃO EXPORTADA ───────────────────────────────────────────
/**
 * Envia o email de boas-vindas para o endereço informado.
 * Lança exceção em caso de falha (capturada no controller).
 *
 * @param {string} toEmail
 * @returns {Promise<void>}
 */
export async function sendWelcomeEmail(toEmail) {
  const brand = process.env.BRAND_NAME || 'Nossa Marca'

  const mailOptions = {
    from: `"${brand}" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Bem-vindo à nossa Newsletter — ${brand}`,
    html: buildWelcomeEmailHtml(toEmail),
    // Versão texto simples como fallback para clientes que não renderizam HTML
    text: `Olá! Sua inscrição na newsletter ${brand} foi confirmada. Fique de olho nas próximas novidades!`,
  }

  await transporter.sendMail(mailOptions)
}
