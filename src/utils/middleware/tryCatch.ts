import { RequestHandler } from "express";

export type TryCatch = (method: RequestHandler) => RequestHandler;
export type TryCatchAll = (middlewares: RequestHandler[]) => RequestHandler[];

const tryCatch: TryCatch = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default tryCatch;
