import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const { Schema, model } = mongoose;

const tweetSchema = new Schema(
  {
    body: {
      type: String,
    },
    type: {
      type: String,
      enum: ["tweet", "reply", "retweet"],
      required: true,
    },
    originalTweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      autopopulate: true,
    },
    stat: {
      view: {
        type: Number,
        default: 0,
      },
      retweet: {
        type: Number,
        default: 0,
      },
      like: {
        type: Number,
        default: 0,
      },
      bookmark: {
        type: Number,
        default: 0,
      },
      comment: {
        type: Number,
        default: 0,
      },
    },
    retweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: { select: "tag", maxDepth: 1 },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: { select: "tag", maxDepth: 1 },
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        autopopulate: { maxDepth: 1 },
      },
    ],
    postImage: {
      type: String,
    },
  },
  { timestamps: true },
  { collection: "tweets" }
);

tweetSchema.plugin(autopopulate);

const Tweet = model("Tweet", tweetSchema);
export default Tweet;
