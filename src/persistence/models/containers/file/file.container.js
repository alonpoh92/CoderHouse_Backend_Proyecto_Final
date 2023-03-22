const fs = require('fs'); 
const dbConfig = require('../../../db/db.config');

class FileContainer{
    constructor(collection){
        this.collection = collection;
        this.folder = `./${dbConfig.file.dbname}/`;
        this.path = `${this.folder}${this.collection}`;
    }

    static async connect(){
        try{
            const files = await fs.promises.readdir('./');
            if(!files.includes(dbConfig.file.dbname)){
                await fs.promises.mkdir(dbConfig.file.dbname);
            }
        }catch(error){
            throw new Error(`Error reading data from ./${dbConfig.file.dbname}/`);
        }
        return
    }

    read(){
        return new Promise((resolve, reject) => {
            fs.promises.readdir(this.folder)
                .then(files => {
                    if(files.includes(this.collection)){
                        fs.promises.readFile(this.path, 'utf-8')
                            .then(res => {
                                resolve(res);
                            })
                            .catch(err => {
                                reject(err);
                            })
                    }else{
                        resolve('[]');
                    }
                })
                .catch(err => {
                    reject(`Error reading data from "${err.path}`);
                })
        });
    }

    getAll(){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    resolve(data);                  
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    getMany(filter){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    const items = data.filter(item => item[filter['field']] == filter['value']);
                    if(items.length > 0){
                        resolve(items);
                    }else{
                        const message = `Resources with ${filter['field']} ${filter['value']} do not exist in our records`;
                        reject(message);
                    }                    
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    getById(id){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    const item = data.filter(item => item.id == id);
                    if(item.length > 0){
                        resolve(item[0]);
                    }else{
                        const message = `Resource with id ${id} does not exist in our records`;
                        reject(message);
                    }                    
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    getByEmail(email){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    const item = data.filter(item => item.email == email);
                    if(item.length > 0){
                        resolve(item);
                    }else{
                        const message = `Resource with email ${email} does not exist in our records`;
                        reject({message});
                    }                    
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    save(object){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    if(!object.id){
                        let maxId = 0;
                        if(data.length > 0){
                            const ids = data.map(product => product.id);
                            maxId = Math.max(...ids);
                        }
                        object.id = maxId + 1;
                    }
                    data.push(object);
                    fs.promises.writeFile(this.path, JSON.stringify(data))
                        .then(() => {
                            resolve(object);
                        })
                        .catch(err => {
                            reject('Upps something went wrong')
                        })
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    async updateById(id, object){
        await this.deleteById(id)
        return this.save(object);
    }

    deleteById(id){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    const products = data.filter(product => product.id != id);
                    fs.promises.writeFile(this.path, JSON.stringify(products))
                        .then(async() => {
                            resolve(`Resorce with id ${id} has been removed`);
                        })
                        .catch(err => {
                            reject('Upps something went wrong')
                        })                  
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    deleteAll(){
        return new Promise((resolve, reject) => {
            const products = [];
            fs.promises.writeFile(this.path, JSON.stringify(products))
                .then(() => {
                    resolve(`${this.collection} is empty!!!`);
                })
                .catch(err => {
                    reject('Upps something went wrong')
                })
        });
    }
}

module.exports = FileContainer;