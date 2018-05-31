import { Injectable } from '@angular/core';
import {Exam} from '../models/index.classes';

@Injectable()
export class ExamsService {

  myExams:Exam[] = [
    {
      id:1,
      name:"Basico de Java",
      desc:"Examen basico de Java de la unitec",
      author:"William",
      viewer:"everyone",
      questions:null,
      shuffle:false,
      url:''
    },
    {
      id:2,
      name:"Basico de BD",
      desc:"Examen basico de BD de la unitec",
      author:"William",
      viewer:"everyone",
      questions:null,
      shuffle:false,
      url:''
    },
    {
      id:3,
      name:"Basico de Desarrollo Web",
      desc:"Examen basico de Desarrollo web de la unitec",
      author:"Larry",
      viewer:"everyone",
      questions:null,
      shuffle:false,
      url:''
    },
    {
      id:4,
      name:"Java avanzado",
      desc:"Networking, sockets, interfaces y modelado",
      author:"Larry",
      viewer:"everyone",
      questions:null,
      shuffle:false,
      url:''
    }
  ]

  constructor() { }

}
