import { Injectable } from '@angular/core';
import { Hero } from './hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=dc0d5511d6e318116dbaf0799351db12&hash=0b3952f07ee28b2ea83a39decef4cbac'

  constructor(
    private http: HttpClient
  ) { }

  public getTotalHeroes(): Observable<number> {
    return this.http.get<{ data: { total: number } }>(`${this.url}`).pipe(
      map(response => response.data.total)
    );
  }

  public getHeroes(offset: number = 0, limit: number = 20): Observable<Hero[]> {
    return this.http.get<{ data: { results: Hero[] } }>(`${this.url}&offset=${offset}&limit=${limit}`).pipe(
      map(response => response.data.results)
    );
  }

  public getHero(id: number): Observable<Hero> {  
    return this.http.get<{ data: { results: Hero[] } }>(`${this.url}&id=${id}`).pipe(
      map(response => {
        console.log('Response:', response);
        return response.data.results[0];
      })
    );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.url}&nameStartsWith=${term}&limit=5`;
    return this.http.get<{ data: { results: Hero[] } }>(url).pipe(
      map(response => response.data.results || [])
    );

  }
}