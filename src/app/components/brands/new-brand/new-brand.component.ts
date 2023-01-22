import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mark } from 'src/app/models/mark';
import { AlertsService } from 'src/app/services/alerts.service';
import { MarksService } from 'src/app/services/marks.service';

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.scss']
})
export class NewBrandComponent implements OnInit {

  addMarkForm!: FormGroup;
  errorMessage!: string;
  submitted: boolean = false;
  marks! : Mark[]

  constructor(private _alertsService : AlertsService,private _router: Router,private _fb: FormBuilder,private _marksService : MarksService) { }

  ngOnInit(): void {
    //Initialiser le formulaire
    this.addMarkForm = this._fb.group({
      name : this._fb.control('',Validators.required),
    });
  }

  add(){
    this.submitted = true;

    if (this.addMarkForm.valid) {

      const name  = this.addMarkForm.get('name')?.value ;

      const mark = {
        name : name,
      }

      this._marksService.add(mark)
      .then((message)=>{
        this.submitted = false;
        this.addMarkForm.reset()
        this._alertsService.success(message,
        {
          autoClose: true,
          keepAfterRouteChange: true,
        })
        // this._router.navigate(["/parametres/agences-de-distribution"])
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

}
