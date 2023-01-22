import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminsService } from 'src/app/services/admins.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.scss']
})
export class AllAdminsComponent implements OnInit {

  admins!: Admin[];
  adminsByPage: Admin[] = [];
  numberOfElementToShow : number = 9;
  currentPage : number = 1;
  numberTotalOfpage : number = 0;
  pages : number[] = [];

  currentAdmin! : Admin;
  adminInitials! : String;


  constructor(private _adminsService : AdminsService,private _authService : AuthService) { }

  ngOnInit(): void {
    this._adminsService.admins$.subscribe(
      (admins : Admin[])=>{

      }
    )
    //Récuperer l'admin connecté
    this._authService.currentAdmin$.subscribe(
      (admin)=>{
        if (admin) {
          this.getInitials(admin);
          this.currentAdmin=admin
        }
      }
    )
    this.getAdminsBypage(this.currentPage)

  }

  getAdminsBypage(currentPage : number){
    this.currentPage = currentPage;
    /**Récuperer les produits */
    this._adminsService.admins$.subscribe(
      (admins : Admin[])=>{
        this.numberTotalOfpage = Math.ceil(admins?.length/this.numberOfElementToShow)
        this.pages=[];
        for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
          this.pages.push(i)
        }
        this.admins = admins?.slice(this.numberOfElementToShow*(currentPage-1),this.numberOfElementToShow*currentPage)
      }
    )
  }

  //Récuperer les initiales de l'admin
  getInitials(admin : Admin){
    const firstLetter = admin.firstname[0].toUpperCase()
    const secondLetter = admin.lastname[0].toUpperCase()
    this.adminInitials = firstLetter+secondLetter
  }

}
