import { CharacterType } from '../models/CharacterType';
import charactersData from '../data/characters.json';

export const charactersMap = new Map<string, CharacterType>();

function addCharacter(character: CharacterType) {
    charactersMap.set(character.id, character);
}

charactersData.forEach((characterData) => {
    addCharacter({
        ...characterData,
        thumbnail: process.env.PUBLIC_URL + characterData.thumbnail,
    });
});
