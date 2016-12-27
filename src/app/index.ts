
import { FileService } from './service/file';

export class App {
  // Wired services
  private fileService: FileService;

  constructor(
    private manifest: string,
    private originEmail: string,
    private destEmails: string[]
  ) {}

  async bootstrap() {
    this.fileService = new FileService();
    await this.fileService.loadFile(this.manifest);
    let template = await this.fileService.getCompiledTemplate();

  }

}