class MemoryContainer{
    constructor(resource){
        this.items = [];
        this.resource = resource;
    }

    static async connect(){
        return;
    }

    getAll(){
        return this.items;
    }

    getById(id){
        const item = this.items.find(item => item.id == id);
        if(!item){
            throw new Error(`${this.resource} with id ${id} does not exist in our records`);
        }
        return item;
    }

    save(item){
        const res = {};    
        if(!item.id){
            let maxId = 0;
            if(this.items.length > 0){
                const ids = this.items.map(product => product.id);
                maxId = Math.max(...ids);
            }
            item.id = maxId + 1;
        }
        this.items.push(item);     
        return item.id;  
    }

    deleteById(id){
        const newItems = this.items.filter(item => item.id != id);
        this.items = newItems;
        return this.items;
    }

    deleteAll(){
        this.items = [];
        return [];
    }
}

module.exports = MemoryContainer;