// app module is used to run the middlewars and routes
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes")

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

// users routes are called here
app.use("/api", userRoutes)

module.exports = app;