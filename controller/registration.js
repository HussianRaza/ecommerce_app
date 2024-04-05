const formidable = require("formidable");

import { check, validationResult } from "express-validator";

import db from "../model/db";

const registerUser = (req, res) => {
  const form = new formidable.IncomingForm();

  form.keepExtentions = true;
  form.parse(req, async (err, fields) => {
    req.body = fields;

    const validationRules = [
      check("email").isEmail().normalizeEmail(),
      check("password").isLength({
        minLength: 5,
      }),
    ];

    await Promise.all(validationRules.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      await db.query(
        "INSERT INTO users(user_email,user_password) VALUES($1,$2)",
        [email, password]
      );
      return res.send("user registration success");
    } catch (error) {
      console.error(error.message);
    }
  });
};

export { registerUser };
