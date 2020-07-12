
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");  //for JWT_SECRET
const User = require("../models/user");

dotenv.config();

const getUsers = async (req, res) => {
   
     try {
          const users = await User
               .find()
               .select("id name email created");
               
          res.json({ users });
     } catch (error) {
          res.status(500).json({ msg: error});
     }
};

const signin = async (req, res) => {

     const { email, password } = req.body;
     
     try {
          // find user based on email:
          let user = await User.findOne({email: email});
          // if err or no user 
          if(!user ) {
               return res.status(401).json({ msg: "Error! User is not exist."});
          }
     
     // email and password must match:
     // user authentication from /models/user.js
     if(!user.authenticate(password)) {
          return res.status(401).json({ msg: "Error! Invalid email or password." });
     }

     // if user exists, then athenticate:

     // generate a token with user ID and secret
     const { _id, name } = user
     const token = jwt.sign(
          { _id: _id}, 
          process.env.JWT_SECRET
     );
     res.cookie(
          "token", 
          token, 
          {expire: new Date() + 3600}
     );

     return res.json({ 
          token, 
          user: { 
               _id: _id,
               name: name,
               email: email
          }
     });


     // persist the token as "token" in cookie with exp date

     // return response with user and token to frontend client

     // return response with user and token

     
     } 
     catch (error) {
          res.status(500).json({ msg: error});
     }
};

const signup = async (req, res) => {
     
     const errors = validationResult(req);
     if(!errors.isEmpty()){
          return res.status(400).json({ errors: errors.array()[0]});
     }
     
     try {
          let user = await User.findOne({ email: req.body.email });
     if(user) {
          return res.status(400).json({ msg: "Error! User already exists!"});
     }
     user = new User(req.body); 
     // res.json({user});  returns the new user
     // OR
     res.json({ msg: ` New user ${user.name} sign up was successful.` })
     await user.save();
     } 
     catch (error) {
          console.log(error.message);
          res.status(500).json({ mesg: "Error creating new user!"});
     }
}
const signOut = async(req, res) => {
     await res.clearCookie("token");
     res.json({ msg: "Signout was successful!"});
}

module.exports = {
     signup,
     getUsers,
     signin,
     signOut
};