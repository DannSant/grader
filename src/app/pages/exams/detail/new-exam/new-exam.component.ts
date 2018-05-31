import { Component, OnInit } from '@angular/core';

import {ExamsService} from '../../../../services/exams.service';

import {FormControl,FormGroup, Validators,FormArray} from '@angular/forms'


@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styles: []
})
export class NewExamComponent implements OnInit {
  forma:FormGroup;
  questions:any[]=[];
  constructor(private _es:ExamsService) {
    this.forma = new FormGroup({

      'name': new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      'desc': new FormControl('',[
        Validators.required
      ]),
      'shuffle': new FormControl(''),
      'viewer': new FormControl('',[
        Validators.required
      ])
    });
  }

  guardarCambios(){
    if (!this.forma.valid){
      console.log("Hay datos aun por completar");
      return;
    }

    if(this.questions.length<=0){
      console.log("Debes agregar al menos una pregunta");
      return;
    }
    console.log("Submit!");
  }

  setViewer(viewer:string){
    this.forma.get('viewer').setValue(viewer);
  }



  ngOnInit() {
  }

}
