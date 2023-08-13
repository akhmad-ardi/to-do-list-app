import "dotenv/config";
import { User } from "./../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation user exist
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(400).json({ message: "user exist" });
    }

    if (!(username, email, password)) {
      return res.status(400).json({ message: "input required" });
    }

    // encrypt password
    let encryptedPassword;
    if (password) {
      encryptedPassword = await bcrypt.hash(password, 10);
    }

    // create user
    const newUser = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // create token
    const token = jwt.sign({ user_id: newUser._id, email: email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
    newUser.token = token;

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "input required" });
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      return res.status(200).json(user);
    }
    res.status(400).json({ message: "user not found" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    // get user
    const user = await User.findById(req.params.id);

    // validate input
    if (!(username, email)) {
      return res.status(400).json({ message: "input required" });
    }

    // validate user exist
    const userExist = await User.findOne({ email });
    if (user.email == email) {
      user.email = email;
    } else if (userExist) {
      return res.status(409).json({ message: "Email Already Exist" });
    } else {
      user.email = email;
    }

    // update user
    user.username = username.toLowerCase();

    // list's user
    user.todolist = user.todolist;

    user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const addList = async (req, res) => {
  try {
    const id = req.params.id;
    const list = req.body.list;

    if (list == "" || list == undefined) {
      return res.status(400).json({ message: "Inpur Required" });
    }

    const user = await User.findById(id);
    user.todolist.push({ list: list, finished: false });
    user.save();

    res.status(201).json(user.todolist);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const deleteList = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const userList = user.todolist;

    // deleting list
    if (userList.length == 1) {
      userList.pop();
    } else {
      const indexFirst = req.body.index;
      userList.splice(indexFirst, indexFirst + 1);
    }

    user.save();
    return res.status(201).json(userList);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const finishList = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const index = req.body.index;
    const userList = user.todolist[index];

    // finishing list
    if (userList.finished == false) {
      userList.finished = true;
    } else {
      userList.finished = false;
    }

    user.save();
    return res.status(200).json(user.todolist);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
