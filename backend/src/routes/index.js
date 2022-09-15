const express = require("express");

const userRoutes = require("./user.routes");
const gamesRoutes = require("./games.routes");
const imageRoutes = require("./image.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/games", gamesRoutes);
router.use("/images", imageRoutes);

module.exports = router;
