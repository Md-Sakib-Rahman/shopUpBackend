class CartItem {
  constructor({
    productId,

    variantId,

    quantity = 1,
  }) {
    this.productId = productId;

    this.variantId = variantId;

    this.quantity = quantity;
  }
}

module.exports = CartItem;