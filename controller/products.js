import db from "../model/db";

//get all products
const getAllProduct = async (req, res) => {
  try {
    const products = await db.query("SELECT * FROM products ");
    res.send(products.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//get product by id

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.query("SELECT * FROM products WHERE id=$1", [id]);
    res.send(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { getAllProduct, getProductById };
