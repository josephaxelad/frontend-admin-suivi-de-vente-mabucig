import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Wholesaler } from '../models/wholesaler';

@Injectable({
  providedIn: 'root'
})
export class WholesalersService {

  private api : string = environment.api;
  wholesalers!: Wholesaler[];
  wholesalers$ = new BehaviorSubject<Wholesaler[]>([]);

  constructor(private _http: HttpClient) {
    this.getAll()
   }

  /**
   * Emettre
  */
  emit(){
    this.wholesalers$.next(this.wholesalers)
  }

  /**
   * Ajouter un objet
   * @param object
   * @returns
   */
  add(wholesaler : Wholesaler){
    return new Promise<string>((resolve, reject) => {
      this._http.post(this.api+'wholesaler/create',wholesaler).subscribe(
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
  modify(wholesaler : Wholesaler){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'wholesaler/modify/'+wholesaler._id,wholesaler).subscribe(
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
    this._http.get(this.api+'wholesaler/getAll/').subscribe(
      (wholesalers : any)=>{
        this.wholesalers = wholesalers
        this.emit()
      },
      (error : any)=>{

      }
    )
  }

  /**
   * Supprimer définitivement
   * @param id
   * @returns
   */
  deleteHard(id : string){
    return new Promise<string>((resolve, reject) => {
      this._http.delete(this.api+'wholesaler/delete/'+id).subscribe(
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
   * Activer / Désactiver un object
   * @param isDisabled
   * @param id
   * @returns
   */
   isDisabled(isDisabled : boolean,id : string){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'wholesaler/isDisabled/'+id,{isDisabled : isDisabled}).subscribe(
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
   * Réinitialiser le mot de passe
   * @param id
   * @returns
   */
   resetPassword(id : string){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'wholesaler/resetPassword/'+id,{}).subscribe(
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

}
