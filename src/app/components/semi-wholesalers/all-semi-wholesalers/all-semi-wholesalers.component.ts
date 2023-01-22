import { Component, OnInit } from '@angular/core';
import { SemiWholesaler } from 'src/app/models/semi-wholesaler';
import { SemiWholesalersService } from 'src/app/services/semi-wholesalers.service';

@Component({
  selector: 'app-all-semi-wholesalers',
  templateUrl: './all-semi-wholesalers.component.html',
  styleUrls: ['./all-semi-wholesalers.component.scss']
})
export class AllSemiWholesalersComponent implements OnInit {

  semiWholesalers!: SemiWholesaler[];
  semiWholesalersByPage: SemiWholesaler[] = [];
  numberOfElementToShow : number = 9;
  currentPage : number = 1;
  numberTotalOfpage : number = 0;
  pages : number[] = [];

  constructor(private _semiWholesalersService : SemiWholesalersService) { }

  ngOnInit(): void {
    this.getSemiWholesalersBypage(this.currentPage)
  }

  getSemiWholesalersBypage(currentPage : number){
    this.currentPage = currentPage;
    /**Récuperer les produits */
    this._semiWholesalersService.semiWholesalers$.subscribe(
      (semiWholesalers : SemiWholesaler[])=>{
        this.numberTotalOfpage = Math.ceil(semiWholesalers?.length/this.numberOfElementToShow)
        this.pages=[];
        for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
          this.pages.push(i)
        }
        this.semiWholesalers = semiWholesalers?.slice(this.numberOfElementToShow*(currentPage-1),this.numberOfElementToShow*currentPage)
      }
    )
  }

}
