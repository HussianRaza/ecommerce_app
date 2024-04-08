const crypto = require("crypto");

import db from "../model/db";

const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return next(err);
        }

        db.query(
          "INSERT INTO users(user_email,password_hash,salt) VALUES($1,$2,$3)",
          [email, hashedPassword, salt],
          function (err) {
            if (err) {
              return next(err);
            }
          }
        );
        return res.send("success");
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

export { registerUser };
