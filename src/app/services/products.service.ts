import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import QRCodeStyling, { FileExtension } from 'qr-code-styling';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private api : string = environment.api;
  products!: Product[];
  products$ = new BehaviorSubject<Product[]>([]);
  logo = environment.logo2
  extension : FileExtension = "png"

  constructor(private _http: HttpClient) {
    this.getAll()
   }

  /**
   * Emettre
   */
  emit(){
    this.products$.next(this.products)
  }

  /**
   * Ajouter un objet
   * @param object
   * @returns
   */
  add(product : Product,productImage?: File){
    return new Promise<string>((resolve, reject) => {
      const productData = new FormData();
      productData.append('product', JSON.stringify(product));
      if (productImage) {
        productData.append('image', productImage);
      }
      this._http.post(this.api+'product/create',productData).subscribe(
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
  modify(product : Product,productImage?: File){
    return new Promise<string>((resolve, reject) => {
      const productData = new FormData();
      productData.append('product', JSON.stringify(product));
      if (productImage) {
        productData.append('image', productImage);
      }
      this._http.put(this.api+'product/modify/'+product._id,productData).subscribe(
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
    this._http.get(this.api+'product/getAll/').subscribe(
      (products : any)=>{
        this.products =  products?.map((product : Product)=>(
          {codeQr : new QRCodeStyling({
            width: 200,
            height: 200,
            type: 'canvas',//svg //canvas
            data: product._id,
            image: this.logo,
            margin: 10,
            qrOptions: {
              typeNumber: 0,
              mode: 'Byte',
              errorCorrectionLevel: 'H'
            },
            imageOptions: {
              hideBackgroundDots: true,
              imageSize: 0.6,
              margin: 2,
              crossOrigin: 'anonymous',
            },
            dotsOptions: {
              color: '#800000',
              gradient: {
                type: 'linear', // 'radial'
                rotation: 1.4311699866353502,
                colorStops: [{ offset: 0, color: '#f50000' }, { offset: 1, color: '#610000' }]
              },
              type: 'rounded'
            },
            backgroundOptions: {
              color: '#e0e0e0',
              // gradient: {
              //   type: 'linear', // 'radial'
              //   rotation: 0,
              //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
              // },
            },
            cornersSquareOptions: {
              color: '#000000',
              type: 'extra-rounded',
              // gradient: {
              //   type: 'linear', // 'radial'
              //   rotation: 180,
              //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
              // },
            },
            cornersDotOptions: {
              color: '#000000',
              type: 'dot',
              // gradient: {
              //   type: 'linear', // 'radial'
              //   rotation: 180,
              //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
              // },
            }
          }
              ),
          ...product}
          ))
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
      this._http.delete(this.api+'product/delete/'+id).subscribe(
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
   * Télécharger le code qr d'un produit
   * @param product
   */
  downloadQrCode(product : Product): void {
    product.codeQr?.download({ extension: this.extension as FileExtension ,name : product.sku});
  }

}
