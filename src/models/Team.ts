import { Character } from './Character';

export type Team = {
    name: string;
    characters: (Character|null)[]
    dps: number;
    dpr: number;
}

export const emptyTeam: Team = {
    name: "",
    characters: [null, null, null, null],
    dps: 0,
    dpr: 0
}