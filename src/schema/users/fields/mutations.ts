// Imports
import { GraphQLString } from 'graphql'

// App Imports
import UserType from '../types/user'
import { createuser } from '../resolvers'


/**
   * UserType.
   * Containing the fields that will be sent to graphql "createUser" resolver.
   * name contain desired user name
   * email contain desired user email
   * password contain desired user password
*/
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