const { check } = require("express-validator");

const postValidator = [
     // title
     check("title", "Please enter a title.")
          .not().isEmpty(),
     check("title", "Title must be between 4 and 150 characters.")
          .isLength({
               min: 4,
               max: 150
          }), 

     // body:
     check("body", "Please enter a message in Body.")
          .not().isEmpty(),
     check("body", "Message must be between 4 and 2000 characters.")
          .isLength({
               min: 4, 
               max: 2000
          })
]
const userValidator = [
     // name
     check("name", "Please enter a user name")
          .not().isEmpty().bail(),
     check("name", "Name must be between 2 and 150 characters.")
          .isLength({ min: 2, max: 150}),
     check("name", "Name must only contain letters.")
     .matches(/^[A-Za-z\s]+$/).withMessage('Name must not contain numbers or symbols.')
     .bail(),

     // email
     check("email", "Please enter a valid email address")
          .isEmail(),
     check("email", "User email address already exists!")
          .exists(),
     // password
    
     check("password", "Please enter a password")
          .not().isEmpty().bail(),
     check("password", "Password must be between 6 and 15 characters.")
          .isLength({ min: 6, max: 15}).bail(),
     check("password", "Password must contain at least one number.")
          .matches(/\d/).bail(),
          check("password", "Password must contain at least one symbol.")
          .matches(/[!@#$%&*()-/:-?{-~!"^_`\[\]]/).bail()
] 
 
module.exports = {
     postValidator,
     userValidator
};