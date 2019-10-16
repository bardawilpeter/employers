// Imports
import { GraphQLObjectType } from 'graphql'

// Query for get 
const query = new GraphQLObjectType({
    name: 'query',
    description: 'Query get schema to pull element from db',

    fields: () => ({
        ...
    })
})

export default query