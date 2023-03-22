const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const dbConfig = require('../../../db/db.config');

class FirebaseContainer{
    constructor(collection){   
        try{
            admin.initializeApp({
                credential: admin.credential.cert(dbConfig.firebase.credentials)
            });
        }catch(error){}
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

    async getMany(filter){
        const docRef = await this.query.where(filter['field'], '==', filter['value']);
        const document = await docRef.get();
        if(document.empty){
            const message = `Resources with ${filter['field']} ${filter['value']} do not exist in our records`;
            throw new Error(message);
        }
        return document.docs.map(doc => doc.data());
    }

    async getById(id){
        const docRef = await this.query.doc(""+id);
        const document = await docRef.get();
        if(!document.exists){
            const message = `Resource with id ${id} does not exist in our records`;
            throw new Error(message);
        }
        return document.data();
    }

    async getByEmail(email){
        const docRef = await this.query.where('email', '==', email);
        const document = await docRef.get();
        if(document.empty){
            const message = `Resource with email ${email} does not exist in our records`;
            throw new Error(message);
        }
        return document.docs.map(doc => doc.data());
    }

    async save(item){
        if(!item.id){
            const data = await this.getAll();
            let maxId = 0;
            if(data.length > 0){
                const ids = data.map(product => product.id);
                maxId = Math.max(...ids);
            }
            item.id = maxId + 1;
        }
        const docRef = this.query.doc(`${item.id}`);
        await docRef.set(JSON.parse(JSON.stringify(item)));
        return (await docRef.get()).data();
    }

    async updateById(id, item){
        await this.deleteById(id);
        return await this.save(item);
    }

    async deleteById(id){
        let data;
        try{
            const docRef = this.query.doc(String(id));
            await docRef.delete();
            data = `Resorce with id ${id} has been removed`;
        }catch(error){
            throw new Error(error.message);
        }
        return data;
    }

    async deleteAll(){
        const docRef = this.query.get();
        return await docRef.delete();
    }

}

module.exports = FirebaseContainer;