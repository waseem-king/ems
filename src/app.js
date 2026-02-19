// app module is used to run the middlewars and routes
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes")
const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const morgan = require("morgan")
const logger = require("./config/logger")

app.use(
    morgan("combined",{
        stream:{
            write: (message)=>logger.info(message.trim())
        }
    })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

// rate limiting prevents brute force attacks
const limiter = rateLimit({
    windowMs:15*60*1000,
    max:100
})
// users routes are called here
app.use("/api", limiter ,userRoutes)
// use of helmet it prevents from xxs attacks
app.use(helmet())
// cors is used for cross platform resource sharing
app.use(cors({
origin: ["http://localhost:3000"], // frontend
  credentials: true
}))
// mongo sanitize prevents from sql attacks through query
app.use(mongoSanitize())
// prevent http parameter pollution
app.use(hpp())






module.exports = app;
