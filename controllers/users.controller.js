const { UsersDao } = require('../models/daos/app.daos');

const { HttpError } = require('../utils/api.utils');
const constants = require('../constants/api.constants');

const usersDao = new UsersDao();

class UsersController{
    async createUser(userItem) {
        try {
            const user = await usersDao.save(userItem);
            return user;
        }
        catch(error) {
            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                throw new HttpError(constants.HTTP_STATUS.BAD_REQUEST, 'User with given email already exist');
            }
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }    
    };

    async updateUser(id, userItem){
        try {
            const user = await usersDao.update(id, userItem);
            return user;
        }
        catch(error) {
            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                throw new HttpError(constants.HTTP_STATUS.BAD_REQUEST, 'User with given email already exist');
            }
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getById(id) {
        try {
            const document = await usersDao.model
                .findById(id, { __v: 0, password: 0 })
            if (!document) {
                const errorMessage = `Resource with id ${id} does not exist in our records`;
                throw new Error(errorMessage);
            } else {
                return document;
            }
        }
        catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };
    
    async getByEmail(email) {
        try {
            const document = await usersDao.model.findOne({ email }, { __v: 0 });
            if (!document) {
                const errorMessage = `Wrong username ${email} or password`;
                throw new Error(errorMessage);
            } else {
                return document;
            }
        }
        catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };
}

module.exports = new UsersController();