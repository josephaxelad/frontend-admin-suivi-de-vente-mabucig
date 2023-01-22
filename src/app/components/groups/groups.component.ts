import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { AlertsService } from 'src/app/services/alerts.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups! : Group[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _groupsService : GroupsService) { }

  ngOnInit(): void {
    this._groupsService.groups$.subscribe(
      (groups)=>{
        this.groups = groups
      }
    )
  }

  //Supprimer définitivement
  deleteHard(group : Group){
    this._groupsService.deleteHard(group._id!)
    .then((message)=>{
      this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        });
      this._router.navigate(["/parametres/groupes"])
    })
    .catch((error)=>{

     })

  }

}
