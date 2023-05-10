import { BaseDAO } from "./BaseDAO";
import { DBStorage } from "../DBStorage";

export class GenerateIdDAO extends BaseDAO {
    private team_generate_id: number;

    constructor(team_generate_id: number, storage: DBStorage) {
        super(storage);
        this.team_generate_id = team_generate_id;
    }

    public getTeamGenerateId(): number {
        return this.team_generate_id;
    }

    public setTeamGenerateId(team_generate_id: number): void {
        this.team_generate_id = team_generate_id;
    }
}
