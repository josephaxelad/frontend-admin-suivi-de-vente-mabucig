import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  prefUrlImage = `${environment.prefUrlImage}`;
  products!: Product[] ;
  // = [
  //   {name : 'name',sku : 'sku',price : 1000,numberByPack :250,mark : {name: 'brand name'}},
  //   {name : 'name',sku : 'sku',price : 1000,numberByPack :250,mark : {name: 'brand name'}},
  //   {name : 'name',sku : 'sku',price : 1000,numberByPack :250,mark : {name: 'brand name'}},
  //   {name : 'name',sku : 'sku',price : 1000,numberByPack :250,mark : {name: 'brand name'}},
  //   {name : 'name',sku : 'sku',price : 1000,numberByPack :250,mark : {name: 'brand name'}},
  //   {name : 'name',sku : 'sku',price : 1000,numberByPack :250,mark : {name: 'brand name'}},
  //   {name : 'name',sku : 'sku',price : 1000,numberByPack :250,mark : {name: 'brand name'}},
  // ];
  productsByPage: Product[] = [];
  numberOfElementToShow : number = 9;
  currentPage : number = 1;
  numberTotalOfpage : number = 0;
  pages : number[] = [];
  currentAdmin! : Admin;

  constructor(private _productsService : ProductsService,private _authService : AuthService) { }

  ngOnInit(): void {
    this.getProductsBypage(this.currentPage)

    //Récuperer l'admin connecté
    this._authService.currentAdmin$.subscribe(
      (admin)=>{
        if (admin) {
          this.currentAdmin=admin
        }
      }
    )
  }

  getProductsBypage(currentPage : number){
    this.currentPage = currentPage;
    /**Récuperer les produits */
    this._productsService.products$.subscribe(
      (products : Product[])=>{
        this.numberTotalOfpage = Math.ceil(products?.length/this.numberOfElementToShow)
        this.pages=[];
        for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
          this.pages.push(i)
        }
        this.products = products?.slice(this.numberOfElementToShow*(currentPage-1),this.numberOfElementToShow*currentPage)
      }
    )
  }

  search(input : any){
    if (input) {
      this.products.filter(product =>{
        product.sku
      })
    } else {
      this.getProductsBypage(this.currentPage)
    }
  }

  currencyFormat(num : number,div :any){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, div);
  }
}
