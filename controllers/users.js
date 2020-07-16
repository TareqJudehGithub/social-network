const User = require("../models/user");
const _ = require("lodash");
const chalk = require("chalk");
const user = require("../models/user");


const getUsers = async (req, res) => {
   
     try {
          const users = await User
               .find()
               .select("name email created updated");
               
          res.json({ users });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Error! Unable to fetch all users."});
     }
};

const getUserById = async( req, res) => {

     try {
          req.user.hashed_password = undefined; 
          req.user.salt = undefined;
          return await res.json(req.user);

     } catch (error) {
          res.status(500).json({ msg: error});
     }
};

const updateUser = async(req, res, next) => {

     try {
          let user = req.user;
          user = _.extend(user, req.body) // extend - mutate the source obj.
          user.updated = Date.now()  //set update date.
          await user.save();

          user.hashed_password = undefined;
          user.salt = undefined;
          res.json(user);
          console.log(chalk.blue(`User ${chalk.green(user.name)} update was successful!`));

     } catch (error) {
          console.log(error.message);
          return res.status(500).json({ msg: error});
     }

};
const deleteUser = (req, res, next ) => {
    
    try {     
          let user = req.user;
          console.log(req.user.name);
          user.remove();
          
          user.hashed_password = undefined;
          user.salt = undefined;
          res.json({ msg: `${user.name} was successfully deleted!` });

    } catch (error) {
         res.status(500).json({ msg: error })
    }
};

// Middlewares:

const userById = async (req, res, next, id) => {

    try {
     const user = await User.findById(id);
     console.log("User Id: ", id);
          if(!user){
               return res.status(400).json({ msg: "Error! User not found!"});
          }
          req.user = user; // Adds profile object in req with user info.
          next();   
    } 

    catch (error) {
     console.log(error.message);
     return res.status(500).json({ msg: error});
    }
};

// user authorization check:
const hasAuthorization = (req, res, next) => {
     const isAuthorized = req.user && req.auth && req.user._id == req.auth._id;

     console.log(isAuthorized);
     console.log(req.user._id);
     console.log(req.auth._id);
     if(!isAuthorized) {
          return res.status(403).json({ 
               msg: "Error! User is not authorized to perform this action."
          });
     }
     next(); // if user is authorized, then give auth
}
module.exports = {
     getUsers,
     getUserById,
     updateUser,
     userById,
     hasAuthorization,
     deleteUser
};