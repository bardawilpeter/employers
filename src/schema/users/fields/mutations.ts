// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import UserType from '../types/user'
import { createuser } from '../resolvers'

export const signup = {
    type: UserType,
    args: {
        name: {
            name: 'name',
            type: GraphQLString
        },

        email: {
            name: 'email',
            type: GraphQLString
        },
        password: {
            name: 'password',
            type: GraphQLString
        }
    },
    resolve: createuser
}