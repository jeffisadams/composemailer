import { BaseTemplateParams, BaseTemplate } from '../basetemplate/index';


export interface ActivityParams extends BaseTemplateParams {
  date: string,
  activityname: string,
  description: string
}

export class ActivityTemplate extends BaseTemplate {
  templateDir: string = __dirname;

  date: string;
  activityname: string;
  description: string

  constructor(row: {[key: string]: string}) {
    super(row);

    [this.date,this.activityname,this.description] = this.rawArgs;
  }

  getParams(): ActivityParams {
    let params: ActivityParams = super.getParams() as ActivityParams;

    params.date = this.date;
    params.activityname = this.activityname;
    params.description = this.description;

    return params;
  }
}