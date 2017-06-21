import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { slideToRight } from './../ruta/app.routing.animations';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ HttpService],
  animations: [slideToRight()],
  host: {'[@slideToRight]': ''}
})
export class RegisterComponent implements OnInit {

  constructor(private httpService:HttpService,
               private router:Router) { }

  submitFrom(username:string,name:string,lastname:string,email:string,passw:any,rpassw:string, event: Event){

    if (passw == rpassw){
      let hash = Md5.hashStr(passw);
      this.register(username,name,lastname,email,hash);
      event.preventDefault();
    }else{
      alert('no coincide');
      this.router.navigate(['/register']);
    }
    this.router.navigate(['/login']);
  }

  register(username:string,name:string,lastname:string,email:string,pass:any){
    return this.httpService.registerService(username,name,lastname,email,pass)
    .then(
      result => {})
  }

  ngOnInit() {
      $("#boton_login").removeClass("active");
      $("#boton_register").addClass("active");
  }
}