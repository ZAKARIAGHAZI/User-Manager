import mongoose from 'mongoose'

const userScheme = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "User firstName is required"],
      trim: true,
      minLength: 2,
      maxLength: 255,
    },
    lastName: {
      type: String,
      required: [true, "User lastName is required"],
      trim: true,
      minLength: 2,
      maxLength: 255,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valide email adress"],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: 6,
    },
  },
  { timestamps: true }
);


const User = mongoose.model('User', userScheme)

export default User 