import { BaseTemplateParams, BaseTemplate } from '../basetemplate/index';


export interface ParagraphParams extends BaseTemplateParams {
  image?: string,
  paragraphs: string[]
}

export class ParagraphTemplate extends BaseTemplate {

  image: string;

  paragraphs: string[];

  templateDir: string = __dirname;

  constructor(row: {[key: string]: string}) {
    super(row);

    if(row['image']) { this.image = row['image']; }

    this.paragraphs = this.rawArgs;
  }

  getParams(): ParagraphParams {
    let params: ParagraphParams = super.getParams() as ParagraphParams;

    if(this.image) { params.image = this.image; }
    params.paragraphs = this.paragraphs;

    return params;
  }
}