import {} from "./model.types";

import { Model, ModelAttributes, ModelOptions, Sequelize } from "sequelize";

export interface ModelOptionsExtended extends ModelOptions {
  encryptedFields: string[];
}

export interface SequelizeExtended extends Sequelize {}

export interface Db {
  transaction: any;
  sequelize: SequelizeExtended;
  Sequelize: any;
}
