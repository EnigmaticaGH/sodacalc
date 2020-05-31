import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster';
import { hpAtFloor, atkAtFloor, goldAtFloor } from '../functions'
import { MonsterService } from '../monster.service';

interface MonsterGroup {
  name: string,
  monsters: Monster[]
};

interface MonsterAtFloor {
  name: string,
  atkAtFloor: number,
  hpAtFloor: number
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
  selectedMonster: Monster;
  goldFind = 0;
  hpAtFloor = hpAtFloor;
  atkAtFloor = atkAtFloor;
  goldAtFloor = goldAtFloor;
  attack = 1;

  constructor(
    private monsterService: MonsterService
  ) { }

  ngOnInit(): void {
    this.monsterService.get()
    .subscribe(response => {
      for(let monster of response) {
        let group = this.monsterGroups.find(group => group.name == monster.room);
        if (!group) {
          group = {
            name: monster.room,
            monsters: []
          };
          this.monsterGroups.push(group);
        }
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

  checkMonsterList(): void {
    let newGroup = this.groupAtFloor(this.currentFloor);
    if (!newGroup.includes(this.selectedMonster)) {
      this.selectedMonster = null;
    }
  }

  maxFloorKill(): {floor: number, monsters: MonsterAtFloor[]} {
    if (this.monsterGroups.length <= 0 || this.attack < 2) {
      return {floor: 0, monsters: []};
    }
    let floor = 1;
    let monsters: MonsterAtFloor[] = [];
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
        let hp = hpAtFloor(monster, floor);
        if (this.attack >= hp) {
          monsters.push({
            name: monster.name,
            atkAtFloor: atkAtFloor(monster, floor),
            hpAtFloor: hpAtFloor(monster, floor)
          });
        }
      }
      if (monsters.length <= 0) {
        return {floor: oldFloor, monsters: oldMonsters};
      }
    }
  }
}
