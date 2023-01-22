import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminsService } from 'src/app/services/admins.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-single-admin',
  templateUrl: './single-admin.component.html',
  styleUrls: ['./single-admin.component.scss']
})
export class SingleAdminComponent implements OnInit {

  admin!: Admin;

  constructor(private _route : ActivatedRoute,private _alertsService : AlertsService,private _router: Router,private _adminsService : AdminsService) { }

  ngOnInit(): void {
    this._adminsService.admins$.subscribe(
      (admins : Admin[])=>{
        const id = this._route.snapshot.params["id"];
        this.admin = admins?.find( admin => admin._id == id )!
      }
    )
  }

  //Récuperer les initiales de l'admin
  getInitials(admin : Admin){
    const firstLetter = admin.firstname[0].toUpperCase()
    const secondLetter = admin.lastname[0].toUpperCase()
    return firstLetter+secondLetter
  }

  isDisabled(admin : Admin){
    // const isVisible = e.target.checked;
    const isDisabled = admin.isDisabled ? false : true;
    this._adminsService.isDisabled(isDisabled,admin._id!)
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
