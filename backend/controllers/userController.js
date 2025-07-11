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

  createToken(res, newUser._id);

  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    isAdmin: newUser.isAdmin,
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
        isAdmin: existingUser.isAdmin,
        email: existingUser.email,
        exp: existingUser.exp,
        level: existingUser.level,
      });

      return;
    }else {
      res.status(400);
      throw new Error("Incorrect Password!"); //toast-notify takes these message and displays when an error occurs
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
      isAdmin: user.isAdmin,
      exp: user.exp,
      level: user.level,
    }); 
  }else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async(req,res) => {
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

const deleteUserById = asyncHandler(async(req,res) => {
  const user = await User.findById(req.params.id);

  if(user) {
    if(user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete Admin Account!");
    }
    await User.deleteOne({_id:user._id});
    res.json({message: "User Account deleted"})
  }else {
    res.status(400);
    throw new Error("User not found!");
  }
});

const getUserById = asyncHandler(async(req,res) => {
  const user = await User.findById(req.params.id).select("-password");

  if(user) {
    res.json(user);
  }else{
    res.status(400);
    throw new Error("User not found!");
  }
});

const updateUserById = asyncHandler(async(req,res) => {
  const user = await User.findById(req.params.id);

  if(user) {
    user.username = req.body.username || user.username;

    if (req.body.email && req.body.email !== user.email) {
      const emailTaken = await User.findOne({ email: req.body.email });

      if (emailTaken) {
        res.status(400);
        throw new Error("Email already in use by another account");
      }
      user.email = req.body.email;
    }
    
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      exp: updatedUser.exp,
      level: updatedUser.level,
    }); 
  }else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getLeaderBoard = asyncHandler(async(req,res) => {
  const users = await User.find({})
    .sort({level:-1,exp:-1})
    .select('username level exp');
  
  res.json(users);
});

const saveTodayScore = asyncHandler(async (req, res) => {
  try {
    const { score, sleepActivityScore, categories } = req.body;
    const user = req.user;
    const today = new Date().toLocaleDateString('en-CA');

    const existingIndex = user.scoreHistory.findIndex(entry => entry.date === today);

    const newEntry = {
      date: today,
      score,
      sleepActivityScore: sleepActivityScore || 0,
      categories: categories || {
        depression: 0,
        anxiety: 0,
        self_worth: 0,
        stress_management: 0,
        concentration: 0
      }
    };

    if (existingIndex !== -1) {
      // Update existing entry
      user.scoreHistory[existingIndex] = newEntry;
    } else {
      // Insert new entry
      user.scoreHistory.push(newEntry);
    }

    user.todaysScore = score;
    user.exp += score;

    await user.save();

    res.status(200).json({ message: 'Score saved successfully', score });
  } catch (error) {
    res.status(500).json({ message: 'Error saving score', error: error.message });
  }
});

const getScoreHistory = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user.scoreHistory || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching score history', error: error.message });
  }
});

export { createUser,loginUser,logoutCurrentUser,getAllUsers,getCurrentUserProfile,updateCurrentUserProfile,deleteUserById,
         getUserById,updateUserById,getLeaderBoard,saveTodayScore,getScoreHistory
};