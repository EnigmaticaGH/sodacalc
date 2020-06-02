import { Route } from '@angular/router';
import { BestiaryComponent } from './bestiary/bestiary.component';
import { MonsterStatCalcComponent } from './monster-stat-calc/monster-stat-calc.component';

export const routeLinks: {name: string, route: Route}[] = [{
  name: 'Bestiary',
  route: { path: 'bestiary', component: BestiaryComponent },
},{
  name: 'Monster Stats',
  route: { path: 'monster-stats', component: MonsterStatCalcComponent },
}];