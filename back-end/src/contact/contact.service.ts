import { Injectable } from '@nestjs/common';
import { nodemailer } from 'nodemailer';

@Injectable()
export class ContactService {
  async sendInquiryEmail(inquiry) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL_JH,
        pass: process.env.ADMIN_APP_PASS,
      },
    });

    const mailOptions = {//내용
      from: `"Contact Mannager System"<${process.env.ADMIN_EMAIL_JH}>`,
      to: process.env.ADMIN_EMAIL_JH,
      subject: `New Inquiry from ${inquiry.name}: ${inquiry.subject}`, // 제목
      text: `
        Name: ${inquiry.name}
        Email: ${inquiry.email}
        Subject: ${inquiry.subject}
        Message: ${inquiry.message}
      `, 
    };
    // 이메일 전송
    try {
      const info = await transporter.sendMail(mailOptions);
      return `Email sent: ${info.response}`;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
