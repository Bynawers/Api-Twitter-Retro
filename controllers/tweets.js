import Tweet from "../models/tweet.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from "fs";

export const createTweet = async (req, res) => {
  try {
    const { body, type, author, tag } = req.body;

    console.log("body: " + body);
    console.log("type: " + type);
    console.log("author: " + author);

    const tweet = new Tweet({ body, type, author });

    const savedTweet = await tweet.save();

    if (!req.file) {
      return res.status(201).json("Tweet created successfully");
    }

    const tweetId = savedTweet._id.toString();

    const oldPath = path.join(__dirname, "public", "assets", "post", tag);
    const newPath = path.join(__dirname, "public", "assets", "post", tweetId);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error("Error rename image (CreateTweets) : ", err);
        return res.status(500).json({ message: err.message });
      }

      const imagePath = "/profile/" + tweetId;

      Tweet.findByIdAndUpdate(
        tweetId,
        { postImage: imagePath },
        { new: true },
        (updateErr, updatedTweet) => {
          if (updateErr) {
            console.error("Error updating tweet: ", updateErr);
            return res.status(500).json({ message: updateErr.message });
          }

          return res.status(201).json("Tweet created successfully");
        }
      );
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const getAllTweets = async (req, res) => {
  try {
    // Extract pagination parameters from query string
    const page = parseInt(req.query.page) || 1; // Current page number, default to 1
    const pageSize = parseInt(req.query.pageSize) || 20; // Number of tweets per page

    // Calculate skip value to paginate results
    const skip = (page - 1) * pageSize;

    // Query database for tweets with pagination
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    // Count total number of tweets (for pagination metadata)
    const totalTweets = await Tweet.countDocuments();

    // Calculate total number of pages
    const totalPages = Math.ceil(totalTweets / pageSize);

    // Construct pagination metadata
    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      pageSize: pageSize,
      totalCount: totalTweets,
    };

    // Send response with paginated tweets and pagination metadata
    res.status(200).json({ tweets, pagination });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTweetById = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }
    res.status(200).json(tweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const updateFields = req.body;
    const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, updateFields, {
      new: true,
    });
    if (!updatedTweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }
    res.status(200).json(updatedTweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
    if (!deletedTweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }
    res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
