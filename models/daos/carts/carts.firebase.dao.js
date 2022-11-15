const { cartsCollection } = require("../../../utils/carts.utils");
const FirebaseContainer = require("../../containers/firebase.container");

class CartsFirebaseDao extends FirebaseContainer{
    constructor(){
        super(cartsCollection);
    }
}

module.exports = CartsFirebaseDao;