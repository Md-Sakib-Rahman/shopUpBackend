const { getDB } = require("../config/db");

const COLLECTION = "products";

class ProductRepository {
  async create(product) {
    const db = getDB();
    return db.collection(COLLECTION).insertOne(product);
  }

  async findById(id) {
    const db = getDB();
    return db.collection(COLLECTION).findOne({ _id: id });
  }

  async findAll() {
    const db = getDB();
    return db.collection(COLLECTION).find().toArray();
  }

  async updateById(id, update) {
    const db = getDB();
    return db.collection(COLLECTION).updateOne(
      { _id: id },
      { $set: update }
    );
  }
}

module.exports = new ProductRepository();