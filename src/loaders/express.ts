import express, { ErrorRequestHandler, RequestHandler } from "express";

import { LoaderArgs } from "../@types/loader.types";
import Logger from "./logger";
import cors from "cors";
import get from "lodash/get";
import helmet from "helmet";
import middleware from "../middleware";
import routes from "../api";
import { userServicePlugin } from "@KitoC/express-utils";

const send200Status: RequestHandler = (req, res) => {
  res.status(200).json({ status: "OK" });
};

export default ({ app, config }: LoaderArgs) => {
  app.enable("trust proxy");

  app.use(cors());
  app.use(helmet() as RequestHandler);

  app.use(express.json() as RequestHandler);

  userServicePlugin(app, {
    secretkey: process.env.USER_SERVICE_SECRET_KEY,
    appid: process.env.USER_SERVICE_APP_ID,
    internalkey: process.env.INTERNAL_KEY,
    userServiceUrl: process.env.USER_SERVICE_URL,
    logger: Logger.info,
  });

  app.get("/status", send200Status);
  app.head("/status", send200Status);

  app.use(get(config, "api.prefix", ""), routes());

  app.use(middleware.handlers.error);
};
