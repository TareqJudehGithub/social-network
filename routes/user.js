const { 
     getUsers, getUserById, updateUser, deleteUser, userById
} = require("../controllers/users");
const { midAuth} = require("../middleware/auth");

const express = require("express");
const router = express.Router();


router.get("/", getUsers);
router.get("/:userId", midAuth, getUserById);
router.put("/edit/:userId", midAuth, updateUser);
router.delete("/del/:userId", midAuth, deleteUser);

// Any route containing :userId, our app will first execute userById() 
router.param("userId", userById);

module.exports = router;