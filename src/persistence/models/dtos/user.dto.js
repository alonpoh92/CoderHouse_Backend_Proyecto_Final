class UserDto{
    constructor(id, rol, email, password, name, phone, createdAt, updatedAt){
        this.id = id,
        this.rol = rol,
        this.email = email,
        this.password = password,
        this.name = name,
        this.phone = phone,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt
    }
}

module.exports = UserDto;