import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mark } from 'src/app/models/mark';
import { Product } from 'src/app/models/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { MarksService } from 'src/app/services/marks.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  prefUrlImage = `${environment.prefUrlImage}`;
  imagePreview! : string;
  picture!: any;
  editProductForm!: FormGroup;
  submitted: boolean = false;
  product! : Product;
  marks! : Mark[]

  constructor(private _route : ActivatedRoute,private _fb : FormBuilder,private _alertsService : AlertsService,private _router: Router,private _productsService : ProductsService,private _marksService : MarksService) { }

  ngOnInit(): void {
    //Initialiser le formulaire
    this.editProductForm = this._fb.group({
      sku : this._fb.control('',Validators.required),
      price : this._fb.control('',Validators.required),
      numberByPack : this._fb.control('',Validators.required),
      idMark : this._fb.control('',Validators.required),
    })

    this._marksService.marks$.subscribe(
      (marks)=>{
        this.marks = marks
      }
    )

    this._productsService.products$.subscribe(
      (products)=>{
        const id = this._route.snapshot.params["id"];
        this.product = products?.find( product => product._id == id )!
        this.imagePreview = this.prefUrlImage+'produits/'+this.product?.picture
        this.editProductForm.get('sku')?.setValue(this.product?.sku);
        this.editProductForm.get('price')?.setValue(this.product?.price);
        this.editProductForm.get('numberByPack')?.setValue(this.product?.numberByPack);
        this.editProductForm.get('idMark')?.setValue(this.product?.mark?._id);
      }
    )

  }

  onFileChange(event : any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.picture = event.target.files.item(0);
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagePreview = reader.result as string;

      };

    }
  }

  modify(){
    this.submitted = true;

    if(this.editProductForm.valid){

      const sku = this.editProductForm.get('sku')?.value;
      const price = this.editProductForm.get('price')?.value;
      const numberByPack = this.editProductForm.get('numberByPack')?.value;
      const idMark = this.editProductForm.get('idMark')?.value;


      const product = {
        _id : this.product._id,
        sku : sku,
        price : price,
        numberByPack : numberByPack,
        idMark : idMark
      }


      this._productsService.modify(product,this.picture)
      .then((message)=>{
        this.submitted = false;
        this._alertsService.success(message,
          {
            autoClose: true,
            keepAfterRouteChange: true,
          })
      })
      .catch((error)=>{
        this.submitted = false;
        this._alertsService.error(error.message,
        {
          autoClose: true,
          keepAfterRouteChange: false,
        })
      })
    }
  }

  deleteImagePreview(){
    this.imagePreview = '';
    this.picture = null;
  }
}
