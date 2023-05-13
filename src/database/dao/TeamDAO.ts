import { Team } from "../../models/Team";
import { BaseDAO } from "./BaseDAO";
import { DBStorage } from "../DBStorage";

export class TeamDAO extends BaseDAO {
    private teams_key: string;

    constructor(teams_key: string, storage: DBStorage) {
        super(storage);
        this.teams_key = teams_key;
    }

    public getTeamByName(name: string): Team | null {
        var teams = this.storage.get(this.teams_key);
        return teams.find((team: Team) => team.name === name);
    }

    public getAllTeams(): Team[] {
        var teams = this.storage.get(this.teams_key);
        if (teams === undefined) {
            teams = [];
            this.storage.set(this.teams_key, teams);
            return teams;
        }
        return teams;
    }

    public addTeam(team: Team): Team[] {
        var teams = this.getAllTeams();
        var indexExists = teams.findIndex((t: Team) => t.name === team.name);
        if (indexExists !== -1) {
            teams.splice(indexExists, 1);
        }
        var newTeams = [team, ...teams];
        this.storage.set(this.teams_key, newTeams);
        return newTeams;
    }

    public updateTeamByName(name: string, team: Team): Team {
        var teams = this.getAllTeams();
        var index = teams.findIndex((t: Team) => t.name === name);
        var indexExists = teams.findIndex((t: Team) => t.name === team.name && t.name !== name);
        if (indexExists !== -1) {
            throw new Error("Team name already exists");
        }
        teams[index] = team;
        this.storage.set(this.teams_key, teams);
        return team;
    }

    public deleteTeamByName(name: string): Team[] {
        var teams = this.getAllTeams();
        var index = teams.findIndex((t: Team) => t.name === name);
        teams.splice(index, 1);
        this.storage.set(this.teams_key, teams);
        return teams;
    }

}