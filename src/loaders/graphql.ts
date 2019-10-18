// Imports
import * as graphqlHTTP from 'express-graphql';
import { Express } from 'express';

// App Imports
import schema from '../schema';

/**
   * Graphql server setup.
   * @param {server} - contain the initialized server instance 
*/
export default function setupGraphQL(server: Express): void {
    console.info('Loading graphql endpoint...')

    server.use("/", graphqlHTTP(() => ({
        schema,
        graphiql: true,
        pretty: true
    })));
}
