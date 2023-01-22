import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SemiWholesaler } from 'src/app/models/semi-wholesaler';
import { AlertsService } from 'src/app/services/alerts.service';
import { SemiWholesalersService } from 'src/app/services/semi-wholesalers.service';

@Component({
  selector: 'app-single-semi-wholesaler',
  templateUrl: './single-semi-wholesaler.component.html',
  styleUrls: ['./single-semi-wholesaler.component.scss']
})
export class SingleSemiWholesalerComponent implements OnInit {

  semiWholesaler! : SemiWholesaler

  constructor(private _route : ActivatedRoute,private _alertsService : AlertsService,private _semiWholesalersService : SemiWholesalersService) { }

  ngOnInit(): void {
    this._semiWholesalersService.semiWholesalers$.subscribe(
      (semiWholesalers : SemiWholesaler[])=>{
        const id = this._route.snapshot.params["id"];
        this.semiWholesaler = semiWholesalers?.find( semiWholesaler => semiWholesaler._id == id )!
      }
    )
  }

  isDisabled(semiWholesaler : SemiWholesaler){
    // const isVisible = e.target.checked;
    const isDisabled = semiWholesaler.isDisabled ? false : true;
    this._semiWholesalersService.isDisabled(isDisabled,semiWholesaler._id!)
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
