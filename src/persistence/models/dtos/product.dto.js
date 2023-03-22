class ProductDto{
    constructor(id, title, price, description, category, thumbnail, stock, createdAt, updatedAt){
        this.id = id,
        this.title = title,
        this.price = price,
        this.description = description,
        this.category = category,
        this.thumbnail = thumbnail,
        this.stock = stock,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt
    }
}

module.exports = ProductDto;