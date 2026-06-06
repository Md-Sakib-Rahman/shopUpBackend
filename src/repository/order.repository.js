const { getDB } = require("../config/db");

const COLLECTION = "orders";

class OrderRepository {
  async create(order) {
    const db = getDB();
    return db.collection(COLLECTION).insertOne(order);
  }

  async findById(id) {
    const db = getDB();
    return db.collection(COLLECTION).findOne({ _id: id });
  }

  async findByUserId(userId) {
    const db = getDB();
    return db.collection(COLLECTION).find({ userId }).toArray();
  }

  async updateById(id, update) {
    const db = getDB();
    return db.collection(COLLECTION).updateOne(
      { _id: id },
      { $set: update }
    );
  }
}

module.exports = new OrderRepository();