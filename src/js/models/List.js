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
        return list;
    }
    deleteItem(id) {
        // Get index of list array based on id
        const index = this.list.findIndex(el => el.id === id);

        // [2,4,8] splice(1,1) -> return 4 , original array is [2,8] 
        // [2,4,8] slice(1,2) -> return 4 , original array is [2,4,8] 
        this.list.splice(index, 1);
    }
    updateCount(id, newCount) {
        // this.list.find(el => el.id === id) return the object of list array based on id
        this.list.find(el => el.id === id).count = newCount;
    }
}