import { Component } from '@angular/core';
import { ProyectoapiService } from '../proyecto-api.service';

@Component({
  selector: 'app-nav-bar-menu',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar-menu.component.html',
  styleUrl: './nav-bar-menu.component.css'
})
export class NavBarMenuComponent {

  constructor(public api:ProyectoapiService){}

  logOut(){
    this.api.logout();
  }
}
