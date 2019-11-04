// Imports
import * as bcrypt from "bcryptjs";
import validator = require("validator");
import jwt = require("jsonwebtoken");

// App Imports
import { User } from "../../models/User";
import * as sendEmail from "../../services/mail";
import * as templates from "../../templates/email";
import IUser from "../../interfaces/IUser";

/**
 * Create User.
 * @param {args} - containing params sent by graphql expecting (email, name, password).
 * @return {id:createdUser._id,name:createdUser.name,email:createdUser.email} The created user.
 */
export async function createuser(parentValue: any, args: any){
  const errors = [];
  if (!validator.isEmail(args.email)) {
    errors.push({ message: "E-Mail is invalid." });
  }
  if (
    validator.isEmpty(args.password) ||
    !validator.isLength(args.password, { min: 5 })
  ) {
    errors.push({ message: "Password is too short." });
  }
  if (errors.length > 0) {
    const error = new Error("Invalid input.") as any;
    error.data = errors;
    error.code = 422;
    throw error;
  }
  const existingUser = await User.findOne({ email: args.email });
  if (existingUser) {
    const error = new Error("User already exist");
    throw error;
  }
  const hashedPw = await bcrypt.hash(args.password, 12);
  const user = new User({
    email: args.email,
    name: args.name,
    password: hashedPw
  });
  const createdUser = (await user.save()) as IUser;
  sendEmail.send(
    createdUser.email,
    templates.confirm(createdUser._id, createdUser.name)
  );
  return {
    id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email
  };
}

/**
 * User login.
 * @param {args} - containing params sent by graphql expecting (email, password).
 * @return {id:user._id,token:token,name:name} The logged in user.
 */
export async function login(parentValue: any, args: any) {
  const user = (await User.findOne({ email: args.email })) as IUser;
  if (!user) {
    const error = new Error("User not found.");
    throw error;
  }
  const isEqual = await bcrypt.compare(args.password, user.password);
  if (!isEqual) {
    const error = new Error("Password is incorrect.");
    throw error;
  }
  if (user && !user.isActive) {
    sendEmail.send(user.email, templates.confirm(user._id, user.name));
    const error = new Error("User not active.") as any;
    error.code = 403;
    throw error;
  }
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return {
    id: user._id,
    token,
    name: user.name
  };
}

/**
 * Confirm
 * @param {args} - id of user that need to be activated.
 * @return {id:user._id,name:name,email:email} The confirmed user.
 */
export async function confirm(parentValue: any, args: any) {
  const user = (await User.findById(args.verifyToken)) as IUser;
  if (!user) {
    const error = new Error("User not found.");
    throw error;
  }
  if (user.isActive) {
    const error = new Error("User already activated.");
    throw error;
  }
  user.isActive = true;
  user.save();
  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
}
