// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

/**
   * UserType.
   * Containing the fields that could be returned by graphql on user signup.
   * id contain authenticated user id
   * name contain user name
   * email contain user email
*/
const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'This type will describe user creation fields',

    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

export default UserType