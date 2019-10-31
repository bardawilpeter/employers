// Imports
import { GraphQLString } from "graphql";

// App Imports
import UserType from "../types/user";
import { createuser, confirm } from "../resolvers";

/**
 * signup mutation.
 * Containing the fields that will be sent to graphql "createUser" resolver.
 * name contain desired user name
 * email contain desired user email
 * password contain desired user password
 */
export const signup = {
  type: UserType,
  args: {
    name: {
      name: "name",
      type: GraphQLString
    },

    email: {
      name: "email",
      type: GraphQLString
    },
    password: {
      name: "password",
      type: GraphQLString
    }
  },
  resolve: createuser
};

/**
 * Confirm mutation.
 * Containing the fields that will be sent to graphql "confirm" resolver.
 * id contain of the user
 */
export const confirmEmail = {
  type: UserType,
  args: {
    id: {
      name: "id",
      type: GraphQLString
    }
  },
  resolve: confirm
};
