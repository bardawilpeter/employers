// Imports
import { GraphQLString } from "graphql";

// App Imports
import UserLoginType from "../types/user.login";
import { login } from "../resolvers";

/**
 * userLogin query.
 * Containing the fields that will be sent to graphql "login" resolver.
 * email contain user email
 * password contain user password
 */
export const userLogin = {
  type: UserLoginType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve: login
};
