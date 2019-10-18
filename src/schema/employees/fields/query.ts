// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import EmployeeListType from '../types/employee.list';
import { getEmployees } from '../resolvers';

/**
   * employees query.
   * Containing the fields that will be sent to graphql "getEmployees" resolver.
   * page - number of the page that will be deisplayed in pagination
*/
export const employees = {
    type: EmployeeListType,
    args: {
        page: { type: GraphQLInt }
    },
    resolve: getEmployees
}
