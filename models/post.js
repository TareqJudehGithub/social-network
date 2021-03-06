const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const postSchema = new mongoose.Schema({
     title: {
          type: String,
          required: true
     },
     body: {
          type: String,
          required: true
     }
     ,
     image: {
          data: Buffer,
          contentType: String
     },
     // posts relationship with users
     postedBy: {
          type: ObjectId,
          ref: "User"
     },
     created: {
          type: Date,
          default: Date.now
     },
     updated: {
          type: Date
     }
});

module.exports = mongoose.model("Post", postSchema); // (model name, schema)