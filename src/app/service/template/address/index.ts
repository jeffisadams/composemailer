import { BaseTemplateParams, BaseTemplate } from '../basetemplate/index';

export interface AddressParams extends BaseTemplateParams {
  contact: string,
  address: string,
  address2:string,
  city: string,
  state: string,
  zipcode: number,
  phone?: string,
  email?: string
}

export class AddressTemplate extends BaseTemplate {

  image: string;

  contact: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zipcode: number;

  phone: string;
  email: string;

  templateDir: string = __dirname;

  constructor(row: {[key: string]: string}) {
    super(row);

    [
      this.contact,
      this.address,
      this.address2,
      this.city,
      this.state,
      this.zipcode,
      this.phone,
      this.email
    ] = this.rawArgs;
  }

  getParams(): AddressParams {
    let params: AddressParams = super.getParams() as AddressParams;

    params.contact = this.contact;
    params.address = this.address;
    params.address2 = this.address2;
    params.city = this.city;
    params.state = this.state;
    params.zipcode = this.zipcode;

    if(this.phone) params.phone = this.phone;
    if(this.email) params.email = this.email;

    return params;
  }
}