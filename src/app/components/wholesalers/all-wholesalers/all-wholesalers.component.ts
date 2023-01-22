import { Component, OnInit } from '@angular/core';
import { Wholesaler } from 'src/app/models/wholesaler';
import { WholesalersService } from 'src/app/services/wholesalers.service';

@Component({
  selector: 'app-all-wholesalers',
  templateUrl: './all-wholesalers.component.html',
  styleUrls: ['./all-wholesalers.component.scss']
})
export class AllWholesalersComponent implements OnInit {

  wholesalers!: Wholesaler[];
  wholesalersByPage: Wholesaler[] = [];
  numberOfElementToShow : number = 9;
  currentPage : number = 1;
  numberTotalOfpage : number = 0;
  pages : number[] = [];

  constructor(private _wholesalersService : WholesalersService) { }

  ngOnInit(): void {
    this.getWholesalersBypage(this.currentPage)
  }

  getWholesalersBypage(currentPage : number){
    this.currentPage = currentPage;
    /**Récuperer les produits */
    this._wholesalersService.wholesalers$.subscribe(
      (wholesalers : Wholesaler[])=>{
        this.numberTotalOfpage = Math.ceil(wholesalers?.length/this.numberOfElementToShow)
        this.pages=[];
        for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
          this.pages.push(i)
        }
        this.wholesalers = wholesalers?.slice(this.numberOfElementToShow*(currentPage-1),this.numberOfElementToShow*currentPage)
      }
    )
  }


}
