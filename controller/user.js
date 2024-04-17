import db from "../model/db";

const crypto = require("crypto");

//get a user by id

const getUserFromId = async (req, res) => {
  console.log("in route");
  const { id } = req.session.passport.user;
  console.log(id);
  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.send(user.rows);
  } catch (error) {
    return console.error(error.message);
  }
};

//put user information

const putUserById = async (req, res, next) => {
  const { id } = req.session.passport.user;

  try {
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
          "UPDATE users SET password_hash = $1 ,salt=$2 WHERE id = $3",
          [hashedPassword, salt, id],
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
    return res.send("fail");
  }
};

export { getUserFromId, putUserById };
