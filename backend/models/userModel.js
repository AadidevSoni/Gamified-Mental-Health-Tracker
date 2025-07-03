import mongoose from "mongoose";

const scoreEntrySchema = mongoose.Schema({
  date: { type: String, required: true },  
  score: { type: Number, required: true }
}, { _id: false });

const userSchema = mongoose.Schema({

  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  exp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  avatar: { type: String, default: '' },
  todaysScore: { type: Number, default: 0 },
  scoreHistory: [scoreEntrySchema],
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
