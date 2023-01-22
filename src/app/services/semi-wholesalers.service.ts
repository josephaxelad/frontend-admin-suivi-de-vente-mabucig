import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SemiWholesaler } from '../models/semi-wholesaler';

@Injectable({
  providedIn: 'root'
})
export class SemiWholesalersService {

  private api : string = environment.api;
  semiWholesalers!: SemiWholesaler[];
  semiWholesalers$ = new BehaviorSubject<SemiWholesaler[]>([]);

  constructor(private _http: HttpClient) {
    this.getAll()
   }

  /**
   * Emettre
   */
  emit(){
    this.semiWholesalers$.next(this.semiWholesalers)
  }

  /**
   * Ajouter un objet
   * @param object
   * @returns
   */
  add(semiWholesaler : SemiWholesaler){
    return new Promise<string>((resolve, reject) => {
      this._http.post(this.api+'semi-wholesaler/create',semiWholesaler).subscribe(
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
  modify(semiWholesaler : SemiWholesaler){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'semi-wholesaler/modify/'+semiWholesaler._id,semiWholesaler).subscribe(
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
    this._http.get(this.api+'semi-wholesaler/getAll/').subscribe(
      (semiWholesalers : any)=>{
        this.semiWholesalers = semiWholesalers
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
      this._http.delete(this.api+'semi-wholesaler/delete/'+id).subscribe(
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
      this._http.put(this.api+'semi-wholesaler/isDisabled/'+id,{isDisabled : isDisabled}).subscribe(
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
