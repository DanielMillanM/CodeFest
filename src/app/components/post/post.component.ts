import { Component, OnInit,ElementRef, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface Post{
  user: User;
  text: string;
  video:string;
  date_created:Date;
  days_ago:Date
}

interface User{
  username: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  posts: Post[] = []
  user: any = {}

  constructor(private http: HttpClient,private cookieService: CookieService,){
  }

  ngOnInit(): void {
    this.getPost()
    this.getUser()
  }

  //obtener las cartas de la API
  getPost(): void {
    const accessToken = this.cookieService.get('access_token');
    //este es el encabezado de la peticion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `JWT ${accessToken}`
  });
    const apiUrl = `http://127.0.0.1:8000/api/post/`;

    this.http.get(apiUrl,{headers}).subscribe((data: any) => { // Usamos 'any' para el tipo de la respuesta, ya que no coincide directamente con nuestra interfaz Carta.
      this.posts = data.map((item: any) => {
        // Mapeamos 'daño' a 'dano' en cada elemento de la respuesta
        return {
          ...item,
        };
      });
    });
    console.log(this.posts)
  }

  getUser(){
    const accessToken = this.cookieService.get('access_token');
    //este es el encabezado de la peticion
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `JWT ${accessToken}`
  });
    const apiUrl = `http://127.0.0.1:8000/api/user/`;

    this.http.get(apiUrl,{headers}).subscribe((data: any) => { // Usamos 'any' para el tipo de la respuesta, ya que no coincide directamente con nuestra interfaz Carta.
        this.user = data
        console.log("hola")
    });
  }

}
