import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProyectoapiService } from '../proyecto-api.service';
import { NavBarMenuComponent } from '../nav-bar-menu/nav-bar-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule, NavBarMenuComponent, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  view: [number, number] = [700, 400];
  ventas: any;
  formGroup !: FormGroup;
  formRegistro !: FormGroup;
  formElimina !: FormGroup;
  formEdita !: FormGroup;
  licencias: any;
  clientesT: any;
  confirmaEliminacion: any;
  confirmaActualizacion: any;
  clientes: any;
  metas: any;
  value: number = 50;
  previousValue: number = 70;
  units: string = 'Meta de clientes';
  edita = false;
  borra = false;
  registra = false;
  isDisabled = true;
  constructor(public api: ProyectoapiService, private fb: FormBuilder, public router:Router) {
    this.formGroup = this.fb.group({
      idVenta: 0,
      nombre: '',
      email: '',
      telefono: '',
      direccion: ''
    });
    this.formRegistro = this.fb.group({
      nombre: '',
      email: '',
      telefono: '',
      direccion: ''
    });
  }
  ngOnInit(): void {
    this.api.dameVentas().subscribe(
      {
        next: resupuesta => {
          const ventasArray = Array.isArray(resupuesta) ? resupuesta : Object.values(resupuesta);
          this.ventas = ventasArray.map((objeto: any) => ({
            name: objeto.cliente,
            value: parseFloat(objeto.venta)
          }));
        },
        error: error => console.log(error)
      }
    );
    this.api.dameLicencias().subscribe(
      {
        next: response => {
          this.licencias = response;
          console.log(this.licencias);

        },
        error: error => console.log(error)
      }
    );
    this.api.dameClientes().subscribe(
      {
        next: response => {
          this.clientesT = response;
          console.log(this.clientesT);

        },
        error: error => console.log(error)
      }
    );
    this.metas = this.api.dameMetas();
  }
  registraNuevoCliente() {
    this.registra = true;
  }
  muestraEditar(idCliente: number, nombre: string, licencias:number) {
    this.edita = true;
    this.formEdita = this.fb.group({
      idCliente: idCliente,
      nombre: nombre,
      licencias:licencias

    });

  }
  muestraBorrar(idCliente: number, nombre: string) {
    this.borra = true;
    console.log(idCliente, nombre);
    this.formElimina = this.fb.group({
      nombre: nombre,
      idColegio: idCliente,

    });

  }
  muestraActivar(idCliente: number, nombre: string) {
   
    this.api.activaCliente(idCliente).subscribe(
      {
        
        next: response => {
          this.confirmaEliminacion = response;
          
          window.location.reload();
          

        },
        error: error => console.log(error)
      }
    );
    
  }
  inactivaColegio(){
    let { idColegio } = this.formElimina.value;
    const grupo = [
      idColegio
    ]
    console.log(idColegio);
    this.api.inactivaCliente(idColegio).subscribe(
      {
        next: response => {
          this.confirmaEliminacion = response;
          this.borra=false;
          window.location.reload();
          

        },
        error: error => console.log(error)
      }
    );
  }
  actualizaCliente(){
    let { idCliente,nombre,licencias } = this.formEdita.value;
    const grupo = [
      idCliente,
      nombre,
      licencias
    ]
    console.log(grupo);
    this.api.actualizaCliente(grupo).subscribe(
      {
        next: response => {
          this.confirmaActualizacion = response;
          if (this.confirmaActualizacion==1) {
            window.location.reload();
          }
            this.edita=false;
          

        },
        error: error => console.log(error)
      }
    );
  }

  editaPedido(id: number) {
    this.api.dameCliente(id).subscribe(
      {
        next: response => {
          this.clientes = response;
          console.log(this.clientes);

        },
        error: error => console.log(error)
      }
    );
  }
  cierraModal() {
    this.edita = false;
    this.registra = false;
    this.borra = false;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    console.log('ESTOY MOSTRANDO', this.api.dameVentas())
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  registraDatos() {
    let { nombre, email, telefono, direccion } = this.formRegistro.value;
    const cliente = {

      nombre,
      email,
      telefono,
      direccion
    }
    console.log(cliente);
    this.api.registraCliente(cliente).subscribe({
      next: (response) => {
        console.log('Ventas enviadas correctamente:', response)
        if (response) {
          this.registra = false;
          window.location.reload();
        }
      },
      error: (err) => console.error('Error al enviar ventas:', err),
      complete: () => console.info('Envío completado')
    });
  }
}
