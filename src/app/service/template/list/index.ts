import { BaseTemplateParams, BaseTemplate } from '../basetemplate/index';

export interface ListParams extends BaseTemplateParams {
  image?: string,
  list: {key?: string, value: string}[]
}

export class ListTemplate extends BaseTemplate {

  image: string;

  list: {key?: string, value: string}[];

  templateDir: string = __dirname;

  constructor(row: {[key: string]: string}) {
    super(row);

    if(row['image']) { this.image = row['image']; }

    this.list = this.rawArgs.map(arg => {
      if(arg.indexOf('|') != -1) {
        let vals = arg.split('|');
        return {
          key: vals[0],
          value: vals[1]
        }
      }
      else {
        return {
          value: arg
        }
      }
    });
  }

  getParams(): ListParams {
    let params: ListParams = super.getParams() as ListParams;

    if(this.image) { params.image = this.image; }
    params.list = this.list;

    return params;
  }
}