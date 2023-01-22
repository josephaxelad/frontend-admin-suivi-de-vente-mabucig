import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.scss']
})
export class NewCityComponent implements OnInit {

  addCityForm!: FormGroup;
  errorMessage!: string;
  submitted: boolean = false;

  constructor(private _alertsService : AlertsService,private _router: Router,private _fb: FormBuilder,private _citiesService : CitiesService) { }

  ngOnInit(): void {
    //Initialiser le formulaire login
    this.addCityForm = this._fb.group({
      name : this._fb.control('',Validators.required),
    });
  }

  add(){
    this.submitted = true;

    if (this.addCityForm.valid) {

      const name  = this.addCityForm.get('name')?.value ;

      const city = {
        name : name,
      }

      this._citiesService.add(city)
      .then((message)=>{
        this.submitted = false;
        this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        })
        this.addCityForm.reset()
        // this._router.navigate(["/parametres/villes"])
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
