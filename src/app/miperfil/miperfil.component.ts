import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  providers: [ HttpService],
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
	private id:string;
	user:any;
	productosvendidos:any;
	productosnovendidos:any;
	productoscomprados:any;
	lenproductosvendidos:any;
	lenproductosnovendidos:any;
	lenproductoscomprados:any;

	fechacreacion:string;
	fotoperfil:string;

  	constructor(private httpService:HttpService) {
	  	this.httpService.datosObsUsuario()
	  	.subscribe(
	      data => {this.user=data[0]; this.fechacreacion=data[0]["fecha_creacion"]; this.hora(); this.foto(this.user["_id"]);},
	      );
	  	this.httpService.productObsVUsuario()
	  	.subscribe(
	      data => {this.productosvendidos=data; this.lenproductosvendidos=data.length;},
	      );
	  	this.httpService.productObsNVUsuario()
	  	.subscribe(
	      data => {this.productosnovendidos=data; this.lenproductosnovendidos=data.length;},
	      );
	  	this.httpService.productObsCUsuario()
	  	.subscribe(
	      data => {this.productoscomprados=data; this.lenproductoscomprados=data.length;},
	      );
	  	this.httpService.finalObsSubsta()
	  	.subscribe(
	      data => {this.productosvendidos=data; this.lenproductosvendidos=data.length;},
	      );

  	}
  	hora(){
  		var arr = this.fechacreacion.split("T",2);
      	this.fechacreacion= arr[0];
  	}
  	fechaSub(fe){
  		var arr = fe.split("T",2);
      	var hora = arr[1].substr(0,5);
      	fe= arr[0]+" a las "+hora+".";
      	return fe;
  	}
  	masdinero(){
  		let dinero=50;
  		this.httpService.masmonedasService(this.id, dinero);
  	}
  	foto(id){
  		this.fotoperfil = "/api/image?id="+id;
  	}
  	finSubasta(id){
  		this.httpService.comprarService(id);
  		this.httpService.productosNVService(this.id);
  	}
  	llamada(){
	  	this.httpService.productosCompradosService(this.id);
  	}

	ngOnInit() {
	  	var a = sessionStorage.getItem('ID');
	  	this.id = a;
	  	this.httpService.userDataService(this.id);
	  	this.httpService.productosVendidosService(this.id);
	  	this.httpService.productosNVService(this.id);
	  	this.llamada();
	}

}


