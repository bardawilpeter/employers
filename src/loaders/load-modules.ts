// Imports
import * as cors from 'cors'
import { Express } from 'express';
import * as bodyParser from 'body-parser'

// Load express modules
export default function(server: Express): void {
    console.info('Loading express modules...')

    // Enable CORS
    server.use(cors())

    // Request body parser
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({extended: false}))

}