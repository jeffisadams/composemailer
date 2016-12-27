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
}