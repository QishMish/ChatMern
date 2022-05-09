const router = require("express").Router();
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");

router.use("/auth", userRoutes);
router.use("/chat", chatRoutes);

module.exports = router;
