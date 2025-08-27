import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
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

// Remove password automatically when converting to JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema)

export default User 