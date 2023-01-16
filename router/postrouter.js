const { application } = require("express");
const express = require("express");
const { authenticate } = require("../middleware/authentication");
const { PostModel } = require("../models/postschema");

const app = express();
const mongoose = require("mongoose");
const PostRouter = express.Router();

PostRouter.get("/", async (req, res, next) => {
  if (req.query.device) {
    next();
  } else {
    const { title, body, device, userID } = req.body;
    const userid = req.body.userID;
    try {
      const data = await PostModel.find({ userid: userID });
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send("Something went wrong while getting post");
    }
  }
});

PostRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const data = new PostModel(payload);
    await data.save();
    res.send("Post has been created");
  } catch (error) {
    console.log(error);
    res.send("Error while creating post");
  }
});

PostRouter.patch("/update/:id", async (req, res) => {
  const userid = req.body.userID;
  const data = await PostModel.findOne({ _id: req.params.id });
  console.log(data);
  const postsUser_id = data.userID;
  try {
    if (postsUser_id === userid) {
      const post = await PostModel.findByIdAndUpdate(req.params.id, req.body);
      res.send("Posts Updated");
    } else {
      console.log("Not Authorized");
      res.send("Unauthorized can't update");
    }
  } catch (error) {
    console.log(error);
    res.send("Can not update posts");
  }
});

PostRouter.delete("/delete/:id", async (req, res) => {
  const userid = req.body.userID;
  const data = await PostModel.findOne({ _id: req.params.id });
  const postUser_id = data.userID;
  try {
    if (postUser_id === userid) {
      const note = await PostModel.findByIdAndDelete({ _id: req.params.id });
      res.send("Post Deleted");
    } else {
      console.log("Not Authorized");
      res.send("Unauthorized can't delete");
    }
  } catch (error) {
    console.log(error);
    res.send("Can not delete posts");
  }
});

//Device Filter:

PostRouter.get("/", async (req, res) => {
  const device = req.query.device;
  console.log(device);
  try {
    const data = await PostModel.find({ device: device });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("Error while getting the particular data");
  }
});
module.exports = { PostRouter };


module.exports = {
  PostRouter,
};
