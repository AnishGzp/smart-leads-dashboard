export interface IResponse {
  success: boolean;
  message: string;
  error?: {
    msg: string;
  }[];
  data?: any;
}
