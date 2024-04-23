import { getItemsFromCart, postItemsToCart } from "../controller/cart";

const express = require("express");
const app = express();

app.post("/", postItemsToCart);

app.get("/", getItemsFromCart);

export default app;
