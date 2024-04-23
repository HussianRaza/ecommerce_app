import db from "../model/db";

const postItemsToCart = async (req, res) => {
  try {
    const cartId = req.session.cartId;
    const { productId, productQty } = req.body;

    const cartItem = await db.query(
      "INSERT INTO cart_products (cart_id,product_id,product_qty) VALUES ($1,$2,$3)",
      [cartId, productId, productQty]
    );
    res.send(cartItem);
  } catch (error) {
    res.json(error.message);
  }
};

const getItemsFromCart = async (req, res) => {
  try {
    const cartId = req.session.cartId;

    const cartItem = await db.query(
      "SELECT product_id,product_qty FROM cart_products WHERE cart_id = $1",
      [cartId]
    );
    res.send(cartItem);
  } catch (error) {
    res.json(error.message);
  }
};

export { postItemsToCart, getItemsFromCart };
