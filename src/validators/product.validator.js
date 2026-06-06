function productValidator(data) {
  const errors = [];
  const {
    name,
    brandName,
    thumbnail,
    variants,
    tags,
    specifications,
    description,
  } = data;
  if (!name?.trim()) {
    errors.push("Name is required");
  }

  if (!description?.trim()) {
    errors.push("Description is required");
  }

  if (!brandName?.trim()) {
    errors.push("Brand name is required");
  }
  if (!thumbnail) errors.push("Thumbnail is require");
  if (!Array.isArray(variants) || variants.length === 0) {
    errors.push("At least one variant is required");
  }
  if (!Array.isArray(tags)) {
    errors.push("Tags must be an array");
  }
  if (!specifications || typeof specifications !== "object") {
    errors.push("Specifications must be an object");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  productValidator,
};
