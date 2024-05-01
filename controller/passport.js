import db from "../model/db";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        console.log(email);
        console.log(password);
        const dbRes = await db.query(
          "SELECT * FROM users WHERE user_email = $1",
          [email]
        );
        const user = dbRes.rows[0];
        if (!user) {
          return done(null, false, { error: "Incorrect username" });
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.user_password
        );

        if (passwordsMatch) {
          return done(null, user);
        } else {
          return done(null, false, { error: "Incorrect password" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.user_email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
