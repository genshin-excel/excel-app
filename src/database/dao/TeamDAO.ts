import { Team } from "../../models/Team";
import { BaseDAO } from "./BaseDAO";
import { CharacterDAO } from "./CharacterDAO";
import { DBStorage } from "../DBStorage";
import { Character } from "../../models/Character";

export class TeamDAO extends BaseDAO {
  public static DATA_KEY: string = "team";

  constructor(storage: DBStorage) {
    super(storage);
  }

  public getTeamById(id: number): Team | null {
    return this.storage.get(`${TeamDAO.DATA_KEY}_${id}`);
  }

  public getTeamByName(name: string): Team | null {
    for (var entry of this.storage.entries) {
      if (entry[0].startsWith(`${TeamDAO.DATA_KEY}_`)) {
        var team: Team = JSON.parse(entry[1]);
        if (team.name === name) {
          return team;
        }
      }
    }
    return null;
  }

  public getAllTeams(): Team[] {
    var teams: Team[] = [];
    for (var entry of this.storage.entries) {
      if (entry[0].startsWith(`${TeamDAO.DATA_KEY}_`)) {
        var team: Team = JSON.parse(entry[1]);
        teams.push(team);
      }
    }
    return teams;
  }

  public addTeam(team: Team) {
    team.characterKeys = [
      `${CharacterDAO.DATA_KEY}_${team.id}_1`,
      `${CharacterDAO.DATA_KEY}_${team.id}_2`,
      `${CharacterDAO.DATA_KEY}_${team.id}_3`,
      `${CharacterDAO.DATA_KEY}_${team.id}_4`,
    ]

    this.storage.set(`${TeamDAO.DATA_KEY}_${team.id}`, team);
  }

  public updateTeam(id: number, team: Team) {
    var oldTeam: Team | null = this.getTeamById(id);
    if (oldTeam === null) {
        throw new Error("Team does not exist");
    }
    team.name = oldTeam.name;
    this.storage.set(`${TeamDAO.DATA_KEY}_${id}`, team);
  }

  public updateTeamName(id: number, name: string): Team {
    var existingTeam: Team | null = this.getTeamByName(name);
    if (existingTeam !== null) {
        throw new Error("Team name already exists");
    }
    var team: Team | null = this.getTeamById(id);
    if (team === null) {
        throw new Error("Team does not exist");
    }
    team.name = name;
    this.storage.set(`${TeamDAO.DATA_KEY}_${id}`, team);
    return team;
  }

  public deleteTeam(id: number) {
    this.storage.remove(`${TeamDAO.DATA_KEY}_${id}`);
  }

  public getCharacter(teamId: number, index: number): Character | null {
    return this.storage.get(`${CharacterDAO.DATA_KEY}_${teamId}_${index}`);
  }

  public setCharacter(teamId: number, index: number, character: Character): void {
    this.storage.set(`${CharacterDAO.DATA_KEY}_${teamId}_${index}`, character);
  }
}
