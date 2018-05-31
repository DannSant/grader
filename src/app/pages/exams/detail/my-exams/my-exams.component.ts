import { Component, OnInit } from '@angular/core';

import {Exam} from '../../../../models/index.classes';
import {ExamsService} from '../../../../services/exams.service';

@Component({
  selector: 'app-my-exams',
  templateUrl: './my-exams.component.html',
  styles: []
})
export class MyExamsComponent implements OnInit {

  myExams:Exam[] =[];

  constructor(private _es:ExamsService) {
    this.myExams = this._es.myExams;
  }

  ngOnInit() {
  }

}
