import { Component, OnInit,Output, EventEmitter } from '@angular/core';

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
  question:any;
  constructor() {
    this.nextQuestionEvent = new EventEmitter();
   }

  ngOnInit() {
  }

  setupQuestion(question:any){
    this.question=question;
  }

  nextQuestion(){
    console.log(this.optionAnswer);
    console.log(this.openAnswer);
    console.log(this.booleanAnswer);
    this.nextQuestionEvent.emit({});
  }

  setAsCorrectAnswer(idx){
    this.optionAnswer=idx;
  }

}
