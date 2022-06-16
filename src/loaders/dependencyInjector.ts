import * as awilix from "awilix";
import * as express from "express";

import { LoaderArgs } from "../@types/loader.types";

export default ({ app, registerModules = () => {} }: LoaderArgs) => {
  const container = awilix.createContainer();

  let modules = ["src/services/**/index.ts"];

  if (process.env.NODE_ENV === "production") {
    modules = ["dist/src/services/**/index.js"];
  }

  container.loadModules(modules, {
    formatName: (ignore: string, { path }: any) => {
      const [fileName, serviceName] = path.split("/").reverse();

      return `${serviceName}Service`;
    },
    resolverOptions: { register: awilix.asFunction },
  });

  container.register({
    currentUser: awilix.asValue(null),
    userSettings: awilix.asValue(null),
  });

  container.register(registerModules(awilix));

  app.use((req, res, next) => {
    res.locals.container = container;

    next();
  });

  return container;
};
