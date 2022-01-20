import { Express } from "express";

export type LoaderArgs = {
  app: Express;
  config?: any;
  container?: any;
  registerModules?: (args: any) => any;
};
