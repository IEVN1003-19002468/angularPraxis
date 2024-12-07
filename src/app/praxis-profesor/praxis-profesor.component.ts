import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {ProyectoapiService} from '../proyecto-api.service'
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavBarMenuComponent } from '../nav-bar-menu/nav-bar-menu.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-praxis-profesor',
  standalone: true,
  imports: [CommonModule, NavBarMenuComponent,NgxChartsModule,  FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './praxis-profesor.component.html',
  styleUrl: './praxis-profesor.component.css'
})
export default class PraxisProfesorComponent {
  single = [{
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
    {
    "name": "UK",
    "value": 6200000
  }];
  constructor(public api:ProyectoapiService, private router: Router ) {
    
   }

  
  view: [number,number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  gruposData:any;
  muestraGrupo=false;
  grupoGrupos=true;
  ngOnInit(): void {
    let isSession = this.api.getUser();
    if (isSession) {
      this.router.navigate(['/start']);
    }else{
      this.router.navigate(['']);
    }
    this.api.dameGrupos().subscribe(
      {
        next: response => {
          this.gruposData = response;
          console.log(this.gruposData);
                   
        },
        error: error => console.log(error)
      }
    );
  }

  dameGrupoInfo(id:number){
    this.muestraGrupo=true;
    this.grupoGrupos=false;
  }
}
