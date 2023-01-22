import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminsService } from 'src/app/services/admins.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {

  adminForm!: FormGroup;
  errorMessage!: string;
  submitted: boolean = false;

  constructor(private _alertsService : AlertsService,private _router: Router,private _fb: FormBuilder,private _adminsService : AdminsService) { }

  ngOnInit(): void {
    //Initialiser le formulaire login
    this.adminForm = this._fb.group({
      firstname : this._fb.control('',Validators.required),
      lastname : this._fb.control('',Validators.required),
      login : this._fb.control('',Validators.required),
      password : this._fb.control('admin',Validators.required),
      role : this._fb.control('admin',Validators.required),
    });
  }

  add(){

    this.submitted = true;

    if (this.adminForm.valid) {

      const firstname  = this.adminForm.get('firstname')?.value ;
      const lastname  = this.adminForm.get('lastname')?.value ;
      const login  = this.adminForm.get('login')?.value ;
      const password  = this.adminForm.get('password')?.value ;
      const role  = this.adminForm.get('role')?.value ;

      const admin = {
        firstname : firstname,
        lastname : lastname,
        login : login,
        password : password,
        role : role,
        isDisabled : false
      }

      this._adminsService.add(admin)
      .then((message)=>{
        this.submitted = false;
        this.adminForm.reset()
        this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: false,
        })
        // this._router.navigate(["/administrateurs"])
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
