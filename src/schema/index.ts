// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './query'
import mutation from './mutations'

/**
   * Graphql schema.
   * Containing the imported queries and mutation.
*/
const schema = new GraphQLSchema({
    query,
    mutation
})

export default schema
