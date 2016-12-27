import * as TemplateCompiler from "email-templates";

export interface Section {
  html: string,
  text: string
}

export class TemplateService {
  private templateBuilder: (name: string, params: Object, callback: ((err:any, html: string, text: string) => void)) => void;

  templateDir: string;

  constructor() {
    // Build the template directory
    this.templateDir = __dirname.split('src').shift() + 'templates/';
  }

  async loadTemplateBuilder(templateDir: string = this.templateDir): Promise<(name: string, params: Object, callback: ((err:any, html: string, text: string) => void)) => void> {
    try {
      if(this.templateBuilder == null) {
        let builder = await new Promise((resolve, reject) => {
          TemplateCompiler(this.templateDir, (err, template: any) => {
            if(err) reject(err);
            resolve(template as (name: string, params: Object, callback: ((err:any, html: string, text: string) => void)) => void);
          });
        });
        this.templateBuilder = builder as (name: string, params: Object, callback: ((err:any, html: string, text: string) => void)) => void;
      }
      return this.templateBuilder
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTemplate(name: string, params: Object): Promise<{ html:string, text:string }> {
    let builder = await this.loadTemplateBuilder();

    let template =  await new Promise((resolve, reject) => {
      this.templateBuilder(name, params, function(err, html, text) {
        if(err) { reject(err); }
        resolve({ text: text, html: html });
      });
    });

    return template as Section;
  }
}