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
        pretty: true,
        customFormatErrorFn(err:any) {
            if (!err.originalError) {
              return err;
            }
            const data = err.originalError.data;
            const message = err.message || 'An error occurred.';
            const code = err.originalError.code || 500;
            return { message: message, status: code, data: data };
        }
    })));
}
