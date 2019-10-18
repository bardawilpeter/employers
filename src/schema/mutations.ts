// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from './users/fields/mutations'
import * as employee from './employees/fields/mutations'

/**
   * Graphql mutation.
   * Containing the imported mutations.
*/
const mutation = new GraphQLObjectType({
    name: 'mutations',
    description: 'Mutation set schema to change db data',

    fields: {
        ...user,
        ...employee
    }
})

export default mutation
