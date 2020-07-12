const expressJwt = require("express-jwt");

const midAuth = expressJwt({
     secret: process.env.JWT_SECRET,
     algorithms: ['HS256']
});

module.exports = {
     midAuth    
}