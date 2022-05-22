const userRoutes = require("express").Router();
const authorization = require("../middlewares/authorization");
const userController = require("../controllers/user.controller");

userRoutes.get("/", authorization, userController.getUsers);
userRoutes.put("/update", authorization, userController.updateUser);
userRoutes.get("/current", authorization, userController.fetchUser);

module.exports = userRoutes;
