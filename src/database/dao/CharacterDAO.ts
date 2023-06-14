import { BaseDAO } from "./BaseDAO";
import { DBStorage } from "../DBStorage";
import { Character } from "../../models/Character";

export class CharacterDAO extends BaseDAO {
    public static DATA_KEY: string = "character";

    constructor(storage: DBStorage) {
        super(storage);    
    }

    public getCharacterByKey(key: string): Character {
        return this.storage.get(key);
    }

}