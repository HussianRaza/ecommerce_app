import { loginUser } from "../controller/login";

const express = require("express");
const app = express();


app.post("/", loginUser);

export default app;
