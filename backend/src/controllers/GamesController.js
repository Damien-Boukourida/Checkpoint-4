const models = require("../models");

class GamesController {
  static browse = async (req, res) => {
    try {
      const [results] = await models.user.findAll();
      return res.status(200).json(results);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static read = (req, res) => {
    models.games
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static create = async (req, res) => {
    const { name, plateform } = req.body;

    try {
      // const nameAlreadyUsed = await models.games.nameAlreadyExists(name);
      // if (nameAlreadyUsed) {
      //   return res.status(400).send("Name already used");
      // }

      const [result] = await models.games.insert({
        name,
        plateform,
      });

      const [[gameCreated]] = await models.user.find(result.insertId);

      return res.status(201).json(gameCreated);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static delete = (req, res) => {
    models.user
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = GamesController;
