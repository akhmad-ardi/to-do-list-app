import "dotenv/config";
import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log("Database Connected!!!");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connect;
