import { Sequelize, Model, ModelAttributes, ModelOptions } from "sequelize";

import { UserModelStatic } from "./model.types";

export interface ModelOptionsExtended extends ModelOptions {
  encryptedFields: string[];
}

export interface SequelizeExtended extends Sequelize {}

export interface Db {
  transaction: any;
  sequelize: SequelizeExtended;
  Sequelize: any;
  User: any;
}
