import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BestiaryComponent } from './bestiary/bestiary.component';
import { MonsterStatCalcComponent } from './monster-stat-calc/monster-stat-calc.component';
import { RelicStatsComponent } from './relic-stats/relic-stats.component';


const routes: Routes = [
  { path: 'bestiary', component: BestiaryComponent },
  { path: 'monster-stats', component: MonsterStatCalcComponent },
  { path: 'relic-stats', component: RelicStatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
