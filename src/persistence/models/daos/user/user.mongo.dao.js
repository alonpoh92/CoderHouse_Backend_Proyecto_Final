const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const MongoDBContainer = require('../../containers/mongoDB/mongodb.container');
const UserSchema = require('../../containers/mongoDB/schemas/user.schema');

const collection = 'users';

class UserDao extends MongoDBContainer {
    constructor() {
        super(collection, UserSchema);
    }

    async createUser(userItem){
        try {
            const user = await this.save(userItem);
            user.id = ''+user._id;
            await this.update(user.id, user);
            return user;
        }
        catch(error) {
            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'User with given email already exist');
            }
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getUserById(id){
        try {
            return await this.getById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }
    
    async getUserByEmail(email) {
        try {
            const document = await this.getAll({email});
            if (!document) {
                const errorMessage = `Wrong username or password`;
                throw new HttpError(constants.HTTP_STATUS.NOT_FOUND, errorMessage);
            } else {
                return document;
            }
        }
        catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

}

module.exports = UserDao;