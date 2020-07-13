const { getUsers, signup, signin, signOut } = require("../controllers/auth");
const { userById } = require("../controllers/users");

const express = require("express");
const router = express.Router();

const { userValidator } = require("../validator/index");
const { midAuth } = require("../middleware/auth");



router.get("/", midAuth, getUsers);
router.post("/signup", userValidator, signup);
router.post("/signin", signin);
router.get("/signout", signOut);

// Any route containing :userId, our app will first execute userById();
router.param("userId", userById);

module.exports = router;