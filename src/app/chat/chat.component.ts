
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpService } from '../http.service';
import * as io from "socket.io-client";
import {IP} from "../../../dirip";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
 
  usuario:any;
  precio:string;
  room:string;
  idusuario:string;
  producto:any;
  chats:any = [];
  joinned:boolean = false;
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };
  socket = io('http://'+IP+':3000');

  constructor(private chatService: HttpService,
  	private activatedRoute: ActivatedRoute) {
  	this.chatService.roomObsChat()
  	.subscribe(
	      data => {this.chats=data;},
	      );
  	this.chatService.unProductoObs()
  	.subscribe(
	      data => {this.producto=data[0];console.log(this.producto,'hola?')},
	      );
  	this.chatService.nPujaObs()
  	.subscribe(
	      data => {this.producto=data[0];console.log('puja?')},
	      );
  	this.chatService.datosObsUsuario()
  	.subscribe(
	      data => {this.usuario=data[0];console.log('puja?')},
	      );
  }

  ngOnInit() {
  	this.idusuario = sessionStorage.getItem("ID");
  	var username = localStorage.getItem("Usuario");
  	this.activatedRoute.params.subscribe((params: Params) => {
        this.room = params.id;
        this.joinRoom(username, params.id);
      });
    var user = JSON.parse(localStorage.getItem("user"));
    if(user!==null) {
      this.getChatByRoom(user.room);
      this.msgData = { room: user.room, nickname: user.nickname, message: '' }
      this.joinned = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
      if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {
        this.chats.push(data.message);
        this.msgData = { room: user.room, nickname: user.nickname, message: '' }
        this.scrollToBottom();
      }
    }.bind(this));

    this.chatService.unProductoService(this.room);
    this.chatService.userDataService(this.idusuario);
  }

  pujar(){
  	if(this.producto.vendedor!=this.idusuario){
	  	if(this.producto.preciofin){
	  		if(this.producto.preciofin<parseInt(this.precio)){
			  	if (parseInt(this.usuario.monedas)>parseInt(this.precio)){
				  	this.chatService.puja(this.idusuario,this.room,this.precio);
				  	this.precio='';
			  	}else{
			  		this.precio='';
			  	}
		  	}else{
		  		this.precio='';
		  	}
		}else{
			if (parseInt(this.usuario.monedas)>parseInt(this.precio)){
			  	this.chatService.puja(this.idusuario,this.room,this.precio);
			  	this.precio='';
		  	}else{
		  		this.precio='';
		  	}
		}
	}else{
		this.precio='';
	}
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getChatByRoom(room) {
    this.chatService.getChatByRoom(room)
  }

  joinRoom(username, id) {
    var date = new Date();
    this.newUser= { nickname: username, room: id };
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.room);
    this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Se ha unido a la sala', updated_at: date });
  }

  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem("user"));
    this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Ha dejado esta sala', updated_at: date });
    localStorage.removeItem("user");
    this.joinned = false;
  }

}