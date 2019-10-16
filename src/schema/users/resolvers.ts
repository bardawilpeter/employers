// App Imports
import {User}  from '../../models/user';
import * as bcrypt from 'bcryptjs';
import validator = require('validator');
import jwt = require('jsonwebtoken');

//Create user
export async function createuser(parentValue: any, args: any) {
    const errors = [];
    if (!validator.isEmail(args.email)) {
      errors.push({ message: 'E-Mail is invalid.' });
    }
    if (
      validator.isEmpty(args.password) ||
      !validator.isLength(args.password, { min: 5 })
    ) {
      errors.push({ message: 'Password is too short.' });
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      throw error;
    }
    const existingUser = await User.findOne({ email: args.email });
    if (existingUser) {
      const error = new Error('User already exist');
      throw error;
    }
    const hashedPw = await bcrypt.hash(args.password, 12);
    const user = new User({
      email: args.email,
      name: args.name,
      password: hashedPw
    });
    const createdUser =await user.save();
    return {id:createdUser._id}
  }

//User login
export async function login(parentValue: any, args: any) {
    const user =  await User.findOne({ email: args.email });
    if (!user) {
        const error = new Error('User not found.');
        throw error;
      }
      const isEqual = await bcrypt.compare(args.password, user.get("password"));
      if (!isEqual) {
        const error = new Error('Password is incorrect.');
        throw error;
      }
      const token = jwt.sign(
          {
            userId: user._id.toString(),
            email: user.get("email")
          },
          'somesupersecretsecret',
          { expiresIn: '1h' }
        );
    return {id:user.get("_id"),token:token,name:user.get("name")};
  }