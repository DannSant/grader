import { Injectable } from '@angular/core';
import {Exam,Question} from '../models/index.classes';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import { AngularFirestore ,AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class ExamsService {

  dbUrl = "https://grader-14d39.firebaseio.com/exams";
  items: AngularFirestoreCollection<Exam>;
  myExams:Exam[];
  // myExams:Exam[] = [
  //   {
  //     id:1,
  //     name:"Basico de Java",
  //     desc:"Examen basico de Java de la unitec",
  //     author:"William",
  //     viewer:"everyone",
  //     questions:null,
  //     shuffle:false,
  //     url:''
  //   },
  //   {
  //     id:2,
  //     name:"Basico de BD",
  //     desc:"Examen basico de BD de la unitec",
  //     author:"William",
  //     viewer:"everyone",
  //     questions:null,
  //     shuffle:false,
  //     url:''
  //   },
  //   {
  //     id:3,
  //     name:"Basico de Desarrollo Web",
  //     desc:"Examen basico de Desarrollo web de la unitec",
  //     author:"Larry",
  //     viewer:"everyone",
  //     questions:null,
  //     shuffle:false,
  //     url:''
  //   },
  //   {
  //     id:4,
  //     name:"Java avanzado",
  //     desc:"Networking, sockets, interfaces y modelado",
  //     author:"Larry",
  //     viewer:"everyone",
  //     questions:null,
  //     shuffle:false,
  //     url:''
  //   }
  // ]

  constructor(public http:HttpClient,public db: AngularFirestore) {


  }

  loadExams(){
    this.items = this.db.collection<Exam>('exams');
    return this.items.valueChanges().map((exams:Exam[])=>{
      console.log(exams)
      this.myExams=exams;
    })
  }

  saveExam(exam:Exam){

    let obj = {
      name:exam.name,
      desc:exam.desc,
      author:exam.author,
      viewer:exam.viewer,
      shuffle:exam.shuffle
    }


    this.db.collection('exams').add(obj).then((data)=>{
      let examId = data.id;
      //console.log(examId);
      for(let question of exam.questions){
        let questionObj = {
          desc:question.desc,
          orderCode:question.orderCode,
          type:question.type,
          correctAnswerIdx:question.correctAnswerIdx
        }
        this.db.collection('exams').doc(`${examId}`).collection('questions').add(questionObj).then((questionData)=>{

            //this.db.collection('exams').doc(`${examId}`).collection('questions').doc()
            return examId;
        });
      }

    })


    // return this.http.post(this.dbUrl,body,{headers}).map((response)=>{
    //   console.log(response);
    //   return response;
    // });

  }

  updateExam(){

  }

  deleteExam(){

  }

}
