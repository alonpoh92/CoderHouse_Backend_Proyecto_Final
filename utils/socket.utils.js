const { Server: IOServer } = require('socket.io');

class SocketContainer{
    constructor(httpServer){
        try{
            if(SocketContainer._instance){
                throw new Error('SocketContainer already has an instance!!!');
            }
            this.io = new IOServer(httpServer);
            SocketContainer._instance = this;
        }catch(error){
            this.io = SocketContainer._instance.io;
        }
    }
}

module.exports = SocketContainer;