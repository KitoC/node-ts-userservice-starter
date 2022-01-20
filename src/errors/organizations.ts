import { ErrorResponse } from "../@types";

interface OrganisationErrorTypes {
  ORGANIZATION_USER_NO_ACCESS: ErrorResponse;
}

const errors = {
  ORGANIZATION_USER_NO_ACCESS: {
    message: "You don't have access to that organization/app.",
    status: 401,
    code: "ORGANIZATION_USER_NO_ACCESS",
  },
} as OrganisationErrorTypes;

export default errors;
