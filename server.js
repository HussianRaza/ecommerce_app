import registerUser from "./routes/registration";

import loginUser from "./routes/login";

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
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/register", registerUser);

app.use("/login", passport.authenticate("local"), loginUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
