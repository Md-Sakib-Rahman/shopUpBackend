class Address {
  constructor({
    label,
    fullName,
    phone,
    country = "Bangladesh",
    division,
    district,
    upazila,
    area,
    addressLine1,
    addressLine2,
    postalCode = null,
    isDefault = false,
  }) {
    this.label = label;

    this.fullName = fullName;

    this.phone = phone;

    this.country = country;

    this.division = division;

    this.district = district;

    this.upazila = upazila;

    this.area = area;

    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;

    this.postalCode = postalCode;

    this.isDefault = isDefault;

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
