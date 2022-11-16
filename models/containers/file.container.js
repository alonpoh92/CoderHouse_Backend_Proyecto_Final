const fs = require('fs'); 

class FileContainer{
    constructor(resource){
        this.file = resource;
        this.folder = '../../data/';
        this.path = `${this.folder}${this.file}`;
    }

    static async connect(){
        return;
    }

    async read(){
        const res = {};
        try{
            const files = await fs.promises.readdir(this.folder);
            if(files.includes(this.file)){
                try{
                    const data = await fs.promises.readFile(this.path, 'utf-8');
                    res['data'] = data;
                    res['error'] = null;
                }catch(error){
                    res['data'] = null;
                    res['error'] = error;
                }
            }else{
                res['data'] = '[]';
                res['error'] = null;
            }
        }catch(error){
            res['data'] = null;
            res['error'] = error;
        };
        return res;
    }

    async save(item){
        let res;
        try{
            const result = await this.read();
            if(!result.error){
                const data = JSON.parse(result.data);
                if(!item.id){
                    let maxId = 0;
                    if(data.length > 0){
                        const ids = data.map(product => product.id);
                        maxId = Math.max(...ids);
                    }
                    item.id = maxId + 1;
                }
                data.push(item);
                try{
                    await fs.promises.writeFile(this.path, JSON.stringify(data));
                    res = item.id;
                }catch(error){
                   throw new Error(error);
                }
            }else{
                throw new Error(result.error);
            }
        }catch(error){
            throw new Error(error);
        }
        return res;            
    }

    async getById(id){
        let res;
        try{
            const result = await this.read();
            if(!result.error){
                const data = JSON.parse(result.data);
                const item = data.filter(product => product.id == id);
                if(!item){
                    throw new Error(`id ${id} does not exist in our records`);
                }
                res = item;
            }else{
                throw new Error(result.error);
            }
        }catch(error){
            throw new Error(error);
        }
        return res;
    }

    async getAll(){
        let res;
        try{
            const result = await this.read();
            if(!result.error){
                res = JSON.parse(result.data);                
            }else{
                throw new Error(result.error);
            }
        }catch(error){
            throw new Error(error);
        }
        return res;
    }

    async deleteById(id){
        let res;
        try{
            const result = await this.read();
            if(!result.error){
                const data = JSON.parse(result.data);
                const products = data.filter(product => product.id != id);
                try{
                    await fs.promises.writeFile(this.path, JSON.stringify(products));
                    res = products;
                }catch(error){
                    throw new Error(error);
                }
            }else{
                throw new Error(result.error)
            }
        }catch(error){
            throw new Error(error);
        }
        return res;
    }

    async deleteAll(){
        let res;
        const products = [];
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            res= [];
        }catch(error){
            throw new Error(error);
        }
        return res;
    }
}

module.exports = FileContainer;