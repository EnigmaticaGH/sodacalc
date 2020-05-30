import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../monster';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {

  @Input() monster: Monster;
  monsterClass = 'monster-card';

  constructor() { }

  ngOnInit(): void {
    this.monsterClass  = `monster-card ${this.monster.room.toLowerCase().replace(/\s+/, '-')}`;
  }
}
