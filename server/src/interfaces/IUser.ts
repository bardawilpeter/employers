import { Document } from "mongoose";

export interface IUser extends Document {
  _doc: Document;
  _id: string;
  email: string;
  name: string;
  password:string;
  isActive: boolean;
  verifyToken:string,
  createdAt: string;
  updatedAt: string;
}

export default IUser;
