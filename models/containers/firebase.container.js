const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const dbConfig = require('../../DB/db.config');

class FirebaseContainer{
    constructor(collection){
        const db =  getFirestore();
        this.query = db.collection(collection);
    }

    static async connect(){
        admin.initializeApp({
            credential: admin.credential.cert(dbConfig.firebase.credentials)
        });
    }
}