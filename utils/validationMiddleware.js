import { check, validationResult } from "express-validator";

const isValid = async (req, res, next) => {
  const validationRules = [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({
      minLength: 5,
    }),
  ];

  await Promise.all(validationRules.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  return next();
};

export { isValid };
