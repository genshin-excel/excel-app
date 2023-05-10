import { Character } from '../models/Character';
import charactersData from '../data/characters.json';

export const charactersMap = new Map<string, Character>();

function addCharacter(character: Character) {
    charactersMap.set(character.id, character);
}

charactersData.forEach((characterData) => {
    addCharacter({
        ...characterData,
        thumbnail: process.env.PUBLIC_URL + characterData.thumbnail,
    });
});
