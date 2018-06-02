import { Component, OnInit } from '@angular/core';
import {Question,Exam} from '../../../../models/index.classes';
import {ExamsService} from '../../../../services/exams.service';
import {ActivatedRoute,Params} from '@angular/router'
import {FormControl,FormGroup, Validators,FormArray} from '@angular/forms'

import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styles: []
})
export class NewExamComponent {
  //Data
  exam:Exam;
  forma:FormGroup;
  questions:Question[]=[];

  //Control
  editMode:boolean;


  constructor(private _es:ExamsService,public activatedRoute:ActivatedRoute) {
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
    activatedRoute.params.subscribe((params)=>{
      //console.log(params)
      this.initForm(params['id']);
    });

  }

  initForm(id:string){
    if(id=="0"){
      this.editMode=false;
    }else {
      this.editMode=true;
      this.loadData();
    }
  }

  loadData(){
    //ir por datos al servicio
    //cargar la Forma
    //mandar las preguntas al componente hijo
  }



  guardarCambios(){
    if (!this.forma.valid){
      this.showAlert("Error!","Hay datos aun por completar","error");
      return;
    }

    if(this.questions.length<=0){
        this.showAlert("Error!","No has agregado ninguna pregunta, debes agregar al menos una","error");
      return;
    }

    let datos = this.forma.value;
    let name = datos.name;
    let desc=datos.desc;
    let autor = "current_user"; //obtener user desde servicio de autenticacion
    let viewer = datos.viewer;
    let shuffle = datos.shuffle
    let newExam = new Exam(name,desc,autor,viewer,shuffle);
    newExam.questions = this.questions;

    //Guardar en servicio
    let examId =this._es.saveExam(newExam);
    console.log(examId);

  }

  setViewer(viewer:string){
    this.forma.get('viewer').setValue(viewer);
  }

  updateQuestionsArray(obj){
    let idx = obj.idx;
    if(idx<0){
      this.questions.push(obj.question);
    }else{
      this.questions[idx]=obj.question;
    }

  }

  deleteQuestion(idx){
      this.questions.splice(idx,1);
  }

  showAlert(title:string,msg:string,type:any){
    Swal(title,msg,type)
  }





}
