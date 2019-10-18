// Imports
import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import EmployeeType from './employee'

/**
   * EmployeeListType.
   * Containing the fields that could be returned by graphql while requesting employee list.
   * employeesList contain list of employees
   * totalEmployees contain number of employees
*/
const EmployeeListType = new GraphQLObjectType({
    name: 'EmployeeListType',
    description: 'This type will describe employee fields',

    fields: () => ({
        employeesList: { type: GraphQLList(EmployeeType) },
        totalEmployees: { type: GraphQLString }
    })
});

export default EmployeeListType
