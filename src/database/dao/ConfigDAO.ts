import { BaseDAO } from "./BaseDAO";
import { DBStorage } from "../DBStorage";
import { Config } from "../../models/Config";

export class ConfigDAO extends BaseDAO {
    public static DATA_KEY: string = "config";
    private firstId: number;

    constructor(firstId: number, storage: DBStorage) {
        super(storage);        
        this.firstId = firstId;
    }

    public getConfig(): Config {
        var config = this.storage.get(ConfigDAO.DATA_KEY);
        if (config === undefined) {
            config = { nextTeamId: this.firstId };
            this.storage.set(ConfigDAO.DATA_KEY, config);
        }
        return config;
    }

    public getNextId(): number {
        var config = this.getConfig();
        var nextId = config.nextTeamId;
        config.nextTeamId = nextId + 1;
        this.storage.set(ConfigDAO.DATA_KEY, config);
        return nextId;
    }
}
