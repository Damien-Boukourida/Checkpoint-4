const AbstractManager = require("./AbstractManager");

class ImageManager extends AbstractManager {
  static table = "image";

  insert(image) {
    return this.connection.query(
      `insert into ${ImageManager.table} (name) values (?)`,
      [image.name]
    );
  }

  update(image) {
    return this.connection.query(
      `update ${ImageManager.table} set filename = ?, creationDate = NOW() where id = ?`,
      [image.name, image.id]
    );
  }
}

module.exports = ImageManager;
