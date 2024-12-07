import { Component, OnInit } from '@angular/core';
import { NavBarMenuComponent } from '../../nav-bar-menu/nav-bar-menu.component';
import { ProyectoapiService } from '../../proyecto-api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NavBarMenuComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export default class UsuariosComponent {
  constructor(public api:ProyectoapiService, public fb:FormBuilder){}
  usuarios:any;
  modalEdit=false;
  modalRegistra=false;
  formEdita!:FormGroup;
  formRegistro!:FormGroup;
  ngOnInit(): void {
    this.formRegistro=this.fb.group({
      nombre: '',
      nickname:'',
      email:'',
      pass:'',
      rol:'',
      estatus:''
    });
    this.api.dameUsuarios().subscribe(
      {
        next: response => {
          this.usuarios = response;
          console.log(this.usuarios);

        },
        error: error => console.log(error)
      }
    );
}
editaUsuario(id:number,nombre:string,rol:number,estatus:number){
  console.log(id);
this.modalEdit=true;
this.formEdita=this.fb.group({
  idUsuario: id,
  nombre: nombre,
  pass:'',
  rol:rol,
  estatus:estatus

});
}
actualizaUsuario() {
  let { idUsuario, nombre, pass, estatus,rol } = this.formEdita.value;
  const cliente = {
    idUsuario,
    nombre,
    rol,
    estatus
  }
  console.log(cliente);
  this.api.actualizaUsuario(cliente).subscribe({
    next: (response) => {
      console.log('Usuario enviadas correctamente:', response)
      if (response) {
        this.modalEdit = false;  
        window.location.reload();      
      }
    },
    error: (err) => console.error('Error al enviar usuario:', err),
    complete: () => console.info('Envío completado')
  });
}
registraUsuario(){
  this.modalRegistra=true;

}
terminaRegistro(){
  let {  nombre, pass, estatus,rol,email,nickname } = this.formRegistro.value;
  const cliente = {
    nombre,
    nickname,
    email,
    rol,
    pass,
    estatus
  }
  console.log(cliente);
  this.api.registraUsuario(cliente).subscribe({
    next: (response) => {
      console.log('Usuario enviadas correctamente:', response)
      if (response) {
        this.modalRegistra = false;  
        window.location.reload();      
      }
    },
    error: (err) => console.error('Error al enviar usuario:', err),
    complete: () => console.info('Envío completado')
  });
}
abreRegistra(){

}
cierraModal(){
  this.modalEdit=false;
}

}
