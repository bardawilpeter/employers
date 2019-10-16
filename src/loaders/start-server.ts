// App Imports
import { Express } from 'express';
import {MongoDB} from './mongo-connection';

export default function (server: Express): void {
    console.info('Loading express server with mongoDB...');

    // Start web server
    server.listen(3302, (error: any) => {
        MongoDB.connect();
        if (error) {
            console.error('Unable to start express server please check the port')
        } else {
            console.info("Express server started on port 3001.")
        }
    })
}