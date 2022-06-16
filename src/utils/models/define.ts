import addUUID from "./addUUID";

const define = (sequelize: any) => (
  modelName: string,
  attributes: any,
  options: any = {}
) => {
  const { encryptedFields = [], ...modelOptions } = options;

  const env = process.env.NODE_ENV;

  // ts-ignore
  const Model = sequelize.define(modelName, attributes, modelOptions);

  if (env === "test") {
    Model.beforeValidate = () => {};
    Model.beforeCreate = () => {};
    Model.beforeBulkUpdate = () => {};
    Model.beforeUpdate = () => {};
  } else {
    Model.beforeValidate(addUUID);
  }

  return Model;
};

export default define;
