// Imports
import * as cors from 'cors';
import { Express } from 'express';
import * as bodyParser from 'body-parser';
import { isAuth } from '../middleware/auth';

/**
   * Express server adding modules.
   * @param {server} - contain the initialized server instance 
*/
export default function(server: Express): void {
    console.info('Loading express modules...');

    // Enable CORS
    server.use(cors());

    server.use(isAuth);
    // Request body parser
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: false}));
}
