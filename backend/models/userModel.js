import mongoose from "mongoose";

const scoreEntrySchema = mongoose.Schema({
  date: { type: String, required: true },
  score: { type: Number, required: true },
  sleepActivityScore: { type: Number, default: 0 },
  categories: {
    depression: { type: Number, default: 0 },
    anxiety: { type: Number, default: 0 },
    self_worth: { type: Number, default: 0 },
    stress_management: { type: Number, default: 0 },
    concentration: { type: Number, default: 0 },
  }
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
