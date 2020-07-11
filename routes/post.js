const { getPosts, createPost } = require("../controllers/post");
const { checkValidator } = require("../validator/index");

const express = require("express");
const router = express.Router();


// routes

router.get("/", getPosts);

router.post("/", checkValidator, createPost);

module.exports= router;