import { Component, OnInit } from '@angular/core';
import { Monster, MonsterRank } from '../monster';
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
  goldFind = 0;

  attack = 1;
  maxAtkFloor = {
    'Normal': 0,
    'Miniboss': 0,
    'Boss': 0
  };

  hp = 1;
  maxHPFloor = {
    'Normal': 0,
    'Miniboss': 0,
    'Boss': 0
  };

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
        let monster = new Monster(monsterData.name, monsterData.hp, monsterData.atk, monsterData.room, monsterData.rank);
        group.monsters.push(monster);
      }
    });
  }

  roomAtFloor(): string {
    let roomIndex = Math.floor((this.currentFloor - 1) % 100 / 20);
    let group = this.monsterGroups[roomIndex];
    return group ? group.name : '';
  }

  monstersAtFloor(floor: number): Monster[] {
    let roomIndex = Math.floor((floor - 1) % 100 / 20);
    if (this.monsterGroups[roomIndex]) {
      return this.monsterGroups[roomIndex].monsters.filter(monster => {
        if (floor % 10 == 0) {
          return monster.rank == 'Boss';
        } else if (floor % 5 == 0) {
          return monster.rank == 'Miniboss';
        } else {
          return monster.rank == 'Normal';
        }
      });
    }
    return null;
  }

  convertGoldFind(): number {
    return (this.goldFind / 100) + 1;
  }

  calcMaxFloorKill(): void {
    for(let rank in this.maxAtkFloor) {
      this.maxAtkFloor[rank] = this.maxFloorKill(<MonsterRank>rank);
    }
  }

  maxFloorKill(rank: MonsterRank): {floor: number, monsters: Monster[]} {
    // If monsters haven't loaded from API, return empty values
    if (this.monsterGroups.length <= 0 || this.attack < 2) {
      return {floor: 0, monsters: []};
    }
    const MAX_FLOOR = Math.pow(2, 32);
    let floor = MAX_FLOOR; // Nobody will ever reach this floor
    // Seriously, it will take at least 60 years unless you are cheating ;)
    let rankMultipliers = {
      'Normal': 1,
      'Miniboss': 5,
      'Boss': 10
    };
    // Cheesy way of rounding an integer to the nearest multiple
    // For bosses and minibosses we want to make sure we're checking only floors divisible by 5 or 10
    function roundToMultiple(x): number {
      return Math.floor(x / rankMultipliers[rank]) * rankMultipliers[rank];
    }
    // Pseudo-binary search. Loop down until we find a monster we can one-hit
    for(floor; floor > rankMultipliers[rank]; floor = roundToMultiple(Math.floor(floor / 2))) {
      let monstersAtFloor = this.monstersAtFloor(floor);
      let monstersOfRank = monstersAtFloor.filter(m => m.rank == rank);
      // If there are no monsters of the rank we are searching for, keep going down.
      if (monstersOfRank.length <= 0) { continue; }
      let monstersOneHittable = monstersOfRank.filter(m => this.attack >= m.hpAtFloor(floor));
      // We found one! break from the loop for the next operation
      if (monstersOneHittable.length > 0) { break; }
    }
    // We found the lowest monster from the halfway point, but that's still not the highest floor
    // Loop upwards until we find the highest floor
    let result = {
      floor: null,
      monsters: null
    };
    for(floor; floor < MAX_FLOOR; floor++) {
      let monstersAtFloor = this.monstersAtFloor(floor);
      let monstersOfRank = monstersAtFloor.filter(m => m.rank == rank);
      // If there are no monsters of the rank we are searching for, keep going down.
      if (monstersOfRank.length <= 0) { continue; }
      let monstersOneHittable = monstersOfRank.filter(m => this.attack >= m.hpAtFloor(floor));
      if (monstersOneHittable.length > 0) {
        result = {
          floor: floor,
          monsters: monstersOneHittable
        };
      } else {
        // We reached above our max one-hittable floor, so return our results
        return result;
      }
    }
  }

  calcMaxFloorLive(): void {
    for(let rank in this.maxHPFloor) {
      this.maxHPFloor[rank] = this.maxFloorLive(<MonsterRank>rank);
    }
  }

  maxFloorLive(rank: MonsterRank): {floor: number, monsters: Monster[]} {
    // If monsters haven't loaded from API, return empty values
    if (this.monsterGroups.length <= 0 || this.hp < 2) {
      return {floor: 0, monsters: []};
    }
    const MAX_FLOOR = Math.pow(2, 32);
    let floor = MAX_FLOOR; // Nobody will ever reach this floor
    // Seriously, it will take at least 60 years unless you are cheating ;)
    let rankMultipliers = {
      'Normal': 1,
      'Miniboss': 5,
      'Boss': 10
    };
    // Cheesy way of rounding an integer to the nearest multiple
    // For bosses and minibosses we want to make sure we're checking only floors divisible by 5 or 10
    function roundToMultiple(x): number {
      return Math.floor(x / rankMultipliers[rank]) * rankMultipliers[rank];
    }
    // Pseudo-binary search. Loop down until we find a monster we can one-hit
    for(floor; floor > rankMultipliers[rank]; floor = roundToMultiple(Math.floor(floor / 2))) {
      let monstersAtFloor = this.monstersAtFloor(floor);
      let monstersOfRank = monstersAtFloor.filter(m => m.rank == rank);
      // If there are no monsters of the rank we are searching for, keep going down.
      if (monstersOfRank.length <= 0) { continue; }
      let monstersSurvivable = monstersOfRank.filter(m => this.hp > m.atkAtFloor(floor));
      // We found one! break from the loop for the next operation
      if (monstersSurvivable.length > 0) { break; }
    }
    // We found the lowest monster from the halfway point, but that's still not the highest floor
    // Loop upwards until we find the highest floor
    let result = {
      floor: null,
      monsters: null
    };
    for(floor; floor < MAX_FLOOR; floor++) {
      let monstersAtFloor = this.monstersAtFloor(floor);
      let monstersOfRank = monstersAtFloor.filter(m => m.rank == rank);
      // If there are no monsters of the rank we are searching for, keep going down.
      if (monstersOfRank.length <= 0) { continue; }
      let monstersSurvivable = monstersOfRank.filter(m => this.hp > m.atkAtFloor(floor));
      if (monstersSurvivable.length > 0) {
        result = {
          floor: floor,
          monsters: monstersSurvivable
        };
      } else {
        // We reached above our max one-hittable floor, so return our results
        return result;
      }
    }
  }
}
