const { getPosts, getPostByUserId, createPost, deletePost } = require("../controllers/post");
const { postById, hasAuth} = require("../controllers/post");
const auth = require("../middleware/auth"); 
const { userById } = require("../controllers/users");
const { postValidator } = require("../validator/index");

const chalk = require("chalk");
const Post = require("../models/post");

const express = require("express");
const router = express.Router();


// routes
router.get("/", getPosts);
router.post("/newpost/:userId", auth, createPost, postValidator);
router.delete("/delpost/:id" , auth, deletePost);

router.get("/:userId", getPostByUserId);
// Any route containing :userId, our app will first execute userById() 
router.param("userId", userById);

// any route containing postId, our app will first execute postById()
router.param("id", postById);
module.exports= router;