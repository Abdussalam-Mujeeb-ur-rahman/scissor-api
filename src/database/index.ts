import mongoose from "mongoose";

export class DatabaseConnection {
  private mongodb_uri: string;

  constructor(mongodb_uri: string) {
    this.mongodb_uri = mongodb_uri;
  }

  public connect(): void {
    mongoose.connect(this.mongodb_uri);

    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });

    mongoose.connection.on("error", (err: any) => {
        console.log("Database error: " + err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });
  }
}
