import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
interface AppRoute {
  name: string,
  url: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sodacalc';
  routes: AppRoute[] = [{
    name: 'Bestiary',
    url: '/bestiary'
  },{
    name: 'Monster Stat Calculator',
    url: '/monster-stats'
  },{
    name: "Zenny's Scripting Tutorial",
    url: '/zenny-tutorial'
  }];
  links: AppRoute[] = [{
    name: 'Report an Issue',
    url: 'https://github.com/EnigmaticaGH/sodacalc/issues'
  },{
    name: 'Get Soda Dungeon 2',
    url: 'https://www.sodadungeon.com/'
  }];
  currentUrl = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(route => {
      if (route instanceof RoutesRecognized) {
        this.currentUrl = route.url;
      }
    });
  }

  checkSelected(route: AppRoute): string {
    return this.currentUrl == route.url ? 'accent' : null;
  }
}
