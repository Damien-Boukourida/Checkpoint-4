const express = require("express");

const { GamesController } = require("../controllers");

const router = express.Router();

router.get("/", GamesController.browse);
router.get("/:id", GamesController.read);
router.post("/create", GamesController.create);
router.delete("/:id", GamesController.delete);

module.exports = router;