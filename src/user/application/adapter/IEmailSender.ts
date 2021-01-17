import { SentEmail } from '@constants/types';

export interface IEmailSender {
  sendVerification(emailAddress: string, authToken: string): Promise<SentEmail>;
}