import registerUser from "./routes/registration";

import loginUser from "./routes/login";

import userRoutes from "./routes/user";

import { isValid } from "./utils/validationMiddleware";

import { isAuth } from "./utils/authMiddleware";

const passport = require("passport");
const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");

require("./controller/passport");

app.use(express.json());

app.use(
  session({
    secret: "lol",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/register", isValid, registerUser);

app.use("/login", isValid, passport.authenticate("local"), loginUser);

app.use("/user", isAuth, userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
