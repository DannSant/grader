import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  name:string;
  email:string;
  password1:string;
  password2:string;

  constructor(
    public alert:AlertService,
    public login:LoginService
  ) { }

  ngOnInit() {
  }

  validate(){
    if(this.name=="" || this.name==undefined){
      this.alert.showAlert("Error","El nombre no puede ir vacio","error");
      return false;
    }

    if(this.email=="" || this.email==undefined){
      this.alert.showAlert("Error","El email no puede ir vacio","error");
      return false;
    }

    if(this.password1=="" || this.password1==undefined){
      this.alert.showAlert("Error","El password no puede ir vacio","error");
      return false;
    }

    if(this.password2=="" || this.password2==undefined){
      this.alert.showAlert("Error","Debes repetir el password","error");
      return false;
    }

    if(this.password1!=this.password2){
      this.alert.showAlert("Error","Los passwords no coinciden","error");
      return false;
    }

    return true;

  }

  register(){
    if(!this.validate()){
      return;
    }

    

  }

}
