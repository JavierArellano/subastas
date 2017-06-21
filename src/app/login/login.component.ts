import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { slideToRight } from './../ruta/app.routing.animations';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';


import { LogedService } from './../loged.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ HttpService],
  animations: [slideToRight()],
  host: {'[@slideToRight]': ''}
})
export class LoginComponent implements OnInit {
  
  constructor(private httpService:HttpService,
   private logedService:LogedService,
   private router:Router) { }

  submitFrom(username:string, pass:string, event: Event){
    let hash = Md5.hashStr(pass);
    this.login(username, hash);
    event.preventDefault();
    this.router.navigate(['/index']);
	}

  login(username:string, pass:any){
      if ($("#remember").is(':checked')) {
        return this.httpService.loginService(username,pass)
        .then(
          result => {
            try {
              localStorage.setItem("Usuario", result.username);
              localStorage.setItem("Password", result.qxws);
              sessionStorage.setItem('ID', result["_id"]);
            } catch (e) {
              if (e) {
                console.log(e);
                alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
              }
            }
            this.logedService.session();
            this.logedService.user();
          }
        );
      }else {
        return this.httpService.loginService(username,pass)
        .then(
          result => {
            localStorage.setItem("Usuario", result.username);
            localStorage.removeItem("Password");
            sessionStorage.setItem('ID', result["_id"]);
            this.logedService.session();
            this.logedService.user();
          }
        );
      }
	}

  ngOnInit() {
      $("#boton_login").addClass("active");
      $("#boton_register").removeClass("active");
  }

}
