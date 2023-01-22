import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend-admin-suivi-de-vente-mabucig';

  constructor(private _router: Router){
  //   _router.events.subscribe((val) => {
  //     // see also
  //     this.loadScript('assets/js/custom.js');
  //     // console.log(val instanceof NavigationEnd)
  // });
  }

  ngOnInit() {
    // this.loadScript('assets/js/custom.js');
  }


}
