import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'iasadxaman@gmail.com',
      pass: 'qepa imcj lhkn bprs',
    },
  })

  await transporter.sendMail({
    from: 'iasadxaman@gmail.com', // sender address
    to, // list of receivers
    subject: 'Password Reset !', // Subject line
    text: 'Reset Your Password using the link within 10 min ', // plain text body
    html, // html body
  })
}
