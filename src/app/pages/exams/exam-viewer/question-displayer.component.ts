import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import {Question} from '../../../models/index.classes';
import {AlertService} from '../../../services/alert.service';


@Component({
  selector: 'app-question-displayer',
  templateUrl: './question-displayer.component.html',
  styles: []
})
export class QuestionDisplayerComponent implements OnInit {

  @Output() nextQuestionEvent:EventEmitter<any>;

  optionAnswer:number;
  openAnswer:string;
  booleanAnswer:boolean;
  question:Question;
  constructor(  public alert:AlertService) {
    this.nextQuestionEvent = new EventEmitter();
   }

  ngOnInit() {
  }

  setupQuestion(question:Question){
    this.optionAnswer = undefined;
    this.openAnswer= undefined;
    this.booleanAnswer = undefined;
    this.question=question;
  }

  nextQuestion(){
    let response = {};
    let invalidAnswer=false;;

    if(this.question.type==1){
      let correct = this.isOpenAnswerCorrect(this.openAnswer,this.question.keywords);
      invalidAnswer = (this.openAnswer==undefined ||this.openAnswer=="" );
      response = {
        id:this.question._id,
        userAnswer:this.openAnswer,
        correct: correct
      }
    }else if(this.question.type==2){
      invalidAnswer = (this.optionAnswer==undefined || this.optionAnswer<0);
      let correct = this.optionAnswer==this.question.correctAnswerIdx;
      response = {
        id:this.question._id,
        userAnswer:this.optionAnswer,
        correct: correct
      }
    }else if(this.question.type==3){
      invalidAnswer = (this.booleanAnswer==undefined);
      console.log(Boolean(this.booleanAnswer));
      console.log(Boolean(this.question.correctAnswerIdx));
      console.log(Boolean(this.question.correctAnswerIdx==1));
      let correct = Boolean(this.booleanAnswer) == (this.question.correctAnswerIdx==1?true:false);
      response = {
        id:this.question._id,
        userAnswer:this.booleanAnswer,
        correct: correct
      }
    }

    if(invalidAnswer){
      this.alert.showAlert("Error","Debes contestar algo!","error");
      return;
    }

    this.nextQuestionEvent.emit(response);
  }

  setAsCorrectAnswer(idx){
    this.optionAnswer=idx;
  }

  isOpenAnswerCorrect(userAnswer:string,keywords:string[]){
    if(!userAnswer){
      return;
    }
    let correct:boolean;
    let userWords = userAnswer.split(" ");
    let minWords = (keywords.length/2);
    let correctWords:string[]=[];

    keywords = keywords.map((value) =>{
            return value.toLowerCase();
        });

    for(let userWord of userWords){
      userWord=userWord.toLowerCase();
      if(keywords.indexOf(userWord)>=0){
        correctWords.push(userWord);
      }
    }

    correctWords = this.getUniqueWords(correctWords);


    if(correctWords.length>=minWords){
      correct=true;
    }else {
      correct=false;
    }

    return correct;
  }

  getUniqueWords(a){
    let seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

}
