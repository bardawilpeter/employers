// Imports
import { GraphQLString } from "graphql";

// App Imports
import EmployeeType from "../types/employee";
import { addEmployee, setEmployee, deleteEmployee } from "../resolvers";

/**
 * createEmployee mutation.
 * Containing the fields that will be sent to graphql "createEmployee" resolver.
 * name contain desired employee name
 * location contain desired employee location
 * department contain desired employee department
 * imageUrl contain desired employee image
 */
export const createEmployee = {
  type: EmployeeType,
  args: {
    name: {
      name: "name",
      type: GraphQLString
    },

    email: {
      name: "email",
      type: GraphQLString
    },
    location: {
      name: "location",
      type: GraphQLString
    },
    department: {
      name: "department",
      type: GraphQLString
    },
    imageUrl: {
      name: "imageUrl",
      type: GraphQLString
    }
  },
  resolve: addEmployee
};

/**
 * updateEmployee mutation.
 * Containing the fields that will be sent to graphql "createUser" resolver.
 * name contain desired user name
 * email contain desired user email
 * password contain desired user password
 */
export const updateEmployee = {
  type: EmployeeType,
  args: {
    ...createEmployee.args,
    id: {
      name: "id",
      type: GraphQLString
    }
  },
  resolve: setEmployee
};

/**
 * deleteEmployee mutation.
 * Containing the fields that will be sent to graphql "deleteUser" resolver.
 * id contain desired employee id
 */
export const remove = {
  type: EmployeeType,
  args: {
    id: {
      name: "id",
      type: GraphQLString
    }
  },
  resolve: deleteEmployee
};
