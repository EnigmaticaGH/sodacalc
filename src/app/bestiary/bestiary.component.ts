import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-bestiary',
  templateUrl: './bestiary.component.html',
  styleUrls: ['./bestiary.component.css'],
  providers: [MonsterService]
})
export class BestiaryComponent implements OnInit {
  monsters: Monster[] = [];

  constructor(
    private monsterService: MonsterService
  ) { }

  ngOnInit(): void {
    this.monsterService.get()
    .subscribe(response => {
      this.monsters = response;
    });
  }

}
