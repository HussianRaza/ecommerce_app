import { registerUser } from "../controller/registration";

const express = require("express");
const app = express();

app.post("/", registerUser);

export default app;
