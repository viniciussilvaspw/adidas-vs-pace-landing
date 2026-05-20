// ──────────────────────────────────────────────────────────────
//  src/routes/newsletter.routes.js  —  Rotas da newsletter
// ──────────────────────────────────────────────────────────────
import { Router } from 'express'
import { subscribe } from '../controllers/newsletter.controller.js'
import { rateLimiter } from '../middlewares/rateLimiter.js'

const router = Router()

// POST /api/newsletter/subscribe
// Middleware de rate-limit aplicado antes do controller
router.post('/subscribe', rateLimiter, subscribe)

export default router
