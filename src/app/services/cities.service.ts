import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private api : string = environment.api;
  cities!: City[];
  cities$ = new BehaviorSubject<City[]>([]);

  constructor(private _http: HttpClient) {
    this.getAll()
   }

  /**
 * Ajouter un objet
 * @param object
 * @returns
 */
    add(city : City){
    return new Promise<string>((resolve, reject) => {
      this._http.post(this.api+'city/create',city).subscribe(
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
  modify(city : City){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'city/modify/'+city._id,city).subscribe(
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
    this._http.get(this.api+'city/getAll/').subscribe(
      (cities : any)=>{
        this.cities = cities.sort((a : any,b : any)=> a.name! > b.name! ? 1 : -1);
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
      this._http.delete(this.api+'city/delete/'+id).subscribe(
        (res  : any)=>{
          this.getAll()
          resolve(res.message)
        },
        (error)=>{
          reject(error.error)
        })
    })
  }

  emit(){
    this.cities$.next(this.cities)
  }


}
