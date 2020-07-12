const { getUsers, signup, signin, signOut } = require("../controllers/auth");
const { userValidator } = require("../validator/index");
const { midAuth } = require("../middleware/auth");
const express = require("express");
const auth = require("../controllers/auth");
const router = express.Router();


router.get("/", midAuth, getUsers);
router.post("/signup", userValidator, signup);
router.post("/signin", signin);
router.get("/signout", signOut);

module.exports = router;