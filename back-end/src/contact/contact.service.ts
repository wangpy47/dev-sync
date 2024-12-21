import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactMailDto } from './contact.dto';

@Injectable()
export class ContactService {
  async sendInquiryEmail(inquiry: ContactMailDto): Promise<string> {
    // SMTP Transporter 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL_MK, 
        pass: process.env.ADMIN_APP_PASS_MK, 
      },
    });

    // 이메일 옵션
    const mailOptions = {
      from: `"Contact Manager System" <${process.env.ADMIN_EMAIL_MK}>`,
      to: process.env.ADMIN_EMAIL_MK, 
      subject: `New Inquiry from ${inquiry.name}: ${inquiry.subject}`, 
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
      console.log('Email sent:', info.messageId);
      return `Email sent successfully: ${info.messageId}`;
    } catch (error) {
      console.error('Failed to send email:', error.message || error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
