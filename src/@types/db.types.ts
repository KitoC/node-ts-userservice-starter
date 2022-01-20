import { Sequelize } from "sequelize";

export interface Db {
  sequelize: Sequelize;
  Sequelize: any;
}

export type GetModelByKeyFunction = (key: string) => any;
export type AddModelToDbFunction = (file: string) => any;
