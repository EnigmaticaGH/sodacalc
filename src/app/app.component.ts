import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { routeLinks } from './route-links';

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
  routes: AppRoute[] = [];

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
    this.routes = routeLinks.map(routeLink => {
      return { name: routeLink.name, url: routeLink.route.path };
    });
    this.router.events.subscribe(route => {
      if (route instanceof RoutesRecognized) {
        this.currentUrl = route.url.replace('/', '');
      }
    });
  }

  checkSelected(route: AppRoute): string {
    return this.currentUrl == route.url ? 'accent' : null;
  }
}
