import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Observable, Subject } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {IP} from "../../dirip";


@Injectable()

export class HttpService {
  private datosUsuario: Subject<any> = new Subject<any>();
  private productosVUsuario: Subject<any> = new Subject<any>();
  private productosCUsuario: Subject<any> = new Subject<any>();
  private productosNVUsuario: Subject<any> = new Subject<any>();
  private todosObsProductos: Subject<any> = new Subject<any>();
  private todosMessagesObs: Subject<any> = new Subject<any>();
  private pujaObs: Subject<any> = new Subject<any>();
  private unObsProducto: Subject<any> = new Subject<any>();
  private finalObsSubasta: Subject<any> = new Subject<any>();
  listaProductos=[];

  constructor(private http: Http) {  }
  

  getChatByRoom(room) {
    return this.http.get('http://'+IP+':3000/api/chat/' + room)
    .map(response => response.json())
    .subscribe(response=> {this.roomChat(response)})    
  }
  
  roomChat(resp){
    this.todosMessagesObs.next(resp);
  }

  roomObsChat(): Observable<any>{
    return this.todosMessagesObs.asObservable();
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
        this.http.post('http://'+IP+':3000/api/chat', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }


  masmonedasService(id:string,dinero:number){
    return this.http.get('http://'+IP+':3000/api/masdinero?id='+id+'&dinero='+dinero)
    .map(response => response.json())
    .subscribe(response=> {this.userData(response)});
  }

// Datos del usuario

  userDataService(id:string){
    return this.http.get('http://'+IP+':3000/api/userdata?id='+id)
    .map(response => response.json())
    .subscribe(response=> {this.userData(response)});
  }

  userData(resp){
    this.datosUsuario.next(resp);
  }

  datosObsUsuario(): Observable<any>{
    return this.datosUsuario.asObservable();
  }

// Productos vendidos: (V)--> Vendidos

  productosVendidosService(id:string){
    return this.http.get('http://'+IP+':3000/api/productosvendidos?id='+id)
    .map(response => response.json())
    .subscribe(response=> {this.userVProducts(response)});
  }

  userVProducts(resp){
    this.productosVUsuario.next(resp);
  }

  productObsVUsuario(): Observable<any>{
    return this.productosVUsuario.asObservable();
  }

// Productos comprados: (C)--> Comprados

  productosCompradosService(id:string){
    return this.http.get('http://'+IP+':3000/api/productoscomprados?id='+id)
    .map(response => response.json())
    .subscribe(response=> {this.userCProducts(response)});
  }

  userCProducts(resp){
    this.productosCUsuario.next(resp);
  }

  productObsCUsuario(): Observable<any>{
    return this.productosCUsuario.asObservable();
  }

// Productos en venta: (NV)--> No Vendidos
  
  productosNVService(id:string){
    return this.http.get('http://'+IP+':3000/api/productosnovendidos?id='+id)
    .map(response => response.json())
    .subscribe(response=> {this.userNVProducts(response)});
  }

  userNVProducts(resp){
    this.productosNVUsuario.next(resp);
  }

  productObsNVUsuario(): Observable<any>{
    return this.productosNVUsuario.asObservable();
  }

  // Pujas en la subasta:

  puja(idc:string,idp:string,precio:string){
    return this.http.get('http://'+IP+':3000/api/puja?idp='+idp+'&idc='+idc+'&precio='+precio)
    .map(response => response.json())
    .subscribe(response=>{this.nuevaPuja(response)});
  }

  nuevaPuja(resp){
    this.pujaObs.next(resp);
  }

  nPujaObs(): Observable<any>{
    return this.pujaObs.asObservable();
  }
  
  // finalizar subasta (comprar)
  
  comprarService(idp:string){
    console.log(idp);
    return this.http.get('http://'+IP+':3000/api/finsub?idprod='+idp)
    .map(response=>response.json())
    .subscribe(response=>{this.finalsubsta(response)})
  }

  finalsubsta(resp){
    this.finalObsSubasta.next(resp);
  }

  finalObsSubsta(): Observable<any>{
    return this.finalObsSubasta.asObservable();
  }

  // Productos en venta generales

  unProductoService(id:string){
    return this.http.get('http://'+IP+':3000/api/unproducto?id='+id)
    .map(response => response.json())
    .subscribe(response=> {this.unProduct(response)})
  }

  unProduct(resp){
    this.unObsProducto.next(resp);
  }

  unProductoObs(): Observable<any>{
    return this.unObsProducto.asObservable();
  }

  // Productos en venta generales
  todosProductosService(){
    return this.http.get('http://'+IP+':3000/api/allproducts')
    .map(response => response.json())
    .subscribe(response=> {this.todosProducts(response)})
  }

  todosProducts(resp){
    this.todosObsProductos.next(resp);
  }

  todosProductosObs(): Observable<any>{
    return this.todosObsProductos.asObservable();
  }
  

  loginService(username:string,pass:any): Promise<any>{ 
      let headers = new Headers();
      headers.append("Content-Type", 'application/json');

      let body = {"username":username,"pass":pass};
      let options = new RequestOptions({ "headers": headers, "body": body });

      return this.http
      .post('http://'+IP+':3000/api/check_user', body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  registerService(username:string,name:string,lastname:string,email:string,pass:any): Promise<any> { 
      let headers = new Headers();
      headers.append("Content-Type", 'application/json');

      let body = {"username":username,"passw":pass,"name":name,"lastname":lastname,"email":email};
      let options = new RequestOptions({ "headers": headers, "body": body });

      return this.http
      .post('http://'+IP+':3000/api/nu', body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  
  private extractData(res: Response) {
      let body = res.json();
      return body || { };
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
}