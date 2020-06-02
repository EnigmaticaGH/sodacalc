import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BestiaryComponent } from './bestiary/bestiary.component';
import { MonsterStatCalcComponent } from './monster-stat-calc/monster-stat-calc.component';
import { CharacterStatsComponent } from './character-stats/character-stats.component';


const routes: Routes = [
  { path: 'bestiary', component: BestiaryComponent },
  { path: 'monster-stats', component: MonsterStatCalcComponent },
  { path: 'character-stats', component: CharacterStatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
