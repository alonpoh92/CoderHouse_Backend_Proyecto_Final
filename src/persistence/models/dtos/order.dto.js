class OrderDto{
    constructor(id, email, items, address, createdAt){
        this.id = id,
        this.email = email,
        this.items = items,
        this.address = address,
        this.createdAt = createdAt
    }
}

module.exports = OrderDto;