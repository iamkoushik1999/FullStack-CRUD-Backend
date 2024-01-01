const express = require("express");
require("dotenv").config();
require("colors");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
// Database
const connectDB = require("./config/db.js");
connectDB();
// Requires
const routes = require("./routes/routes.js");
const errorHandler = require("./middleware/errorMiddleware.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors("*"));

// Test Route
app.get("/", (req, res) => res.send("Server Running Successfully!"));

// Routes Middleware
app.use("/user", routes);

// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`.cyan));
