import { Component, OnInit,ViewChild } from '@angular/core';
import {Question,Exam} from '../../../../models/index.classes';
import {ExamsService} from '../../../../services/exams.service';
import {ActivatedRoute,Params} from '@angular/router'
import {FormControl,FormGroup, Validators,FormArray} from '@angular/forms'
import {AddQuestionComponent} from './add-question.component'
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styles: []
})
export class NewExamComponent {
  @ViewChild(AddQuestionComponent) questionsComponent: AddQuestionComponent;
  //Data
  exam:Exam;
  forma:FormGroup;
  questions:Question[]=[];

  //Control
  editMode:boolean;
  isLoading:boolean=false;
  modalMsg:string="";
  modalType:string="";

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

    if(this._es.usuario.uid===undefined){
      this.showAlert("Error!","No has iniciado sesion","error");
      return;
    }

    this.isLoading=true;
    this.modalMsg="Espere por favor, estamos procesando la solicitud...";
    this.modalType="info";

    let datos = this.forma.value;
    let name = datos.name;
    let desc=datos.desc;
    let autor = this._es.usuario.uid //obtener user desde servicio de autenticacion
    let viewer = datos.viewer;
    let shuffle = datos.shuffle
    let newExam = new Exam(name,desc,autor,viewer,shuffle);
    newExam.questions = this.questions;

    //Guardar en servicio
    $('#waitWindow').modal();
    this._es.saveExam(newExam,(examId)=>{
      this.isLoading=false;
      console.log(examId);
      this.modalType="success";
      this.modalMsg="Todo bien! El examen se dio de alta con exito en la base de datos";
      this.clearForm();
      //this.showAlert("Todo bien!","El examen se dio de alta con exito en la base de datos","success");
    },(error)=>{
      this.isLoading=false;
      this.modalMsg=error;
      this.modalType="danger";
      //this.showAlert("Error!",error,"error");
    }
  );


  }

  clearForm(){
    this.forma.reset();
    this.questions=[];
    this.questionsComponent.clearQuestionForm(true);
  }

  dismissModal(){
    //$('#waitWindow').hide();
    $('#waitWindow').modal('toggle');
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
