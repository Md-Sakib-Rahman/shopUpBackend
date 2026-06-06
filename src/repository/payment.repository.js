const { getDB } = require("../config/db");

const COLLECTION = "payments";

class PaymentRepository {
  async create(payment) {
    const db = getDB();
    return db.collection(COLLECTION).insertOne(payment);
  }

  async findByOrderId(orderId) {
    const db = getDB();
    return db.collection(COLLECTION).findOne({ orderId });
  }

  async updateById(id, update) {
    const db = getDB();
    return db.collection(COLLECTION).updateOne(
      { _id: id },
      { $set: update }
    );
  }
}

module.exports = new PaymentRepository();