import db from "../model/db";

const getOrderByUserId = async (req, res) => {
  try {
    let orders = [];
    const userId = req.session.passport.user.id;

    const dbRes = await db.query("SELECT id FROM orders WHERE user_id = $1", [
      userId,
    ]);

    orders = await Promise.all(
      dbRes.rows.map((element) =>
        db.query(
          "SELECT product_id,product_qty FROM orders_products WHERE order_id = $1",
          [element.id]
        )
      )
    );

    res.send(orders);
  } catch (error) {
    res.send(error.message);
  }
};

export { getOrderByUserId };
