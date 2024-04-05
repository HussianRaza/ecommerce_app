import registerUser from "./routes/registration";

const express = require("express");
const app = express();
const port = 3000;

app.use("/register", registerUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
