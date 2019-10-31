// Imports
import { GraphQLObjectType } from "graphql";

// App Imports
import * as user from "./users/fields/query";
import * as employee from "./employees/fields/query";

/**
 * Graphql query.
 * Containing the imported queries.
 */
const query = new GraphQLObjectType({
  name: "query",
  description: "Query get schema to pull element from db",

  fields: () => ({
    ...user,
    ...employee
  })
});

export default query;
