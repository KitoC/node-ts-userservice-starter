import { RequestHandler } from "express";
import dotenv from "dotenv";
import passport from "passport";
// import LocalStrategy from "passport-local";
import passportJWT from "passport-jwt";
import { LoaderArgs } from "../@types/loader.types";
import errors from "../errors";
import utils from "../utils";

export default async ({ container }: LoaderArgs) => {
  const { db } = container.cradle;

  dotenv.config();

  const { JWT_ALGORITHM, JWT_EXPIRY } = process.env;

  const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    algorithms: [JWT_ALGORITHM],
    jwtExpiresIn: JWT_EXPIRY,
    passReqToCallback: true,
  } as any;

  // passport.use(new passportJWT.Strategy(jwtOptions));
};
