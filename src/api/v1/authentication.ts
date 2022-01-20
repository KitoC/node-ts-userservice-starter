import { RequestHandler, Router } from "express";
import api from "../../../_config/api";

const router = Router({ mergeParams: true });

const endpoint = `/api/v1/auth/${process.env.USER_SERVICE_APP_ID}`;

router.post("/login", async (req, res, next) => {
  try {
    const { data } = await api.userService.post(`${endpoint}/login`, req.body);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    console.log("api", api);
    const { data } = await api.userService.post(
      `${endpoint}/register`,
      req.body
    );

    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
