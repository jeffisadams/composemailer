import { FileService } from './service/file';
import { MailService } from './service/mail';
import { AppConfig } from './config';

export class App {
  // Wired services
  private fileService: FileService;
  private mailService: MailService;

  constructor(
    private manifest: string,
    private destEmails: string[]
  ) {}

  async bootstrap() {
    let mailConfig = AppConfig.mail;
    this.mailService = new MailService(mailConfig.smtpHost, mailConfig.user, mailConfig.pass, mailConfig.origin);
    this.fileService = new FileService();
    await this.fileService.loadFile(this.manifest);
    let template = await this.fileService.processEmail();

    let mailResults = await this.mailService.sendMail(
      this.destEmails,
      "DC Third Ward Newsletter",
      template.html
    );

    console.log("What did I send");
    console.log(mailResults);
  }

}