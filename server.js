const express = require("express");
const app = express();
const connectDB = require("./config/db");
const morgan = require("morgan");
const dotenv = require("dotenv");


// init
app.use(express.json());
connectDB();
dotenv.config();

// routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

// middleware
app.use(morgan("dev"));
app.use("/api/posts", postRoutes);
app.use("/api/users", authRoutes);

const PORT = process.env.PORT || 8080; //if PORT in .env is not available, then use 8080

app.listen(PORT, () => {
     console.log(`Server is up and running on port ${PORT}`)
});
