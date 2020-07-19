const { 
     getUsers, getUserById, updateUser, deleteUser, userById
} = require("../controllers/users");
const auth = require("../middleware/auth");
// const { midAuth } = require("../controllers/auth");


const express = require("express");
const router = express.Router();


router.get("/", getUsers);
router.get("/:id", auth, getUserById);
router.put("/update/:id", auth, updateUser);
router.delete("/del/:id", auth, deleteUser) 

// Any route containing :id, our app will first execute userById() 

// router.param("userId", userById);

module.exports = router;