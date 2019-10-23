// Imports
import * as mongoose from "mongoose";

/**
   * MongoDB server.
   * This will create a mongoDB instance.
*/
export class MongoDB {
    public static connect(): void {
      const uri = process.env.MONGO_DB;

        mongoose.connect(uri,
        { 
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        },
        (err: any) => {
          if (err) {
            console.log(err.message);
          } 
          else {
              console.log("MongoDB successfully connected and all actions to database can be performed.");
          }
        });
    }
}
