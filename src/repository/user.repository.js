const { getDB } = require("../config/db");

const COLLECTION = "users";

class UserRepository {
  async create(user) {
    const db = getDB();
    return db.collection(COLLECTION).insertOne(user);
  }

  async findByEmail(email) {
    const db = getDB();
    return db.collection(COLLECTION).findOne({ email });
  }

  async findById(id) {
    const db = getDB();
    return db.collection(COLLECTION).findOne({ _id: id });
  }

  async updateById(id, update) {
    const db = getDB();
    return db.collection(COLLECTION).updateOne(
      { _id: id },
      { $set: update }
    );
  }
}

module.exports = new UserRepository();