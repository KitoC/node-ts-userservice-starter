import { Router } from "express";
import v1 from "./v1";
import utils from "../utils";

export default () => {
  const routes = Router({ mergeParams: true });

  routes.use("/api/v1", v1);

  return routes;
};
