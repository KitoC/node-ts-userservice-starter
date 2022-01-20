import express from "express";
import config from "../_config";
import Logger from "./loaders/logger";
import loaders from "./loaders";

require("dotenv").config();

const startServer = async () => {
  const app = express();

  await loaders({ app, config });

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
};

startServer();
