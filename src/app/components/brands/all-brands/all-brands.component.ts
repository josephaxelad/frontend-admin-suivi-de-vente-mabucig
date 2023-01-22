import { Component, OnInit } from '@angular/core';
import { Mark } from 'src/app/models/mark';
import { MarksService } from 'src/app/services/marks.service';

@Component({
  selector: 'app-all-brands',
  templateUrl: './all-brands.component.html',
  styleUrls: ['./all-brands.component.scss']
})
export class AllBrandsComponent implements OnInit {

  marks!: Mark[];
  marksByPage: Mark[] = [];
  numberOfElementToShow : number = 9;
  currentPage : number = 1;
  numberTotalOfpage : number = 0;
  pages : number[] = [];

  constructor(private _marksService : MarksService) { }

  ngOnInit(): void {
    this.getMarksBypage(this.currentPage)
  }

  getMarksBypage(currentPage : number){
    this.currentPage = currentPage;
    /**Récuperer les produits */
    this._marksService.marks$.subscribe(
      (marks : Mark[])=>{
        this.numberTotalOfpage = Math.ceil(marks?.length/this.numberOfElementToShow)
        this.pages=[];
        for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
          this.pages.push(i)
        }
        this.marks = marks?.slice(this.numberOfElementToShow*(currentPage-1),this.numberOfElementToShow*currentPage)
      }
    )
  }

}
