import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SemiWholesaler } from 'src/app/models/semi-wholesaler';
import { AlertsService } from 'src/app/services/alerts.service';
import { SemiWholesalersService } from 'src/app/services/semi-wholesalers.service';

@Component({
  selector: 'app-semi-wholesalers',
  templateUrl: './semi-wholesalers.component.html',
  styleUrls: ['./semi-wholesalers.component.scss']
})
export class SemiWholesalersComponent implements OnInit {

  semiWholesalers! : SemiWholesaler[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _semiWholesalersService : SemiWholesalersService) { }

  ngOnInit(): void {
    this._semiWholesalersService.semiWholesalers$.subscribe(
      (semiWholesalers)=>{
        this.semiWholesalers = semiWholesalers
      }
    )
  }

  //Supprimer définitivement
  deleteHard(semiWholesaler : SemiWholesaler){
    this._semiWholesalersService.deleteHard(semiWholesaler._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      this._router.navigate(["/semi-grossistes"])
    })
    .catch((error)=>{

     })

  }

}
