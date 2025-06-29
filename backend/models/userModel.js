import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  isAdmin: {type:Boolean,required:true,default:false},
  exp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  avatar: { type: String, default: '' },
  settings: {
    darkMode: { type: Boolean, default: true },
    notifications: { type: Boolean, default: true },
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;