// ──────────────────────────────────────────────────────────────
//  src/middlewares/rateLimiter.js
//
//  Proteção anti-spam sem biblioteca externa.
//  Permite no máximo MAX_REQUESTS tentativas por IP
//  dentro de WINDOW_MS milissegundos.
// ──────────────────────────────────────────────────────────────

const WINDOW_MS = 10 * 60 * 1000 // 10 minutos
const MAX_REQUESTS = 5            // máximo de 5 cadastros por IP no período

// Map em memória: ip → { count, resetAt }
// Produção com múltiplas instâncias: substituir por Redis.
const ipMap = new Map()

/**
 * Limpa entradas expiradas periodicamente para evitar
 * crescimento ilimitado do Map em memória.
 */
setInterval(() => {
  const now = Date.now()
  for (const [ip, data] of ipMap.entries()) {
    if (now > data.resetAt) ipMap.delete(ip)
  }
}, WINDOW_MS)

export function rateLimiter(req, res, next) {
  // Respeita proxies reversos (Nginx, Cloudflare)
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip

  const now = Date.now()
  const entry = ipMap.get(ip)

  if (!entry || now > entry.resetAt) {
    // Primeira requisição ou janela expirada → reseta contagem
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return next()
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000)
    return res.status(429).json({
      success: false,
      message: `Muitas tentativas. Aguarde ${Math.ceil(retryAfterSec / 60)} minuto(s) e tente novamente.`,
    })
  }

  entry.count++
  next()
}
