import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { AlertsService } from 'src/app/services/alerts.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  addGroupForm!: FormGroup;
  errorMessage!: string;
  submitted: boolean = false;
  groups! : Group[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _fb: FormBuilder,private _groupsService : GroupsService) { }

  ngOnInit(): void {
    //Initialiser le formulaire
    this.addGroupForm = this._fb.group({
      name : this._fb.control('',Validators.required),
    });
  }

  add(){
    this.submitted = true;

    if (this.addGroupForm.valid) {

      const name  = this.addGroupForm.get('name')?.value ;

      const group = {
        name : name
      }

      this._groupsService.add(group)
      .then((message)=>{
        this.submitted = false;
        this.addGroupForm.reset()
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
