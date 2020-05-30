export class Monster {
  private _hp: number
  private _atk: number
  private _room: string
  private _name: string

  constructor(name: string, hp: number, atk: number, room: string) {
    this._name = name
    this._hp = hp
    this._atk = atk
    this._room = room
  }

  get name(): string {
    return this._name
  }

  get room(): string {
    return this._room
  }

  get hp(): number {
    return this._hp
  }

  get atk(): number {
    return this._atk
  }
}