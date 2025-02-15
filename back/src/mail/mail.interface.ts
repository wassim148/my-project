/* eslint-disable prettier/prettier */
import { Address } from 'nodemailer/lib/mailer';
export type SendEmailDto = {
  from?: Address;
  recipient: Address[];
  subject: string;
  html: string;
  text?: string;
  placholderreplacements?: Record<string, string>;
};
