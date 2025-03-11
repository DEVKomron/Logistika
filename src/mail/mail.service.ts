import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationEmail(email: string, link: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Logistika: Aktivatsiya havolasi',
      text: `Hisobingizni faollashtirish uchun quyidagi havolaga o'ting: ${link}`,
      html: `<p>Hisobingizni faollashtirish uchun quyidagi havolaga o'ting:</p>
             <a href="${link}">${link}</a>`,
    });
  }
}
