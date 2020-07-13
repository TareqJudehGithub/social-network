const User = require("../models/user");

const userById = async (req, res, next, id) => {

    try {
     await User.findById(id)
     .exec((err, user) => {
          if(err || !user){
               return res.status(400).json({ msg: "Error! User not found!"});
          }
          
          req.profile  = user // Adds profile object in req with user info.
          next();
     });     
    } 

    catch (error) {
     console.log(error.message);
     res.status(500).json({ msg: error});
    }
};

// user authorization check:
const hasAuthorization = (req, res, next) => {
     const authorized = req.profile && req.auth && erq.profile._id === req.auth._id;
     if(!authorized) {
          return res.status(403).json({ 
               msg: "Error! User is not authorized to perform this action."
          });
     }
}
module.exports = {
     userById,
     hasAuthorization
};