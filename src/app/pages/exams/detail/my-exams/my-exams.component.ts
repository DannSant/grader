import { Component, OnInit } from '@angular/core';

import {Exam} from '../../../../models/index.classes';
import {ExamsService} from '../../../../services/exams.service';
declare var $:any;

@Component({
  selector: 'app-my-exams',
  templateUrl: './my-exams.component.html',
  styles: []
})
export class MyExamsComponent implements OnInit {

  myExams:Exam[] =[];

  //Control
  isLoading:boolean=false;
  modalMsg:string="";
  modalType:string="";

  constructor(private _es:ExamsService) {


  }

  dismissModal(){
    //$('#waitWindow').hide();
    $('#waitWindow').modal('toggle');
  }

  ngOnInit() {
    this.isLoading=true;
    this.modalMsg="Espere por favor, estamos procesando la solicitud...";
    this.modalType="info";
    $('#waitWindow').modal();
    //console.log("iniciando carga");
    this._es.loadUserExams().subscribe((data)=>{
      this.isLoading=false;
      //this.modalMsg="Informacion cargada!";
      //this.modalType="success";
      this.myExams = this._es.myExams;
      //console.log("finalizando carga");
      setTimeout(()=>{
        this.dismissModal();
      },1500)

    });
  }

}
