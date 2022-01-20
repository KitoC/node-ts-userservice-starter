import fs from "fs";
import path from "path";
import get from "lodash/get";
import startCase from "lodash/startCase";
import { Sequelize } from "sequelize";
import SequelizeMock from "sequelize-mock";
import { LoaderArgs } from "../@types/loader.types";
import {
  Db,
  GetModelByKeyFunction,
  AddModelToDbFunction,
} from "../@types/db.types";
import utils from "../utils";
import sqlColors from "sequelize-log-syntax-colors";

const sqlLogger = function (text: string) {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  let hours: string | number = dateObj.getHours();
  hours = hours <= 9 ? `0${hours}` : hours;
  const mins = dateObj.getMinutes();
  const secs = dateObj.getSeconds();

  const date = `${year}-${month}-${day} ${hours}:${mins}:${secs} sql query:`;
};

export default ({ app, config }: LoaderArgs) => {
  const env = process.env.NODE_ENV || "development";

  let db = {} as Db & { transaction: any };

  const getModelByKey: GetModelByKeyFunction = (key) => get(db, key, {});
  const addModelToDb: AddModelToDbFunction = async (file) => {
    try {
      const model = require(path.join(modelDir, file)).default(
        sequelize,
        utils.models.define(sequelize)
      );

      const key = startCase(model.name).replace(/ /g, "");

      db = { ...db, [key]: model };
    } catch (error) {
      console.log("LOADING MODEL ERROR -->", error);
    }
  };

  const _config = get(config, `db.${env}`, {});

  if (_config.logging) {
    _config.logging = sqlLogger;
  }

  const sequelize =
    env === "test"
      ? new SequelizeMock(process.env[_config.use_env_variable], _config)
      : new Sequelize(process.env[_config.use_env_variable], _config);

  let modelDir: string = "";

  if (__dirname.includes("dist")) {
    modelDir = path.join(process.cwd(), "dist", "src", "db", "models");
  } else {
    modelDir = path.join(process.cwd(), "src", "db", "models");
  }

  fs.readdirSync(modelDir)
    .filter((file) => !["types"].includes(file))
    .forEach(addModelToDb);

  Object.keys(db).forEach((modelName) => {
    if (getModelByKey(modelName).associate) {
      getModelByKey(modelName).associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.transaction = async (callback: (t: any) => void) => {
    let transaction;

    if (env === "test") {
      // NOTE: Required for testing
      // @ts-ignore
      db.sequelize.transaction = () =>
        // @ts-ignore
        Promise.resolve({
          // @ts-ignore
          commit: () => Promise.resolve({}),
          // @ts-ignore
          rollback: () => Promise.resolve({}),
        });
    }

    try {
      transaction = await db.sequelize.transaction();

      await callback(transaction);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  };

  return db;
};
