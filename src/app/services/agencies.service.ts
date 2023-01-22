import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agency } from '../models/agency';

@Injectable({
  providedIn: 'root'
})
export class AgenciesService {

  private api : string = environment.api;
  agencies! : Agency[]
  agencies$ = new BehaviorSubject<Agency[]>([])

  constructor(private _http: HttpClient) {
    this.getAll()
   }

    /**
     * Emettre
     */
    emit(){
      this.agencies$.next(this.agencies)
    }

    /**
     * Ajouter un objet
     * @param object
     * @returns
     */
    add(agency : Agency){
      return new Promise<string>((resolve, reject) => {
        this._http.post(this.api+'agency/create',agency).subscribe(
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
    modify(agency : Agency){
      return new Promise<string>((resolve, reject) => {
        this._http.put(this.api+'agency/modify/'+agency._id,agency).subscribe(
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
      this._http.get(this.api+'agency/getAll/').subscribe(
        (agencies : any)=>{
          this.agencies = agencies
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
        this._http.delete(this.api+'agency/delete/'+id).subscribe(
          (res : any)=>{
            this.getAll()
            resolve(res.message)
          },
          (error)=>{
            reject(error.error)
          })
      })
    }

}
