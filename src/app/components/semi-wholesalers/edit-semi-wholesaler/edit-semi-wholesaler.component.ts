import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { SemiWholesaler } from 'src/app/models/semi-wholesaler';
import { Wholesaler } from 'src/app/models/wholesaler';
import { AlertsService } from 'src/app/services/alerts.service';
import { CitiesService } from 'src/app/services/cities.service';
import { SemiWholesalersService } from 'src/app/services/semi-wholesalers.service';
import { WholesalersService } from 'src/app/services/wholesalers.service';

@Component({
  selector: 'app-edit-semi-wholesaler',
  templateUrl: './edit-semi-wholesaler.component.html',
  styleUrls: ['./edit-semi-wholesaler.component.scss']
})
export class EditSemiWholesalerComponent implements OnInit {

  editSemiWholesalerForm!: FormGroup;
  submitted: boolean = false;
  semiWholesaler! : SemiWholesaler;
  wholesalers! : Wholesaler[]
  cities! : City[]

  constructor(private _route : ActivatedRoute,private _fb : FormBuilder,private _alertsService : AlertsService,private _router: Router,
    private _semiWholesalersService : SemiWholesalersService,private _wholesalersService : WholesalersService,
    private _citiesService : CitiesService) { }

  ngOnInit(): void {
    //Initialiser le formulaire
    this.editSemiWholesalerForm = this._fb.group({
      idWholesaler : this._fb.control('',Validators.required),
      idAccount : this._fb.control('',Validators.required),
      name : this._fb.control('',Validators.required),
      phone1 : this._fb.control('',Validators.required),
      phone2 : this._fb.control(''),

      address : this._fb.control('',Validators.required),
      neighborhood : this._fb.control('',Validators.required),
      idCity : this._fb.control('',Validators.required),
    });


    this._semiWholesalersService.semiWholesalers$.subscribe(
      (semiWholesalers)=>{
        const id = this._route.snapshot.params["id"];
        this.semiWholesaler = semiWholesalers?.find( semiWholesaler => semiWholesaler._id == id )!

        this.editSemiWholesalerForm.get('idWholesaler')?.setValue(this.semiWholesaler?.wholesaler?._id);
        this.editSemiWholesalerForm.get('idAccount')?.setValue(this.semiWholesaler?.idAccount);
        this.editSemiWholesalerForm.get('name')?.setValue(this.semiWholesaler?.name);
        this.editSemiWholesalerForm.get('phone1')?.setValue(this.semiWholesaler?.phone1);
        this.editSemiWholesalerForm.get('phone2')?.setValue(this.semiWholesaler?.phone2);
        this.editSemiWholesalerForm.get('address')?.setValue(this.semiWholesaler?.address.name);
        this.editSemiWholesalerForm.get('neighborhood')?.setValue(this.semiWholesaler?.address?.neighborhood);
        this.editSemiWholesalerForm.get('idCity')?.setValue(this.semiWholesaler?.address?.city?._id);
      }
    )

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

  modify(){
    this.submitted = true;

    if(this.editSemiWholesalerForm.valid){

      const idAccount  = this.editSemiWholesalerForm.get('idAccount')?.value;
      const name  = this.editSemiWholesalerForm.get('name')?.value;
      const phone1  = this.editSemiWholesalerForm.get('phone1')?.value;
      const phone2  = this.editSemiWholesalerForm.get('phone2')?.value;
      const idWholesaler  = this.editSemiWholesalerForm.get('idWholesaler')?.value;
      const address  = this.editSemiWholesalerForm.get('address')?.value;
      const neighborhood  = this.editSemiWholesalerForm.get('neighborhood')?.value;
      const idCity  = this.editSemiWholesalerForm.get('idCity')?.value;

      const semiWholesaler = {
        _id : this.semiWholesaler._id,
        idWholesaler :idWholesaler ,
        idAccount :idAccount ,
        name :name ,
        phone1 :phone1 ,
        phone2 : phone2 ? phone2 : undefined,
        address : {
          name : address,
          neighborhood : neighborhood,
          idCity : idCity,
        }
      }

      console.log(semiWholesaler.phone2)

      this._semiWholesalersService.modify(semiWholesaler)
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
