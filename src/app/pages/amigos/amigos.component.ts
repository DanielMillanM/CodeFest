import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface User{
  id: number;
  username: string;
  name: string;
  last_name: string;
  img: string;
  date: string;
  email: string;
}


@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit{

  users: User[] = []

  constructor(private http: HttpClient,private cookieService: CookieService,){
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    //este es el encabezado de la peticion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
    const apiUrl = `http://127.0.0.1:8000/api/users/`;

    this.http.get<User[]>(apiUrl,{headers}).subscribe((data: User[]) => { // Usamos 'any' para el tipo de la respuesta, ya que no coincide directamente con nuestra interfaz Carta.
        this.users = data
        console.log(data)
    });
  }

  //boton para agregar al carrito de compras
  addFriend(Id: number) {
    const accessToken = this.cookieService.get('access_token');

    if (!accessToken) {
      console.error('No se ha encontrado el token de acceso.');
      return;
    }

    const cartEndpoint = 'http://127.0.0.1:8000/api/solicitud/';
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${accessToken}`
    });
    const requestData = { id: Id };

    this.http.post(cartEndpoint, requestData, { headers }).subscribe(
        (response: any) => {
            // Manejar la respuesta del servicio de carrito si es necesario
            console.log('response:', response);
        },
        (error) => {
            console.error('Error adding to cart:', error);
        }
    );

  }

}
