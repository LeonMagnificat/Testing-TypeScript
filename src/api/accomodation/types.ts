import { Model, Document } from "mongoose";

export interface AccomodationToken {
  _id: string;
  name: string;
  description: string;
  maxGuests: number;
  location: string;
}
