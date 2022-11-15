const dbConfig = require("../../../DB/db.config");
const MemoryContainer = require("../../containers/memory.container");

class CartsMemoryDao extends MemoryContainer{
    constructor(){
        super(dbConfig.memory.carts);
    }
}

module.exports = CartsMemoryDao;