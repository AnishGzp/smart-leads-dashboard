export interface IResponse {
  success: string;
  message: string;
  error?: {
    msg: string;
  }[];
  data?: any;
}
