import { getUserFromId, putUserById } from "../controller/user";

const express = require("express");
const app = express();

app.get("/", getUserFromId);

app.put("/", putUserById);

export default app;
