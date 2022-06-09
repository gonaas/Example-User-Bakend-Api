require("dotenv").config({ path: "./.env" });
require("./config/db");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const app = express();
const { ValidationError } = require("express-validation");
const db = require("./config/db");

app.use(cors({ credentials: true, origin: true }));
app.use(
  session({
    name: "auth",
    secret: "auth",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

require("./middleware/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

require("./features/api/api.router")(app, passport);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  console.error(err);
  return res.status(500).json(err);
});

app.listen(3001, () => {
  console.log("server on port 3001");
});
