import { Team } from "../../models/Team";
import { BaseDAO } from "./BaseDAO";
import { DBStorage } from "../DBStorage";


export class TeamDAO extends BaseDAO {
    private teams_key: string;

    constructor(teams_key: string, storage: DBStorage) {
        super(storage);
        this.teams_key = teams_key;
    }

    public getTeamByName(name: string): Team|null{
        var teams = this.storage.get(this.teams_key);
        return teams.find((team: Team) => team.name === name);
    }

    public getAllTeams(): Team[] {
        return this.storage.get(this.teams_key);
    }

    public addTeam(team: Team): Team {
        var teams = this.getAllTeams();
        var newTeams = [...teams, team];
        this.storage.set(this.teams_key, newTeams);
        return team;
    }

    public updateTeam(team: Team): Team {
        var teams = this.getAllTeams();
        var index = teams.findIndex((t: Team) => t.name === team.name);
        teams[index] = team;
        this.storage.set(this.teams_key, teams);
        return team;
    }

    public deleteTeam(team: Team): boolean {
        var teams = this.getAllTeams();
        var index = teams.findIndex((t: Team) => t.name === team.name);
        teams.splice(index, 1);
        this.storage.set(this.teams_key, teams);
        return true;
    }

}