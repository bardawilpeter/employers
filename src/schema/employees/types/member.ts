// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

/**
   * MemberType.
   * Containing the fields that could be returned by graphql on member create.
   * _id contain member id
   * name contain member name
   * location contain member location
   * department contain member department
   * imageUrl contain member imageUrl 
   * createdAt contain member createdAt
   * updatedAt contain member updatedAt
   * 
*/
const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    description: 'This type will describe member fields',

    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        department: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        createdAt:  { type: GraphQLString },
        updatedAt:  { type: GraphQLString },
    })
})

export default MemberType