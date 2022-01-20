import { Router } from "express";
import middleware from "../../middleware";
import utils from "../../utils";
import authentication from "./authentication";

const routes = Router({ mergeParams: true });

routes.use("/authentication", authentication);

export default routes;
