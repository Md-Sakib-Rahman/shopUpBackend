const { getDB } = require("../config/db");

const COLLECTION = "carts";

class CartRepository {
  async findByUserId(userId) {
    const db = getDB();
    return db.collection(COLLECTION).findOne({ userId });
  }

  async create(cart) {
    const db = getDB();
    return db.collection(COLLECTION).insertOne(cart);
  }

  async updateByUserId(userId, update) {
    const db = getDB();
    return db.collection(COLLECTION).updateOne(
      { userId },
      { $set: update }
    );
  }

  async deleteByUserId(userId) {
    const db = getDB();
    return db.collection(COLLECTION).deleteOne({ userId });
  }
}

module.exports = new CartRepository();