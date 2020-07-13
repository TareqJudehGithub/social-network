const expressJwt = require("express-jwt");
const dotenv = require("dotenv");

dotenv.config();
// If the token is valid, express-jwt appends the verified users Id in an auth
// key to the request object.
const midAuth = expressJwt({
     secret: process.env.JWT_SECRET,
     algorithms: ['HS256'],
     userProperty: "auth"
});

module.exports = {
     midAuth    
};

