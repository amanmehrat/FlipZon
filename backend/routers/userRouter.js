import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await User.remove({}); // As we are using hardcoded data as this point every refresh
    //creates a new user. (Check commit "connected to mongo and added hardcoded users" to understand flow). Hence we first remove all users then re add to avoid duplicate email error
    const createdUsers = await User.insertMany(data.users);
    res.send({
      createdUsers,
    });
  })
);

export default userRouter;
