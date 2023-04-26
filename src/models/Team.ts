import { Character } from './Character';

export type Team = {
    name: string;
    characters: (Character|null)[]
    dps: number;
    dpr: number;
}