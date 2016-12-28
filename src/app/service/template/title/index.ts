import { BaseTemplateParams, BaseTemplate } from '../basetemplate/index';

export class TitleTemplate extends BaseTemplate {
  templateDir: string = __dirname;

  constructor(row: {[key: string]: string} & any) {
    super(row);
  }

}