import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { AgenciesService } from 'src/app/services/agencies.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-new-distribution-agency',
  templateUrl: './new-distribution-agency.component.html',
  styleUrls: ['./new-distribution-agency.component.scss']
})
export class NewDistributionAgencyComponent implements OnInit {

  addAgencyForm!: FormGroup;
  errorMessage!: string;
  submitted: boolean = false;
  cities! : City[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _fb: FormBuilder,private _agenciesService : AgenciesService,private _citiessService : CitiesService) { }

  ngOnInit(): void {
    //Initialiser le formulaire agence de distribution
    this.addAgencyForm = this._fb.group({
      code : this._fb.control('',Validators.required),
      idCity : this._fb.control('',Validators.required),
    });

    //Récupérer les villes
    this._citiessService.cities$.subscribe(
      ((cities)=>{
        this.cities = cities;
      })
    )
  }

  add(){
    this.submitted = true;

    if (this.addAgencyForm.valid) {

      const code  = this.addAgencyForm.get('code')?.value ;
      const idCity  = this.addAgencyForm.get('idCity')?.value ;

      const agency = {
        code : code,
        idCity : idCity
      }

      this._agenciesService.add(agency)
      .then((message)=>{
        this.submitted = false;
        this.addAgencyForm.reset()
        this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        })
        // this._router.navigate(["/parametres/agences-de-distribution"])
      })
      .catch((error)=>{
        this.submitted = false;
        this._alertsService.error(error.message,
          {
            autoClose: true,
            keepAfterRouteChange: false,
          })
      })

    }
  }

}
