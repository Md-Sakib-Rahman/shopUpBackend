class Cart {
  constructor({
    userId,
    items = [],
    subTotal = 0,
    totalItem = 0,
  }) {
    this.userId = userId;

    this.items = items;

    this.subTotal = subTotal;

    this.totalItem = totalItem;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Cart;