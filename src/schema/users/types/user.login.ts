// Imports
import { GraphQLObjectType, GraphQLString } from "graphql";

/**
 * UserLoginType.
 * Containing the fields that could be returned by graphql on successful auth.
 * id contain authenticated user id
 * name contain authenticated user name
 * email contain authenticated user email
 * token contain authenticated user signed JWT token
 */
const UserLoginType = new GraphQLObjectType({
  name: "UserLoginType",
  description: "This type will describe user login fields",

  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString }
  })
});

export default UserLoginType;
