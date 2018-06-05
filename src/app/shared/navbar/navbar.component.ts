import { Component, OnInit } from '@angular/core';
import {ExamsService} from '../../services/exams.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(public _es:ExamsService) { }

  ngOnInit() {
  }

  login(provider:string){
    this._es.login(provider);
  }

  logout(){
    this._es.logout();
  }

}
