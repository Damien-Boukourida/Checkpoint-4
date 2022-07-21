const jwt = require("jsonwebtoken");
const models = require("../models");

class UserController {
  static browse = async (req, res) => {
    try {
      const [results] = await models.user.findAll();
      return res.status(200).json(results);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static read = (req, res) => {
    models.user
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

  static edit = async (req, res) => {
    const { password } = req.body;
    const id = parseInt(req.params.id, 10);

    try {
      // TODO validations (length, format...)
      console.warn(id, password);
      const validUser = await models.user.validate({ id, password }, false);
      // console.warn(validUser);
      if (!validUser) {
        return res.status(400).send("You must provide a valid password");
      }

      // Hash password
      const hashedPassword = await models.user.hashPassword(password);

      const [result] = await models.user.update({ id, hashedPassword });

      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static register = async (req, res) => {
    const { email, password, username, firstname, lastname } = req.body;

    try {
      // TODO validations (length, format...)
      const validUser = await models.user.validate({
        email,
        password,
        username,
        firstname,
        lastname,
      });
      console.warn(validUser);
      if (!validUser) {
        return res
          .status(400)
          .send("You must provide a valid email and password");
      }

      // Check if email already exists
      const emailAlreadyUsed = await models.user.emailAlreadyExists(email);
      if (emailAlreadyUsed) {
        return res.status(400).send("Email already Used");
      }

      // Hash password
      const hashedPassword = await models.user.hashPassword(password);
      console.log({
        username,
        firstname,
        lastname,
        email,
        hashedPassword,
      });

      const [result] = await models.user.insert({
        username,
        firstname,
        lastname,
        email,
        hashedPassword,
      });
      const [[userCreated]] = await models.user.find(result.insertId);

      delete userCreated.hashedPassword;

      return res.status(201).json(userCreated);
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

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("You must provide an email and a password");
    }

    try {
      const [[user]] = await models.user.findByEmail(email);
       console.log("entrée login")
      if (!user) {
        console.log("user")
        return res.status(403).send("Invalid email or password");
      }
      if (await models.user.verifyPassword(password, user.hashedPassword)) {
        console.log("fiouh")
        // Create token
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_JWT_SECRET, {
          expiresIn: process.env.ACCESS_JWT_EXPIRESIN,
        });
        console.log(res)
        return res
          .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.ACCESS_JWT_SECURE === "true",
            maxAge: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          })
          .status(200)
          .json({
            id: user.id,
            email: user.email,
            username: user.username,
            firstname: user.firstname,
          });
      }
      console.log("fin login")
      return res.status(403).send("Invalid email or password");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static authorization = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(401);
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      req.userId = decoded.id;
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static clearCookie = (req, res) => {
    return res.clearCookie("accessToken").sendStatus(200);
  };

  static isSameId = (req, res, next) => {
    let { id } = req.params;

    id = parseInt(id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).send("You must provide a valid id");
    }

    if (id !== req.userId) {
      return res.sendStatus(403);
    }

    return next();
  };

  static editAvatar = async (req, res) => {
    // on modifie l'user id 3
    const userId = 3;

    try {
      const [result] = await models.user.updateAvatar({
        id: userId,
        avatar: req.pictureData.avatar,
        avatarDescription: req.pictureData.description,
      });
      if (result.affectedRows === 0) {
        return res.status(404).send("user not found");
      }
      const [[userUpdated]] = await models.user.find(userId);
      return res.status(201).json(userUpdated);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = UserController;
