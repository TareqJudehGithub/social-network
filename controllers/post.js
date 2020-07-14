const Post = require("../models/post");
const { validationResult } = require("express-validator");
const formidable = require("formidable");
const fs = require("fs");

const getPosts = async (req, res) => {

    const posts = await Post
          .find()
          .populate("postedBy", "name -_id")
          .sort({ date: -1 })
          .select("_id title body");
    try {
         res.json({ posts });
    } 
    catch (error) {
         console.log(error.message);
         res.status(500).json({ msg: error })
    }
};
const getPostByUserId = async(req, res) => {
     try {
          const posts = await Post.find({ postedBy: req.user._id })  //user ID from users/postedBy document.)
               .populate("postedBy", "_id name")
               .sort("_created")  //sort posts by date. 
          res.json(posts);    
     } 
     catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Error! Unable to get user's posts."});
     }      
};

const createPost = async (req, res, next) => {
     
     // check for other errors:
     const errors = validationResult(req);   
      if(!errors.isEmpty()){
           return res.status(400).json({ errors: errors.array()[0] });
     }

     try {         
          // upload file 
          
          // access formidable form fields
          let form = await new formidable.IncomingForm();
          form.keepExtensions = true; // show files ext

          form.parse(req, async(err, fields, files) => {
               if(err) {
                    return res.status(400).json({ msg: "Error! New Post failed!" });
               }
               // new post with all fields from req
               let post = await new Post(fields)

               req.user.hashed_password = undefined;
               req.user.salt = undefined;
               post.postedBy = req.user;
               
               if (files.image){ //if the file includes an image
                    post.image.data = fs.readFileSync(files.image.path);
                    post.image.contentType = files.image.type;
               }

               await post.save();
               res.json(post); 
          });
     } 
     catch (error) {
               console.log(err.message);
               return res.status(500).json({ msg: "Error! New Post failed!" });
     }
     
};

module.exports = {
     getPosts,
     createPost,
     getPostByUserId
};





