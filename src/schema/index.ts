// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './query'

// Schema
const schema = new GraphQLSchema({
    query
})

export default schema
