import { Component, OnInit,ViewChild } from '@angular/core';
import {ExamsService} from '../../../services/exams.service';
import {AlertService} from '../../../services/alert.service';
import {ActivatedRoute,Params,Router} from '@angular/router'
import {Question,Exam} from '../../../models/index.classes';
import {QuestionDisplayerComponent} from './question-displayer.component'
@Component({
  selector: 'app-exam-viewer',
  templateUrl: './exam-viewer.component.html',
  styles: []
})
export class ExamViewerComponent implements OnInit {
  @ViewChild(QuestionDisplayerComponent) questionDisplay:QuestionDisplayerComponent ;
  //exam data
  exam:Exam;
  questions:Question[]=[];
  currentQuestion:Question;
  currentQuestionIndex:number;
  userAnswers:any[]=[];
  result:number=0;

  //user data
  name:string;
  lastName:string;
  userId:string

  //Control
  startedExam:boolean=false;
  finishedExam:boolean=false;


  constructor(private _es:ExamsService,
              public activatedRoute:ActivatedRoute,
              public router:Router,
              public alert:AlertService) {


                this.activatedRoute.params.subscribe((params)=>{

                  let examId = params['id'];

                  this._es.getExamById(examId).subscribe((response)=>{
                    if(!response.ok){
                      this.alert.showAlert("Error","Error al cargar el examen","error");
                    }

                    this.exam=response.data;

                    this.initForm();
                  },(error)=>{
                    if(error.message) console.log(error.message);
                    this.alert.showAlert("Error","Error al cargar el examen","error");
                  })

                });
              }

  ngOnInit() {

  }

  initForm(){
    this.initQuestions();
    this.startedExam=false;
    this.name="";
    this.lastName="";
    this.userId="";
    this.currentQuestion=null;
    this.currentQuestionIndex=0;
  }

  initQuestions(){
    this.questions = [];
    if(this.exam.shuffle){
        this.questions = this.shuffle(this.questions);
    }else {
      this.questions = this.exam.questions.sort(function(item1:Question,item2:Question){
        return item1.orderCode - item2.orderCode;
      });
    }
  }

  startExam(){
    if(this.name=="" || this.name ==undefined || this.lastName=="" || this.lastName==undefined){
      this.alert.showAlert("Error","No puedes dejar vacios nombre y apellido","error");
      return;
    }
    this.startedExam=true;
    this.currentQuestionIndex=0;
    this.setQuestion( this.currentQuestionIndex);
  }

  setQuestion(idx:number){
    this.currentQuestion=this.exam.questions[idx];
    this.questionDisplay.setupQuestion(this.currentQuestion);
  }

  nextQuestion(event){
    console.log(event);
    this.userAnswers.push(event);
    if(this.currentQuestionIndex>=this.exam.questions.length-1){
      this.startedExam=false;
      this.finishedExam=true;
      this.setQuestion( null);
      this.calculateResult();
    }else {
      this.currentQuestionIndex++;
      this.setQuestion(  this.currentQuestionIndex);
    }

  }

  calculateResult(){
    let totalQuestions = this.exam.questions.length;
    let totalCorrects = 0;
    for(let answer of this.userAnswers){
      if(answer.correct){
        totalCorrects++;
      }
    }

    this.result = totalCorrects/totalQuestions;
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}



}
