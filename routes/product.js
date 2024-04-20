import { getAllProduct, getProductById } from "../controller/products";

const express = require("express");
const app = express();

app.get("/", getAllProduct);
app.get("/:id", getProductById);

export default app;
