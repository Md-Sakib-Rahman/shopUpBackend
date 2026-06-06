class Product {
  constructor({
    name,
    slug,
    description,

    categoryId,
    subCategoryId,

    brandId = null,
    brandName,

    sellerId,

    thumbnail = null,

    specifications = {},

    variants = [],

    tags = [],

    isFeatured = false,
    status = "draft",
                            // Status  : 
                            // draft
                            // pending_review
                            // published
                            // archived
  }) {
    this.name = name;
    this.slug = slug;
    this.description = description;

    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;

    this.brandId = brandId;
    this.brandName = brandName;

    this.thumbnail = thumbnail;

    this.specifications = specifications;

    this.variants = variants;

    this.tags = tags;

    this.sellerId = sellerId;

    this.isFeatured = isFeatured;
    this.isActive = isActive;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Product;
