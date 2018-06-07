import { Component, OnInit,ViewChild } from '@angular/core';
import {Question,Exam} from '../../../../models/index.classes';
import {ExamsService} from '../../../../services/exams.service';
import {AlertService} from '../../../../services/alert.service';
import {ActivatedRoute,Params,Router} from '@angular/router'
import {FormControl,FormGroup, Validators,FormArray} from '@angular/forms'
import {AddQuestionComponent} from './add-question.component'


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
  id:string;

  //Control
  editMode:boolean;
  isLoading:boolean=false;
  modalMsg:string="";
  modalType:string="";

  constructor(private _es:ExamsService,
              public activatedRoute:ActivatedRoute,
              public router:Router,
              public alert:AlertService
            ) {
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
    this.id=id;
    if(id=="0"){
      this.editMode=false;
      this.clearForm();
    }else {
      this.editMode=true;
      this.loadData();
    }
  }

  loadData(){
    //ir por datos al servicio
    this._es.getExamById(this.id).subscribe((response)=>{
      //console.log(response);
      if(response.ok){
        this.exam=response.data;
        this.loadForm();
      }
    });
  }

  loadForm(){
    //cargar la Forma
    this.forma.get('name').setValue(this.exam.name);
    this.forma.get('desc').setValue(this.exam.desc);
    this.forma.get('viewer').setValue(this.exam.viewer);
    this.forma.get('shuffle').setValue(this.exam.shuffle);
    this.questions = this.exam.questions;

    //mandar las preguntas al componente hijo
    let highestOrderCode=0;
    for (let question of this.questions){
      if(question.orderCode>highestOrderCode){
        highestOrderCode=question.orderCode;
      }
    }
    this.questionsComponent.loadQuestions(this.questions,++highestOrderCode);
  }

  validateForm(){
    if (!this.forma.valid){
      this.alert.showAlert("Error!","Hay datos aun por completar","error");
      return false;
    }

    if(this.questions.length<=0){
        this.alert.showAlert("Error!","No has agregado ninguna pregunta, debes agregar al menos una","error");
      return false;
    }

    if(this._es.usuario.uid===undefined){
      this.alert.showAlert("Error!","No has iniciado sesion","error");
      return false;
    }

    return true;
  }

  getExamObject(){
    let datos = this.forma.value;
    let name = datos.name;
    let desc=datos.desc;
    let autor = this._es.usuario.uid //obtener user desde servicio de autenticacion
    let viewer = datos.viewer;
    let shuffle = datos.shuffle
    let examObj = new Exam(name,desc,autor,viewer,shuffle);
    examObj.questions = this.questions;
    return examObj;
  }

  guardarCambios(){
    if (!this.validateForm()){
      return;
    }

    let newExam = this.getExamObject();

    //Guardar en servicio
    this.alert.showWaitWindow();
    this._es.saveExam(newExam).subscribe((response)=>{
      this.alert.closeWaitWindow();
      if(response.ok){
        let msg = `Todo bien! El examen se creó con exito en la base de datos. El id es ${response.examId}`;
        this.alert.showAlert("Excelente!",msg,"success");
        this.clearForm();
      }else {
        this.alert.showAlert("Error!",response.error,"error");
      }

    });
  }

  updateExam(){
    if (!this.validateForm()){
      return;
    }

    let updatedExam =  this.getExamObject();

    //Guardar en servicio
    this.alert.showWaitWindow();
    this._es.updateExam(updatedExam,this.id).subscribe((response)=>{
      this.alert.closeWaitWindow();
      if(response.ok){
        let msg = `Todo bien! El examen se actualizó con exito en la base de datos. El id es ${response.examId}`;
        this.alert.showAlertWithCallback("Excelente!",msg,"success",()=>{
            this.router.navigate(['/exams/my-exams'])
        });
        this.clearForm();
      }else {
        this.alert.showAlert("Error!",response.error,"error");
      }
    });
  }

  deleteExam(){
    this.alert.showChooseWindow('Estas seguro?','No sera posible recuperar este exámen').then((result) => {
      if (result.value) {
        this.deleteExamInService();
      }
    });
  }

  deleteExamInService(){
    let updatedExam = this.getExamObject();
    this.alert.showWaitWindow();
    this._es.deleteExam(updatedExam,this.id).subscribe((response)=>{
      if(response.ok){
        let msg = `Todo bien! El examen se eliminó con exito en la base de datos`;
        this.alert.showAlertWithCallback("Excelente!",msg,"success",()=>{
            this.router.navigate(['/exams/my-exams'])
        });
        this.clearForm();
      }else {
        this.alert.showAlert("Error!",response.error,"error");
      }
    });
  }

  clearForm(){
    this.forma.reset();
    this.questions=[];
    if(this.questionsComponent){
      this.questionsComponent.clearQuestionForm(true);
    }

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

}
