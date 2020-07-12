const { getUsers, signup, signin, signOut } = require("../controllers/auth");
const { userValidator } = require("../validator/index");
const express = require("express");
const router = express.Router();


router.get("/", getUsers);
router.post("/signup", userValidator, signup);
router.post("/signin", signin);
router.get("/signout", signOut);

module.exports = router;