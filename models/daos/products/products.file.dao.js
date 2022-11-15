const dbConfig = require("../../../DB/db.config");
const FileContainer = require("../../containers/file.container");

class ProductsFileDao extends FileContainer{
    constructor(){
        super(dbConfig.file.products);
    }
}

module.exports = ProductsFileDao;