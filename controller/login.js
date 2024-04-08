const formidable = require("formidable");

import { check, validationResult } from "express-validator";

import db from "../model/db";

const loginUser = (req, res) => {

  res.send("it works");

  // const form = new formidable.IncomingForm();

  // form.keepExtentions = true;
  // form.parse(req, async (err, fields) => {
  //   req.body = fields;

  //   const validationRules = [
  //     check("email").isEmail().normalizeEmail(),
  //     check("password").isLength({
  //       minLength: 5,
  //     }),
  //   ];

  //   await Promise.all(validationRules.map((validation) => validation.run(req)));

  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     return res.status(404).json({ errors: errors.array() });
  //   }

  //   try {
  //     console.log("in route")
  //     const { email, password } = req.body;
  //     const userData = await db.query(
  //       "SELECT * FROM users WHERE user_email=$1",
  //       [email]
  //     );
  //     if (userData.rows[0].user_password == password) {
  //       //save user id for later use
  //       console.log(userData)
  //       res.send("User authenticaed");
  //     } else {
  //       res.send("Not authenticated try again");
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // });
};

export { loginUser };
