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
  currentQuestion:Question;
  currentQuestionIndex:number;

  //user data
  name:string;
  lastName:string;
  userId:string

  //Control
  startedExam:boolean=false;



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
                  })

                });
              }

  ngOnInit() {

  }

  initForm(){
    this.startedExam=false;
    this.name="";
    this.lastName="";
    this.userId="";
    this.currentQuestion=null;
    this.currentQuestionIndex=0;
  }

  startExam(){
      this.startedExam=true;
      this.currentQuestionIndex=0;
      this.setQuestion( this.currentQuestionIndex);
  }

  setQuestion(idx:number){
    this.currentQuestion=this.exam.questions[idx];
    this.questionDisplay.setupQuestion(this.currentQuestion);
  }

  nextQuestion(event){
    this.currentQuestionIndex++;
    this.setQuestion(  this.currentQuestionIndex);
  }



}
