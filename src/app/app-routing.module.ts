import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routeLinks } from './route-links';

const routes: Routes = routeLinks.map(r => r.route);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
