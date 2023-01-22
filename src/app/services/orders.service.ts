import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private api : string = environment.api;
  orders!: Order[];
  orders$ = new BehaviorSubject<Order[]>([]);
  reports!: Order[];
  reports$ = new BehaviorSubject<Order[]>([]);

  constructor(private _http: HttpClient) {
    this.getAll()
    this.getAllReports()
   }

  /**
   * Emettre
   */
  emit(){
    this.orders$.next(this.orders)
  }

  /**
   * Emettre
   */
   emitReports(){
    this.reports$.next(this.reports)
  }

  /**
   * Ajouter un objet
   * @param object
   * @returns
   */
  add(order : Order){
    return new Promise<string>((resolve, reject) => {
      this._http.post(this.api+'order/create',order).subscribe(
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
  modify(order : Order){
    return new Promise<string>((resolve, reject) => {
      this._http.put(this.api+'order/modify/'+order._id,order).subscribe(
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
    this._http.get(this.api+'order/getAll/').subscribe(
      (orders : any)=>{
        this.orders = orders
        this.emit()
      },
      (error : any)=>{

      }
    )
  }

  /**
   * Récuperer des objets
   */
   getAllReports(){
    this._http.get(this.api+'order/getAllReports/').subscribe(
      (reports : any)=>{
        this.reports = reports
        this.emitReports()
      },
      (error : any)=>{

      }
    )
  }

  /**
   * Récuperer des objets
   */
   filter(data : any){
    return new Promise<void>((resolve, reject) => {
      this._http.post(this.api+'order/filter/',data).subscribe(
        (orders : any)=>{
          resolve(orders)
          // this.orders = orders
          // this.emit()
        },
        (error : any)=>{
          reject(error.error)
        }
      )
    })

  }

  /**
   * Récuperer des objets
   */
   filterReports(data : any){
    return new Promise<void>((resolve, reject) => {
      this._http.post(this.api+'order/filterReports/',data).subscribe(
        (reports : any)=>{
          resolve(reports)
          // this.orders = orders
          // this.emit()
        },
        (error : any)=>{
          reject(error.error)
        }
      )
    })

  }

  /**
   * Récuperer des objets
   */
   sortBy(key: any,value: any){
    return new Promise<void>((resolve, reject) => {
      this._http.get(this.api+'order/sortBy/'+key+'/'+value).subscribe(
        (orders : any)=>{
          console.log(orders)
          resolve(orders)
          // this.orders = orders
          // this.emit()
        },
        (error : any)=>{
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
  deleteHard(id : string){
    return new Promise<string>((resolve, reject) => {
      this._http.delete(this.api+'order/deleteHard/'+id).subscribe(
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
