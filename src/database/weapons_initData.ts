import { Weapon } from '../models/Weapon';
import WeaponData from '../data/weapons.json';

export const weaponsMap = new Map<string, Weapon>();

function addWeapon(weapon: Weapon) {
  weaponsMap.set(weapon.id, weapon);
}

const weaponDataArray = WeaponData as Weapon[];

weaponDataArray.forEach((weaponData) => {
  addWeapon({
    ...weaponData,
    thumbnail: process.env.PUBLIC_URL + weaponData.thumbnail,
  });
});
