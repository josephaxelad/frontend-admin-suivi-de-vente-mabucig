import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/models/agency';
import { City } from 'src/app/models/city';
import { AgenciesService } from 'src/app/services/agencies.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-edit-distribution-agency',
  templateUrl: './edit-distribution-agency.component.html',
  styleUrls: ['./edit-distribution-agency.component.scss']
})
export class EditDistributionAgencyComponent implements OnInit {

  editAgencyForm!: FormGroup;
  submitted: boolean = false;
  agency! : Agency;
  cities! : City[];

  constructor(private _route : ActivatedRoute,private _fb : FormBuilder,private _alertsService : AlertsService,private _router: Router,private _agenciesService : AgenciesService,private _citiesService : CitiesService) { }

  ngOnInit(): void {
    //Initialiser le formulaire agence de distribution
    this.editAgencyForm = this._fb.group({
      code : this._fb.control('',Validators.required),
      idCity : this._fb.control('',Validators.required),
    });

    this._citiesService.cities$.subscribe(
      (cities)=>{
        this.cities = cities
      }
    )

    this._agenciesService.agencies$.subscribe(
      (agencies)=>{
        const id = this._route.snapshot.params["id"];
        this.agency = agencies?.find( agency => agency._id == id )!

        this.editAgencyForm.get('code')?.setValue(this.agency?.code);
        this.editAgencyForm.get('idCity')?.setValue(this.agency?.city?._id);
      }
    )
  }

  modify(){
    this.submitted = true;

    if(this.editAgencyForm.valid){

      const code = this.editAgencyForm.get('code')?.value;
      const idCity = this.editAgencyForm.get('idCity')?.value;


      const agency = {
        _id : this.agency._id,
        code : code,
        idCity : idCity,
      }


      this._agenciesService.modify(agency)
      .then((message)=>{
        this.submitted = false;
        this._alertsService.success(message,
          {
            autoClose: true,
            keepAfterRouteChange: true,
          })
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
