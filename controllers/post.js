const Post = require("../models/post");
const { validationResult } = require("express-validator");
const { find } = require("../models/post");

const getPosts = async (req, res) => {

    const posts = await Post
          .find()
          .sort({ date: -1 })
          .select("_id title body");
    try {
         res.json({ posts });
    } catch (error) {
         console.log(error.message);
         res.status(500).json({ msg: error })
    }
};

const createPost = async (req, res) => {

     // check for other errors:
     const errors = validationResult(req);

      // if errow show the first one as they happen:
      if(!errors.isEmpty()){
           return res.status(400).json({ errors: errors.array() });
      }

     const newPost = new Post(req.body);
     try{
         const post = await newPost.save();
         res.json(post)
     }
     catch(error){
          console.log(error.message);
          res.status(500).json({ msg: error });
     }
};

module.exports = {
     getPosts,
     createPost
};





