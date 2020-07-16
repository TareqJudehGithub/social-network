const { 
     getUsers, getUserById, updateUser, deleteUser, userById
} = require("../controllers/users");
const auth = require("../middleware/auth");
// const { midAuth } = require("../controllers/auth");


const express = require("express");
const router = express.Router();


router.get("/", getUsers);
router.get("/:id", auth, getUserById);
router.put("/edit/:userId", updateUser);
router.delete("/del/:userId", deleteUser);

// Any route containing :userId, our app will first execute userById() 
router.param("id", userById);

module.exports = router;