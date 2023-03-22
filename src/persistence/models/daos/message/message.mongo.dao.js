const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const MongoDBContainer = require('../../containers/mongoDB/mongodb.container');
const MessageSchema = require('../../containers/mongoDB/schemas/message.schema');

const collection = 'messages';

class MessageDao extends MongoDBContainer {
    constructor() {
        super(collection, MessageSchema);
    }

    async createMessage(messageItem){
        try {
            const message = await this.save(messageItem);
            message.id = ''+message._id;
            await this.update(message.id, message);
            return message;
        }
        catch(error) {
            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'Message with given id already exist');
            }
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
            return await this.getAll({email});
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

}

module.exports = MessageDao;