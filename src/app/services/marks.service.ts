import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mark } from '../models/mark';

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  private api : string = environment.api;
  marks!: Mark[];
  marks$ = new BehaviorSubject<Mark[]>([]);

  constructor(private _http: HttpClient) {
    this.getAll()
   }

  /**
   * Emettre
   */
  emit(){
    this.marks$.next(this.marks)
  }

  /**
   * Ajouter un objet
   * @param object
   * @returns
   */
    add(mark : Mark){
    return new Promise<string>((resolve, reject) => {
      this._http.post(this.api+'mark/create',mark).subscribe(
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
  modify(mark : Mark){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'mark/modify/'+mark._id,mark).subscribe(
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
    this._http.get(this.api+'mark/getAll/').subscribe(
      (marks : any)=>{
        this.marks = marks
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
      this._http.delete(this.api+'mark/delete/'+id).subscribe(
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
