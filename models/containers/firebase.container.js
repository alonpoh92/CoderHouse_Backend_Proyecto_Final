const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const dbConfig = require('../../DB/db.config');

class FirebaseContainer{
    constructor(collection){   
        this.collection = collection;   
        this.query;
    }
    
    static async connect(collection){
        admin.initializeApp({
            credential: admin.credential.cert(dbConfig.firebase.credentials)
        });
        console.log('aqui');
        const db = getFirestore();
        console.log('aqui1');
        this.query = db.collection(collection);
        console.log('aqui2');
    }

    async getAll(){
        console.log(this.query)
        const docRef = await this.query.get();
        const documents = docRef.docs;
        console.log(documents);
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