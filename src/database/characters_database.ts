import { Character } from '../models/Character'

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
    id: "albedo",
    name: "Albedo",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Albedo.png",
})
addCharacter({
    id: "zhongli",
    name: "Zhongli",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Zhongli.png",
})
addCharacter({
    id: "alhaitham",
    name: "Alhaitham",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Alhaitham.png",
})
addCharacter({
    id: "amber",
    name: "Amber",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Amber.png",
})
addCharacter({
    id: "barbara",
    name: "Barbara",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Barbara.png",
})
addCharacter({
    id: "beidou",
    name: "Beidou",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Beidou.png",
})
addCharacter({
    id: "diluc",
    name: "Diluc",
    thumbnail: process.env.PUBLIC_URL + "/images/characters/Character_Diluc.png",
})