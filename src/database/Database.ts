import { createContext } from 'react';
import { DBStorage } from './DBStorage';
import { TeamDAO } from './dao/TeamDAO';

export class DatabaseContext {
    storage: DBStorage;
    private teamDAO: TeamDAO;

    constructor(storage: DBStorage) {
        this.storage = storage
        this.teamDAO = new TeamDAO('teams', storage);
    }

    public getTeamDAO(): TeamDAO {
        return this.teamDAO;
    }
}
export const DBContext = createContext({} as DatabaseContext)