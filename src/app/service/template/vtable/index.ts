import { BaseTemplateParams, BaseTemplate } from '../basetemplate/index';

export interface VTableParams extends BaseTemplateParams {
  image?: string,
  date:string,
  dates: string[],
  names: string[][]
}

export class VTableTemplate extends BaseTemplate {
  templateDir: string = __dirname;

  image: string;

  dates: string[];
  names: string[][];

  constructor(row: {[key: string]: string} & any) {
    super(row);
    this.dates = [];
    this.names = [];

    this.rawArgs.forEach((arg) => {
      let date = arg.split('|').shift();
      let names = arg.split('|').pop().split(',');

      this.dates.push(date);
      this.names.push(names);
    });
  }

  getParams(): VTableParams {
    let params: VTableParams = super.getParams() as VTableParams;
    if(this.image) params.image = this.image;

    params.dates = this.dates;
    params.names = this.names;

    return params;
  }

}