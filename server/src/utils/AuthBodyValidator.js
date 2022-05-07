const { body } = require("express-validator");

exports.validateRegisterBody = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .normalizeEmail()
      .withMessage("You should provide valid email"),
    body("username")
      .notEmpty()
      .withMessage("Username required")
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage("Username must be at least 4 characters length"),
    body("password")
      .notEmpty()
      .withMessage("Password required")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters length"),
    body("confirmPassword")
      .notEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
  ];
};
exports.validateLoginBody = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username required")
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage("Username must be at least 4 characters length"),
    body("password")
      .notEmpty()
      .withMessage("Password required")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters length"),
  ];
};
