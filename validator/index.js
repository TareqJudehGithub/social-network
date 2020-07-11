const { check } = require("express-validator");

const checkValidator = [
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
     
    
module.exports = {
     checkValidator
};