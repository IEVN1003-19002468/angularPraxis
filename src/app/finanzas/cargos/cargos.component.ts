import { Component, OnInit } from '@angular/core';
import { NavBarMenuComponent } from '../../nav-bar-menu/nav-bar-menu.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProyectoapiService } from '../../proyecto-api.service';
@Component({
  selector: 'app-cargos',
  standalone: true,
  imports: [NavBarMenuComponent,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './cargos.component.html',
  styleUrl: './cargos.component.css'
})
export default class CargosComponent {
constructor(public api:ProyectoapiService, public fb:FormBuilder){}
registra=false;
formRegistro!:FormGroup;
formBusca!:FormGroup;
cliente!:any;
resultado=false;
pago=false;
ngOnInit(): void {
  this.formBusca = this.fb.group({
    nombre:''
  });
  this.formRegistro = this.fb.group({
    idCliente :'',
    descripcion:'',
    cargo:0,
    fechaV:''
  })
}
buscaCliente(){
  let {nombre} =  this.formBusca.value;
  const data = 
    {
      nombre:nombre
    }
  
  console.log(data);
  this.api.buscaCliente(data).subscribe(
    {
      next: response => {
        this.cliente = response;
        console.log(this.cliente);
        this.resultado=true;
                 
      },
      error: error => console.log(error)
    }
  );
}
registraCargo(){
  let {idCliente,descripcion,cargo,fechaV} = this.formRegistro.value;
  
  const cargoData={
    idCliente:idCliente,
    descripcion:descripcion,
    cargo:cargo,
    
    fechaV:fechaV
  }
  console.log("Estoy enviando esto",cargoData);
  this.api.registraCargo(cargoData).subscribe(
    {
      next: response => {
        
        console.log(response);
        this.resultado=true;
        this.registra=false;
                 
      },
      error: error => console.log(error)
    }
  );
}
cierraModal(){
  this.registra=false; 
  this.pago=false;
}
registraDatos(){

}
abreModalRegistro(){
  this.registra=true; 
}

realizaPago(){
  this.pago=true;
}
}
