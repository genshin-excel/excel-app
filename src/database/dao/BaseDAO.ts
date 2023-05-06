import { DBStorage } from "../DBStorage"

export class BaseDAO {
    storage: DBStorage;
    
    constructor(storage: DBStorage) {
        this.storage = storage
    }
}