import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import emailConfig from 'src/config/emailConfig';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailSender {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY)
    private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      }
    });
  }

  public async send(mailOptions: EmailOptions) {
    await this.transporter.sendMail(mailOptions); // TODO
  }

  public async sendVerification(emailAddress: string, authToken: string) {
    const url = `${this.config.baseUrl}/users/email-verification?authToken=${authToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `<a href="${url}">링크를 누르시면 가입 인증이 완료됩니다.</a>`
    }

    return this.send(mailOptions)
  }
}
