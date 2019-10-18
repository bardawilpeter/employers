// Imports
import { GraphQLObjectType, GraphQLString } from 'graphql'

/**
   * EmployeeType.
   * Containing the fields that could be returned by graphql on employee create.
   * _id contain employee id
   * name contain employee name
   * location contain employee location
   * department contain employee department
   * imageUrl contain employee imageUrl 
   * createdAt contain employee createdAt
   * updatedAt contain employee updatedAt
   * 
*/
const EmployeeType = new GraphQLObjectType({
    name: 'EmployeeType',
    description: 'This type will describe employee fields',

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
});

export default EmployeeType