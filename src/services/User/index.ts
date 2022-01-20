import { Container } from "../service.types";

import makeFindOne from "./findOne";

const makeUserService = (container: Container) => {
  return {
    findOne: makeFindOne(container),
  };
};

export default makeUserService;
