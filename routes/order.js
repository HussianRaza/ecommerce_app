import { getOrderByUserId } from "../controller/order";

const express = require("express");
const app = express();

app.get("/", getOrderByUserId);

export default app;
