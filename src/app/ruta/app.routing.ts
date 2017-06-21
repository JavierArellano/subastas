import { RouterModule } from '@angular/router';

import { AppComponent } from './../app.component';
import { HeaderComponent } from './../header/header.component';
import { LoginComponent } from './../login/login.component';
import { RegisterComponent } from './../register/register.component';
import { MiperfilComponent } from './../miperfil/miperfil.component';
import { EditPerfilComponent } from './../edit-perfil/edit-perfil.component';
import { ProductoNuevoComponent } from './../producto-nuevo/producto-nuevo.component';
import { SubrecientesComponent } from './../subrecientes/subrecientes.component';
import { ChatComponent } from './../chat/chat.component';

const routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: SubrecientesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'nproduct', component: ProductoNuevoComponent },
  { path: 'perfil', component: MiperfilComponent},
  { path: 'edituser', component: EditPerfilComponent},
  { path: 'subasta/:id', component: ChatComponent},
];

export const AppRouting = RouterModule.forRoot(routes, { 
  useHash: true
});