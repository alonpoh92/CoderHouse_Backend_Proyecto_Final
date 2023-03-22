const moment = require('moment');

const SocketController = require('./socket.controller');
const MessageFactory = require('../../persistence/models/factories/messages.factory');
const logger = require('../../../utils/logger.utils');
const env = require('../../../env.config');

class ChatController extends SocketController{
    constructor(httpServer){
        super(httpServer);
        this.messages = new MessageFactory();
    }

    dateFormat(data){
        data.map((item, i) => {data[i].date = moment(item.createdAt).format('DD/MM/YYYY hh:mm:ss')});
        return data;
    }

    start(){                
        this.io.on('connection', async (Socket) => {
            logger.info(`Connected chat ${Socket.id}`);
            const allMessages = this.dateFormat(await this.messages.getAllMessages());
            Socket.emit('messages-list', allMessages);
                
            Socket.on('add-message', async (data) => {
                if(data.email && data.message){
                    try {
                        let type = 'user';
                        if(data.email == env.ADMIN_EMAIL){
                            type = 'system';
                        }
                        const newMessage = { email: data.email, message: data.message, type, date: moment() };
                        const message = await this.messages.createMessage(newMessage);
                        Socket.emit('message-success', {data: this.dateFormat([message])[0], error: null});
                        Socket.broadcast.emit('new-message', {data: message, error: null})
                    }catch(error){
                        Socket.emit('message-error', {data: null, error: error.message});
                    }
                }else{
                    Socket.emit('message-error', {data: null, error: 'información incompleta o no valida'});
                }
            });
        });
        logger.info('Chat Controller Started')
    }
}

module.exports = ChatController;