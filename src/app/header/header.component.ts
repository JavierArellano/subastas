import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { LogedService } from './../loged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ HttpService],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    title = 'Subastas';
  username:string;
  loged:boolean;
  constructor(private httpService:HttpService,
   private logedService:LogedService,
   private router:Router) {
  }

  ngOnInit() {
    this.logedService.estadoObs().subscribe(data => {this.loged = data},);
    this.logedService.userObs().subscribe(data => {this.username = data},);
    this.logedService.session();

    var usern = localStorage.getItem("Usuario");
    var pass = localStorage.getItem("Password");

    if (usern != null && pass != null) {
      return this.httpService.loginService(usern, pass)
      .then(
        result => {
          sessionStorage.setItem('ID', result["_id"]);
          this.logedService.session();
          this.logedService.user();
        }
      )
    }
  }
  logout(){
    sessionStorage.removeItem('ID');
    localStorage.removeItem("Password");
    this.logedService.session();
    this.router.navigate(['/login']);
  }
}
