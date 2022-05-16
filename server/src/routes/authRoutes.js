const authRoutes = require("express").Router();
const authController = require("../controllers/authController");
const validateAuthBody = require("../middlewares/validateAuthBody");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("../utils/AuthBodyValidator");

authRoutes.post(
  "/register",
  validateRegisterBody(),
  validateAuthBody,
  authController.register
);
authRoutes.post(
  "/login",
  validateLoginBody(),
  validateAuthBody,
  authController.login
);

module.exports = authRoutes;
