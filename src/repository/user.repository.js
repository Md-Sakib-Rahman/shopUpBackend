const { ObjectId } = require("mongodb");
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
    return db.collection(COLLECTION).findOne({
      _id: new ObjectId(id),
    });
  }

  async updateById(id, update) {
    const db = getDB();

    return db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...update,
          updatedAt: new Date(),
        },
      }
    );
  }

  async updateRefreshToken(userId, refreshToken) {
    const db = getDB();

    return db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          refreshToken,
          updatedAt: new Date(),
        },
      }
    );
  }

  async findByRefreshToken(refreshToken) {
    const db = getDB();

    return db.collection(COLLECTION).findOne({
      refreshToken,
    });
  }

  async clearRefreshToken(userId) {
    const db = getDB();

    return db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          refreshToken: null,
          updatedAt: new Date(),
        },
      }
    );
  }
}

module.exports = new UserRepository();