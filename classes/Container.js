const fs = require('fs'); 

class Container{
    constructor(file){
        this.file = file;
        this.folder = './data/';
        this.path = `${this.folder}${this.file}`;
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

    async save(object){
        const res = {};
        try{
            const result = await this.read();
            if(!result.error){
                const data = JSON.parse(result.data);
                if(!object.id){
                    let maxId = 0;
                    if(data.length > 0){
                        const ids = data.map(product => product.id);
                        maxId = Math.max(...ids);
                    }
                    object.id = maxId + 1;
                }
                data.push(object);
                try{
                    await fs.promises.writeFile(this.path, JSON.stringify(data));
                    res['data'] = object.id;
                    res['error'] = null;
                }catch(error){
                    res['data'] = null;
                    res['error'] = error;
                }
            }else{
                res['data'] = null;
                res['error'] = result.error;
            }
        }catch(error){
            res['data'] = null;
            res['error'] = error;
        }
        return res;            
    }

    async getById(id){
        const res = {}
        try{
            const result = await this.read();
            if(!result.error){
                const data = JSON.parse(result.data);
                const product = data.filter(product => product.id == id);
                if(product.length > 0){
                    res['data'] = product[0];
                    res['error'] = null;
                }else{
                    res['data'] = null;
                    res['error'] = `Id ${id} has not been found`;
                }  
            }else{
                res['data'] = null;
                res['error'] = result.error;
            }
        }catch(error){
            res['data'] = null;
            res['error'] = error;
        }
        return res;
    }

    async getAll(){
        const res = {};
        try{
            const result = await this.read();
            if(!result.error){
                const data = JSON.parse(result.data);
                res['data'] = data;
                res['error'] = null;
            }else{
                res['data'] = null;
                res['error'] = result.error;
            }
        }catch(error){
            res['data'] = null;
            res['error'] = error;
        }
        return res;
    }

    async deleteById(id){
        const res = {};
        try{
            const result = await this.read();
            if(!result.error){
                const data = JSON.parse(result.data);
                const products = data.filter(product => product.id != id);
                try{
                    await fs.promises.writeFile(this.path, JSON.stringify(products));
                    res['error'] = null;
                }catch(error){
                    res['error'] = error;
                }
            }else{
                res['error'] = result.error;
            }
        }catch(error){
            res['error'] = error;
        }
        return res;
    }

    async deleteAll(){
        const res = {};
        const products = [];
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            res['error'] = null;
        }catch(error){
            res['error'] = error;
        }
        return res;
    }
}

module.exports.Container = Container;