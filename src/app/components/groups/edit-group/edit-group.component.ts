import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { AlertsService } from 'src/app/services/alerts.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {

  editGroupForm!: FormGroup;
  submitted: boolean = false;
  group! : Group;

  constructor(private _route : ActivatedRoute,private _fb : FormBuilder,private _alertsService : AlertsService,private _router: Router,private _groupsService : GroupsService) { }

  ngOnInit(): void {
    //Initialiser le formulaire
    this.editGroupForm = this._fb.group({
      name : this._fb.control('',Validators.required),
    })

    this._groupsService.groups$.subscribe(
      (groups)=>{
        const id = this._route.snapshot.params["id"];
        this.group = groups?.find( group => group._id == id )!

        this.editGroupForm.get('name')?.setValue(this.group?.name);
      }
    )
  }

  modify(){
    this.submitted = true;

    if(this.editGroupForm.valid){

      const name = this.editGroupForm.get('name')?.value;


      const group = {
        _id : this.group._id,
        name : name
      }


      this._groupsService.modify(group)
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
