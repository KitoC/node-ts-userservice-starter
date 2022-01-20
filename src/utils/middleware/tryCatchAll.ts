import tryCatch, { TryCatchAll } from "./tryCatch";

const tryCatchAll: TryCatchAll = (...middlewares) => {
  return middlewares.map((handler: any) => tryCatch(handler));
};

export default tryCatchAll;
