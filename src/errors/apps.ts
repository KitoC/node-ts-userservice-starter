import { ErrorResponse } from "../@types";

interface AppErrorTypes {
  APP_NO_EXIST: ErrorResponse;
}

const errors = {
  APP_NO_EXIST: {
    message: "App does not exist.",
    status: 404,
    code: "APP_NO_EXIST",
  },
} as AppErrorTypes;

export default errors;
