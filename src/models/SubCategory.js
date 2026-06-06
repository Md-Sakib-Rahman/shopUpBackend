class SubCategory {
  constructor({
    name,
    slug,
    categoryId,
    description = "",
    image = null,
    isActive = true,
  }) {
    this.name=name;
    this.slug=slug;
    this.categoryId=categoryId;
    this.description=description;
    this.image=image;
    this.isActive=isActive;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}


module.exports = SubCategory;