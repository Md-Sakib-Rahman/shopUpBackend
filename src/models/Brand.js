class Brand {
  constructor({ name, slug, logo, isVerified=true }) {
    this.name=name;
    this.slug=slug;
    this.logo=logo;
    this.isVerified=isVerified;
    this.createdAt= new Date();
    
  }
}
module.exports = Brand;