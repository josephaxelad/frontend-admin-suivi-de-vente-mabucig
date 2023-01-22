import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/models/agency';
import { City } from 'src/app/models/city';
import { Group } from 'src/app/models/group';
import { Wholesaler } from 'src/app/models/wholesaler';
import { AgenciesService } from 'src/app/services/agencies.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { CitiesService } from 'src/app/services/cities.service';
import { GroupsService } from 'src/app/services/groups.service';
import { WholesalersService } from 'src/app/services/wholesalers.service';
declare var $ :any;

@Component({
  selector: 'app-edit-wholesaler',
  templateUrl: './edit-wholesaler.component.html',
  styleUrls: ['./edit-wholesaler.component.scss']
})
export class EditWholesalerComponent implements OnInit {

  editWholesalerForm!: FormGroup;
  submitted: boolean = false;
  wholesaler! : Wholesaler;
  groups! : Group[];
  agencies! : Agency[];
  cities! : City[];

  idsMarket : string[] = [];

  constructor(private _route : ActivatedRoute,private _fb : FormBuilder,private _alertsService : AlertsService,private _router: Router,
    private _wholesalersService : WholesalersService,private _groupsService : GroupsService,
    private _agenciesService : AgenciesService,private _citiesService : CitiesService) { }

  ngOnInit(): void {
    this.initJs()

    //Initialiser le formulaire
    this.editWholesalerForm = this._fb.group({
      idAccount : this._fb.control('',Validators.required),
      name : this._fb.control('',Validators.required),
      login : this._fb.control('',Validators.required),
      phone : this._fb.control('',Validators.required),
      company : this._fb.control('',Validators.required),
      idsMarket : this._fb.control('',Validators.required),
      idAgency : this._fb.control('',Validators.required),
      idGroup : this._fb.control('',Validators.required),
    });


    this._wholesalersService.wholesalers$.subscribe(
      (wholesalers)=>{
        const id = this._route.snapshot.params["id"];
        this.wholesaler = wholesalers?.find( wholesaler => wholesaler._id == id )!
        this.idsMarket = this.wholesaler?.markets?.map(market=>market._id) as string[]

        this.editWholesalerForm.get('idAccount')?.setValue(this.wholesaler?.idAccount);
        this.editWholesalerForm.get('name')?.setValue(this.wholesaler?.name);
        this.editWholesalerForm.get('login')?.setValue(this.wholesaler?.login);
        this.editWholesalerForm.get('phone')?.setValue(this.wholesaler?.phone);
        this.editWholesalerForm.get('company')?.setValue(this.wholesaler?.company);
        this.editWholesalerForm.get('idsMarket')?.setValue(this.idsMarket);
        this.editWholesalerForm.get('idAgency')?.setValue(this.wholesaler?.agency?._id);
        this.editWholesalerForm.get('idGroup')?.setValue(this.wholesaler?.group?._id ? this.wholesaler?.group?._id : '0' );

        console.log(this.idsMarket)
        setTimeout(() => {
          $('#multiple-states-wholesalers-markets-edit').val(this.idsMarket).trigger('change');
        }, 1);

      }
    )

    //Récupérer les Groupe d'entreprises
    this._groupsService.groups$.subscribe(
      ((groups)=>{
        this.groups = groups;
      })
    )

    //Récupérer les agences de distribution
    this._agenciesService.agencies$.subscribe(
      ((agencies)=>{
        this.agencies = agencies;
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
    console.log(this.idsMarket.length)
    if(this.editWholesalerForm.valid){

      const idAccount = this.editWholesalerForm.get('idAccount')?.value;
      const name = this.editWholesalerForm.get('name')?.value;
      const login = this.editWholesalerForm.get('login')?.value;
      const phone = this.editWholesalerForm.get('phone')?.value;
      const company = this.editWholesalerForm.get('company')?.value;
      const idsMarket = this.editWholesalerForm.get('idsMarket')?.value;
      const idAgency = this.editWholesalerForm.get('idAgency')?.value;
      const idGroup = this.editWholesalerForm.get('idGroup')?.value;


      const wholesaler = {
        _id : this.wholesaler._id,
        idAccount : idAccount,
        name : name,
        login : login,
        phone : phone,
        company : company,
        idsMarket : idsMarket,
        idAgency : idAgency,
        idGroup : idGroup !='0' ? idGroup : undefined ,
      }


      this._wholesalersService.modify(wholesaler)
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

  initJs(){
    $('#multiple-states-wholesalers-markets-edit').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:select',  (e: any) => {
      var x = e.params.data.id;
      this.idsMarket.push(x)
      this.editWholesalerForm.controls['idsMarket'].setValue(this.idsMarket);
      });
    $('#multiple-states-wholesalers-markets-edit').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:unselect',  (e: any) => {
      var x = e.params.data.id;
      this.idsMarket = this.idsMarket.filter(market => market != x)
      this.editWholesalerForm.controls['idsMarket'].setValue(this.idsMarket);
      });
  }

}
