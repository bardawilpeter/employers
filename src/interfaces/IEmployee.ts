import { Document } from "mongoose";

export interface IEmployee extends Document {
  _doc: Document;
  _id: string;
  email: string;
  name: string;
  location: string;
  department: string;
  imageUrl:string;
  createdAt: Date;
  updatedAt: Date;
}

export default IEmployee;
