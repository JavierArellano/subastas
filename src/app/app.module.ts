import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { AppRouting } from './ruta/app.routing';
import { HttpModule, JsonpModule } from '@angular/http';

import { LogedService } from './loged.service';
import { HttpService } from './http.service';
import { MiperfilComponent } from './miperfil/miperfil.component';
import { SubrecientesComponent } from './subrecientes/subrecientes.component';
import { ProductoNuevoComponent } from './producto-nuevo/producto-nuevo.component';
import { Ng2UploaderModule } from 'ng2-uploader';
import { EditPerfilComponent } from './edit-perfil/edit-perfil.component';
import { OtroperfilComponent } from './otroperfil/otroperfil.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MiperfilComponent,
    SubrecientesComponent,
    ProductoNuevoComponent,
    EditPerfilComponent,
    OtroperfilComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule,
    Ng2UploaderModule,
    AppRouting
  ],
  providers: [LogedService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
