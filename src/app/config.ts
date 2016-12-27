// Largely this just exists to set typing info for the config values 

import * as config from 'config';

export interface MailConfig {
  user: string,
  pass: string,
  smtpHost: string,
  origin: string
}

export let AppConfig = {
  mail: config.get("mail") as MailConfig
};
