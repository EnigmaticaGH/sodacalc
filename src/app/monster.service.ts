import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  private url = 'api/monsters';

  constructor(private http: HttpClient) { }

  get(): Observable<Monster[]> {
    return this.http.get<Monster[]>(this.url);
  }
}
