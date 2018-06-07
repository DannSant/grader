import { Component, OnInit } from '@angular/core';
import {Exam} from '../../../../models/index.classes';
import {ExamsService} from '../../../../services/exams.service';
import {AlertService} from '../../../../services/alert.service';

@Component({
  selector: 'app-my-exams',
  templateUrl: './my-exams.component.html',
  styles: []
})
export class MyExamsComponent implements OnInit {

  myExams:Exam[] =[];

  //Control
  isLoading:boolean=false;
  modalMsg:string="";
  modalType:string="";

  constructor(private _es:ExamsService,  public alert:AlertService) {

  }

  ngOnInit() {
    this.alert.showWaitWindow();
    this._es.loadUserExams().subscribe((response)=>{
      this.alert.closeWaitWindow();
      if(!response.ok){
        this.alert.showAlert("Error",response.error,"error");
      }
    });
  }

}
