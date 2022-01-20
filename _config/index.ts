import db from "./db";

require("dotenv").config();

export = {
  port: process.env.PORT || 2442,
  appName: "user-service",
  db,
};
