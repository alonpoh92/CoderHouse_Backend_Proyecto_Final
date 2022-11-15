const { cartsCollection, cartsSchema } = require("../../../utils/carts.utils");
const MongoContainer = require("../../containers/mongo.container");

class CartsMongoDao extends MongoContainer{
    constructor(){
        super(cartsCollection, cartsSchema);
    }
}