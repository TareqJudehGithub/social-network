const { signup } = require("../controllers/auth");
const { userValidator } = require("../validator/index");
const express = require("express");
const router = express.Router();



router.post("/signup", userValidator, signup);

module.exports = router;