// Imports
import * as cors from 'cors';
import { Express } from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { isAuth } from '../middleware/auth';
import Upload from '../services/s3-upload';
import { imageUpload } from '../routes/upload';

//Enabling environment variables
dotenv.config();

/**
   * Express server adding modules.
   * @param {server} - contain the initialized server instance 
*/
export default function (server: Express): void {
    console.info('Loading express modules...');

    // Enable CORS
    server.use(cors());
    // Auth middleware to check authorization header
    server.use(isAuth);
    // Route to upload image
    server.put('/image-upload', Upload.single('image'), imageUpload);
    // Request body parser
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
}
