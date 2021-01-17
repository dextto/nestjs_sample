import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import emailConfig from '@config/emailConfig';
import { SentEmail } from '@constants/types';

import { IEmailSender } from '@user/application/adapter/IEmailSender';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailSender implements IEmailSender {
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

  private async send(mailOptions: EmailOptions): Promise<SentEmail> {
    return await this.transporter.sendMail(mailOptions);
  }

  public async sendVerification(emailAddress: string, authToken: string): Promise<SentEmail> {
    const url = `${this.config.baseUrl}/users/email-verification?authToken=${authToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `
    }

    return await this.send(mailOptions)
  }
}
