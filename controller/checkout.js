import db from "../model/db";

const postItemToOrder = async (req, res) => {
  try {
    //get address if from address table
    const dbRes = await db.query("SELECT id FROM address WHERE user_id = $1", [
      userId,
    ]);
    const addressId = dbRes.rows[0].id;

    await db.query("INSERT INTO orders (address_id,user_id) VALUES ($1,$2)", [
      addressId,
      userId,
    ]);

    res.send("success");
  } catch (error) {
    res.send(error.message);
  }
};

export { postItemToOrder };
