import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css']
})
export class EditPerfilComponent implements OnInit {
	iduser:string; 
  constructor() { }

  ngOnInit() {
  	let id= sessionStorage.getItem("ID");
    this.iduser = id;
  }

}
