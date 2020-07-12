const { getPosts, createPost } = require("../controllers/post");
const { postValidator } = require("../validator/index");
const { midAuth} = require("../middleware/auth");

const express = require("express");
const router = express.Router();


// routes

router.get("/", midAuth, getPosts);

router.post("/", postValidator, createPost);

module.exports= router;