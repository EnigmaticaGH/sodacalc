import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BestiaryComponent } from './bestiary/bestiary.component';
import { MonsterStatCalcComponent } from './monster-stat-calc/monster-stat-calc.component';


const routes: Routes = [
  { path: 'bestiary', component: BestiaryComponent },
  { path: 'monster-stats', component: MonsterStatCalcComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
