import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot,RouterStateSnapshot,CanActivate} from '@angular/router';
import {ExamsService} from './exams.service'
@Injectable()
export class AuthGuardService  implements CanActivate{

  constructor(public _es:ExamsService) { }

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    //console.log(next);
    if (this._es.isAuthenticated()){
      //console.log("paso el guard");
      return true;
    }else {
      //console.error("bloqueado por el guard")
      return false;
    }


  }

}
