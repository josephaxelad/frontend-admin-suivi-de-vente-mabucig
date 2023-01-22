import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mark } from 'src/app/models/mark';
import { AlertsService } from 'src/app/services/alerts.service';
import { MarksService } from 'src/app/services/marks.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  marks! : Mark[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _marksService : MarksService) {  }

  ngOnInit(): void {
    this._marksService.marks$.subscribe(
      (marks)=>{
        this.marks = marks
      }
    )
  }

  //Supprimer définitivement
  deleteHard(mark : Mark){
    this._marksService.deleteHard(mark._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      this._router.navigate(["/parametres/produits/marques"])
    })
    .catch((error)=>{

     })

  }

}
