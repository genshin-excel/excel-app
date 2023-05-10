import { createContext } from 'react';
import { DBStorage } from './DBStorage';
import { TeamDAO } from './dao/TeamDAO';
import { GenerateIdDAO } from './dao/GenerateIdDAO';

export class DatabaseContext {
    storage: DBStorage;
    private teamDAO: TeamDAO;
    private generateIdDAO: GenerateIdDAO;

    constructor(storage: DBStorage) {
        this.storage = storage
        this.teamDAO = new TeamDAO('teams', storage);
        this.generateIdDAO = new GenerateIdDAO(0, storage);
    }

    public getTeamDAO(): TeamDAO {
        return this.teamDAO;
    }

    public getGenerateIdDAO(): GenerateIdDAO {
        return this.generateIdDAO;
    }
}
export const DBContext = createContext({} as DatabaseContext)