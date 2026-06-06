class Variant {
  constructor({
    sku,
    attributes = {},
    basePrice,
    discountPrice = null,
    stock = 0,
    images = [],
    isActive = true,
  }) {
    this.sku = sku;

    this.attributes = attributes;

    this.basePrice = basePrice;
    this.discountPrice = discountPrice;

    this.stock = stock;

    this.images = images;

    this.isActive = isActive;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getFinalPrice() {
    return this.discountPrice ?? this.basePrice;
  }

  isInStock() {
    return this.stock > 0;
  }
}

module.exports = Variant;