/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiCall {
  onStart: string;
  onSuccess: string;
  onError: string;
  url: string;
  headers?: {
    Authorization: string,
  }
  method?: string;
  data?: any;
}