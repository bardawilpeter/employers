// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Thought type
const UserLoginType = new GraphQLObjectType({
    name: 'UserLoginType',
    description: 'This type will describe user login fields',

    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString }
    })
})

export default UserLoginType