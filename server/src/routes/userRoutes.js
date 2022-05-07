const userRoutes = require("express").Router();
const authController = require("../controllers/authController");
const validateAuthBody = require("../middlewares/validateAuthBody");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("../utils/AuthBodyValidator");

userRoutes.post(
  "/register",
  validateRegisterBody(),
  validateAuthBody,
  authController.register
);
userRoutes.post(
  "/login",
  validateLoginBody(),
  validateAuthBody,
  authController.login
);

module.exports = userRoutes;
