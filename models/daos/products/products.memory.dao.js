const dbConfig = require("../../../DB/db.config");
const MemoryContainer = require("../../containers/memory.container");

class ProductsMemoryDao extends MemoryContainer{
    constructor(){
        super(dbConfig.memory.products);
    }
}

module.exports = ProductsMemoryDao;