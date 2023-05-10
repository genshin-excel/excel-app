import { createContext } from 'react';
import { DBStorage } from './DBStorage';
import { TeamDAO } from './dao/TeamDAO';
import { ConfigDAO } from './dao/ConfigDAO';

export class DatabaseContext {
    storage: DBStorage;
    private teamDAO: TeamDAO;
    private configDAO: ConfigDAO;

    constructor(storage: DBStorage) {
        this.storage = storage
        this.teamDAO = new TeamDAO('teams', storage);
        this.configDAO = new ConfigDAO("config", 1, storage);
    }

    public getTeamDAO(): TeamDAO {
        return this.teamDAO;
    }

    public getConfigDAO(): ConfigDAO {
        return this.configDAO;
    }
}
export const DBContext = createContext({} as DatabaseContext)