import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      require: true,
      validate: {
        validator: function (v) {
          const passwordRegex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
          return passwordRegex.test(v);
        },
        message: (props) =>
          `${props.v} does not meet the password requirements!`,
      },
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;