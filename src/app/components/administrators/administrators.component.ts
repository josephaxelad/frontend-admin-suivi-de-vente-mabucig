import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminsService } from 'src/app/services/admins.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.scss']
})
export class AdministratorsComponent implements OnInit {

  admins!: Admin[];
  currentAdmin! : Admin;

  constructor(private _alertsService : AlertsService,private _router: Router,private _adminsService : AdminsService,private _authService : AuthService) { }

  ngOnInit(): void {
    this._adminsService.admins$.subscribe(
      (admins : Admin[])=>{
        this.admins = admins
      }
    )

    //Récuperer l'admin connecté
    this._authService.currentAdmin$.subscribe(
      (admin)=>{
        if (admin) {
          this.currentAdmin=admin
        }

      }
    )
  }

  //Supprimer définitivement un admin
  deleteHard(admin : Admin){
    this._adminsService.deleteHard(admin._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      this._router.navigate(["/administrateurs"])
    })
    // .catch((error)=>{ console.log(error) })

  }

  //Récuperer les initiales de l'admin
  getInitials(admin : Admin){
    const firstLetter = admin.firstname[0].toUpperCase()
    const secondLetter = admin.lastname[0].toUpperCase()
    return firstLetter+secondLetter
  }

  //Activer ou désactiver le compte d'un admin
  isDisabled(admin : Admin){
    // const isVisible = e.target.checked;
    const isDisabled = admin.isDisabled ? false : true;
    this._adminsService.isDisabled(isDisabled,admin._id!)
    .then((message)=>{
      this._alertsService.success(message,
      {
        autoClose: true,
        keepAfterRouteChange: true,
      });
      // this._router.navigate(["/administrateurs"])
    })
    .catch((error)=>{console.log(error)})
  }

  //Réinitialiser le mot de passe d'un admin
  resetPassword(admin : Admin){
    this._adminsService.resetPassword(admin._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
    })
    .catch((error)=>{console.log(error)})
  }

}
