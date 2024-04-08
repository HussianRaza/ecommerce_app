const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send("NO AUTH MAN");
  }
};

export { isAuth };
