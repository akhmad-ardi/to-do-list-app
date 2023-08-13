import express from "express";
import { getUser, createUser, updateUser, addList, deleteList, finishList, loginUser } from "./../controllers/UserController.js";
import authentication from "./../middleware/auth.js";

const router = express.Router();

// auth
router.post("/", authentication, async (req, res) => {
  return res.status(200).json({ login: true });
});
router.get("/user/:id", getUser);
router.post("/user/registration", createUser);
router.post("/user/login", loginUser);
router.patch("/user/:id", updateUser);
// add to do list's user
router.patch("/user/addlist/:id", addList);
// delete to do list's user
router.patch("/user/deletelist/:id", deleteList);
// finished list
router.patch("/user/finishlist/:id", finishList);

export default router;
