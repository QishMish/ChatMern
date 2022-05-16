const router = require("express").Router();
const authRoutes = require("./authRoutes");
const chatRoutes = require("./chatRoutes");
const userRoutes = require("./userRoutes");

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/user", userRoutes);

module.exports = router;
