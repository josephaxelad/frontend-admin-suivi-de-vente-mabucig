import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { SemiWholesaler } from 'src/app/models/semi-wholesaler';
import { Wholesaler } from 'src/app/models/wholesaler';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { SemiWholesalersService } from 'src/app/services/semi-wholesalers.service';
import { WholesalersService } from 'src/app/services/wholesalers.service';
// import * as $ from 'jquery'
declare var $ :any;
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { AgenciesService } from 'src/app/services/agencies.service';
import { Agency } from 'src/app/models/agency';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.scss']
})
export class AllSalesComponent implements OnInit {

  view : number = 0; //ventes = 0,rapport = 1
  filterSalesForm!: FormGroup;
  isFiltered : boolean = false;
  filtered = {
    productsSelected : [] as any[],
    semiWholesalersSelected : [] as any[],
    wholesalersSelected : [] as any[],
  }
  sorted = {
    date : 0,
    hour : 0,
    wholesalerName : 0,
    semiWholesalerName : 0,
    productName : 0,
    qty : 0,
    price : 0,
    totalPrice : 0
  };
  sortedOrders!: Order[];
  filteredOrders!: Order[];
  allOrders!: Order[];
  orders!: Order[];
  ordersByPage: Order[] = [];
  numberOfElementToShow : number = 5;
  currentPage : number = 1;
  numberTotalOfpage : number = 0;
  pages : number[] = [];

  isDateRange : boolean = false;
  isHourRange : boolean = false;

  products! : Product[];
  semiWholesalers! : SemiWholesaler[];
  wholesalers! : Wholesaler[];
  agencies! : Agency[];

  //////////////
  filterSalesRForm!: FormGroup;
  filteredR = {
    productsSelected : [] as any[],
    semiWholesalersSelected : [] as any[],
    wholesalersSelected : [] as any[],
  }
  sortedR = {
    date : 0,
    wholesalerName : 0,
    semiWholesalerName : 0,
    productName : 0,
    qty : 0,
    totalPrice : 0
  };
  isFilteredR : boolean = false;
  sortedOrdersR!: Order[];
  filteredOrdersR!: Order[];
  allOrdersR!: Order[];
  ordersR!: Order[];
  ordersByPageR: Order[] = [];
  numberOfElementToShowR : number = 5;
  currentPageR : number = 1;
  numberTotalOfpageR : number = 0;
  pagesR : number[] = [];
  reports : { date: Date; groupByWholesaler: { wholesaler: Wholesaler; group: Order[]; }; }[] = [];
  constructor(private _agenciesService : AgenciesService,private _semiWholesalersService : SemiWholesalersService,private _wholesalersService : WholesalersService,private _productsService : ProductsService,private _ordersService : OrdersService,private _fb: FormBuilder) { }

  ngOnInit(): void {

    /**Initialiser le formulaire des ventes  */
    this.filterSalesForm = this._fb.group({
      minHour : this._fb.control(null),
      maxHour : this._fb.control(null),
      minDate : this._fb.control(null),
      maxDate : this._fb.control(null),
      products : this._fb.control([]),
      wholesalers : this._fb.control([]),
      semiWholesalers : this._fb.control([]),
      minQty : this._fb.control(null,Validators.min(0)),
      maxQty : this._fb.control(null,Validators.min(0)),
      minPrice : this._fb.control(null,Validators.min(0)),
      maxPrice : this._fb.control(null,Validators.min(0))
    },
    {validators : [
      MinMaxValidator('minHour','maxHour'),
      MinMaxValidator('minDate','maxDate'),
      MinMaxValidator('minQty','maxQty'),
      MinMaxValidator('minPrice','maxPrice')] },
      )

    /**Initialiser le formulaire des rapports */
    this.filterSalesRForm = this._fb.group({
      minDate : this._fb.control(null),
      maxDate : this._fb.control(null),
      products : this._fb.control([]),
      wholesalers : this._fb.control([]),
      semiWholesalers : this._fb.control([]),
      minQty : this._fb.control(null,Validators.min(0)),
      maxQty : this._fb.control(null,Validators.min(0)),
      minPrice : this._fb.control(null,Validators.min(0)),
      maxPrice : this._fb.control(null,Validators.min(0))
    },
    {validators : [
      MinMaxValidator('minDate','maxDate'),
      MinMaxValidator('minQty','maxQty'),
      MinMaxValidator('minPrice','maxPrice')] },
      )

    this.initJs()
    this.initJsR()

    /**Récuperer les produits */
    this._productsService.products$.subscribe(
      (products)=>{
        this.products = products
      }
    )

    /**Récuperer les grossistes */
    this._wholesalersService.wholesalers$.subscribe(
      (wholesalers)=>{
        this.wholesalers = wholesalers
      }
    )

    /**Récuperer les semi-grossistes */
    this._semiWholesalersService.semiWholesalers$.subscribe(
      (semiWholesalers)=>{
        this.semiWholesalers = semiWholesalers
      }
    )

    /**Récuperer les agences de livraison */
    this._agenciesService.agencies$.subscribe(
      (agencies)=>{
        this.agencies = agencies
      }
    )

    /**Récuperer les ventes */
    this.getAllOrders()

    /**Récuperer les ventes */
    this.getAllReports()
  }

  /**Récuperer les ventes */
  getAllOrders(){
    this._ordersService.orders$.subscribe(
      (orders : Order[])=>{
        this.allOrders = orders
        this.orders = orders
        this.getNumberTotalOfpage()
        this.setPages()
        this.getOrdersBypage(1)
      }
    )
  }

  //Obtenir le nombre total de pages
  getNumberTotalOfpage(){
    this.numberTotalOfpage = Math.ceil(this.orders?.length/this.numberOfElementToShow)
  }

  setPages(){
    this.pages=[];
    for (let i = 1; i < this.numberTotalOfpage + 1; i++) {
      this.pages.push(i)
    }
  }

  /**Récuperer les produits par page*/
  getOrdersBypage(currentPage : number){
    this.currentPage = currentPage;

    this.ordersByPage = this.orders?.slice(this.numberOfElementToShow*(currentPage-1),this.numberOfElementToShow*currentPage)
  }

  /**
   * Filtrer les ventes
   */
  filter(){
    const minHour = this.filterSalesForm.get('minHour')?.value;
    const maxHour = this.filterSalesForm.get('maxHour')?.value;
    const minDate = this.filterSalesForm.get('minDate')?.value;
    const maxDate = this.filterSalesForm.get('maxDate')?.value;
    const products = this.filterSalesForm.get('products')?.value;
    const wholesalers = this.filterSalesForm.get('wholesalers')?.value;
    const semiWholesalers = this.filterSalesForm.get('semiWholesalers')?.value;
    const minQty = this.filterSalesForm.get('minQty')?.value;
    const maxQty = this.filterSalesForm.get('maxQty')?.value;
    const minPrice = this.filterSalesForm.get('minPrice')?.value;
    const maxPrice = this.filterSalesForm.get('maxPrice')?.value;

    if (minHour != null ||
      maxHour != null ||
      minDate != null ||
      maxDate != null ||
      products.length ||
      wholesalers.length ||
      semiWholesalers.length ||
      minQty != null ||
      maxQty != null ||
      minPrice != null ||
      maxPrice != null ) {
      if (this.filterSalesForm.valid) {
        $('#modal-filtrer-ventes').modal('hide')
        const data = {
          minHour : minHour,
          maxHour : maxHour,
          minDate : minDate,
          maxDate : maxDate,
          products : products,
          wholesalers : wholesalers ,
          semiWholesalers : semiWholesalers,
          minQty : minQty,
          maxQty : maxQty,
          minPrice : minPrice,
          maxPrice : maxPrice,
        }
        this._ordersService.filter(data)
        .then((orders : any ) =>{
          this.isFiltered = true;
          this.filteredOrders = orders
          this.orders = orders
          this.getNumberTotalOfpage()
          this.setPages()
          this.getOrdersBypage(1)
        })

      }
    }

  }

  /**Reinitialiser le filtre */
  reinitFilter(){
    this.getAllOrders()
    this.filterSalesForm.reset()
    this.filtered.productsSelected = []
    this.filtered.wholesalersSelected = []
    this.filtered.semiWholesalersSelected = []
    this.filterSalesForm.controls['products'].setValue(this.filtered.productsSelected);
    this.filterSalesForm.controls['wholesalers'].setValue(this.filtered.wholesalersSelected);
    this.filterSalesForm.controls['semiWholesalers'].setValue(this.filtered.semiWholesalersSelected);
    $('#multiple-states-products').val([]).trigger('change');
    $('#multiple-states-wholesalers').val([]).trigger('change');
    $('#multiple-states-semi-wholesalers').val([]).trigger('change');
    $('#datepicker1').val(null)
    $('#datepicker2').val(null)
    $('#timepicker1').val(null)
    $('#timepicker2').val(null)
    this.isFiltered = false

  }

  /**Trier les ventes */
  sortBy(key: string){
    this.initOtherSorted(key);
    const value = this.toggleSorted(key)
    if (value != 0) {
      this.sortOrders(key,value)
      this.getNumberTotalOfpage()
      this.setPages()
      this.getOrdersBypage(1)
      // this._ordersService.sortBy(key,value)
      // .then((orders : any ) =>{
      //   this.orders = orders
      //   this.getNumberTotalOfpage()
      //   this.setPages()
      //   this.getOrdersBypage(1)
      // })
    }else{
      if (this.isFiltered== true) {
        console.log(this.filteredOrders)
        this.orders = this.filteredOrders
        this.getNumberTotalOfpage()
      this.setPages()
      this.getOrdersBypage(1)
      }else{
        console.log(this.allOrders)
        this.orders = this.allOrders
        this.getNumberTotalOfpage()
      this.setPages()
      this.getOrdersBypage(1)
      }

    }

  }

  toggleSorted(keySorted: string){
    var sorted = this.sorted
    const key = Object.keys(this.sorted).find(x => x == keySorted) as string
    switch (this.sorted[key as keyof typeof sorted]) {
      case 0:
        this.sorted[key as keyof typeof sorted] = 1
        break;
      case 1:
        this.sorted[key as keyof typeof sorted] = -1
        break;
      case -1:
        this.sorted[key as keyof typeof sorted] = 0
        break;
      default:
        this.sorted[key as keyof typeof sorted] = 0
        break;
    }
    return this.sorted[key as keyof typeof sorted]
  }

  initOtherSorted(key: any){
    var sorted = this.sorted
    Object.keys(this.sorted).forEach(x => {
      if (x != key) {
        this.sorted[x as keyof typeof sorted] = 0
      }
    })
  }
  sortOrders(key: any,value: any){
    this.sortedOrders = this.orders.sort(function (a , b) {
      switch (key) {
        case 'date':
          return value == 1 ? new Date(a.date).getTime() - new Date(b.date).getTime()  : new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'hour':
          console.log(formatDate(new Date(a.date),'HH:mm','en-US'))
          return value == 1 ? formatDate(new Date(a.date),'HH:mm','en-US').localeCompare(formatDate(new Date(b.date),'HH:mm','en-US')) : formatDate(new Date(b.date),'HH:mm','en-US').localeCompare(formatDate(new Date(a.date),'HH:mm','en-US'))
        case 'wholesalerName':
          return value == 1 ? a.wholesaler.name.localeCompare(b.wholesaler.name) : b.wholesaler.name.localeCompare(a.wholesaler.name)
        case 'semiWholesalerName':
          return value == 1 ? a.semiWholesaler.name.localeCompare(b.semiWholesaler.name) : b.semiWholesaler.name.localeCompare(a.semiWholesaler.name)
        case 'productName':
          return value == 1 ? a.cart.product.sku.localeCompare(b.cart.product.sku) : b.cart.product.sku.localeCompare(a.cart.product.sku)
        case 'qty':
          return value == 1 ? a.cart.qty  - b.cart.qty  : b.cart.qty - a.cart.qty
        case 'price':
          return value == 1 ? a.cart.price - b.cart.price  : b.cart.price  - a.cart.price
        case 'totalPrice':
          return value == 1 ? a.price*a.cart.qty - b.price*b.cart.qty   : b.price*b.cart.qty  - a.price*a.cart.qty
        default: return  value == 1 ? new Date(a.date).getTime() - new Date(b.date).getTime()  : new Date(b.date).getTime() - new Date(a.date).getTime()
      }

    })
    console.log(this.sortedOrders)
  }

  currencyFormat(num : number,div :any){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, div);
  }

  initJs(){
    $('#datepicker').datetimepicker({
      format: 'DD/MM/YYYY',
    });
    $('#datepicker1').datetimepicker({
      format: 'DD/MM/YYYY',
    }).on('dp.change',  (e: any) => {
      console.log(e)
      this.filterSalesForm.controls['minDate'].setValue(e.date ? formatDate(e.date,'yyyy-MM-dd','en-US') : null);
    });
    $('#datepicker2').datetimepicker({
      format: 'DD/MM/YYYY',
    }).on('dp.change',  (e: any) => {
      this.filterSalesForm.controls['maxDate'].setValue(e.date ? formatDate(e.date,'yyyy-MM-dd','en-US') : null);
    });
    $('#timepicker').datetimepicker({
      format: 'HH:mm',
    }).on('');
    $('#timepicker1').datetimepicker({
      format: 'HH:mm',
    }).on('dp.change',  (e: any) => {
      this.filterSalesForm.controls['minHour'].setValue(e.date ? formatDate(e.date,'HH:mm','en-US') : null);
    });
    $('#timepicker2').datetimepicker({
      format: 'HH:mm',
    }).on('dp.change',  (e: any) => {
      this.filterSalesForm.controls['maxHour'].setValue(e.date ? formatDate(e.date,'HH:mm','en-US') : null);
    });
    //wholesalers
    $('#multiple-states-wholesalers').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:select',  (e: any) => {
      var x = e.params.data.id;
      this.filtered.wholesalersSelected.push(x)
      this.filterSalesForm.controls['wholesalers'].setValue(this.filtered.wholesalersSelected);
      });
    $('#multiple-states-wholesalers').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:unselect',  (e: any) => {
      var x = e.params.data.id;
      this.filtered.wholesalersSelected = this.filtered.wholesalersSelected.filter(wholesaler => wholesaler != x)
      this.filterSalesForm.controls['wholesalers'].setValue(this.filtered.wholesalersSelected);
      });
    //semiWholesalers
    $('#multiple-states-semi-wholesalers').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:select',  (e: any) => {
      var x = e.params.data.id;
      this.filtered.semiWholesalersSelected.push(x)
      console.log(this.filtered.semiWholesalersSelected)
      this.filterSalesForm.controls['semiWholesalers'].setValue(this.filtered.semiWholesalersSelected);
    });
    $('#multiple-states-semi-wholesalers').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:unselect',  (e: any) => {
      var x = e.params.data.id;
      this.filtered.semiWholesalersSelected = this.filtered.semiWholesalersSelected.filter(semiWholesaler => semiWholesaler != x)
      this.filterSalesForm.controls['semiWholesalers'].setValue(this.filtered.semiWholesalersSelected);
      });
    //products
    $('#multiple-states-products').select2({
      width: 'resolve',
      theme: "bootstrap",
    }).on('select2:select',  (e: any) => {
      var x = e.params.data.id;
      this.filtered.productsSelected.push(x)
      console.log(this.filtered.productsSelected)
      this.filterSalesForm.controls['products'].setValue(this.filtered.productsSelected);
    });
    $('#multiple-states-products').select2({
      width: 'resolve',
      theme: "bootstrap",
    }).on('select2:unselect',  (e: any) => {
    var x = e.params.data.id;
    this.filtered.productsSelected = this.filtered.productsSelected.filter(product => product != x)
    this.filterSalesForm.controls['products'].setValue(this.filtered.productsSelected);
    });

    // $( "#slider-range-quantite" ).slider({
    //   range: true,
    //   min: 0,
    //   max: 500,
    //   values: [ 75, 300 ]
    // });
    // $( "#slider-range-prix" ).slider({
    //   range: true,
    //   min: 0,
    //   max: 500,
    //   values: [ 75, 300 ]
    // });
    $('#toggle-date').bootstrapToggle({
      style : "btn-round",
      toggle : "toggle",
      on : "Plage",
      off : "Pas de plage",
      onstyle : "primary",
      offstyle : "info",
      width : "100",
      size : "mini"
    });
    $('#toggle-date-range').bootstrapToggle({
      style : "btn-round",
      toggle : "toggle",
      on : "Plage",
      off : "Pas de plage",
      onstyle : "primary",
      offstyle : "info",
      width : "100",
      size : "mini"
    });
    $('#toggle-hour').bootstrapToggle({
      style : "btn-round",
      toggle : "toggle",
      on : "Plage",
      off : "Pas de plage",
      onstyle : "primary",
      offstyle : "info",
      width : "100",
      size : "mini"
    });
    $('#toggle-hour-range').bootstrapToggle({
      style : "btn-round",
      toggle : "toggle",
      on : "Plage",
      off : "Pas de plage",
      onstyle : "primary",
      offstyle : "info",
      width : "100",
      size : "mini"
    });

  }

  exportExcel() {

    let workbook = new Workbook();
    let salesSheet = workbook.addWorksheet('Ventes');
    // let wholesalersSheet = workbook.addWorksheet('Grossistes');
    // let semiWholesalersSheet = workbook.addWorksheet('Semi-Grossistes');
    // let productsSheet = workbook.addWorksheet('Produits');
    // let agenciesSheet = workbook.addWorksheet('Agences');

    salesSheet.columns = [
      { header: 'Date', key: 'date' },
      { header: 'Heure', key: 'hour' },
      { header: 'Grossiste', key: 'wholesaler' },
      { header: 'Semi-grossiste', key: 'semiWholesaler' },
      { header: 'Produit', key: 'product' },
      { header: 'Quantité', key: 'qty' },
      { header: 'Prix Unitaire', key: 'price' },
      { header: 'Montant Total', key: 'totalPrice' },
    ];

    // productsSheet.columns = [
    //   { header: 'Sku', key: 'sku' },
    //   { header: 'Prix', key: 'price' },
    //   { header: 'Nombre par carton', key: 'numberByPack' },
    //   { header: 'Marque', key: 'mark' },
    // ]

    // semiWholesalersSheet.columns = [
    //   { header: 'ID', key: 'idAccount' },
    //   { header: 'Nom', key: 'name' },
    //   { header: 'Téléphone 1', key: 'phone1' },
    //   { header: 'Téléphone 2', key: 'phone2' },
    //   { header: 'Grossiste', key: 'wholesaler' },
    //   { header: 'Adresse', key: 'address' },
    //   { header: 'Quartier', key: 'neighborhood' },
    //   { header: 'Ville', key: 'city' },
    // ]

    // wholesalersSheet.columns = [
    //   { header: 'ID', key: 'idAccount' },
    //   { header: 'Nom', key: 'name' },
    //   { header: 'Téléphone', key: 'phone' },
    //   { header: 'Entreprise', key: 'company' },
    //   { header: 'Marchés', key: 'markets' },
    //   { header: 'Agence', key: 'agency' },
    // ]

    // agenciesSheet.columns = [
    //   { header: 'Code', key: 'code' },
    //   { header: 'Ville', key: 'city' },
    // ]

    this.orders.forEach(e => {
      salesSheet.addRow({
        date : formatDate(e.date,'dd-MM-yyyy','fr-FR') ,
        hour : formatDate(e.date,'HH:mm','fr-FR') ,
        wholesaler : e.wholesaler.name ,
        semiWholesaler : e.semiWholesaler.name ,
        product : e.cart.product?.sku ,
        qty : e.cart.qty ,
        price : e.cart.price ,
        totalPrice : e.cart.price*e.cart.qty ,
        },"n");
    });

    // this.products.forEach(e => {
    //   productsSheet.addRow({
    //     sku : e.sku,
    //     price : e.price,
    //     numberByPack : e.numberByPack,
    //     mark : e.mark?.name,
    //   })
    // })

    // this.semiWholesalers.forEach(e => {
    //   semiWholesalersSheet.addRow({
    //     idAccount : e.idAccount,
    //     name : e.name,
    //     phone1 : e.phone1,
    //     phone2 : e.phone2,
    //     wholesaler : e.wholesaler?.name,
    //     address : e.address.name,
    //     neighborhood : e.address.neighborhood,
    //     city : e.address.city?.name,
    //   })
    // })

    // this.wholesalers.forEach(e => {
    //   wholesalersSheet.addRow({
    //     idAccount : e.idAccount,
    //     name : e.name,
    //     phone : e.phone,
    //     company : e.company,
    //     markets : e.markets?.map(market => market.name).join(', '),
    //     agency : e.agency?.code,
    //   })
    // })

    // this.products.forEach(e => {
    //   productsSheet.addRow({
    //     sku : e.sku,
    //     price : e.price,
    //     numberByPack : e.numberByPack,
    //     mark : e.mark?.name,
    //   })
    // })

    // this.agencies.forEach(e =>{
    //   agenciesSheet.addRow({
    //     code : e.code,
    //     city : e.city?.name,
    //   })
    // })


    // try {
    //   var data = await workbook.xlsx.writeBuffer()
    // // .then((data) => {
    //   let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //   fs.saveAs(blob, 'Ventes.xlsx');
    // // })
    // // .catch(e => console.log(e))
    // } catch (e) {
    //   console.log(e)
    // }


    workbook.xlsx.writeBuffer()
    .then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Ventes.xlsx');
    })
    .catch(e => console.log(e))
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////

  /**Récuperer les ventes */
  getAllReports(){
    this._ordersService.reports$.subscribe(
      (reports : Order[])=>{
        this.allOrdersR = reports
        this.ordersR = reports
        this.getNumberTotalOfpageR()
        this.setPagesR()
        this.getOrdersBypageR(1)
      }
    )
  }

  //Obtenir le nombre total de pages
  getNumberTotalOfpageR(){
    this.numberTotalOfpageR = Math.ceil(this.ordersR?.length/this.numberOfElementToShowR)
  }

  setPagesR(){
    this.pagesR=[];
    for (let i = 1; i < this.numberTotalOfpageR + 1; i++) {
      this.pagesR.push(i)
    }
  }

  /**Récuperer les produits par page*/
  getOrdersBypageR(currentPageR : number){
    this.currentPageR = currentPageR;

    this.ordersByPageR = this.ordersR?.slice(this.numberOfElementToShowR*(currentPageR-1),this.numberOfElementToShowR*currentPageR)
  }

  /**
   * Filtrer les ventes
   */
  filterR(){
    const minDate = this.filterSalesRForm.get('minDate')?.value;
    const maxDate = this.filterSalesRForm.get('maxDate')?.value;
    const products = this.filterSalesRForm.get('products')?.value;
    const wholesalers = this.filterSalesRForm.get('wholesalers')?.value;
    const semiWholesalers = this.filterSalesRForm.get('semiWholesalers')?.value;
    const minQty = this.filterSalesRForm.get('minQty')?.value;
    const maxQty = this.filterSalesRForm.get('maxQty')?.value;
    const minPrice = this.filterSalesRForm.get('minPrice')?.value;
    const maxPrice = this.filterSalesRForm.get('maxPrice')?.value;

    if (
      minDate != null ||
      maxDate != null ||
      products.length ||
      wholesalers.length ||
      semiWholesalers.length ||
      minQty != null ||
      maxQty != null ||
      minPrice != null ||
      maxPrice != null ) {
      if (this.filterSalesRForm.valid) {
        $('#modal-filtrer-ventesR').modal('hide')
        const data = {
          minHour : null,
          maxHour : null,
          minDate : minDate,
          maxDate : maxDate,
          products : products,
          wholesalers : wholesalers ,
          semiWholesalers : semiWholesalers,
          minQty : minQty,
          maxQty : maxQty,
          minPrice : minPrice,
          maxPrice : maxPrice,
        }
        this._ordersService.filterReports(data)
        .then((orders : any ) =>{
          this.isFilteredR = true;
          this.filteredOrdersR = orders
          this.ordersR = orders
          this.getNumberTotalOfpageR()
          this.setPagesR()
          this.getOrdersBypageR(1)
        })

      }
    }

  }

  /**Reinitialiser le filtre */
  reinitFilterR(){
    this.getAllReports()
    this.filterSalesRForm.reset()
    this.filteredR.productsSelected = []
    this.filteredR.wholesalersSelected = []
    this.filteredR.semiWholesalersSelected = []
    this.filterSalesRForm.controls['products'].setValue(this.filteredR.productsSelected);
    this.filterSalesRForm.controls['wholesalers'].setValue(this.filteredR.wholesalersSelected);
    this.filterSalesRForm.controls['semiWholesalers'].setValue(this.filteredR.semiWholesalersSelected);
    $('#multiple-states-productsR').val([]).trigger('change');
    $('#multiple-states-wholesalersR').val([]).trigger('change');
    $('#multiple-states-semi-wholesalersR').val([]).trigger('change');
    $('#datepicker1R').val(null)
    $('#datepicker2R').val(null)
    this.isFilteredR = false

  }

  /**Trier les ventes */
  sortByR(key: string){
    this.initOtherSortedR(key);
    const value = this.toggleSortedR(key)
    if (value != 0) {
      this.sortOrdersR(key,value)
      this.getNumberTotalOfpageR()
      this.setPagesR()
      this.getOrdersBypageR(1)
      // this._ordersService.sortBy(key,value)
      // .then((orders : any ) =>{
      //   this.orders = orders
      //   this.getNumberTotalOfpage()
      //   this.setPages()
      //   this.getOrdersBypage(1)
      // })
    }else{
      if (this.isFiltered== true) {
        console.log(this.filteredOrders)
        this.orders = this.filteredOrders
        this.getNumberTotalOfpage()
      this.setPages()
      this.getOrdersBypage(1)
      }else{
        console.log(this.allOrders)
        this.orders = this.allOrders
        this.getNumberTotalOfpage()
      this.setPages()
      this.getOrdersBypage(1)
      }

    }

  }

  toggleSortedR(keySorted: string){
    var sortedR = this.sortedR
    const key = Object.keys(this.sortedR).find(x => x == keySorted) as string
    switch (this.sortedR[key as keyof typeof sortedR]) {
      case 0:
        this.sortedR[key as keyof typeof sortedR] = 1
        break;
      case 1:
        this.sortedR[key as keyof typeof sortedR] = -1
        break;
      case -1:
        this.sortedR[key as keyof typeof sortedR] = 0
        break;
      default:
        this.sortedR[key as keyof typeof sortedR] = 0
        break;
    }
    return this.sortedR[key as keyof typeof sortedR]
  }

  initOtherSortedR(key: any){
    var sortedR = this.sortedR
    Object.keys(this.sortedR).forEach(x => {
      if (x != key) {
        this.sortedR[x as keyof typeof sortedR] = 0
      }
    })
  }
  sortOrdersR(key: any,value: any){
    this.sortedOrdersR = this.ordersR.sort(function (a , b) {
      switch (key) {
        case 'date':
          return value == 1 ? new Date(a.date).getTime() - new Date(b.date).getTime()  : new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'wholesalerName':
          return value == 1 ? a.wholesaler.name.localeCompare(b.wholesaler.name) : b.wholesaler.name.localeCompare(a.wholesaler.name)
        case 'semiWholesalerName':
          return value == 1 ? a.semiWholesaler.name.localeCompare(b.semiWholesaler.name) : b.semiWholesaler.name.localeCompare(a.semiWholesaler.name)
        case 'productName':
          return value == 1 ? a.product!.sku.localeCompare(b.product!.sku) : b.product!.sku.localeCompare(a.product!.sku)
        case 'qty':
          return value == 1 ? a.qty!  - b.qty!  : b.qty! - a.qty!
        case 'totalPrice':
          return value == 1 ? a.price* - b.price  : b.price  - a.price
        default: return  value == 1 ? new Date(a.date).getTime() - new Date(b.date).getTime()  : new Date(b.date).getTime() - new Date(a.date).getTime()
      }

    })
  }

  exportExcelR() {

    let workbook = new Workbook();
    let salesSheet = workbook.addWorksheet('Ventes');
    let wholesalersSheet = workbook.addWorksheet('Grossistes');
    let semiWholesalersSheet = workbook.addWorksheet('Semi-Grossistes');
    let productsSheet = workbook.addWorksheet('Produits');
    let agenciesSheet = workbook.addWorksheet('Agences');

    salesSheet.columns = [
      { header: 'Date', key: 'date' },
      { header: 'Grossiste', key: 'wholesaler'},
      { header: 'Semi-grossiste', key: 'semiWholesaler' },
      { header: 'Produit', key: 'product' },
      { header: 'Quantité', key: 'qty' },
      { header: 'Montant Total', key: 'totalPrice' },
    ];

    productsSheet.columns = [
      { header: 'Sku', key: 'sku' },
      { header: 'Prix', key: 'price' },
      { header: 'Nombre par carton', key: 'numberByPack' },
      { header: 'Marque', key: 'mark' },
    ]

    semiWholesalersSheet.columns = [
      { header: 'ID', key: 'idAccount' },
      { header: 'Nom', key: 'name' },
      { header: 'Téléphone 1', key: 'phone1' },
      { header: 'Téléphone 2', key: 'phone2' },
      { header: 'Grossiste', key: 'wholesaler' },
      { header: 'Adresse', key: 'address' },
      { header: 'Quartier', key: 'neighborhood' },
      { header: 'Ville', key: 'city' },
    ]

    wholesalersSheet.columns = [
      { header: 'ID', key: 'idAccount' },
      { header: 'Nom', key: 'name' },
      { header: 'Téléphone', key: 'phone' },
      { header: 'Entreprise', key: 'company' },
      { header: 'Marchés', key: 'markets' },
      { header: 'Agence', key: 'agency' },
    ]

    agenciesSheet.columns = [
      { header: 'Code', key: 'code' },
      { header: 'Ville', key: 'city' },
    ]

    this.ordersR.forEach(e => {
      salesSheet.addRow({
        date : formatDate(e.date,'dd-MM-yyyy','fr-FR') ,
        wholesaler : e.wholesaler.idAccount ,
        semiWholesaler : e.semiWholesaler.idAccount ,
        product : e.product?.sku ,
        qty : e.qty ,
        totalPrice : e.price ,
        },"n");
    });

    this.products.forEach(e => {
      productsSheet.addRow({
        sku : e.sku,
        price : e.price,
        numberByPack : e.numberByPack,
        mark : e.mark?.name,
      })
    })

    this.semiWholesalers.forEach(e => {
      semiWholesalersSheet.addRow({
        idAccount : e.idAccount,
        name : e.name,
        phone1 : e.phone1,
        phone2 : e.phone2,
        wholesaler : e.wholesaler?.name,
        address : e.address.name,
        neighborhood : e.address.neighborhood,
        city : e.address.city?.name,
      })
    })

    this.wholesalers.forEach(e => {
      wholesalersSheet.addRow({
        idAccount : e.idAccount,
        name : e.name,
        phone : e.phone,
        company : e.company,
        markets : e.markets?.map(market => market.name).join(', '),
        agency : e.agency?.code,
      })
    })

    this.products.forEach(e => {
      productsSheet.addRow({
        sku : e.sku,
        price : e.price,
        numberByPack : e.numberByPack,
        mark : e.mark?.name,
      })
    })

    this.agencies.forEach(e =>{
      agenciesSheet.addRow({
        code : e.code,
        city : e.city?.name,
      })
    })


    // try {
    //   var data = await workbook.xlsx.writeBuffer()
    // // .then((data) => {
    //   let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //   fs.saveAs(blob, 'Ventes.xlsx');
    // // })
    // // .catch(e => console.log(e))
    // } catch (e) {
    //   console.log(e)
    // }


    workbook.xlsx.writeBuffer()
    .then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Rapports.xlsx');
    })
    .catch(e => console.log(e))
  }

  initJsR(){
    $('#datepicker1R').datetimepicker({
      format: 'DD/MM/YYYY',
    }).on('dp.change',  (e: any) => {
      console.log(e)
      this.filterSalesRForm.controls['minDate'].setValue(e.date ? formatDate(e.date,'yyyy-MM-dd','en-US') : null);
    });
    $('#datepicker2R').datetimepicker({
      format: 'DD/MM/YYYY',
    }).on('dp.change',  (e: any) => {
      this.filterSalesRForm.controls['maxDate'].setValue(e.date ? formatDate(e.date,'yyyy-MM-dd','en-US') : null);
    });
    //wholesalers
    $('#multiple-states-wholesalersR').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:select',  (e: any) => {
      var x = e.params.data.id;
      this.filteredR.wholesalersSelected.push(x)
      this.filterSalesRForm.controls['wholesalers'].setValue(this.filteredR.wholesalersSelected);
      });
    $('#multiple-states-wholesalersR').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:unselect',  (e: any) => {
      var x = e.params.data.id;
      this.filteredR.wholesalersSelected = this.filteredR.wholesalersSelected.filter(wholesaler => wholesaler != x)
      this.filterSalesRForm.controls['wholesalers'].setValue(this.filteredR.wholesalersSelected);
      });
    //semiWholesalers
    $('#multiple-states-semi-wholesalersR').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:select',  (e: any) => {
      var x = e.params.data.id;
      this.filteredR.semiWholesalersSelected.push(x)
      this.filterSalesRForm.controls['semiWholesalers'].setValue(this.filteredR.semiWholesalersSelected);
    });
    $('#multiple-states-semi-wholesalersR').select2({
      width: 'resolve',
      theme: "bootstrap"
    }).on('select2:unselect',  (e: any) => {
      var x = e.params.data.id;
      this.filteredR.semiWholesalersSelected = this.filtered.semiWholesalersSelected.filter(semiWholesaler => semiWholesaler != x)
      this.filterSalesRForm.controls['semiWholesalers'].setValue(this.filteredR.semiWholesalersSelected);
      });
    //products
    $('#multiple-states-productsR').select2({
      width: 'resolve',
      theme: "bootstrap",
    }).on('select2:select',  (e: any) => {
      var x = e.params.data.id;
      this.filteredR.productsSelected.push(x)
      this.filterSalesRForm.controls['products'].setValue(this.filteredR.productsSelected);
    });
    $('#multiple-states-productsR').select2({
      width: 'resolve',
      theme: "bootstrap",
    }).on('select2:unselect',  (e: any) => {
    var x = e.params.data.id;
    this.filteredR.productsSelected = this.filteredR.productsSelected.filter(product => product != x)
    this.filterSalesRForm.controls['products'].setValue(this.filteredR.productsSelected);
    });



  }

}

export function   MinMaxValidator(minControlName :string, maxControlName : string) {
  return (formGroup: FormGroup) => {
    const min = formGroup.controls[minControlName];
    const max = formGroup.controls[maxControlName];
    // console.log(min.value+' '+max.value)
    if ((min.errors && !min.errors.minMax) || (max.errors  && !max.errors.minMax)) {
        // return if another validator has already found an error on the matchingControl
        return;
    }

    // set error on matchingControl if validation fails
    if (min.value && max.value && min.value > max.value ) {
      min.setErrors({ minMax: true });
      max.setErrors({ minMax: true });
    } else {
      min.setErrors(null);
      max.setErrors(null);
    }
  }
}


// var dates: Date[] = []
// reports.forEach(r => {
//   if (!dates.includes(r.date)) {
//     dates.push(r.date)
//   }
// })
// console.log(dates)

// var _reports: { date: Date; groupByWholesaler: { wholesaler: Wholesaler; group: Order[]; }; }[]  = []
// dates.forEach(d => {
// var groupWholesaler : Order[] = []
// var order1! : Order
// reports.forEach(r=>{
//   if (d == r.date) {
//     order1 = r
//     groupWholesaler.push(r)
//   }
// })
// _reports.push({
//   date : order1.date,
//   groupByWholesaler : { wholesaler : order1.wholesaler, group : [...groupWholesaler] }
// })
// });

// this.reports = _reports;
// console.log(_reports)

// var groupSemiWholesaler : string[] = []
// _reports.forEach(x => {
// x.groupByWholesaler.group.forEach(y=>{
//   if (!groupSemiWholesaler.includes(y.semiWholesaler._id!)) {
//     groupSemiWholesaler.push(y.semiWholesaler._id!)
//   }
// })
// });

// console.log(groupSemiWholesaler)

// var finalReports: { date: Date; groupByWholesaler: { wholesaler: Wholesaler; group: Order[]; groupBySemiWholesaler: { semiWholesaler: SemiWholesaler; group: Order[]; }; }; }[] = []

// _reports.forEach(r=>{
// r.groupByWholesaler.group.forEach(s=>{
//   var _groupSemiWholesaler : Order[] = [];
//   groupSemiWholesaler.forEach(g=>{
//     if (s.semiWholesaler._id == g) {
//       _groupSemiWholesaler.push(s)
//       finalReports.push({
//         date : r.date,
//         groupByWholesaler : {
//           wholesaler : r.groupByWholesaler.wholesaler,
//           group : r.groupByWholesaler.group,
//           groupBySemiWholesaler : {semiWholesaler : s.semiWholesaler, group : [..._groupSemiWholesaler] }}
//       })
//     }
//   })
// })
// })

// console.log(finalReports)


