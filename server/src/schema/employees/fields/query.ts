// Imports
import { GraphQLInt, GraphQLString } from "graphql";

// App Imports
import EmployeeListType from "../types/employee.list";
import EmployeeType from "../types/employee";
import { getEmployees, getEmployee, searchQuery } from "../resolvers";

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
};

/**
 * employees query.
 * Containing the fields that will be sent to graphql "getEmployees" resolver.
 * page - number of the page that will be deisplayed in pagination
 */
export const employee = {
  type: EmployeeType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: getEmployee
};

/**
 * employees query.
 * Containing the fields that will be sent to graphql "getEmployees" resolver.
 * page - number of the page that will be deisplayed in pagination
 */
export const search = {
  type: EmployeeListType,
  args: {
    page: { type: GraphQLInt },
    searchValue: { type: GraphQLString }
  },
  resolve: searchQuery
};
