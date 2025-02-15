import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.interface';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-heroes',
  imports: [RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  public currentPage: number = 1;
  public heroesPerPage: number = 20;
  public totalPages: number = 0;
  public totalHeroes: number = 0;

  constructor(private heroService: HeroService) {}

  async ngOnInit(): Promise<void> {
    await this.loadTotalHeroes()
    this.getTotalPages()
    await this.loadHeroes()
  }

  async loadTotalHeroes() {
    this.totalHeroes = await firstValueFrom(this.heroService.getTotalHeroes());
  }
  
  async loadHeroes() {
    const offset = (this.currentPage - 1) * this.heroesPerPage;
    this.heroes = await firstValueFrom(this.heroService.getHeroes(offset, this.heroesPerPage));
  }

  nextPage(): void {
    if (this.heroesPerPage * this.currentPage < this.totalHeroes) {
      this.currentPage++;
      this.loadHeroes();
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadHeroes();
    }
  }

  getTotalPages(): void {
    this.totalPages = Math.ceil(this.totalHeroes / 20);
  }
}
