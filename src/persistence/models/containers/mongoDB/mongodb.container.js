const mongoose = require('mongoose');

const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const env = require('../../../../../env.config');
const dbConfig = require('../../../db/db.config');

mongoose.set('strictQuery', true);

class MongoContainer {
  
    constructor(collection, schema) {
        this.model = mongoose.model(collection, schema);
    }

    static async connect() {
        await mongoose.connect(dbConfig.mongodb.connectTo(`${env.DB_NAME}`));
    }

    static async disconnect() {
        await mongoose.disconnect();
    }

    async getAll(filter = {}) {
        const documents = await this.model.find(filter, { __v: 0 }).lean();
        return documents;
    }

    async getById(id) {
        const document = await this.model.findOne({ _id: id }, { __v: 0 });
        if (!document) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new Error(message);
        }
        return document;
    }

    async save(item) {
        const newDocument = new this.model(item);
        return await newDocument.save();
    }

    async update(id, item) {
        const updatedDocument = await this.model.updateOne(
            { _id: id },
            { $set: { ...item } }
        );
        if (!updatedDocument.matchedCount) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new Error(message);
        }
        return item;
    }

    async delete(id) {
        await this.model.deleteOne({ _id: id });
        return `Resorce with id ${id} has been removed`;
    }
}

module.exports = MongoContainer;