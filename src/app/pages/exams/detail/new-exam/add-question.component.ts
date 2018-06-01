import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styles: []
})
export class AddQuestionComponent implements OnInit {

  @Output() addQuestionEvent:EventEmitter<any>;

  //Preguntas
  questions:any[]=[];
  questionDesc:string;
  questionOrderCode:number=1;
  questionType:number;
  questionKeywords:string[]=[];
  questionAnswers:string[]=[];
  questionCorrectAnswer:number;

  //validation form
  validForm:boolean=true;
  invalidMsg:string="";
  validAnswer:boolean=true;
  invalidAnswerMsg:string="";

  //answers
  currentAnswer:string="";
  currentKeyword:string="";

  constructor() { }

  ngOnInit() {
  }

  validateAddQuestion():boolean{
    console.log("validando")
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

    if(this.questionType==2 && (this.questionCorrectAnswer<=0||this.questionCorrectAnswer==undefined)){
      valid=false;
      this.invalidMsg="Si la pregunta es de opcion multiple, debes agregar al menos una respuesta correcta";
    }

    this.validForm=valid;

    return valid;

  }

  addQuestion(){
    if(this.validateAddQuestion()){
      let newQuestion:any = {};
      newQuestion.desc=this.questionDesc;
      newQuestion.orderCode=this.questionOrderCode;
      newQuestion.type=this.questionType;
      newQuestion.answers=this.questionAnswers;

      this.questions.push(newQuestion);

      this.clearQuestionForm();
    }
  }

  setQuestionType(type:number){
    this.questionType=type;
    this.questionKeywords=[];
    this.questionAnswers=[];
    this.questionCorrectAnswer=-1;
  }

  clearQuestionForm(){
      this.validForm=true;
      this.invalidMsg="";
      this.questionDesc="";
      this.questionOrderCode++;
      this.questionType=0;
      this.questionAnswers=[];
  }

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
