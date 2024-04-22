import db from "../model/db";

const loginUser = async (req, res) => {
  const { id } = req.session.passport.user;

  const dbRes = await db.query("SELECT id FROM cart WHERE user_id = $1", [id]);

  req.session.cartId = dbRes.rows[0].id;
};

export { loginUser };
