const mongoose = require('mongoose');
const dbConfig = require('../../db/config');

class MongoContainer{
    constructor(collection, schema){
        this.collection = collection;
        this.model = mongoose.model(collection, schema);
    }

    static async connect(){
        await mongoose.connect(dbConfig.mongodb.connectTo("CoderHouseBackend"));
    }

    static async disconnect(){
        await mongoose.disconnect();
    }

    async getAll(filter = {}){
        const documents = await this.model.find(filter, {__v: 0, _id: 0}).lean();
        return documents;
    }

    async getById(id){
        const document = await this.model.findOne({id}, {__v: 0, _id: 0});
        if(!document){
            throw new Error(`${this.collection} with id ${id} does not exist in our records`);
        }
        return document['_doc'];
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
        const newDocument = new this.model(item);
        return await newDocument.save();
    }

    async update(id, newItem){
        return await this.model.updateOne({id}, newItem)
    }

    async deleteById(id){
        let data;
        try{
            await this.model.deleteOne({id});
            data = await this.getAll();
        }catch(error){
            throw new Error(error);
        }
        return data;
    }

    async deleteAll(){
        return await this.model.deleteMany({});
    }
}

module.exports = MongoContainer;