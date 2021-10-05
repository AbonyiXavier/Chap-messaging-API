import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    photo: {
      type: String,
      default: 'https://good-deed-app.s3-us-west-1.amazonaws.com/user.png'
    },
    deleted: {
      type: Boolean,
      index: true,
      default: false
    }
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};
const User = mongoose.model("User", UserSchema);

export default User;
