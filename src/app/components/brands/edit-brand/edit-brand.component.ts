import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mark } from 'src/app/models/mark';
import { AlertsService } from 'src/app/services/alerts.service';
import { MarksService } from 'src/app/services/marks.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {

  editMarkForm!: FormGroup;
  submitted: boolean = false;
  mark! : Mark;

  constructor(private _route : ActivatedRoute,private _fb : FormBuilder,private _alertsService : AlertsService,private _router: Router,private _marksService : MarksService) { }

  ngOnInit(): void {
    //Initialiser le formulaire
    this.editMarkForm = this._fb.group({
      name : this._fb.control('',Validators.required),
    })

    this._marksService.marks$.subscribe(
      (marks)=>{
        const id = this._route.snapshot.params["id"];
        this.mark = marks?.find( mark => mark._id == id )!

        this.editMarkForm.get('name')?.setValue(this.mark?.name);
      }
    )
  }

  modify(){
    this.submitted = true;

    if(this.editMarkForm.valid){

      const name = this.editMarkForm.get('name')?.value;


      const mark = {
        _id : this.mark._id,
        name : name
      }


      this._marksService.modify(mark)
      .then((message)=>{
        this.submitted = false;
        this._alertsService.success(message,
          {
            autoClose: true,
            keepAfterRouteChange: true,
          })
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
