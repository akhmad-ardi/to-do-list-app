import mongoose from "mongoose";

const Schema = mongoose.Schema;

// model Data's User
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    todolist: { type: [{ list: String, finished: Boolean }], default: [] },
    token: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
