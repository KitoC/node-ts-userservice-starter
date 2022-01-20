import { RequestHandler } from "express";

const sendResponse: RequestHandler = (req, res) => {
  res.json({ data: res.locals.response });
};

export default sendResponse;
