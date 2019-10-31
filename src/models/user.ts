// Imports
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
/**
 * User Model.
 * This model contain collection fields. The created schema will give the ability to interact with the collection.
 */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
// Creating our model
export const User = mongoose.model("User", userSchema);
