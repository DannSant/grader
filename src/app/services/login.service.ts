import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/index.classes';

@Injectable()
export class LoginService {

  userData:User;
  token:string;
  loginUrl="http://localhost:3000";


  constructor(public http:HttpClient) { }


  login(user:string,password:string){
    let url = `${this.loginUrl}/user`;
    let body = {
      user,
      password
    }
    return this.http.post(this.loginUrl,body).map((response:any)=>{
      if(response.ok){
        this.userData=response.user;
        this.token=response.token;
        return {ok:true,message:null,error:null}
      }else {
        this.userData=undefined
        this.token=undefined;
        return {ok:false,message:response.error.message,error:response.error}
      }

    });
  }

  register(user:User){
    let url = `${this.loginUrl}/register`;
    return this.http.post(this.loginUrl,user).map((response:any)=>{
      if(response.ok){
        this.userData=response.user;
        this.token=response.token;
        return {ok:true,message:null,error:null}
      }else {
        this.userData=undefined
        this.token=undefined;
        return {ok:false,message:response.error.message,error:response.error}
      }

    });
  }





}
