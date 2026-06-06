class Category{
    constructor({
        name,
        slug,
        description="",
        image=null,
        isActive=true,
    })
    {
        this.name=name;
        this.slug=slug;
        this.description=description;
        this.image=image;
        this.isActive=isActive;

        this.createdAt=new Date();
        this.createdAt=new Date();
    }
}

module.exports = Category;