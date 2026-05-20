import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Verifica conexão SMTP
transporter.verify((error) => {
  if (error) {
    console.error('❌ Erro ao conectar no servidor de e-mail:', error)
  } else {
    console.log('✅ Servidor de e-mail conectado com sucesso.')
  }
})