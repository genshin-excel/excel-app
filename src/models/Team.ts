import { Character } from './Character';
import { Weapon } from './Weapon';
import { Artifact } from './Artifacts';

export type Team = {
    id: number;
    name: string;
    characterKeys: String[]
    dps: number;
    dpr: number;
}

export const emptyTeam: Team = {
    id: 0,
    name: "",
    characterKeys: ["", "", "", ""],
    dps: 0,
    dpr: 0
}