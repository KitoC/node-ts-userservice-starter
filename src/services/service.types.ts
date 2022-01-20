import { Db, UserInstance } from "../db/models/types";

export interface UserService {
  findOne: (where: any) => any;
  register: (req: any) => { user: string };
}

export interface Container {
  db: Db;
  UserService: UserService;
  currentUser: UserInstance;
  userSettings: any;
}
