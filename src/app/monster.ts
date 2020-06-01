export type MonsterType = 'Normal' | 'Miniboss' | 'Boss';

export class Monster {
  private _hp: number;
  private _atk: number;
  private _room: string;
  private _type: MonsterType;
  private _name: string;

  constructor(name: string, hp: number, atk: number, room: string, type: MonsterType) {
    this._name = name;
    this._hp = hp;
    this._atk = atk;
    this._room = room;
    this._type = type;
  }

  get name(): string {
    return this._name
  }

  get room(): string {
    return this._room
  }

  get type(): MonsterType {
    return this._type
  }

  get hp(): number {
    return this._hp
  }

  get atk(): number {
    return this._atk
  }

  hpAtFloor(floor): number {
    let roomFloor = floor % 20 > 0 ? floor - (floor % 20) : floor - 20;
    let bossMultipliers = {
      'Normal': 1,
      'Miniboss': 2,
      'Boss': 3
    };
    let hpFactor = Math.floor(0.65 * roomFloor) * bossMultipliers[this._type];
    if (floor >= 500) {
      hpFactor += Math.floor(0.13 * roomFloor) * bossMultipliers[this._type];
    }
    return this._hp + hpFactor;
  }

  atkAtFloor(floor): number {
    let roomFloor = floor - (floor % 20);
    let overFloor500Increase = 0.02 * (roomFloor > 500 ? roomFloor : 0);
    return Math.floor(this._atk + 0.1 * roomFloor + (overFloor500Increase));
  }

  goldAtFloor(floor, goldFind): number {
    let hp = this.hpAtFloor(floor);
    let atk = this.atkAtFloor(floor);
    return Math.floor(Math.floor((0.5 * hp) + (0.5 * atk)) * goldFind);
  }
}