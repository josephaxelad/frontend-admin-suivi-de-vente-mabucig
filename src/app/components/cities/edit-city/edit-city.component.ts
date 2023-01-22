import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { AlertsService } from 'src/app/services/alerts.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {

  editCityForm!: FormGroup;
  submitted: boolean = false;
  city! : City;

  constructor(private _route : ActivatedRoute,private _fb : FormBuilder,private _alertsService : AlertsService,private _router: Router,private _citiesService : CitiesService) { }

  ngOnInit(): void {
    //Initialiser le formulaire
    this.editCityForm = this._fb.group({
      name : this._fb.control('',Validators.required),
    })

    this._citiesService.cities$.subscribe(
      (cities)=>{
        const id = this._route.snapshot.params["id"];
        this.city = cities?.find( product => product._id == id )!

        this.editCityForm.get('name')?.setValue(this.city?.name);
      }
    )
  }

  modify(){
    this.submitted = true;

    if(this.editCityForm.valid){

      const name = this.editCityForm.get('name')?.value;


      const city = {
        _id : this.city._id,
        name : name,
      }


      this._citiesService.modify(city)
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
