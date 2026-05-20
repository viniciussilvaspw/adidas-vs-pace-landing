import { transporter } from '../config/mail.js'

export async function subscribe(req, res) {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'E-mail é obrigatório.'
      })
    }

    console.log('[Newsletter] Nova inscrição:', email)

    // EMAIL PARA VOCÊ
    await transporter.sendMail({
      from: `"Newsletter Adidas" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Nova inscrição na newsletter',
      html: `
        <h2>Nova inscrição</h2>
        <p><strong>Email:</strong> ${email}</p>
      `
    })

    // EMAIL PARA O CLIENTE
    await transporter.sendMail({
      from: `"Adidas" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Inscrição confirmada',
      html: `
        <h1>Obrigado por se inscrever!</h1>
        <p>Você agora receberá novidades da Adidas.</p>
      `
    })

    return res.status(200).json({
      success: true,
      message: 'Inscrição realizada com sucesso! Verifique seu e-mail.'
    })

  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Erro ao enviar e-mail.'
    })
  }
}