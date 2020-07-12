const User = require("../models/user");
const { validationResult } = require("express-validator");

const signup = async (req, res) => {
     
     const errors = validationResult(req);
     if(!errors.isEmpty()){
          return res.status(400).json({ errors: errors.array()[0]});
     }

     try {
          let user = await User.findOne({ email: req.body.email });
     // if(user) {
     //      return res.status(400).json({ msg: "Error! User already exists!"});
     // }
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
module.exports = {
     signup
};