import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo : string = environment.logo;
  isAuth: boolean = false;
  currentAdmin! : Admin;
  adminInitials! : String;

  constructor(private _authService : AuthService) { }

  ngOnInit(): void {
    this._authService.isSignedIn();
    //Vérifier si un utilisateur est connecté
    this._authService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );

    //Récuperer l'admin connecté
    this._authService.currentAdmin$.subscribe(
      (admin)=>{
        if (admin) {
          this.getInitials(admin);
          this.currentAdmin=admin
        }

      }
    )
  }

  //Récuperer les initiales de l'admin
  getInitials(admin : Admin){
    const firstLetter = admin.firstname[0].toUpperCase()
    const secondLetter = admin.lastname[0].toUpperCase()
    this.adminInitials = firstLetter+secondLetter
  }

  logout(){
    this._authService.logout()
  }

}
