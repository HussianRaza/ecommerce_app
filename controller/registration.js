import { check, validationResult } from "express-validator";

const crypto = require("crypto");

import db from "../model/db";

const registerUser = async (req, res, next) => {
  const validationRules = [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({
      minLength: 5,
    }),
  ];

  await Promise.all(validationRules.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    // await db.query(
    //   "INSERT INTO users(user_email,user_password) VALUES($1,$2)",
    //   [email, password]
    // );
    // return res.send("user registration success");

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
            // var user = {
            //   id: this.lastID,
            //   username: req.body.username,
            // };
            // req.login(user, function (err) {
            //   if (err) {
            //     return next(err);
            //   }
            //   res.redirect("/");
            // });
          }
        );
        return res.send("success")
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

export { registerUser };
