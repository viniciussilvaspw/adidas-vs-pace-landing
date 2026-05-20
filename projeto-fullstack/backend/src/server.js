// ──────────────────────────────────────────────────────────────
//  src/server.js  —  Ponto de entrada da aplicação
// ──────────────────────────────────────────────────────────────
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import newsletterRoutes from './routes/newsletter.routes.js'

const app = express()
const PORT = process.env.PORT || 3001

// ── MIDDLEWARES GLOBAIS ────────────────────────────────────────

// CORS: permite apenas o frontend cadastrado no .env
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
)

// Faz o Express entender JSON no body das requisições
app.use(express.json())

// Log simples de cada requisição recebida (útil em desenvolvimento)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// ── ROTAS ─────────────────────────────────────────────────────
app.use('/api/newsletter', newsletterRoutes)

// Health-check — confirma que o servidor está no ar
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── ROTA NÃO ENCONTRADA (404) ──────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada.' })
})

// ── HANDLER GLOBAL DE ERROS ────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Erro interno]', err)
  res
    .status(500)
    .json({ success: false, message: 'Erro interno do servidor. Tente novamente mais tarde.' })
})

// ── INICIALIZAÇÃO ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`)
  console.log(`📧 Email configurado: ${process.env.EMAIL_USER}`)
  console.log(`🌐 CORS liberado para: ${process.env.FRONTEND_URL}\n`)
})

export default app
