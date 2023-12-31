import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AmigosComponent } from './pages/amigos/amigos.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { ForgotpasswdComponent } from './pages/forgotpasswd/forgotpasswd.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { StreamComponent } from './pages/stream/stream.component';
import { SeguidoresComponent } from './pages/seguidores/seguidores.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { GrupoComponent } from './pages/grupo/grupo.component';
import { CrearSalaComponent } from './pages/crear-sala/crear-sala.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'amigos',
    component: AmigosComponent
  },
  {
    path: 'grupos',
    component: GruposComponent
  },
  {
    path: 'forgotpasswd',
    component: ForgotpasswdComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'stream',
    component: StreamComponent
  },
  {
    path: 'seguidores',
    component: SeguidoresComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'comentarios',
    component: ComentariosComponent
  },
  {
    path: 'grupo',
    component: GrupoComponent
  },
  {
    path: 'crear-sala',
    component: CrearSalaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
