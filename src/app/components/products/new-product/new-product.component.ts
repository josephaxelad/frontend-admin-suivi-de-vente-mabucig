import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mark } from 'src/app/models/mark';
import { AlertsService } from 'src/app/services/alerts.service';
import { MarksService } from 'src/app/services/marks.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  imagePreview! : String;
  picture!: any;
  addProductForm!: FormGroup;
  marks!: Mark[];
  errorMessage!: string;
  submitted: boolean = false;

  constructor(private _alertsService : AlertsService,private _router: Router,private _fb: FormBuilder,private _productsService : ProductsService,private _marksService : MarksService) { }

  ngOnInit(): void {
    //Initialiser le formulaire login
    this.addProductForm = this._fb.group({
      sku : this._fb.control('',Validators.required),
      price : this._fb.control('',[Validators.required,Validators.min(0)]),
      numberByPack : this._fb.control('',[Validators.required,Validators.min(0)]),
      idMark : this._fb.control('',Validators.required),
    });

    /**Récuperer  */
    this._marksService.marks$.subscribe(
      (marks : Mark[])=>{
        this.marks = marks;
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

        // this.addProductForm.patchValue({
        //   picture: reader.result
        // });

      };

    }
  }

  add(){
    this.submitted = true;

    if (this.addProductForm.valid) {

      const sku = this.addProductForm.get('sku')?.value
      const price = this.addProductForm.get('price')?.value
      const numberByPack = this.addProductForm.get('numberByPack')?.value
      const idMark = this.addProductForm.get('idMark')?.value

      const product = {
        sku : sku,
        price : price,
        numberByPack : numberByPack,
        idMark : idMark,
      }

      this._productsService.add(product,this.picture)
      .then((message)=>{
        this.submitted = false;
        this.addProductForm.reset()
        this.deleteImagePreview();
        this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        })
        // this._router.navigate(["/parametres/villes"])
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
    this.picture = null
  }

}
