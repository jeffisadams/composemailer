import * as TemplateCompiler from "email-templates";

export interface BaseTemplateParams {
  name: string,
  order: number,
  title: string
}

export interface CompiledTemplate {
  html: string,
  text: string
}

export class BaseTemplate {

  // The generic template values
  order: number;
  name: string = 'template';
  title: string;

  rawArgs: any[] = [];

  // The built out template
  compiledTemplate: CompiledTemplate

  // The builder object and data to drive it
  templateDir: string;
  protected templateBuilder: (name: string, params: Object, callback: ((err:any, html: string, text: string) => void)) => void;

  constructor(row: BaseTemplateParams & any) {
    Object.keys(row).forEach((key) => {
      if(key.startsWith('arg')) {
        this.rawArgs.push(row[key]);
      }
    });

    this.title = row.title;
    this.order = row.order;
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

  getParams(): BaseTemplateParams {
    return {
      name: this.constructor.name,
      order: this.order,
      title: this.title
    };
  }

  async build(): Promise<void> {
    let builder = await this.loadTemplateBuilder();

    this.compiledTemplate = await new Promise((resolve, reject) => {
      this.templateBuilder(this.name, this.getParams(), function(err, html, text) {
        if(err) { reject(err); }
        resolve({ text: text, html: html });
      });
    }) as CompiledTemplate;
  }

};
