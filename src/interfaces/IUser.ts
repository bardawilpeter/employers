import { Document } from "mongoose";

export interface IUser extends Document {
  _doc: Document;
  _id: string;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default IUser;
