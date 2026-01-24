import 'dotenv/config';
import nodemailer from 'nodemailer';
import { welcomeTemplate } from '../utils/email_templates/welcome.mail.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_APP_USER,
    pass: process.env.EMAIL_APP_PASS 
  }
});

export const sendWelcomeEmail = async (to, name) => {
  const customizedMail = welcomeTemplate.replace(`{{name}}`, name);

  const mailOptions = {
    from: `"Super Snippets" <${process.env.EMAIL_APP_USER}>`,
    to: to,
    subject: 'Welcome to Super Snippets! 📋',
		html: customizedMail
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error(`Email Service Error: ${error.message}`);
  }
};
