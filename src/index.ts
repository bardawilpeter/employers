// Imports
import * as express from 'express';

// App Imports
import setupLoadModules from './loaders/load-modules'
import setupStartServer from './loaders/start-server'
import setupGraphQL from './loaders/graphql';

// Create express server
const server = express()

// Setup load modules
setupLoadModules(server)

// Start server
setupStartServer(server)

// Setup GraphQL
setupGraphQL(server)