import mongoose from "mongoose";
import listEndpoint from "express-list-endpoints";
import { server } from "./server";

const port = process.env.PORT || 3002;

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL!);

mongoose.connection.on("connected", () => {
  console.log("DB Connected");
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
    console.table(listEndpoint(server));
  });
});
