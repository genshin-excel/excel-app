import { Character } from './Character';
import { Weapon } from './Weapon';
import { Artifact } from './Artifacts';

export type Team = {
    name: string;
    characters: (Character | null)[]
    dps: number;
    dpr: number;
}

export const emptyTeam: Team = {
    name: "",
    characters: [null, null, null, null],
    dps: 0,
    dpr: 0
}

export type Weapons = {
    name: string;
    weapon: (Weapon | null)[]
}

export type Artifacts = {
    name: string;
    weapon: (Artifact | null)[]
}