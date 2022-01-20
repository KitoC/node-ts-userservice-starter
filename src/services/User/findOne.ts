import { Container } from "../service.types";
import errors from "../../errors";

const makeFindOne = (container: Container) => {
  const { db } = container;

  return async (options: any = {}) => {
    const user = await db.User.findOne({
      ...options,
      attributes: db.User.decryptedAttributes,
    });

    return user;
  };
};

export default makeFindOne;
