import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  providers:[HttpService],
  styleUrls: ['./producto-nuevo.component.css'],

})
export class ProductoNuevoComponent implements OnInit {
  iduser:string; 
  constructor(private httpService:HttpService) { }

  ngOnInit() {
   let id= sessionStorage.getItem("ID");
   this.iduser = id;
  }
}
