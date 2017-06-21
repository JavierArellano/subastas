import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-subrecientes',
  templateUrl: './subrecientes.component.html',
  providers: [ HttpService],
  styleUrls: ['./subrecientes.component.css']
})
export class SubrecientesComponent implements OnInit {
	productos:any;
  constructor(private httpService:HttpService) {
  	this.httpService.todosProductosObs()
	  	.subscribe(
	      data => {this.productos=data;},
	      );
  }
  foto(id){
  		let fotoproducto = "/api/image?id="+id;
  		return fotoproducto;
  	}
  ngOnInit() {
  	this.httpService.todosProductosService();
  }

}
