import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists! Try logging in!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();

  // Set token cookie
  createToken(res, newUser._id);

  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    exp: newUser.exp,
    level: newUser.level,
  });
});

const loginUser = asyncHandler(async(req,res) => {
  const {email,password} = req.body;

  const existingUser = await User.findOne({email});

  if(existingUser) {
    const isPasswordValid = await bcrypt.compare(password,existingUser.password);

    if(isPasswordValid) {
      createToken(res,existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        exp: existingUser.exp,
        level: existingUser.level,
      });

      return;
    }else {
      res.status(400);
      throw new Error("Incorrect Password!");
    }
  }else {
    res.status(400);
    throw new Error("User Not Found! Try Registering!");
  }
});

const logoutCurrentUser = asyncHandler(async(req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async(req,res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async(req,res) => {
  const user = await User.findById(req.user._id);

  if(user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      exp: user.exp,
      level: user.level,
    }); 
  }else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async(req,res) => {
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);
  const user = await User.findById(req.user._id);

  if(user){
    user.username = req.body.username || user.username;
    
  if (req.body.email && req.body.email !== user.email) {
    const emailTaken = await User.findOne({ email: req.body.email });
    if (emailTaken) {
      res.status(400);
      throw new Error("Email already in use by another account");
    }
    user.email = req.body.email;
  }

    if(req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password,salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      exp: updatedUser.exp,
      level: updatedUser.level,
    }); 
  }else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { createUser,loginUser,logoutCurrentUser,getAllUsers,getCurrentUserProfile,updateCurrentUserProfile};