import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';

interface MonsterGroup {
  name: string,
  monsters: Monster[]
};

@Component({
  selector: 'app-monster-stat-calc',
  templateUrl: './monster-stat-calc.component.html',
  styleUrls: ['./monster-stat-calc.component.css'],
  providers: [MonsterService]
})
export class MonsterStatCalcComponent implements OnInit {
  monsterGroups: MonsterGroup[] = [];
  currentFloor = 1;
  selectedMonster: Monster = null;
  goldFind = 0;
  attack = 1;

  constructor(
    private monsterService: MonsterService
  ) { }

  ngOnInit(): void {
    this.monsterService.get()
    .subscribe(response => {
      for(let monsterData of response) {
        let group = this.monsterGroups.find(group => group.name == monsterData.room);
        if (!group) {
          group = {
            name: monsterData.room,
            monsters: []
          };
          this.monsterGroups.push(group);
        }
        let monster = new Monster(monsterData.name, monsterData.hp, monsterData.atk, monsterData.room, monsterData.type);
        group.monsters.push(monster);
      }
    });
  }

  roomAtFloor(): string {
    let roomIndex = Math.floor((this.currentFloor - 1) % 100 / 20);
    let group = this.monsterGroups[roomIndex];
    return group ? group.name : '';
  }

  groupAtFloor(floor: number): Monster[] {
    let roomIndex = Math.floor((floor - 1) % 100 / 20);
    if (this.monsterGroups[roomIndex]) {
      return this.monsterGroups[roomIndex].monsters;
    }
    return null;
  }

  convertGoldFind(): number {
    return (this.goldFind / 100) + 1;
  }

  maxFloorKill(): {floor: number, monsters: Monster[]} {
    if (this.monsterGroups.length <= 0 || this.attack < 2) {
      return {floor: 0, monsters: []};
    }
    let floor = 1;
    let monsters: Monster[] = [];
    while (true) {
      let oldMonsters = monsters.slice();
      monsters = [];
      let oldFloor = floor;
      floor++;
      if (floor % 5 == 0) {
        floor++;
      }
      let group = this.groupAtFloor(floor);
      for(let monster of group.filter(m => m.type == 'Normal')) {
        let hp = monster.hpAtFloor(floor);
        if (this.attack >= hp) {
          monsters.push(monster);
        }
      }
      if (monsters.length <= 0) {
        return {floor: oldFloor, monsters: oldMonsters};
      }
    }
  }
}
