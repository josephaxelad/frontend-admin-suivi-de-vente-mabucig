import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminsService } from 'src/app/services/admins.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-edit-password-admin',
  templateUrl: './edit-password-admin.component.html',
  styleUrls: ['./edit-password-admin.component.scss']
})
export class EditPasswordAdminComponent implements OnInit {

  editAdminPasswordForm!: FormGroup;
  submitted: boolean = false;

  constructor(private _fb : FormBuilder,private _alertsService : AlertsService,private _router: Router,private _adminsService : AdminsService) { }

  ngOnInit(): void {

    //
    this.editAdminPasswordForm = this._fb.group({
      oldPassword : this._fb.control('',Validators.required),
      newPassword : this._fb.control('',Validators.required),
      reNewPassword : this._fb.control('',Validators.required),
    },{
      validator: MustMatch('newPassword', 'reNewPassword')
    })
  }

  modifyPassword(){

    this.submitted = true;

    if(this.editAdminPasswordForm.valid){
      const oldPassword = this.editAdminPasswordForm.get('oldPassword')?.value;
      const newPassword = this.editAdminPasswordForm.get('newPassword')?.value;

      this._adminsService.modifyPassword(oldPassword,newPassword)
      .then((message)=>{
        this.submitted = false;
        this.editAdminPasswordForm.reset()
        this._alertsService.success(message,
          {
            autoClose: true,
            keepAfterRouteChange: false,
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

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
