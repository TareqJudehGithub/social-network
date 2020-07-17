const Post = require("../models/post");
const { validationResult } = require("express-validator");
const formidable = require("formidable");
const fs = require("fs");
const chalk = require("chalk");


const getPosts = async (req, res) => {
     
     
    const posts = await Post
          .find()
          .populate("postedBy", "name _id")
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
          const userPosts = await Post
          .find({ postedBy: req.user.id })
          .populate("postedBy", "_id name")
          .sort("_created");

          res.json(userPosts);

          console.log(chalk.blue(`Fetching user posts was successful!`));
     } catch (error) {
          console.log(chalk.red(error.message));
          res.status(500).json({ msg: "Error! Unable to get user's posts."});
     }

     // try {
     //      const posts = await Post.find({ postedBy: req.user._id })  //user ID from users/postedBy document.)
     //           .populate("postedBy", "_id name")
     //           .sort("_created")  //sort posts by date. 
     //      res.json(posts);    
     // } 
     // catch (error) {
     //      console.log(chalk.red(error.message));
     //      res.status(500).json({ msg: "Error! Unable to get user's posts."});
     // }      
};


const createPost = async (req, res, next) => {
     const { title, body, created } = req.body;
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
               
               // new post with all fields from req
               let post = await Post.findById(req.user.id);

               console.log(`Poster params: `, req.user.id);
               post = new Post(fields);
               // req.user.hashed_password = undefined;
               // req.user.salt = undefined;
               post.postedBy = req.user.id; // add field postedBy to the new post doc.
              
               if (files.image){ //if the file includes an image
                    post.image.data = fs.readFileSync(files.image.path);
                    post.image.contentType = files.image.type;
               }

               await post.save();
               res.json(`New Post: ${post.title}`); 
          });
     } 
     catch (error) {
               console.log(err.message);
               return res.status(500).json({ msg: "Error! New Post failed!" });
     }
     
};
const deletePost = async (req, res) => {

     try {
          let post = await Post.findById(req.params.id);

         

          if(!post){
               return res.status(401).json({ msg: "Message not found!"});
             
          }
          if(post.postedBy.toString() !== req.user.id) {
               return res.status(403).json({ msg: "Action is not authorized! "});
          }
          console.log("Post params: ", req.params.id);
          console.log("req.user.id: ", req.user.id);
          console.log("Posted By: ", post.postedBy.toString());

          await Post.findByIdAndRemove(req.params.id);
          res.json({ msg: 'Post deleted successfully'});
          console.log(chalk.blue(`${post.title} was deleted successfully!`));     
     } 
     catch (error) {
          console.log(error.message);
          res.status(500).json(chalk.red({ msg: "Server Error 500! Delete user failed!"}));
     }
};

     // Solution 2:
     // let post = req.post;
     // post.remove((err, post) => {
     //    if (err) {
     //        return res.status(400).json({
     //            error: err
     //        });
     //    }
     //    res.json({
     //        msg: 'Post deleted successfully'
     //    });
     // });
// }

// Middlewares:

// const postById = async(req, res, next, id)  => {
//    try {
       
//      // find post based on ID
//      const post = await Post.findById(id)
//           .populate("postedBy", "_id name");
//      if(!post){
//           res.status(400).json({ msg: chalk.red("Error! Message not found!")});
//      }
//      // get the post based on the query, and add it to req obj:
//      req.post = post;
//      next();
     
//    } 
//    catch (error) {
//         console.log(chalk.red(error.message));
//         res.status(500).json({ msg: chalk.red("Error!")})
//    }
// }
const hasAuth = (req, res, next) => {

     let isAuthorized = req.post && req.auth && req.post.postedBy._id == req.auth._id;
     
     console.log(isAuthorized);
     console.log(req.post.postedBy._id);
     console.log(req.auth._id);
     

     if(!isAuthorized){
          return res.status(403).json({ msg: "User is not authorized to perform this action!"});
     }
     next();  //if user is authorized, then give auth
};




module.exports = {
     getPosts,
     createPost,
     deletePost,
     getPostByUserId,
     
     // postById,
     hasAuth
};





