import sequelize from "sequelize";
import crypto from "../crypto";

const addSettingsHooks = (Model: any) => {
  const env = process.env.NODE_ENV;

  const handleSettings = async (record: any) => {
    const { settingsMap } = await record.getApp();

    const settings = {};

    Object.entries(settingsMap).forEach(([key, options]) => {
      const value = record.settings[key];
      /* @ts-ignore */
      if (options.encrypted && value) {
        /* @ts-ignore */
        settings[key] = crypto.encrypt(value);
      } else {
        /* @ts-ignore */
        settings[key] = value;
      }
    });

    record.settings = settings;

    return record;
  };

  Model.beforeCreate(handleSettings);
  Model.beforeUpdate(handleSettings);
  Model.beforeBulkUpdate(handleSettings);

  if (env === "test") {
    Model.Instance.prototype.serialize = serialize;
  } else {
    Model.prototype.serialize = serialize;
  }

  function serialize() {
    /* @ts-ignore */
    const dataValues = this.dataValues;

    const settings = dataValues.settings || {};

    Object.entries(settings).forEach(([key, value]) => {
      /* @ts-ignore */
      if (value.iv) {
        settings[key] = crypto.decrypt(value);
      }
    });

    dataValues.settings = settings;

    return dataValues;
  }
};

export default addSettingsHooks;
