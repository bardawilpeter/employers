import * as mongoose from "mongoose";

export class MongoDB {
    public static connect(): void {
      const uri = "mongodb+srv://peterb:swardfish@cluster0-ehayv.mongodb.net/messages?retryWrites=true&w=majority";

        mongoose.connect(uri, (err: any) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("MongoDB successfully connected and all actions to database can be performed.");
            }
          });
    }
}
