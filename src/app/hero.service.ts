import { Injectable } from '@angular/core';
import { Hero } from './hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=dc0d5511d6e318116dbaf0799351db12&hash=0b3952f07ee28b2ea83a39decef4cbac'
  private heroes: Hero[] = [];

  constructor(
    private http: HttpClient
  ) { }


  public getHeroes(): Observable<Hero[]> {
    return this.http.get<{ data: { results: Hero[] } }>(`${this.url}`).pipe(
      map(response => response.data.results)
    );
  }

  public getHero(id: number): Observable<Hero> {
    console.log(`${this.url}&id=${id}`);
  
    return this.http.get<{ data: { results: Hero[] } }>(`${this.url}&id=${id}`).pipe(
      map(response => {
        console.log('Response:', response);
        return response.data.results[0]; 
      })
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.url}/?name=${term}`);
  }
}
