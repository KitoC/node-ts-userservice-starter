import { v4 as uuidv4 } from "uuid";

const addUUID = (record: any) => {
  record.id = uuidv4();

  return record;
};

export default addUUID;
