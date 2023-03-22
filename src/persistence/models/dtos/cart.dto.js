class CartDto{
    constructor(id, email, items, createdAt, updatedAt){
        this.id = id,
        this.email = email,
        this.items = items,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt
    }
}

module.exports = CartDto;