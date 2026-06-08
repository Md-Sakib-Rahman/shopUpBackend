const { getDB } = require("../config/db");

const COLLECTION = "sellers";

class SellerRepository {
  async create(seller) {
    const db = getDB();

    return db.collection(COLLECTION).insertOne(seller);
  }

  async findByUserId(userId) {
    const db = getDB();

    return db.collection(COLLECTION).findOne({
      userId,
    });
  }

  async updateByUserId(userId, update) {
    const db = getDB();

    return db.collection(COLLECTION).updateOne(
      { userId },
      {
        $set: update,
      }
    );
  }
}

module.exports = new SellerRepository();