import { AfterContentChecked, AfterViewChecked, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import QRCodeStyling, { FileExtension } from 'qr-code-styling';

@Component({
  selector: 'app-all-codes-qr',
  templateUrl: './all-codes-qr.component.html',
  styleUrls: ['./all-codes-qr.component.scss']
})
export class AllCodesQrComponent implements OnInit, AfterContentChecked, AfterViewChecked  {

  products! : Product[]

  @ViewChildren('qrCode') qrCodes! : QueryList<ElementRef<HTMLElement>>

  constructor(private _renderer : Renderer2,private _productsService : ProductsService) {
    this._productsService.getAll()
  }

  ngAfterViewChecked(): void {
    this.products.forEach(product => {

      const qrCode = this.qrCodes.find(qrCode => qrCode.nativeElement.id == product._id)

      if (!qrCode?.nativeElement.hasChildNodes()) {
        console.log(qrCode?.nativeElement)
        console.log(product.codeQr)
        product.codeQr?.append(qrCode?.nativeElement);
      }
    });

    // this.products.forEach(product => {
    //   console.log('ok2')
    //   product.codeQr!.append(document.getElementById(product._id!)!);
    // });
  }


  ngOnInit(): void {
    //Récuperer les produits
    this._productsService.products$.subscribe(
      (products : Product[])=>{
        this.products = products
        console.log(products)
      }
    )
  }

  ngAfterContentChecked(): void {


  }


  download(product : Product): void {
    this._productsService.downloadQrCode(product)
  }

}
