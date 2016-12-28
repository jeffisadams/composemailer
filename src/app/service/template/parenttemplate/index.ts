import { BaseTemplateParams, BaseTemplate, CompiledTemplate } from '../basetemplate/index';
import * as moment from 'moment';

export interface SectionParams {
  order: number,
  title: string
  html: string
}

export interface ParentParams extends BaseTemplateParams {
  date: string,
  sections: SectionParams[]
}

export class ParentTemplate extends BaseTemplate {
  templateDir: string = __dirname;

  date: string = moment().format('MMMM');

  sections: BaseTemplate[];

  constructor(row: BaseTemplateParams & any) {
    super(row as BaseTemplateParams);

    this.sections = row['sections'];
  }

  getParams(): ParentParams {
    let params: ParentParams = super.getParams() as ParentParams;
    params.date = this.date;

    // Get out the specific html and identifying info from the sub section
    params.sections = this.sections.map((obj) => {
      return {
        name: obj.constructor.name,
        order: obj.order,
        title: obj.title,
        html: obj.compiledTemplate.html
      }
    });

    return params;
  }

}