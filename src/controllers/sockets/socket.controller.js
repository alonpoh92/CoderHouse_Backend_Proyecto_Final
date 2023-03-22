const { Server: IOServer } = require('socket.io');
const logger = require('../../../utils/logger.utils');

class SocketController{
    constructor(httpServer){
        if(SocketController._instance){
            this.io = SocketController._instance.io;
        }else{
            this.io = new IOServer(httpServer);
            SocketController._instance = this;
        }
    }
}

module.exports = SocketController