import expressLoader from "./express";
import dbLoader from "./db";
import dependencyInjectorLoader from "./dependencyInjector";
import passportLoader from "./passport";
import Logger from "./logger";
import utils from "../utils";
import { LoaderArgs } from "../@types/loader.types";

import "./events";

export default async ({ app, config }: LoaderArgs) => {
  const db = await dbLoader({ app, config });

  Logger.info("✌️ DB loaded and connected!");

  const container = await dependencyInjectorLoader({
    app,
    config,
    registerModules: ({ asValue }) => ({ db: asValue(db) }),
  });

  await passportLoader({ app, config, container });

  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app });

  Logger.info("✌️ Express loaded");
};
