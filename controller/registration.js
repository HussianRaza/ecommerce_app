const bcrypt = require("bcrypt");
import db from "../model/db";

const registerUser = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 15;

    bcrypt.hash(password, saltRounds, async function (error, hash) {
      if (error) {
        return next(error);
      }
      await db.query(
        "INSERT INTO users(user_email,user_password) VALUES($1,$2)",
        [email, hash]
      );
      return res.sendStatus(200);
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export { registerUser };
