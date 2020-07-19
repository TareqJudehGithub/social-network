const { getPosts, getPostByUserId, createPost, updatePost, deletePost } = require("../controllers/post");
const { postById, hasAuth} = require("../controllers/post");
const auth = require("../middleware/auth"); 
const { userById } = require("../controllers/users");
const { postValidator } = require("../validator/index");

const chalk = require("chalk");

const express = require("express");
const router = express.Router();


// routes
router.get("/", getPosts);
router.get("/poster/:id", auth, getPostByUserId);
router.post("/newpost/:id", auth, createPost, postValidator);
router.put("/update/:id", auth, updatePost);
router.delete("/del/:id" , auth, deletePost);


// Any route containing :userId, our app will first execute userById() 
// router.param("userId", userById);

// any route containing postId, our app will first execute postById()
// router.param("id", deletePost);
module.exports= router;