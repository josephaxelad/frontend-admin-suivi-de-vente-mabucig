import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-new-wholesaler',
  templateUrl: './new-wholesaler.component.html',
  styleUrls: ['./new-wholesaler.component.scss']
})
export class NewWholesalerComponent implements OnInit {

  addWholesalerForm!: FormGroup;
  errorMessage!: string;
  submitted: boolean = false;
  wholesalers! : Wholesaler[];
  groups! : Group[];
  agencies! : Agency[];
  cities! : City[];

  idsMarket : string[] = [];

  constructor(private _alertsService : AlertsService,private _router: Router,private _fb: FormBuilder,
    private _wholesalersService : WholesalersService,private _groupsService : GroupsService,
    private _agenciesService : AgenciesService,private _citiesService : CitiesService) { }

  ngOnInit(): void {

    // this.loadScript('assets/js/custom.js');

    //Initialiser le formulaire
    this.addWholesalerForm = this._fb.group({
      idAccount : this._fb.control('',Validators.required),
      name : this._fb.control('',Validators.required),
      login : this._fb.control('',Validators.required),
      password : this._fb.control('',Validators.required),
      phone : this._fb.control('',Validators.required),
      company : this._fb.control('',Validators.required),
      idsMarket : this._fb.control('',Validators.required),
      idAgency : this._fb.control('',Validators.required),
      idGroup : this._fb.control('',Validators.required),
    });

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

    this.initJs()
  }

  add(){
    this.submitted = true;

    if (this.addWholesalerForm.valid ) {

      const idAccount  = this.addWholesalerForm.get('idAccount')?.value ;
      const name  = this.addWholesalerForm.get('name')?.value ;
      const login  = this.addWholesalerForm.get('login')?.value ;
      const password  = this.addWholesalerForm.get('password')?.value ;
      const phone  = this.addWholesalerForm.get('phone')?.value ;
      const company  = this.addWholesalerForm.get('company')?.value ;
      const idsMarket  = this.addWholesalerForm.get('idsMarket')?.value ;
      const idAgency  = this.addWholesalerForm.get('idAgency')?.value ;
      const idGroup  = this.addWholesalerForm.get('idGroup')?.value ;

      const wholesaler = {
        idAccount : idAccount,
        name : name,
        login : login,
        password : password,
        phone : phone,
        company : company,
        idsMarket : idsMarket,
        idAgency : idAgency,
        idGroup : idGroup !='0' ? idGroup : undefined,
      }

      this._wholesalersService.add(wholesaler)
      .then((message)=>{
        this.submitted = false;
        this.addWholesalerForm.reset();
        this.idsMarket = []
        this.addWholesalerForm.controls['idsMarket'].setValue(this.idsMarket);
        $('#multiple-states-wholesalers-markets').val([]).trigger('change');
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

  loadScript(url: string) {
    console.log("a")
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  initJs(){
    $('#multiple-states-wholesalers-markets').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:select',  (e: any) => {
      var x = e.params.data.id;
      this.idsMarket.push(x)
      this.addWholesalerForm.controls['idsMarket'].setValue(this.idsMarket);
      });
    $('#multiple-states-wholesalers-markets').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:unselect',  (e: any) => {
      var x = e.params.data.id;
      this.idsMarket = this.idsMarket.filter(market => market != x)
      this.addWholesalerForm.controls['idsMarket'].setValue(this.idsMarket);
      });
  }
}
