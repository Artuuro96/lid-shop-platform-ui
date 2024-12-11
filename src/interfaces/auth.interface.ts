export interface Auth {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  isAuthenticated: boolean;
}