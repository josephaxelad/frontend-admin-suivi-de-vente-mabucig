import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logo : string = environment.logo1;
  loginForm!: FormGroup;
  errorMessage!: string;
  submitted: boolean = false;
  isVisible: boolean = false;


  constructor(private _authService : AuthService,private _alertsService : AlertsService,private _router: Router,private _fb: FormBuilder) { }

  ngOnInit(): void {
    //Initialiser le formulaire login
    this.loginForm = this._fb.group({
      login : this._fb.control('',Validators.required),
      password : this._fb.control('',Validators.required),
    });
  }

  login(){

    this.submitted = true;

    if(this.loginForm.valid){
      const login = this.loginForm.get('login')?.value ;
      const password = this.loginForm.get('password')?.value;

      this._authService.login(login,password)
      .then(()=>{
        this.submitted = false;
        this._alertsService.success("Vous êtes connectés !",
        {
          autoClose: true,
          keepAfterRouteChange: false,
        })
        this._router.navigate(['/accueil']);
      })
      .catch((error)=>{

        this.errorMessage = error.message;
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      })
    }

  }

  togglePasswordVisibility(){
    this.isVisible ? this.isVisible=false : this.isVisible=true
  }

}
