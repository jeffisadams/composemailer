import * as nodemailer from "nodemailer";

export class MailService {
  private transporter: nodemailer.Transporter;


  constructor(
    private smtpHost: string,
    private user: string,
    private password: string,
    private defaultOrigin: string,
    private port: number = 465
  ) {
    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: port,
      secure: true, // use SSL
      auth: {
          user: user,
          pass: password
      }
    });
  }

  async sendMail(
    to: string[],
    subject: string,
    html: string
  ): Promise<nodemailer.SentMessageInfo> {
    return await this.transporter.sendMail({
      from: this.defaultOrigin,
      to:to,
      subject: subject,
      html: html
    });
  }
}