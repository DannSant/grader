import { Injectable } from '@angular/core';
import {Exam,Question} from '../models/index.classes';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { AngularFirestore ,AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
//import * as admin from 'firebase-admin';
//import * as serviceAccount from '../../accountKey.json';

@Injectable()
export class ExamsService {

  dbUrl = "http://localhost:3000/exam";
  items: AngularFirestoreCollection<Exam>;
  myExams:Exam[]=[];

  public usuario:any={};

  constructor(public http:HttpClient,
              public db: AngularFirestore,
              public afAuth: AngularFireAuth
            ) {
    //Verficar estado de autenticacion
    this.afAuth.authState.subscribe(user=>{
      //console.log(user);
      if(!user){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid=user.uid;
    });
  }

  login(proveedor:string,onSuccess,onError) {
    if(proveedor=='google'){
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result)=>{
          if( result.user.uid!=undefined){
            onSuccess();
          }
        }).catch((error)=>{
          onError();
        });

    }

  }

  logout() {
    this.usuario={};
    this.afAuth.auth.signOut();
  }

  isAuthenticated(){
    return this.usuario.uid != undefined;
  }

  loadUserExams(){
    this.myExams=[];
    let url = `${this.dbUrl}?queryType=2&uid=${this.usuario.uid}`;

    return this.http.get(url).map((response:any)=>{
      //console.log(response);
      if(response.ok){
        this.myExams=response.data;
      }else {
          this.myExams=[];
          console.error(response.error);
      }

      let result = {ok:response.ok,data:response.data,error:"Ocurrio un error al cargar los examenes"};
      return result;
    })
  }

  saveExam(exam:Exam){
    let body = JSON.stringify(exam);
    let headers = new HttpHeaders({
      'Content-type':'application-json'
    });
    //console.log(body);
    return this.http.post(this.dbUrl,exam).map((resultado:any)=>{
      //console.log(resultado);
      let response = {ok:resultado.ok,examId:resultado.data._id,error:"Ocurrio un error al ejecutar al dar de alta el examen"}
      if (resultado.error){
        console.error(resultado.error)
      }
      return response;
    });
  }

  getExamById(id:string):Observable<any>{
    this.myExams=[];
    let url = `${this.dbUrl}/${id}`;

    return this.http.get(url).map((response:any)=>{

      if(!response.ok){
        console.error(response.error);
      }

      let result = {ok:response.ok,data:response.data,error:"Ocurrio un error al cargar los datos del examen"};
      return result;
      })

  }


  updateExam(exam:Exam,id:string){
    let url = `${this.dbUrl}/${id}`;
    return this.http.put(url,exam).map((resultado:any)=>{
      //console.log(resultado);
      let response = {ok:resultado.ok,examId:resultado.data._id,error:"Ocurrio un error al ejecutar al actualizar el examen"}
      if (resultado.error){
        console.error(resultado.error)
      }
      return response;
    });
  }

  deleteExam(exam:Exam,id:string){
    let url = `${this.dbUrl}/delete/${id}`;
    let options = new RequestOptions({
       body: exam
    })
    return this.http.post(url,options).map((resultado:any)=>{
      //console.log(resultado);
      let response = {ok:resultado.ok,examId:resultado.data._id,error:"Ocurrio un error al borrar el examen"}
      if (resultado.error){
        console.error(resultado.error)
      }
      return response;
    });
  }
  //
  // loadUserExamsFromFirebase(){
  //   this.myExams=[];
  //   this.items = this.db.collection<Exam>('exams');
  //   return this.items.snapshotChanges().map((actions)=>{
  //     //console.log(actions)
  //     return actions.map((a)=>{
  //       //console.log(a.payload);
  //       const data = a.payload.doc.data() as Exam;
  //       const id = a.payload.doc.id;
  //       data.id=id;
  //
  //       if(data.author==this.usuario.uid){
  //         this.myExams.push(data);
  //       }
  //
  //     })
  //     //this.myExams=exams;
  //   })
  // }

  //
  // loadExams(){
  //   this.myExams=[];
  //   this.items = this.db.collection<Exam>('exams');
  //   return this.items.snapshotChanges().map((actions)=>{
  //     //console.log(actions)
  //     return actions.map((a)=>{
  //       //console.log(a.payload);
  //       const data = a.payload.doc.data() as Exam;
  //       const id = a.payload.doc.id;
  //       data.id=id;
  //       this.myExams.push(data);
  //     })
  //     //this.myExams=exams;
  //   })
  // }



  // saveExamInFireBase(exam:Exam,onSuccess,onError){
  //   let obj = {
  //     name:exam.name,
  //     desc:exam.desc,
  //     author:exam.author,
  //     viewer:exam.viewer,
  //     shuffle:exam.shuffle,
  //     creationDate:exam.creationDate
  //   }
  //
  //   this.db.collection('exams').add(obj).then((data)=>{
  //     let examId = data.id;
  //     //console.log(examId);
  //     for(let question of exam.questions){
  //
  //       let answers = question.answers;
  //       let keywords = question.keywords;
  //       let questionObj = {
  //         desc:question.desc,
  //         orderCode:question.orderCode,
  //         type:question.type,
  //         correctAnswerIdx:question.correctAnswerIdx
  //       }
  //       this.db.collection('exams').doc(`${examId}`).collection('questions').add(questionObj).then((questionData)=>{
  //           let questionId = questionData.id;
  //           let arrayToSave = question.type==1? keywords:answers;
  //           let collectionToSave = question.type==1? 'keywords':'answers';
  //           this.db.collection('exams').doc(`${examId}`)
  //                     .collection('questions').doc(`${questionId}`)
  //                       .collection(collectionToSave).add({keywords:arrayToSave}).then((kwData)=>{
  //                         exam.id = examId;
  //                         this.myExams.push(exam);
  //                         onSuccess(examId);
  //                       }).catch((e)=>{
  //                         onError("Ocurrio un problema al dar de alta las ", collectionToSave);
  //                         console.error(e);
  //                       });
  //
  //
  //       }).catch((e)=>{
  //         onError("Ocurrio un problema al dar de alta las preguntas");
  //         console.error(e);
  //       })
  //     }
  //
  //   }).catch((e)=>{
  //     onError("Ocurrio un problema al dar de alta el examen");
  //     console.error(e);
  //   })


    // return this.http.post(this.dbUrl,body,{headers}).map((response)=>{
    //   console.log(response);
    //   return response;
    // });

  // }


}
