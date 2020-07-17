const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const chalk = require("chalk");

dotenv.config();
// If the token is valid, express-jwt appends the verified users Id in an auth
// key to the request object.
module.exports = function(req, res, next) {
     // get token from header:
     const token  = req.header("Authorization");

     if(!token) {
          res.status(401).json({ msg: "token not found! Authorization denied!"});
     }
     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded.user;
          next();

     } catch (error) {
          console.log(chalk.red(error.message));
          res.status(401).json({ msg: "Error! Token is not valid! "});
     }     
};



// const midAuth = expressJwt({
//      secret: process.env.JWT_SECRET,
//      algorithms: ['HS256'],
//      userProperty: "auth"
// });

// module.exports = {
//      midAuth    
// };

