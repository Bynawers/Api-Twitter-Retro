import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      unique: true,
      //required: true,
      min: 4,
      max: 50,
    },

    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 2,
    },
    dob: {
      type: String,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },

    /* followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }],

        following: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }],
        
        tweets: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Tweet' }],
            */
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
