const UserDto = require('../dtos/user.dto');
const { UserDao } = require('../daos/app.dao');

class UserFactory{
    constructor(){
        try{
            if(UserFactory._instance){
                throw new Error('UserFactory already has an instance!!!');
            }
            this.userDao = new UserDao();
            UserFactory._instance = this;
        }catch(error){
            this.userDao = UserFactory._instance.userDao;
        }
    }

    async createUser(userObj){
        const newUser = new UserDto("undefined", userObj.rol, userObj.email, userObj.password, userObj.name, userObj.phone, new Date(), new Date());
        const user = await this.userDao.createUser(newUser);
        return new UserDto(user.id, user.rol, user.email, user.password, user.name, user.phone, user.createdAt, user.updatedAt);
    }

    async getUserById(id){
        let user = await this.userDao.getUserById(id);
        return new UserDto(user.id, user.rol, user.email, user.password, user.name, user.phone, user.createdAt, user.updatedAt);
    }
    
    async getUserByEmail(email){
        let user = await this.userDao.getUserByEmail(email);
        user = user[0];
        return new UserDto(user.id, user.rol, user.email, user.password, user.name, user.phone, user.createdAt, user.updatedAt);
    }
}

module.exports = UserFactory;