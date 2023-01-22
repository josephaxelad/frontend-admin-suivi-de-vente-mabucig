import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api : string = environment.api;
  isAuth = false;
  isAuth$ = new BehaviorSubject<boolean>(false);
  token$ = new BehaviorSubject<string>('');
  // isReSignIn$ = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('resignin')!) ? JSON.parse(localStorage.getItem('resignin')!)  : false);
  token?: string;
  adminId!: string;
  currentAdmin$ = new BehaviorSubject<Admin|undefined>(undefined);

  constructor(private _http: HttpClient,private _router : Router) {  }

  /**
   * Se connecter
   * @param login
   * @param password
   * @returns
   */
  login(login : string,password: string) {
    return new Promise<void>((resolve, reject) => {
      this._http.post(this.api+'admin/login', {login : login , password : password})
      .subscribe(
        (authData : any)=>{
          this.token = authData.token;
          this.adminId = authData.id;
          if (typeof(localStorage) !== "undefined") {
            localStorage.setItem('token', JSON.stringify(this.token));
          }
          this.isAuth$.next(true);
          this.getCurrentAdmin()
          resolve();
        },
        (error : any) => {
          console.log(error)
          reject(error.error);
        },

      );
    });
  }

  /**
   * Déconnexion
   */
  logout(){
    this.isAuth$.next(false);
    this.token = "";
    this.currentAdmin$.next(undefined)
    if (typeof(localStorage) !== "undefined") {
      localStorage.removeItem('token');
    }
    this._router.navigate(['/login']);
  }

  /**
   * Obtenir l'admin actuellement connecté
   */
  getCurrentAdmin(){
    return new Promise<void>((resolve, reject) => {
      this._http.get(this.api+'admin/getMe/').subscribe(
        (admin : any)=>{
          resolve(admin)
          this.currentAdmin$.next(admin)
        },
        (error)=>{
          console.log(error)
          reject(error)
          this.currentAdmin$.next(undefined)
        }
      )
    })
  }

  isSignedIn(){
    this._http.get(this.api+'admin/isSignedIn/').subscribe(
      (res : any)=>{
        this.isAuth$.next(true);
        this.token$.next(res.token);
        this.getCurrentAdmin()
      },
      (error)=>{this.logout()}
    )
  }





}
