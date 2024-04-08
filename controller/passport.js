import db from "../model/db";

var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function verify(email, password, cb) {
      db.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email],
        function (err, res) {
          if (err) {
            return cb(err);
          }
          if (!res.rows[0]) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }

          crypto.pbkdf2(
            password,
            res.rows[0].salt,
            310000,
            32,
            "sha256",
            function (err, hashedPassword) {
              if (err) {
                return cb(err);
              }
              if (
                !crypto.timingSafeEqual(
                  res.rows[0].password_hash,
                  hashedPassword
                )
              ) {
                return cb(null, false, {
                  message: "Incorrect username or password.",
                });
              }
              return cb(null, res.rows[0]);
            }
          );
        }
      );
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
