import api from "../../_config/api";
import { RequestHandler } from "express";

const endpoint = `/api/v1/auth/${process.env.USER_SERVICE_APP_ID}/check-token`;

const checkToken: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);

    const { data } = await api.userService.get(endpoint, {
      headers: { ["Authorization"]: req.headers.authorization },
    });

    api.userService.defaults.headers.common.Authorization =
      req.headers.authorization;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkToken;
