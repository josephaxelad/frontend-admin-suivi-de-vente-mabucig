import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wholesaler } from 'src/app/models/wholesaler';
import { AlertsService } from 'src/app/services/alerts.service';
import { WholesalersService } from 'src/app/services/wholesalers.service';

@Component({
  selector: 'app-wholesalers',
  templateUrl: './wholesalers.component.html',
  styleUrls: ['./wholesalers.component.scss']
})
export class WholesalersComponent implements OnInit {

  wholesalers! : Wholesaler[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _wholesalersService : WholesalersService) { }

  ngOnInit(): void {
    this._wholesalersService.wholesalers$.subscribe(
      (wholesalers)=>{
        this.wholesalers = wholesalers
      }
    )
  }

  //Supprimer définitivement
  deleteHard(wholesaler : Wholesaler){
    this._wholesalersService.deleteHard(wholesaler._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      this._router.navigate(["/grossistes"])
    })
    .catch((error)=>{

     })

  }

  //Réinitialiser le mot de passe du grossiste
  resetPassword(wholesaler : Wholesaler){
    this._wholesalersService.resetPassword(wholesaler._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: false,
          keepAfterRouteChange: true,
        });
    })
    .catch((error)=>{console.log(error)})
  }

}
