const dbLoader = require("../loaders/db").default;

const db = dbLoader({});

const describeServiceMethod = (serviceMethodPath, tests) => {
  const [serviceMethodName] = serviceMethodPath.split("/").reverse();

  const makeServiceMethod = require(`../${serviceMethodPath}`).default;
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const testArgs = {
    env: process.env,
    container: { db },
  };

  const setters = {
    _setContainer(nextContainer) {
      Object.entries(nextContainer).forEach(([key, value]) => {
        testArgs.container[key] = value;
      });

      testArgs[serviceMethodName] = makeServiceMethod(testArgs.container);
    },
    _setEnv(nextEnv) {
      Object.entries(nextEnv).forEach(([key, value]) => {
        process.env[key] = value;
      });
    },
  };

  setters._setEnv({
    JWT_SECRET: "secret",
    JWT_ALGORITHM: "HS256",
    JWT_EXPIRY: "6h",
  });

  const serviceMethod = (...args) => {
    if (serviceMethodPath.includes("utils")) {
      return makeServiceMethod(...args);
    }

    return makeServiceMethod(testArgs.container)(...args);
  };

  describe(`services/Authentication/${serviceMethodName}`, () => {
    tests(serviceMethod, { ...testArgs, ...setters });
  });
};

module.exports = describeServiceMethod;
