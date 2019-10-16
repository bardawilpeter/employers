// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Thought type
const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'This type will describe user fields',

    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

export default UserType