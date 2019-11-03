// Imports
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Employee Model.
 * This model contain collection fields. The created schema will give the ability to interact with the collection.
 */
const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Creating our model
export const Employee = mongoose.model("Employee", employeeSchema);
