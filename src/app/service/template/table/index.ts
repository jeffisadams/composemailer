import { BaseTemplateParams, BaseTemplate } from '../basetemplate/index';

export interface TableParams extends BaseTemplateParams {
  image?: string;
  headers?: string[];
  rows: string[][];
}

export class TableTemplate extends BaseTemplate {
  templateDir: string = __dirname;

  image: string;

  rows: string[][];

  constructor(row: {[key: string]: string} & any) {
    super(row);
    this.rows = [];

    this.rawArgs.forEach((arg) => {
      this.rows.push(arg.split('|'));
    });
  }

  getParams(): TableParams {
    let params: TableParams = super.getParams() as TableParams;
    if(this.image) params.image = this.image;

    params.rows = this.rows;

    return params;
  }

}