export const APPLICATIONS_URL = 'https://functions.poehali.dev/37849a82-2d25-4c8b-97b5-02e16902c100';

export interface Application {
  id: number;
  name: string;
  phone: string;
  route: string;
  comment: string;
  created_at: string;
}
