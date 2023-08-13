import "dotenv/config";
import express from "express";
import database from "./config/db.js";

database();

// routes
import User from "./routes/user.js";

const app = express();
app.use(express.json());
app.use("/auth", User);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
