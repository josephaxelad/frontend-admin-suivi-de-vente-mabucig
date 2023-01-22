import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { SemiWholesaler } from 'src/app/models/semi-wholesaler';
import { Wholesaler } from 'src/app/models/wholesaler';
import { AlertsService } from 'src/app/services/alerts.service';
import { CitiesService } from 'src/app/services/cities.service';
import { SemiWholesalersService } from 'src/app/services/semi-wholesalers.service';
import { WholesalersService } from 'src/app/services/wholesalers.service';

@Component({
  selector: 'app-new-semi-wholesaler',
  templateUrl: './new-semi-wholesaler.component.html',
  styleUrls: ['./new-semi-wholesaler.component.scss']
})
export class NewSemiWholesalerComponent implements OnInit {

  addSemiWholesalerForm!: FormGroup;
  errorMessage!: string;
  submitted: boolean = false;
  semiWholesalers! : SemiWholesaler[];
  wholesalers! : Wholesaler[]
  cities! : City[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _fb: FormBuilder,
    private _semiWholesalersService : SemiWholesalersService,private _wholesalersService : WholesalersService,
    private _citiesService : CitiesService) { }

  ngOnInit(): void {
    //Initialiser le formulaire
    this.addSemiWholesalerForm = this._fb.group({
      idWholesaler : this._fb.control('',Validators.required),
      idAccount : this._fb.control('',Validators.required),
      name : this._fb.control('',Validators.required),
      phone1 : this._fb.control('',Validators.required),
      phone2 : this._fb.control(''),

      address : this._fb.control('',Validators.required),
      idCity : this._fb.control('',Validators.required),
      neighborhood : this._fb.control('',Validators.required),
    });

    //Récupérer les grossistes
    this._wholesalersService.wholesalers$.subscribe(
      ((wholesalers)=>{
        this.wholesalers = wholesalers;
      })
    )

    //Récupérer les villes
    this._citiesService.cities$.subscribe(
      ((cities)=>{
        this.cities = cities;
      })
    )
  }

  add(){
    this.submitted = true;

    if (this.addSemiWholesalerForm.valid) {

      const idWholesaler  = this.addSemiWholesalerForm.get('idWholesaler')?.value ;
      const idAccount  = this.addSemiWholesalerForm.get('idAccount')?.value ;
      const name  = this.addSemiWholesalerForm.get('name')?.value ;
      const phone1  = this.addSemiWholesalerForm.get('phone1')?.value ;
      const phone2  = this.addSemiWholesalerForm.get('phone2')?.value ;
      const address  = this.addSemiWholesalerForm.get('address')?.value ;
      const neighborhood  = this.addSemiWholesalerForm.get('neighborhood')?.value ;
      const idCity  = this.addSemiWholesalerForm.get('idCity')?.value ;

      const semiWholesaler = {
        idWholesaler : idWholesaler,
        idAccount : idAccount,
        name : name,
        phone1 : phone1,
        phone2 : phone2 ? phone2 : undefined,
        address : {
          name : address,
          neighborhood : neighborhood,
          idCity : idCity,
        }

      }

      this._semiWholesalersService.add(semiWholesaler)
      .then((message)=>{
        this.submitted = false;
        this.addSemiWholesalerForm.reset()
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
