// Imports
import { GraphQLString } from 'graphql'

// App Imports
import UserLoginType from '../types/user.login';
import { login } from '../resolvers'


//User Login
export const userLogin = {
    type: UserLoginType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: login
}