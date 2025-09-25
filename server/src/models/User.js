import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    picture: {
      type: String,
      trim: true,
    },
    authProvider: {
      type: String,
      enum: ['google', 'manual'],
      default: 'manual',
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

export default User;
