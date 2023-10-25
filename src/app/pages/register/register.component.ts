import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  errorMessages = {
    username: [
      { type: 'required', message: 'Username is required' },
    ],
    name: [
      { type: 'required', message: 'Name is required' },
    ],
    last_name: [
      { type: 'required', message: 'Last name is required' },
    ],
    date: [
      { type: 'required', message: 'date is required' },
    ],
    accept: [
      { type: 'required', message: 'accept is required' },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Invalid email format' },
    ],
    img: [
      { type: 'required', message: 'Image is required' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'invalidPassword', message: 'Invalid password format' },
    ],
  };

  registerForm: FormGroup;

  // Controlar proceso del registro
  isSubmitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      date: ['', Validators.required],
      accept: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      img: ['', Validators.required,],
      password: ['', Validators.compose([
        Validators.required,
        this.passwordValidator // Agregar la validación personalizada aquí
      ])],
      checkterms: ['', Validators.required],
    });

  }

  getErrorMessage(fieldName: string) {
    const control = this.registerForm.get(fieldName);

    if (control?.hasError('required')) {
      if (fieldName == "email") {
        return `Correo es obligatorio`;
      }
      if (fieldName == "name") {
        return `Nombre es obligatorio`;
      }
      if (fieldName == "last_name") {
        return `Apellido es obligatorio`;
      }
      if (fieldName == "password") {
        return `Contraseña es obligatoria`;
      }
      if (fieldName == "img") {
        return `Debes escoger un avatar obligatorio`;
      }
      if (fieldName == "username") {
        return `Debes eligir un nickname obligatorio`;
      }
      if (fieldName == "date") {
        return `Debes poner tu fecha de nacimiento`;
      }
      if (fieldName == "accept") {
        return `Debes aceptar los terminos y condiciones`;
      }
      else
      {
        return `${fieldName} es obligatorio`;
      }
    }

    if (control?.hasError('email')) {
      return 'Formato invalido de correo';
    }

    if (control?.hasError('invalidPassword')) {
      return 'La contraseña debe contener al menos una mayúscula, una minúscula, un número, un símbolo y ser mayor a 8 caracteres.';
    }

    return '';

  }

  mostrarMensaje() {
    console.log('Funcionando');
  }





  // Validación personalizada de contraseña
  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control || !control.value) {
      return null;
    }
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
    const isLengthValid = password.length >= 8;

    if (isLengthValid && hasUpperCase && hasLowerCase && hasNumber && hasSymbol) {
      return null; // La contraseña es válida
    } else {
      return { invalidPassword: true }; // La contraseña no cumple con los criterios
    }
  }

  ngOnInit(): void {
}

resetForm() {
  this.registerForm.reset();
  this.isSubmitting = false;

}

onSubmit() {

    this.isSubmitting = true;

    const formData = this.registerForm.value;


    const registerData = {
      username: formData.username,
      name: formData.name,
      last_name: formData.last_name,
      email: formData.email,
      img: formData.img,
      password: formData.password,
      date: formData.date,
      accept: formData.accept
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   
    this.http.post('http://127.0.0.1:8000/api/create/', registerData, { headers }).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        

        // Aca falta la redireccion a la vitrina
        this.isSubmitting = false;
      },
      (error) => {
        console.error('Error al registrar:', error);
        this.resetForm();
      }
    );
}
}
