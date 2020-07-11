const postController = require("../controllers/post");

const express = require("express");
const router = express.Router();

router.get("/", postController.getPosts);
router.get("/about", postController.aboutPosts);

module.exports= router;