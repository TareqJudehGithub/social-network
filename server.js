const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");


// init
const app = express();
app.use(express.json());
connectDB();

// routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

// middleware
app.use("/api/posts", postRoutes);
app.use("/api/", authRoutes);
app.use("/api/users", userRoutes);
app.use(morgan("dev"));
app.use(cookieParser());

     // express-jwt custom unautherized error msg:
app.use(function (err, req, res, next) {
     if (err.name === 'UnauthorizedError') {
       res.status(401).send('This action is not authorized.');
     }
   });

const PORT = process.env.PORT || 8080; //if PORT in .env is not available, then use 8080

app.listen(PORT, () => {
     console.log(`Server is up and running on port ${PORT}`)
});
