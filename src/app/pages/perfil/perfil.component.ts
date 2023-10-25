import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface User{
  username: string;
  name: string;
  last_name: string;
  img: string;
  date: string;
  email: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  user: any = {}

  constructor(private http: HttpClient,private cookieService: CookieService,){
  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    const accessToken = this.cookieService.get('access_token');
    //este es el encabezado de la peticion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `JWT ${accessToken}`
  });
    const apiUrl = `http://127.0.0.1:8000/api/user/`;

    this.http.get<User>(apiUrl,{headers}).subscribe((data: any) => { // Usamos 'any' para el tipo de la respuesta, ya que no coincide directamente con nuestra interfaz Carta.
        this.user = data
        console.log("hola")
    });
  }

}
