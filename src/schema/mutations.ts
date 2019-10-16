// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from './users/fields/mutations'

// Mutation
const mutation = new GraphQLObjectType({
    name: 'mutations',
    description: '...',

    fields: {
        ...user
    }
})

export default mutation
