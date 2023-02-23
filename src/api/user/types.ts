import { Model, Document } from "mongoose";
import { AccomodationToken } from "../accomodation/types";

interface User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: "Guest" | "Host";
  accomodations: [{ type: AccomodationToken }];
}

export interface UserDocument extends User, Document {}
export interface UsersModel extends Model<UserDocument> {
  checkCredentials(email: string, password: string): Promise<UserDocument | null>;
}
