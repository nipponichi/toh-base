import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, debounceTime, distinctUntilChanged, Subject, switchMap, tap } from 'rxjs';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  public currentPage: number = 1;
  public heroesPerPage: number = 20;
  public totalPages: number = 0;
  public totalHeroes: number = 0;

  constructor(private heroService: HeroService) { }

  async ngOnInit(): Promise<void> {
    await this.loadTotalHeroes();
    await this.getHeroes();
  }

  async loadTotalHeroes() {
    this.totalHeroes = await firstValueFrom(this.heroService.getTotalHeroes());
  }

  async getHeroes() {
    const offset = this.calculateOffset()
    const limit: number = 5;
    console.log('getHeroes '+ offset)
    this.heroes = await firstValueFrom(this.heroService.getHeroes(offset, limit));
  }
  
  calculateOffset(): number {
      const maxOffset = Math.max(0, this.totalHeroes - this.heroesPerPage);
      return this.totalHeroes > this.heroesPerPage ? Math.floor(Math.random() * maxOffset) : 0;
  }

}
