import {Character} from '../models/Character'

export const charactersMap = new Map<string, Character>()

function addCharacter(character: Character) {
    charactersMap.set(character.id, character)
}

addCharacter({
    id: "jean",
    name: "Jean",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Jean.png",
})
addCharacter({
    id: "bennett",
    name: "Bennett",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Bennett.png",
})
addCharacter({
    id: "diluc",
    name: "Diluc",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Bennett.png",
})