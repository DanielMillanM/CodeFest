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
import { ForgotpasswdComponent } from './forgotpasswd/forgotpasswd.component';


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
    ForgotpasswdComponent
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
