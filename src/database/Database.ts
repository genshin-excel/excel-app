import { createContext } from 'react';
import { DBStorage } from './DBStorage';
import { TeamDAO } from './dao/TeamDAO';
import { CharacterDAO } from './dao/CharacterDAO';
import { ConfigDAO } from './dao/ConfigDAO';

export class DatabaseContext {
    storage: DBStorage;
    private teamDAO: TeamDAO;
    private characterDAO: CharacterDAO;
    private configDAO: ConfigDAO;

    constructor(storage: DBStorage) {
        this.storage = storage
        this.teamDAO = new TeamDAO(storage);
        this.characterDAO = new CharacterDAO(storage);
        this.configDAO = new ConfigDAO(1, storage);
    }

    public getTeamDAO(): TeamDAO {
        return this.teamDAO;
    }

    public getCharacterDAO(): CharacterDAO {
        return this.characterDAO;
    }

    public getConfigDAO(): ConfigDAO {
        return this.configDAO;
    }
}
export const DBContext = createContext({} as DatabaseContext)