import { Component, OnInit,ElementRef, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface User{
  username: string;
}

interface Users2{
  username: string;
  id: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  user: any = {}
  users2: Users2[] = []

  constructor(private http: HttpClient,private cookieService: CookieService,){
  }

  ngOnInit(): void {
    this.getUser()
    this.getSolicitudes()
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

  getSolicitudes(){
    const accessToken = this.cookieService.get('access_token');
    //este es el encabezado de la peticion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `JWT ${accessToken}`
  });
    const apiUrl = `http://127.0.0.1:8000/api/solicitud/`;

    this.http.get<Users2[]>(apiUrl,{headers}).subscribe((data: Users2[]) => { // Usamos 'any' para el tipo de la respuesta, ya que no coincide directamente con nuestra interfaz Carta.
        this.user = data
        console.log(data)
    });
  }


}
