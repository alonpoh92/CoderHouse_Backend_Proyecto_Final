const dbConfig = require("../../../DB/db.config");
const FileContainer = require("../../containers/file.container");

class CartsFileDao extends FileContainer{
    constructor(){
        super(dbConfig.file.carts);
    }
}

module.exports = CartsFileDao;