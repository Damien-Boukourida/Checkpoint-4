const router = require("express").Router();

const userRoutes = require("./user.routes");
const photoRoutes = require("./photo.routes");

router.use("/users", userRoutes);
router.use("/photo", photoRoutes);

module.exports = router;
