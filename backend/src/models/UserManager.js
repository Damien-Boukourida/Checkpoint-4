/* eslint-disable class-methods-use-this */
const Joi = require("joi");
const argon2 = require("argon2");
const AbstractManager = require("./AbstractManager");

// password must contain almost one upper case, one lower case, a number and a special character contained in [!@#$%^&*], and have 8 to 32 characters
const schemaForCreation = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .required(),
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
});

const schemaForUpdate = Joi.object({
  id: Joi.number().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  username: Joi.string(),
  firstname: Joi.string(),
  lastname: Joi.string(),
});

class UserManager extends AbstractManager {
  static table = "user";

  insert(user) {
    return this.connection.query(
      `insert into ${UserManager.table} (email, hashedPassword, username, firstname, lastname) values (?, ?, ?, ?, ?)`,
      [
        user.email,
        user.hashedPassword,
        user.username,
        user.firstname,
        user.lastname,
      ]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${UserManager.table} set hashedPassword = ? where id = ?`,
      [user.hashedPassword, user.id]
    );
  }

  emailAlreadyExists(email) {
    return this.connection
      .query(`SELECT id FROM ${UserManager.table} WHERE email=?`, [email])
      .then(([results]) => results.length);
  }

  async validate(user, creation = true) {
    try {
      if (creation) {
        await schemaForCreation.validateAsync(user);
      } else {
        await schemaForUpdate.validateAsync(user);
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async hashPassword(password) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async verifyPassword(password, hashedPassword) {
    const passwordIsValid = await argon2.verify(hashedPassword, password);
    return passwordIsValid;
  }

  find(id) {
    return this.connection.query(
      `select id, username, email from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `select id, username, email from  ${this.table}`
    );
  }

  findByEmail(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }

  updateAvatar({ id, avatar, avatarDescription }) {
    return this.connection.query(
      `UPDATE ${this.table} SET avatar=?, avatarDescription=? WHERE id=?`,
      [avatar, avatarDescription, id]
    );
  }
}

module.exports = UserManager;
