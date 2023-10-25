import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InfoPerfilComponent } from './components/info-perfil/info-perfil.component';
import { PublishPostComponent } from './components/publish-post/publish-post.component';
import { PostComponent } from './components/post/post.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { AmigosComponent } from './pages/amigos/amigos.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ForgotpasswdComponent } from './pages/forgotpasswd/forgotpasswd.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { StreamComponent } from './pages/stream/stream.component';
import { SeguidoresComponent } from './pages/seguidores/seguidores.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { GrupoComponent } from './pages/grupo/grupo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    InfoPerfilComponent,
    PublishPostComponent,
    PostComponent,
    TarjetaComponent,
    AmigosComponent,
    PerfilComponent,
    GruposComponent,
    FriendsComponent,
    ForgotpasswdComponent,
    RecoveryComponent,
    StreamComponent,
    SeguidoresComponent,
    ChatComponent,
    ComentariosComponent,
    GrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
