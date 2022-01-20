export interface ErrorResponse {
  message: string;
  status: number;
  code: string;
}

declare global {
  namespace Express {
    interface Request {
      _container: any;
    }
  }
}
