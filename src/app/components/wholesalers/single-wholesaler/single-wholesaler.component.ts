import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wholesaler } from 'src/app/models/wholesaler';
import { AlertsService } from 'src/app/services/alerts.service';
import { WholesalersService } from 'src/app/services/wholesalers.service';

@Component({
  selector: 'app-single-wholesaler',
  templateUrl: './single-wholesaler.component.html',
  styleUrls: ['./single-wholesaler.component.scss']
})
export class SingleWholesalerComponent implements OnInit {

  wholesaler! : Wholesaler
  constructor(private _route : ActivatedRoute,private _alertsService : AlertsService,private _wholesalersService : WholesalersService) { }

  ngOnInit(): void {
    this._wholesalersService.wholesalers$.subscribe(
      (wholesalers : Wholesaler[])=>{
        const id = this._route.snapshot.params["id"];
        this.wholesaler = wholesalers?.find( wholesaler => wholesaler._id == id )!
      }
    )
  }

  isDisabled(wholesaler : Wholesaler){
    // const isVisible = e.target.checked;
    const isDisabled = wholesaler.isDisabled ? false : true;
    this._wholesalersService.isDisabled(isDisabled,wholesaler._id!)
    .then((message)=>{
      this._alertsService.success(message,
      {
        autoClose: true,
        keepAfterRouteChange: true,
      });
      // this._router.navigate(["/administrateurs"])
    })
    .catch((error)=>{console.log(error)})

  }

}
