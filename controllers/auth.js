
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// const expressJwt = require("express-jwt");
const dotenv = require("dotenv");  //for JWT_SECRET
const User = require("../models/user");
const chalk = require("chalk");

dotenv.config();


const signin = async (req, res) => {

     const { email, password } = req.body;
     
     try {
          // find user based on email:
          let user = await User.findOne({email: email});
          // if user does not exist: 
          if(!user ) {
               return res.status(401).json({ msg: "Error! User does not exist."});
          }
     
          // email and password must match:
          // user authentication from /models/user.js
          if(!user.authenticate(password)) {
               console.log(chalk.red("Error! Invalid email or password!"));
               return res.status(401).json({ msg: "Error! Invalid email or password." });
          }

          // if user exists, then athenticate:

           // jwt:
           const payload = {
               user: {
                    id: user.id
               }
          };
          jwt.sign(
               payload,
               process.env.JWT_SECRET,
               {
                    expiresIn: 900,
                    // algorithm: 'HS256',
               },
               (error, token) => {
                    if(error) throw error;
                    res.json({ 
                         token,
                         user: {
                              _id: user._id,
                              name: user.name
                         }
                    });
                    console.log(
                         `${chalk.blue(user.name)} ${chalk.green(`signed in successfully!`)}`);
               }
          );


          // Expres-jwt:
          // generate a token with user ID and secret
          // const { _id, name } = user;
          // const payload = {
          //      user: {
          //           _id: _id,   
          //      }
          // }
          // // }{ _id, name } = user;

          // // sign with both user id and token:
          
        
          // const token = jwt.sign(
          //      payload, 
          //      process.env.JWT_SECRET,
          //      {
          //           expiresIn: 900
          //      }
          // );
          // res.cookie(
          //      "token", 
          //      token, 
          //      {expire: new Date() + 3600}
          // );
          // console.log(`${chalk.blue(user.name)} ${chalk.green(`signed in successfully!`)}`)
          // return res.json({ 
          //      token, 
          //      user: { 
          //           _id: _id,
          //           name: name,
          //           email: email
          //      }
          // });

     // persist the token as "token" in cookie with exp date

     // return response with user and token to frontend client

     // return response with user and toke  
     }  
     catch (error) {
          console.log(chalk.red(error.message));
          res.status(500).json({ msg: "Server Error! Error authenticating user!" });
     }
};

const signup = async (req, res) => {
     
     const errors = validationResult(req);
     if(!errors.isEmpty()){
          return res.status(400).json({ errors: errors.array()[0]});
     }
     
     try {
          // check if user already exists:
          let user = await User.findOne({ email: req.body.email });
     if(user) {
          return res.status(400).json({ msg: "Error! User already exists!"});
     }
     user = new User(req.body); 
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
// const midAuth = expressJwt({
//      secret: process.env.JWT_SECRET,
//      algorithms: ['HS256'],
//      userProperty: "auth"
// });

module.exports = {
     signup,
     signin,
     signOut,
    
};