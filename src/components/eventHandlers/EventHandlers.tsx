import { Team } from '../../models/Team';
import { Character } from '../../models/Character';
import { DatabaseContext } from '../../database/Database';

export function handleDeleteClick(team: Team, database: DatabaseContext, setTeams: (teams: Team[]) => void, setEditingTeam: (team: Team | null) => void) {
    const newTeams = database.getTeamDAO().deleteTeamByName(team.name);
    setTeams(newTeams);
    setEditingTeam(null);
}

export function handleEditClick(team: Team, setEditingTeam: (team: Team | null) => void, setTeamName: (name: string) => void) {
    setEditingTeam(team);
    setTeamName(team.name);
}

export function handleChangeTeamName(team: Team, newName: string, database: DatabaseContext, setTeams: (teams: Team[]) => void) {
    const newTeams = database.getTeamDAO().updateTeamByName(team.name, { ...team, name: newName });
    setTeams(newTeams);
}

export function handleBlur(editingTeam: Team | null, teamName: string, handleChangeTeamName: (team: Team, newName: string, database: DatabaseContext, setTeams: (teams: Team[]) => void) => void, setEditingTeam: (team: Team | null) => void, setTeamName: (name: string) => void, database: DatabaseContext, setTeams: (teams: Team[]) => void) {
    if (editingTeam && teamName !== '') {
        handleChangeTeamName(editingTeam, teamName, database, setTeams);
        setEditingTeam(null);
        setTeamName('');
    }
}

export function updateSelectedImage(
    character: Character,
    team: Team,
    charIndex: number,
    database: DatabaseContext,
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>
) {
    team.characters[charIndex] = character;
    const newTeams = database.getTeamDAO().updateTeamByName(team.name, team);
    setTeams(newTeams);
}

export { };
