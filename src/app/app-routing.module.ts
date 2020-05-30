import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BestiaryComponent } from './bestiary/bestiary.component';
import { MonsterStatCalcComponent } from './monster-stat-calc/monster-stat-calc.component';
import { ZennyScriptTutorialComponent } from './zenny-script-tutorial/zenny-script-tutorial.component';


const routes: Routes = [
  { path: 'bestiary', component: BestiaryComponent },
  { path: 'monster-stats', component: MonsterStatCalcComponent },
  { path: 'zenny-tutorial', component: ZennyScriptTutorialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
