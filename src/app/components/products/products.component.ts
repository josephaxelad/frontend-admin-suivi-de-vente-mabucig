import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products! : Product[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _productsService : ProductsService) { }

  ngOnInit(): void {
    this._productsService.products$.subscribe(
      (products)=>{
        this.products = products
      }
    )
  }

  //Supprimer définitivement
  deleteHard(product : Product){
    this._productsService.deleteHard(product._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      this._router.navigate(["/produits"])
    })
    .catch((error)=>{

     })

  }

}
