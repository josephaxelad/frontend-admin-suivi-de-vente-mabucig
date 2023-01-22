import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { AlertsService } from 'src/app/services/alerts.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  cities! : City[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _citiesService : CitiesService) { }

  ngOnInit(): void {
    this._citiesService.cities$.subscribe(
      (cities)=>{
        this.cities = cities
      }
    )
  }

  //Supprimer définitivement une ville
  deleteHard(city : City){
    this._citiesService.deleteHard(city._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      this._router.navigate(["/parametres/villes"])
    })
    .catch((error)=>{

     })

  }

}
