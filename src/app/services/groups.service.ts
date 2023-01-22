import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private api : string = environment.api;
  groups!: Group[];
  groups$ = new BehaviorSubject<Group[]>([]);

  constructor(private _http: HttpClient) {
    this.getAll()
  }

  /**
   * Emettre
   */
  emit(){
    this.groups$.next(this.groups)
  }

  /**
   * Ajouter un objet
   * @param object
   * @returns
   */
  add(group : Group){
    return new Promise<string>((resolve, reject) => {
      this._http.post(this.api+'group/create',group).subscribe(
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
  modify(group : Group){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'group/modify/'+group._id,group).subscribe(
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
    this._http.get(this.api+'group/getAll/').subscribe(
      (groups : any)=>{
        this.groups = groups
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
      this._http.delete(this.api+'group/delete/'+id).subscribe(
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
