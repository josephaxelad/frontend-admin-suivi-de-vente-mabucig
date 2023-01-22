import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminsService } from 'src/app/services/admins.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user-admin',
  templateUrl: './edit-user-admin.component.html',
  styleUrls: ['./edit-user-admin.component.scss']
})
export class EditUserAdminComponent implements OnInit {

  currentAdmin! : Admin;
  editAdminUserForm!: FormGroup;
  submitted: boolean = false;

  constructor(private _fb : FormBuilder,private _alertsService : AlertsService,private _router: Router,private _adminsService : AdminsService,private _authService : AuthService) { }

  ngOnInit(): void {

    //Initialiser le formulaire
    this.editAdminUserForm = this._fb.group({
      lastname : this._fb.control('',Validators.required),
      firstname : this._fb.control('',Validators.required),
      login : this._fb.control('',Validators.required),
    })

    //Récuperer l'admin connecté
    this._authService.currentAdmin$.subscribe(
      (admin)=>{
        if (admin) {
          this.currentAdmin=admin
          this.editAdminUserForm.get('lastname')?.setValue(admin?.lastname);
          this.editAdminUserForm.get('firstname')?.setValue(admin?.firstname);
          this.editAdminUserForm.get('login')?.setValue(admin?.login);
        }
      }
    )
  }

  modifyUser(){
    this.submitted = true;

    if(this.editAdminUserForm.valid){

      const lastname = this.editAdminUserForm.get('lastname')?.value;
      const firstname = this.editAdminUserForm.get('firstname')?.value;
      const login = this.editAdminUserForm.get('login')?.value;


      const admin = {
        lastname : lastname,
        firstname : firstname,
        login : login
      }


      this._adminsService.modifyUser(admin)
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
