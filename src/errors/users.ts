import { ErrorResponse } from "../@types";

interface UserErrorTypes {
  USER_APP_NO_ACCESS: ErrorResponse;
}

const errors = {
  USER_APP_NO_ACCESS: {
    message: "You don't have access to that app.",
    status: 401,
    code: "USER_APP_NO_ACCESS",
  },
} as UserErrorTypes;

export default errors;
