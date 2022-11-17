const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const dbConfig = require('../../DB/db.config');

class FirebaseContainer{
    constructor(collection){   
        try{
            admin.initializeApp({
                credential: admin.credential.cert(dbConfig.firebase.credentials)
            });
        }catch(error){
            //console.log(error);
        }
        const db = getFirestore();
        this.query = db.collection(collection);
        this.collection = collection;
    }
    
    static async connect(){
        return
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
        const docRef = await this.query.doc(id);
        const document = await docRef.get();
        if(!document.exists){
            throw new Error(`${this.collection} with id ${id} does not exist in our records`);
        }
        return document.data();
    }

    async save(item){
        const data = await this.getAll();
        if(!item.id){
            let maxId = 0;
            if(data.length > 0){
                const ids = data.map(product => product.id);
                maxId = Math.max(...ids);
            }
            item.id = maxId + 1;
        }
        const docRef = this.query.doc(`${item.id}`);
        return await docRef.set(JSON.parse(JSON.stringify(item)));
    }

    async deleteById(id){
        let data;
        try{
            const docRef = this.query.doc(id);
            await docRef.delete();
            data = await this.getAll();
        }catch(error){
            throw new Error(error);
        }
        return data;
    }

    async deleteAll(){
        const docRef = this.query.get();
        return await docRef.delete();
    }

}

module.exports = FirebaseContainer;