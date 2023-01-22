import { Component, OnInit } from '@angular/core';
import { Agency } from 'src/app/models/agency';
import { AgenciesService } from 'src/app/services/agencies.service';

@Component({
  selector: 'app-all-distribution-agencies',
  templateUrl: './all-distribution-agencies.component.html',
  styleUrls: ['./all-distribution-agencies.component.scss']
})
export class AllDistributionAgenciesComponent implements OnInit {

  agencies!: Agency[];
  agenciesByPage: Agency[] = [];
  numberOfElementToShow : number = 9;
  currentPage : number = 1;
  numberTotalOfpage : number = 0;
  pages : number[] = [];

  constructor(private _agenciesService : AgenciesService) { }

  ngOnInit(): void {
    this.getAgenciesBypage(this.currentPage)
  }

  //Récupérer les agences par page
  getAgenciesBypage(currentPage : number){
    this.currentPage = currentPage;
    /**Récuperer les produits */
    this._agenciesService.agencies$.subscribe(
      (agencies : Agency[])=>{
        this.numberTotalOfpage = Math.ceil(agencies?.length/this.numberOfElementToShow)
        this.pages=[];
        for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
          this.pages.push(i)
        }
        this.agencies = agencies?.slice(this.numberOfElementToShow*(currentPage-1),this.numberOfElementToShow*currentPage)
      }
    )
  }

}
