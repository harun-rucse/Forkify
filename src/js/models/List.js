import uniqid from 'uniqid';
export default class List {
    constructor() {
        this.list = [];
    }
    addItem(count, unit, ingredient) {
        const list = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.list.push(list);

        // Persist list on localStorage
        this.persistData();

        return list;
    }
    deleteItem(id) {
        // Get index of list array based on id
        const index = this.list.findIndex(el => el.id === id);

        // [2,4,8] splice(1,1) -> return 4 , original array is [2,8] 
        // [2,4,8] slice(1,2) -> return 4 , original array is [2,4,8] 
        this.list.splice(index, 1);

        // Persist list on localStorage
        this.persistData();
    }
    deleteAllItem() {
        this.list.forEach(()=> this.list.pop());

        // Persist list on localStorage
        this.persistData();
    }
    updateCount(id, newCount) {
        // this.list.find(el => el.id === id) return the object of list array based on id
        this.list.find(el => el.id === id).count = newCount;

        // Persist list on localStorage
        this.persistData();
    }

    persistData() {
        localStorage.setItem('list', JSON.stringify(this.list));
    }
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('list'));

        // Restoring shopping list from localStorage
        if (storage) this.list = storage;
    }
}