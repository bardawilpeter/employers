//App Imports
import { GraphQLObjectType } from 'graphql'
import * as user from './users/fields/query'

/**
   * Graphql query.
   * Containing the imported queries.
*/
const query = new GraphQLObjectType({
    name: 'query',
    description: 'Query get schema to pull element from db',

    fields: () => ({
        ...user
    })
})

export default query