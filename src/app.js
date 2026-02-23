// app module is used to run the middlewars and routes
const express = require("express");
const app = express();

const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const morgan = require("morgan")

const logger = require("./config/logger")
const auth0 = require("./config/auth0")
const userRoutes = require("./routes/user.routes")


// use of helmet it prevents from xxs attacks
app.use(helmet())
// cors is used for cross platform resource sharing
app.use(cors({
origin: ["http://localhost:3000"], // frontend
  credentials: true
}))

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

// Fix for Express 5: make req.query writable before mongo-sanitize
app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: req.query,
    writable: true,
    configurable: true
  });
  next();
});

// mongo sanitize prevents from sql attacks through query
// app.use(mongoSanitize())
// app.use(
//   mongoSanitize({
//     replaceWith: "_"
//   })
// );
app.use(
  mongoSanitize({
    allowDots: true,
    replaceWith: "_"
  })
);
app.use(xss())
// prevent http parameter pollution
app.use(hpp())

// logging
app.use(
    morgan("combined",{
        stream:{
            write: (message)=>logger.info(message.trim())
        }
    })
);

// auth0
app.use(auth0)
// rate limiting prevents brute force attacks
const limiter = rateLimit({
    windowMs:15*60*1000,
    max:100
})
app.get("/profile", (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json(req.oidc.user);
});
// here is the link of public folder where it is exist html and css file
app.use(express.static("./public"))
// users routes are called here
app.use("/api", limiter ,userRoutes)



module.exports = app;
