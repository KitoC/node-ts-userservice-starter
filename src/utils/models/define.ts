import addUUID from "./addUUID";
import get from "lodash/get";
import isObject from "lodash/isObject";

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

    Model.decryptedAttributes = [
      ...Object.keys(Model.rawAttributes).filter(
        (field) => !encryptedFields.includes(field)
      ),
      ...encryptedFields.map((field: string) => [
        sequelize.fn(
          "PGP_SYM_DECRYPT",
          sequelize.cast(sequelize.col(field), "bytea"),
          "AES_KEY"
        ),
        field,
      ]),
    ];

    const encryptAttributes = async (record: any, options: any) => {
      const { fn } = sequelize;

      const PG_ENCRYPT_FN = "PGP_SYM_ENCRYPT";
      const PG_ENCRYPT_T = "AES_KEY";

      const handleValue = (value: any) =>
        isObject(value) ? `${JSON.stringify(value)}` : value;

      const encryptField = (value: any) =>
        fn(PG_ENCRYPT_FN, value, PG_ENCRYPT_T);

      encryptedFields.forEach((key: string) => {
        let isBulkUpdate = record.type === "BULKUPDATE";

        if (isBulkUpdate && record.attributes[key]) {
          record.attributes[key] = encryptField(record.attributes[key]);
        }

        if (record[key]) {
          record[key] = encryptField(record[key]);
        }
      });

      return record;
    };

    Model.beforeCreate(encryptAttributes);
    Model.beforeUpdate(encryptAttributes);
    Model.beforeBulkUpdate(encryptAttributes);
  }

  return Model;
};

export default define;
