const { getPosts, createPost } = require("../controllers/post");
const { postValidator } = require("../validator/index");

const express = require("express");
const router = express.Router();


// routes

router.get("/", getPosts);

router.post("/", postValidator, createPost);

module.exports= router;