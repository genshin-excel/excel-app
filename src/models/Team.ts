import { Character } from './Character';

export type Team = {
    name: string;
    characters: (Character|undefined)[]
    dps: number;
    dpr: number;
}