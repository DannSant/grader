import { Component, OnInit } from '@angular/core';

import {Exam} from '../../../../models/index.classes';

@Component({
  selector: 'app-my-exams',
  templateUrl: './my-exams.component.html',
  styles: []
})
export class MyExamsComponent implements OnInit {

  myExams:Exam[] = [
    {
      name:"Basico de Java",
      desc:"Examen basico de Java de la unitec",
      author:"William",
      viewer:"everyone",
      questions:null,
      shuffle:false
    },
    {
      name:"Basico de BD",
      desc:"Examen basico de BD de la unitec",
      author:"William",
      viewer:"everyone",
      questions:null,
      shuffle:false
    },
    {
      name:"Basico de Desarrollo Web",
      desc:"Examen basico de Desarrollo web de la unitec",
      author:"Larry",
      viewer:"everyone",
      questions:null,
      shuffle:false
    },
    {
      name:"Java avanzado",
      desc:"Networking, sockets, interfaces y modelado",
      author:"Larry",
      viewer:"everyone",
      questions:null,
      shuffle:false
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
