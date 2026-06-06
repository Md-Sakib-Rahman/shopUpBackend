class OrderItem {
  constructor({
    productId,
    variantId,
    sellerId,
    productName,
    productThumbnail,
    sku,
    selectedAttributes = {},
    unitPrice,
    quantity,
  }) {
    this.productId = productId;

    this.variantId = variantId;

    this.sellerId = sellerId;

    this.productName = productName;

    this.productThumbnail = productThumbnail;

    this.sku = sku;

    this.selectedAttributes = selectedAttributes;

    this.unitPrice = unitPrice;

    this.quantity = quantity;

    this.lineTotal = unitPrice * quantity;
  }
}

module.exports = OrderItem;