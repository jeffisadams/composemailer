import { BaseTemplateParams, BaseTemplate } from '../basetemplate/index';


export interface HtmlParagraphParams extends BaseTemplateParams {
  image?: string,
  paragraphs: string[]
}

export class HtmlParagraphTemplate extends BaseTemplate {

  image: string;

  paragraphs: string[];

  templateDir: string = __dirname;

  constructor(row: {[key: string]: string}) {
    super(row);

    if(row['image']) { this.image = row['image']; }

    this.paragraphs = this.rawArgs;
  }

  getParams(): HtmlParagraphParams {
    let params: HtmlParagraphParams = super.getParams() as HtmlParagraphParams;

    if(this.image) { params.image = this.image; }
    params.paragraphs = this.paragraphs;

    return params;
  }
}