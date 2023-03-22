const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const FileContainer = require('../../containers/file/file.container');
const dbConfig = require('../../../db/db.config');

const collection = dbConfig.file.users;

class UserDao extends FileContainer {
    constructor() {
        super(collection);
    }

    async createUser(userItem){
        try {
            const emailUser = await this.getByEmail(userItem.email);
            if(emailUser.length > 0){
                throw new Error('User with given email already exist');                
            }
        }
        catch(error) {
            if(error.message.toLowerCase().includes('does not exist')){
                userItem.id = undefined;
                const user = await this.save(userItem);
                return user;
            }else{
                throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
            }
        }
    };
    
    async getUserById(id){
        try {
            return await this.getById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error, error);
        }
    }
    
    async getUserByEmail(email) {
        try {
            const document = await this.getByEmail(email);
            return document;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

}

module.exports = UserDao;