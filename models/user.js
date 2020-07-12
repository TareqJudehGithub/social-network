const mongoose = require("mongoose");
const { v4 : uuidv4 } = require("uuid");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
     name: {
          type: String,
          trim: true,  //removes any space before 1st char
          required: true,
     },
     email: {
          type: String,
          trim: true,
          unique: true,
          required: true
     },
     hashed_password: {
          type: String,   
          required: true
     },
     salt: String,
     created: {
          type: Date,
          default: Date.now   // mongoose date format
     },
     updated: Date // edit date
});

// virtual field
userSchema.virtual("password")
     .set(function(password) {
          
          // create a temporary variable called password
          this._password = password
          
          // generate a timestamp
          this.salt = uuidv4();

          //encryptPassword()
          this.hashed_password = this.encryptPassword(password);
     })
     .get(function() {
          //return password
          return this._password  
     })

     // methods
     userSchema.methods = {
          encryptPassword: function(password) {
               if(!password) return "";
               try {
                    return crypto.createHmac('sha1', this.salt)
                              .update(password)
                              .digest('hex');
               }
               catch (error) {
                    console.log(error.message);
                    return ""
               }
          }
     }


module.exports = mongoose.model("User", userSchema);