import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster';
import { hpAtFloor, atkAtFloor, goldAtFloor } from '../functions'
import { MonsterService } from '../monster.service';

interface MonsterGroup {
  name: string,
  monsters: Monster[]
}

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

  groupAtFloor(): Monster[] {
    let roomIndex = Math.floor((this.currentFloor - 1) % 100 / 20);
    if (this.monsterGroups[roomIndex]) {
      return this.monsterGroups[roomIndex].monsters;
    }
    return null;
  }

  convertGoldFind(): number {
    return (this.goldFind / 100) + 1;
  }

  checkMonsterList(): void {
    let newGroup = this.groupAtFloor();
    if (!newGroup.includes(this.selectedMonster)) {
      this.selectedMonster = null;
    }
  }
}
