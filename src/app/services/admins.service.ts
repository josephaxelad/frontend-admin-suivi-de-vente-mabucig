import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private api : string = environment.api;
  admins!: Admin[];
  admins$ = new BehaviorSubject<Admin[]>([]);

  constructor(private _http: HttpClient,private _authService : AuthService) {
    this.getAll()
  }

  /**
   * Ajouter un objet
   * @param object
   * @returns
   */
  add(admin : Admin){
    return new Promise<string>((resolve, reject) => {
      this._http.post(this.api+'admin/create',admin).subscribe(
        (res : any)=>{
          this.getAll()
          resolve(res.message)
        },
        (error)=>{
          reject(error.error)
        }
      )
    })
  }

  /**
   * Modifier un objet
   * @param object
   * @returns
   */
  modifyUser(admin : Admin){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'admin/modifyUser/',{...admin}).subscribe(
        (res : any)=>{
          this.getAll()
          this._authService.getCurrentAdmin()
          resolve(res.message)
        },
        (error)=>{
          reject(error.error)
        }
      )
    })
  }

  /**
   * Modifier un objet
   * @param object
   * @returns
   */
  modifyPassword(oldPassword : string , newPassword : string){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'admin/modifyPassword/',{oldPassword : oldPassword, newPassword : newPassword}).subscribe(
        (res : any)=>{
          this.getAll()
          resolve(res.message)
        },
        (error)=>{
          reject(error.error)
        }
      )
    })
  }

  /**
   * Récuperer des objets
   */
  getAll(){
    this._http.get(this.api+'admin/getVeryAll/').subscribe(
      (admins : any)=>{
        this.admins=admins;
        this.emit()
      },
      (error)=>{

      }
    )
  }

  /**
   * Activer / Désactiver un object
   * @param isDisabled
   * @param id
   * @returns
   */
  isDisabled(isDisabled : boolean,id : string){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'admin/isDisabled/'+id,{isDisabled : isDisabled}).subscribe(
        (res : any)=>{
          this.getAll()
          resolve(res.message)
        },
        (error)=>{
          reject(error.error)
        }
      )
    })
  }

  /**
   * Supprimer définitivement
   * @param id
   * @returns
   */
  deleteHard(id : String){
    return new Promise<string>((resolve, reject) => {
      this._http.delete(this.api+'admin/deleteHard/'+id).subscribe(
        (res : any)=>{
          this.getAll()
          resolve(res.message)
        },
        (error)=>{
          reject(error.error)
        })
    })
  }

  /**
   * Réinitialiser le mot de passe
   * @param id
   * @returns
   */
  resetPassword(id : string){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'admin/resetPassword/'+id,{}).subscribe(
        (res : any)=>{
          this.getAll()
          resolve(res.message)
        },
        (error)=>{
          reject(error.error)
        }
      )
    })
  }

  /**
   * Emettre
   */
  emit(){
    this.admins$.next(this.admins)
  }
}
