import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { SemiWholesaler } from 'src/app/models/semi-wholesaler';
import { Wholesaler } from 'src/app/models/wholesaler';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { SemiWholesalersService } from 'src/app/services/semi-wholesalers.service';
import { WholesalersService } from 'src/app/services/wholesalers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products!: Product[] ;
  semiWholesalers!: SemiWholesaler[];
  wholesalers!: Wholesaler[];
  orders!: Order[];


  constructor(private _productsService : ProductsService,
    private _semiWholesalersService : SemiWholesalersService,
    private _wholesalersService : WholesalersService,
    private _ordersService : OrdersService,
    ) {
      this._ordersService.getAll()
      this._productsService.getAll()
      this._semiWholesalersService.getAll()
      this._wholesalersService.getAll()
     }

  ngOnInit(): void {
    /**Récuperer les produits */
    this._productsService.products$.subscribe(
      (products : Product[])=>{
        this.products = products
      }
    )

    /**Récuperer les produits */
    this._semiWholesalersService.semiWholesalers$.subscribe(
      (semiWholesalers : SemiWholesaler[])=>{
        this.semiWholesalers = semiWholesalers
      }
    )

    /**Récuperer les produits */
    this._wholesalersService.wholesalers$.subscribe(
      (wholesalers : Wholesaler[])=>{
        this.wholesalers = wholesalers
      }
    )

    /**Récuperer les produits */
    this._ordersService.orders$.subscribe(
      (orders : Order[])=>{
        this.orders = orders
      }
    )

  }

}
