import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {

  groups!: Group[];
  groupsByPage: Group[] = [];
  numberOfElementToShow : number = 9;
  currentPage : number = 1;
  numberTotalOfpage : number = 0;
  pages : number[] = [];

  constructor(private _groupsService : GroupsService) { }

  ngOnInit(): void {
    this.getGroupsBypage(this.currentPage)
  }

  getGroupsBypage(currentPage : number){
    this.currentPage = currentPage;
    /**Récuperer les produits */
    this._groupsService.groups$.subscribe(
      (groups : Group[])=>{
        this.numberTotalOfpage = Math.ceil(groups?.length/this.numberOfElementToShow)
        this.pages=[];
        for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
          this.pages.push(i)
        }
        this.groups = groups?.slice(this.numberOfElementToShow*(currentPage-1),this.numberOfElementToShow*currentPage)
      }
    )
  }

}
