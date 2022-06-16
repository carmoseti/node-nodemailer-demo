import {config} from "dotenv"
import nodemailer from "nodemailer"

// Load .env variables as early as possible
config()

const transporter = nodemailer.createTransport({
    // @ts-ignore
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    pool: true
})

transporter.sendMail({
    from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
    to: `"${process.env.EMAIL_RECEIVER_NAME}" <${process.env.EMAIL_RECEIVER_ADDRESS}>`,
    subject: 'OTP',
    text: 'Welcome. Your login OTP code is 123456 and is valid for 5 mins',
    html: 'Welcome. Your login OTP code is <b>123456</b> and is valid for <b>5 mins</b>'
}).then((value) => {
    console.log(`Message sent: %s`, value.messageId)
}, (error) => {
    console.error(error)
})