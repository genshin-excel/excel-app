import { BaseDAO } from "./BaseDAO";
import { DBStorage } from "../DBStorage";
import { Config } from "../../models/Config";

export class ConfigDAO extends BaseDAO {
    private data_key: string;
    private firstId: number;

    constructor(data_key: string, firstId: number, storage: DBStorage) {
        super(storage);        
        this.data_key = data_key;
        this.firstId = firstId;
    }

    public getConfig(): Config {
        var config = this.storage.get(this.data_key);
        if (config === undefined) {
            config = { nextTeamId: this.firstId };
            this.storage.set(this.data_key, config);
        }
        return config;
    }

    public getNextId(): number {
        var config = this.getConfig();
        var nextId = config.nextTeamId;
        config.nextTeamId = nextId + 1;
        this.storage.set(this.data_key, config);
        return nextId;
    }
}
