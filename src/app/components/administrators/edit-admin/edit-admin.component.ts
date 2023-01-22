import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {

  type : string = 'modifier-mes-informations-personnelles';

  constructor(private _route : ActivatedRoute) { }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params : any) => this.type= params.params.type);
  }

}
