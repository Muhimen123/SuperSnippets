import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_APP_USER,
    pass: process.env.EMAIL_APP_PASS 
  }
});

const mailOptions = {
  from: 'supersnippetsofficial@gmail.com',
  to: 'supersnippetsofficial@protonmail.com',
  subject: 'Hello from Node.js',
  text: 'This is a test email sent using Nodemailer!',
  html: '<b>Hello world!</b>' // Optional: use HTML body
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error occurred:', error.message);
  }
  console.log('Email sent successfully! Message ID:', info.messageId);
});
