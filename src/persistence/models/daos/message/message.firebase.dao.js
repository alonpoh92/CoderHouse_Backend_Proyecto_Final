const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const FirebaseContainer = require('../../containers/firebase/firebase.container');

const collection = 'messages';

class MessageDao extends FirebaseContainer {
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