const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const FileContainer = require('../../containers/file/file.container');
const dbConfig = require('../../../db/db.config');

const collection = dbConfig.file.messages;

class MessageDao extends FileContainer {
    constructor() {
        super(collection);
    }

    async createMessage(messageItem){
        try {
            messageItem.id = undefined;
            const message = await this.save(messageItem);
            return message;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getAllMessages(){
        try {
            return await this.getAll();
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

    async getMessagesByEmail(email){
        try {
            return await this.getMany({field: 'email', value: email});
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

}

module.exports = MessageDao;