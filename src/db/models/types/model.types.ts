import { BuildOptions, Model } from "sequelize";

// User
export interface UserAttributes {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UserInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type UserModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserInstance) & {
    associate: (db: any) => void;
    createStrategy?: () => void;
    serializeUser?: () => void;
    deserializeUser?: () => void;
    decryptedAttributes: any[];
  };
