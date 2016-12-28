import { BaseTemplateParams, BaseTemplate } from '../basetemplate/index';

export interface SpotlightParams extends BaseTemplateParams {
  image?: string,
  spotlightname: string,
  description: string
}

export class SpotlightTemplate extends BaseTemplate {

  image: string;

  spotlightname: string;
  description: string;

  templateDir: string = __dirname;

  constructor(row: {[key: string]: string}) {
    super(row);

    if(row['image']) { this.image = row['image']; }
    [this.spotlightname, this.description] = this.rawArgs;
  }

  getParams(): SpotlightParams {
    let params: SpotlightParams = super.getParams() as SpotlightParams;

    if(this.image) { params.image = this.image; }
    params.spotlightname = this.spotlightname;
    params.description = this.description;

    return params;
  }
}