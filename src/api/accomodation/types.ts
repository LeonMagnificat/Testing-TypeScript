import { Model, Document } from "mongoose";

export interface Accomodation {
  name: string;
  description: string;
  maxGuest: Number;
  location: string;
  hist: string;
}
