import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { AlertsService } from 'src/app/services/alerts.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-all-cities',
  templateUrl: './all-cities.component.html',
  styleUrls: ['./all-cities.component.scss']
})
export class AllCitiesComponent implements OnInit {

  cities!: City[];
  citiesByPage: City[] = [];
  numberOfElementToShow : number = 9;
  currentPage : number = 1;
  numberTotalOfpage : number = 0;
  pages : number[] = [];

  constructor(private _citiesService : CitiesService) { }

  ngOnInit(): void {
    this.getCitiesBypage(this.currentPage)
  }

  //Récupérer les villes par page
  getCitiesBypage(currentPage : number){
    this.currentPage = currentPage;
    /**Récuperer les produits */
    this._citiesService.cities$.subscribe(
      (cities : City[])=>{
        this.numberTotalOfpage = Math.ceil(cities?.length/this.numberOfElementToShow)
        this.pages=[];
        for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
          this.pages.push(i)
        }
        this.cities = cities?.slice(this.numberOfElementToShow*(currentPage-1),this.numberOfElementToShow*currentPage)
      }
    )
  }

  search(e: any){
    console.log(e.target)
  }

}
