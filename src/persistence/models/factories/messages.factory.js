const MessageDto = require('../dtos/message.dto');
const { MessageDao } = require('../daos/app.dao');

class MessageFactory{
    constructor(){
        try{
            if(MessageFactory._instance){
                throw new Error('MessageFactory already has an instance!!!');
            }
            this.MessageDao = new MessageDao();
            MessageFactory._instance = this;
        }catch(error){
            this.MessageDao = MessageFactory._instance.MessageDao;
        }
    }

    async createMessage(messageObj){
        const newMessage = new MessageDto("undefined", messageObj.parent, messageObj.email, messageObj.type, messageObj.message, new Date());
        const message = await this.MessageDao.createMessage(newMessage);
        return new MessageDto(message.id, message.parent, message.email, message.type, message.message, message.createdAt);
    }

    async getAllMessages(){
        const messages = await this.MessageDao.getAllMessages();
        return messages.map(message => {
            return new MessageDto(message.id, message.parent, message.email, message.type, message.message, message.createdAt);
        })
    }

    async getMessagesByEmail(email){
        const messages = await this.MessageDao.getMessagesByEmail(email);
        return messages.map(message => {
            return new MessageDto(message.id, message.parent, message.email, message.type, message.message, message.createdAt);
        })
    }
}

module.exports = MessageFactory;