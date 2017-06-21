import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class LogedService {

  loged:boolean;
  private logedVar: Subject<any> = new Subject<any>();
  private userVar: Subject<any> = new Subject<any>();
  
  constructor() {
  	this.session();
  }
  session(){
    var userid = sessionStorage.getItem('ID');
    if (userid){
      this.loged=true;
      this.user();
    }else{
      this.loged=false;
    }
    this.logedVar.next(this.loged);
  }

  user(){
  	var username = localStorage.getItem("Usuario");
  	this.userVar.next(username);
  }
  userObs(): Observable<any>{
  	return this.userVar.asObservable();
  }
  estadoObs(): Observable<any>{
  	return this.logedVar.asObservable();
  }
}
