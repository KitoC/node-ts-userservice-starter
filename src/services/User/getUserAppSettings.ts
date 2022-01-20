import { Container } from "../service.types";
import errors from "../../errors";

const makeGetUserAppSettings = (container: Container) => {
  const { db, currentUser } = container;

  return async (req: any) => {
    const { appId } = req.params;
    const userId = currentUser.id;
    const where = { appId, userId };

    let appSettings;

    await db.transaction(async (transaction: any) => {
      if (!appPassword) {
        throw errors.users.USER_APP_NO_ACCESS;
      }
    });

    /* @ts-ignore */
    return appSettings.serialize();
  };
};

export default makeGetUserAppSettings;
