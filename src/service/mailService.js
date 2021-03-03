import nodemailer from 'nodemailer'

export const transporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL_ADDR,
      pass: process.env.EMAIL_PWD,
    },
  })

  return transporter
}
