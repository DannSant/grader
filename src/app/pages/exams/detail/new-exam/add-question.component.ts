import {Question} from '../../../../models/index.classes';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AlertService} from '../../../../services/alert.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styles: []
})
export class AddQuestionComponent implements OnInit {

  @Output() addQuestionEvent:EventEmitter<any>;
  @Output() deleteQuestionEvent:EventEmitter<number>;

  //Preguntas
  questions:Question[]=[];
  questionDesc:string;
  questionOrderCode:number=1;
  questionType:number;
  questionKeywords:string[]=[];
  questionAnswers:string[]=[];
  questionCorrectAnswer:number;
  booleanCorrectAnswer:boolean;

  //validation form
  validForm:boolean=true;
  invalidMsg:string="";
  validAnswer:boolean=true;
  invalidAnswerMsg:string="";

  //FormControl
  isEditing:boolean=false;
  editedIndex:number = -1;

  //answers
  currentAnswer:string="";
  currentKeyword:string="";

  constructor(
    public alert:AlertService
  ) {
  this.addQuestionEvent = new EventEmitter();
  this.deleteQuestionEvent= new EventEmitter();
}

  ngOnInit() {
  }

  /**
  **MANEJO DE PREGUNTAS
  **/

  loadQuestions(questions:Question[],loadedOrderCode:number){
    this.clearQuestionForm(true);
    this.questionOrderCode=loadedOrderCode;
    for(let question of questions){
        this.questions.push(question);
    }
    //this.questions = questions;
  }

  validateAddQuestion():boolean{
    let valid = true;

    if(this.questionDesc=="" || this.questionDesc==undefined){
      console.log(this.questionDesc)
      valid=false;
      this.invalidMsg="La pregunta debe llevar una descripcion";
    }

    if(this.questionOrderCode==0 || this.questionOrderCode==undefined){
      valid=false;
      this.invalidMsg="La pregunta debe llevar codigo de orden de aparicion";
    }

    if(this.questionType==0 || this.questionType==undefined){
      valid=false;
      this.invalidMsg="La pregunta debe tener un tipo";
    }

    if(this.questionType==2 && this.questionAnswers.length<=1){
      valid=false;
      this.invalidMsg="Si la pregunta es de opcion multiple, debes agregar al menos dos respuestas";
    }

    if(this.questionType==2 && (this.questionCorrectAnswer<0||this.questionCorrectAnswer==undefined)){
      valid=false;
      this.invalidMsg="Si la pregunta es de opcion multiple, debes agregar al menos una respuesta correcta";
    }

    if(this.questionType==1 && this.questionKeywords.length<=1){
      valid=false;
      this.invalidMsg="Si la pregunta es abierta, debes agregar al menos una palabra clave";
    }

    this.validForm=valid;

    return valid;

  }

  addQuestion(){

    if(this.validateAddQuestion()){
      let newQuestion:Question = new Question();
      newQuestion.desc=this.questionDesc;
      newQuestion.orderCode=this.questionOrderCode;
      newQuestion.type=this.questionType;
      newQuestion.answers=this.questionAnswers;
      newQuestion.keywords=this.questionKeywords;
      if(this.questionType==3){
          newQuestion.correctAnswerIdx = this.booleanCorrectAnswer?1:0;
      }else {
          newQuestion.correctAnswerIdx=this.questionCorrectAnswer;
      }


      this.questions.push(newQuestion);
      this.addQuestionEvent.emit({
        idx:-1,
        question:newQuestion
      });

      this.clearQuestionForm();
    }
  }

  clearQuestionForm(reset=false){
      //console.log("clearing")
      if(reset){
        this.questionOrderCode=1;
        this.questions=[];
      }else {
        this.questionOrderCode++;
      }
      this.validForm=true;
      this.invalidMsg="";
      this.questionDesc="";
      this.questionType=0;
      this.questionAnswers=[];
      this.questionKeywords=[];
      this.questionCorrectAnswer=-1;
      this.booleanCorrectAnswer=false;
      this.isEditing=false;
      this.editedIndex=-1;
  }

  setQuestionType(type:number){
    this.questionType=type;
    this.questionKeywords=[];
    this.questionAnswers=[];
    this.questionCorrectAnswer=-1;
  }

  setFormForUpdate(idx){
    this.isEditing=true;
    this.editedIndex=idx;
    let questionToEdit = this.questions[idx];
    this.validForm=true;
    this.invalidMsg="";
    this.questionDesc=questionToEdit.desc;
    this.questionOrderCode=questionToEdit.orderCode;
    this.questionType=questionToEdit.type
    this.questionAnswers=questionToEdit.answers;
    this.questionKeywords=questionToEdit.keywords;
    this.questionCorrectAnswer=questionToEdit.correctAnswerIdx;
    if(this.questionType==3){
      this.booleanCorrectAnswer=  this.questionCorrectAnswer>=1;
    }
  }

  editQuestion(){
    if(this.validateAddQuestion()){
      let editedQuestion:any = this.questions[this.editedIndex];
      editedQuestion.desc=this.questionDesc;
      editedQuestion.orderCode=this.questionOrderCode;
      editedQuestion.type=this.questionType;
      editedQuestion.answers=this.questionAnswers;
      editedQuestion.keyword=this.questionKeywords;
      if(this.questionType==3){
          editedQuestion.correctAnswerIdx = this.booleanCorrectAnswer?1:0;
      }else {
          editedQuestion.correctAnswerIdx=this.questionCorrectAnswer;
      }


      this.questions[this.editedIndex] = editedQuestion;
      this.addQuestionEvent.emit({
        idx:this.editedIndex,
        question:editedQuestion
      });

      this.clearQuestionForm();
    }
  }

  removeQuestion(idx){
    this.alert.showChooseWindow( 'Estas seguro?','No sera posible recuperar esta pregunta!')
      .then((result) => {
        if (result.value) {
          this.questions.splice(idx,1);
          this.deleteQuestionEvent.emit(idx);
          this.alert.showAlert('Eliminada!','La pregunta ha sido borrada con éxito.','success')
        }
      });
  }


  /**
  **MANEJO DE RESPUESTAS
  **/
  addAnswer(){
    let tmpAnswer = this.currentAnswer;
    if(tmpAnswer=="" || tmpAnswer==undefined){
      this.validAnswer=false;
      this.invalidAnswerMsg="La descripcion de la respuesta debe contener algun valor";
      return;
    }
    this.questionAnswers.push(tmpAnswer);
    this.currentAnswer="";
    this.validAnswer=true;
    this.invalidMsg="";
  }

  setAsCorrectAnswer(idx){
    this.questionCorrectAnswer=idx;
  }

  removeAnswer(idx){
    if(this.questionCorrectAnswer>idx){
      this.questionCorrectAnswer--;
    }
    this.questionAnswers.splice(idx, 1);
  }

  addKeyword(){
    let tmpKeyword = this.currentKeyword;
    if(tmpKeyword=="" || tmpKeyword==undefined){
      this.validAnswer=false;
      this.invalidAnswerMsg="La palabra clave no puede ir vacia";
      return;
    }
    this.questionKeywords.push(tmpKeyword);
    this.currentKeyword="";
    this.validAnswer=true;
    this.invalidMsg="";
  }

  removeKeyword(idx){
    this.questionKeywords.splice(idx, 1);
  }


}
