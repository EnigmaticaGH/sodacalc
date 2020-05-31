import { Monster } from './monster';

export function hpAtFloor(m: Monster, currentFloor: number): number {
  let areaFloor = currentFloor - (currentFloor % 20) + 1;
  let increaseAfter500 = 65 * (currentFloor / 500);
  return Math.floor(m.hp + 0.65 * areaFloor + (areaFloor > 500 ? increaseAfter500 : 0));
}

export function atkAtFloor(m: Monster, currentFloor): number {
  let areaFloor = currentFloor - (currentFloor % 20) + 1;
  return Math.floor(m.atk + 0.1 * areaFloor + (0.02 * (areaFloor > 500 ? areaFloor : 0)));
}

export function goldAtFloor(m: Monster, currentFloor: number, goldFind: number): number {
  let hp = hpAtFloor(m, currentFloor);
  let atk = atkAtFloor(m, currentFloor);
  return Math.round(Math.floor((0.5 * hp) + (0.5 * atk)) * goldFind);
}