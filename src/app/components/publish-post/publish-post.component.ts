import { Component, OnInit,ElementRef, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent implements OnInit{

  //definimos el formulario
  public postForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient,private cookieService: CookieService,){
    //inicializamos el formulario
    this.postForm = this.fb.group({
      text: ['',Validators.required],
      video: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.postForm.valid){
        //obtenemos los datos del formulario
        const formData = this.postForm.value;
        const accessToken = this.cookieService.get('access_token');

        //creamos los objectos con los datos de la peticion
        const loginData = {
            text: formData.text,
            video: formData.video
        };

        //este es el encabezado de la peticion
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `JWT ${accessToken}`
        });

        
        this.http.post('http://127.0.0.1:8000/api/post/', loginData, { headers }).subscribe(
            (response: any) => {
                //imprimimos los tokens para verificar que funcionen
                console.log('response:', response);
            },
            //callback para manejar errores
            (error) => {
                console.error('Error', error);

                // Restablecer el formulario para borrar los datos incorrectos
                this.postForm.reset();
            }
        )
    }
}


}
