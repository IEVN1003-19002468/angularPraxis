import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ProyectoapiService} from '../proyecto-api.service'
import { RouterLink, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  login!: FormGroup;
  usuario: string = "";
  pass: string = "";
  dataSource:any;
  mensaje:string = "";
  constructor(public api:ProyectoapiService, private router: Router ) { }
  ngOnInit(): void {
    this.login = new FormGroup({
      usuario: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),

    });
    let isSession = this.api.getUser();
    if (isSession) {
      this.router.navigate(['/start']);
    }else{
      this.router.navigate(['']);
    }
  }
  loggeo(): void {
    let inpUsuario = this.login.get('usuario')?.value;
    let inpPass = this.login.get('pass')?.value;
    
    const loginData = {
      inpUsuario,
      inpPass
    };
    console.log("ESTOY ENVIANDO ESTO", loginData);
    this.api.startLogging(loginData).subscribe(
      {
        next: response => {
          this.dataSource = response;
          console.log(this.dataSource.respuesta);
          if (!this.dataSource.respuesta) {
            console.log('HOla no inicie sesion');
            this.mensaje="Usuario o contraseñas incorrecto, vuelve a intentarlo";
            
          }else{
            console.log('HOla si inicie sesion');
            this.api.saveUser(this.dataSource);
            this.router.navigate(['/start']);
          }          
        },
        error: error => console.log(error)
      }
    );
  }
  


}
