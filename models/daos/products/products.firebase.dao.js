const { productsCollection } = require("../../../utils/products.utils");
const FirebaseContainer = require("../../containers/firebase.container");

class ProductsFirebaseDao extends FirebaseContainer{
    constructor(){
        super(productsCollection);
    }
}

module.exports = ProductsFirebaseDao;