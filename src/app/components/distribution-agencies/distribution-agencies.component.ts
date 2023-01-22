import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from 'src/app/models/agency';
import { AgenciesService } from 'src/app/services/agencies.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-distribution-agencies',
  templateUrl: './distribution-agencies.component.html',
  styleUrls: ['./distribution-agencies.component.scss']
})
export class DistributionAgenciesComponent implements OnInit {

  agencies! : Agency[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _agenciesService : AgenciesService) { }

  ngOnInit(): void {
    //Récuperer les agences de livraison
    this._agenciesService.agencies$.subscribe(
      (agencies)=>{
        this.agencies = agencies;
      }
    )
  }

  //Supprimer définitivement une ville
  deleteHard(agency : Agency){
    this._agenciesService.deleteHard(agency._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      this._router.navigate(["/parametres/agences-de-distribution"])
    })
    .catch((error)=>{

     })

  }

}
