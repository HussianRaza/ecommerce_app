import { postItemToOrder } from "../controller/checkout";

const express = require("express");
const app = express();

app.post("/", postItemToOrder);

export default app;
