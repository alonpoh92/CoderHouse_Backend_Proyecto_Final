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

    async getAll(){
        const docRef = await this.query.get();
        const documents = docRef.docs;
        return documents.map(document => {
            return{
                id: document.id,
                ...document.data()
            }
        });
    }

    async getById(id){
        const docRef = await this.query.get(id);
        if(!docRef){
            throw new Error(`id ${id} does not exist in our records`);
        }
        const document = await docRef.get();
        return document.data();
    }

    async save(item){
        const data = this.getAll();
        if(!item.id){
            let maxId = 0;
            if(data.length > 0){
                const ids = data.map(product => product.id);
                maxId = Math.max(...ids);
            }
            item.id = maxId + 1;
        }
        const docRef = this.query.doc(item.id);
        return await docRef.set(item);
    }

    async deleteById(id){
        const docRef = this.query.doc(id);
        return await docRef.delete();
    }

    async deleteAll(){
        const docRef = this.query.get();
        return await docRef.delete();
    }

}

module.exports = FirebaseContainer;