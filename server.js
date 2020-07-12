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
const cookieParser = require("cookie-parser");

// middleware
app.use(morgan("dev"));
app.use("/api/posts", postRoutes);
app.use("/api/users", authRoutes);
app.use(cookieParser())

const PORT = process.env.PORT || 8080; //if PORT in .env is not available, then use 8080

app.listen(PORT, () => {
     console.log(`Server is up and running on port ${PORT}`)
});
