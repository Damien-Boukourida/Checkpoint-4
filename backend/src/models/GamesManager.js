const AbstractManager = require("./AbstractManager");

class GamesManager extends AbstractManager {
  static table = "games";

  insert(games) {
    return this.connection.query(
      `insert into ${GamesManager.table} (name, plateform) values (?, ?)`,
      [games.name, games.plateform]
    );
  }

  find(id) {
    return this.connection.query(
      `select id, name from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `select id, name from  ${this.table}`
    );
  }
}

module.exports = GamesManager;