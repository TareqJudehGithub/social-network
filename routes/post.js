const { getPosts, createPost } = require("../controllers/post");
const { userById } = require("../controllers/users");

const { postValidator } = require("../validator/index");
const { midAuth} = require("../middleware/auth");

const express = require("express");
const router = express.Router();


// routes
router.get("/", getPosts);
router.post("/", midAuth, postValidator, createPost);

// Any route containing :userId, our app will first execute userById() 
router.param(userById);

module.exports= router;