import registerUser from "./routes/registration";

import loginUser from "./routes/login";

import userRoutes from "./routes/user";

import productRoutes from "./routes/product";

import cartRoutes from "./routes/cart";

import checkoutRoute from "./routes/checkout";

import orderRoute from "./routes/order";

import { isValid } from "./utils/validationMiddleware";

import { isAuth } from "./utils/authMiddleware";

const passport = require("passport");
const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

require("./controller/passport");

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(morgan("tiny"));

app.use(express.json());

app.use(
  session({
    secret: "lol",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/register", isValid, registerUser);

app.use("/login", isValid, passport.authenticate("local"), loginUser);

// app.use("/login", isValid, (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Authentication failed", ...info });
//     }
//     req.logIn(user, async (err) => {
//       if (err) {
//         return next(err);
//       }
//       await loginUser(req, res);
//     });
//   })(req, res, next);
// });

app.use("/user", isAuth, userRoutes);

app.use("/product", isAuth, productRoutes);

app.use("/cart", isAuth, cartRoutes);

app.use("/checkout", isAuth, checkoutRoute);

app.use("/order", isAuth, orderRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
