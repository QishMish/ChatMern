const { validationResult } = require("express-validator");

const validateAuthBody = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(error);
  }
  next();
};

module.exports = validateAuthBody;
