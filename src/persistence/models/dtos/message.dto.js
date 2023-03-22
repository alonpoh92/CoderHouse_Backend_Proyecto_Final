class MessageDto{
    constructor(id, parent, email, type, message, createdAt){
        this.id = id,
        this.parent = parent,
        this.email = email,
        this.type = type,
        this.message = message,
        this.createdAt = createdAt
    }
}

module.exports = MessageDto;