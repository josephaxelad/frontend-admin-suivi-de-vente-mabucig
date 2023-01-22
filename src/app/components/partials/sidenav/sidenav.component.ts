import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

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
          console.log(admin)
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
