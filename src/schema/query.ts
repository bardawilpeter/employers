//App Imports
import { GraphQLObjectType } from 'graphql'
import * as user from './users/fields/query'

// Query for get 
const query = new GraphQLObjectType({
    name: 'query',
    description: 'Query get schema to pull element from db',

    fields: () => ({
        ...user
    })
})

export default query