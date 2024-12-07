//import { HttpClient } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {
 
  constructor(private  http: HttpClient) { }
 
 
public getAlumnos(rango:number){
  return this.http.get('http://127.0.0.1:5000/pizzeria/'+rango)
}
public dameCliente(id:number){
  return this.http.post('http://127.0.0.1:5000/dameClientes',id)
}
public dameClientes(){
  return this.http.get('http://127.0.0.1:5000/dameClientesTotal')
}
startLogging(datos:any){
  return this.http.post('http://127.0.0.1:5000/login',datos)
}
saveUser(user: any): void {
  sessionStorage.setItem('user', JSON.stringify(user));
}
getUser(): any {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
logout(): void {
  sessionStorage.removeItem('user');

}
dameGrupos(){
  return this.http.get('http://127.0.0.1:5000/dameGrupos')
}
dameVentas(){
  return this.http.get('http://127.0.0.1:5000/dameVentas')
}
dameLicencias(){
  return this.http.get('http://127.0.0.1:5000/dameLicencias')
}
dameMetas(){
  return this.http.get('http://127.0.0.1:5000/dameMetas')
}
registraCliente(datos:any){
  return this.http.post('http://127.0.0.1:5000/registraCliente',datos)
}
actualizaCliente(datos:any){
  return this.http.post('http://127.0.0.1:5000/actualizaCliente',datos)
}
inactivaCliente(datos:any){
  return this.http.get('http://127.0.0.1:5000/inactivaColegio/'+datos)
}
activaCliente(datos:any){
  return this.http.get('http://127.0.0.1:5000/activaColegio/'+datos)
}
//AQUI EMPIEZAN LAS CONFIGUACIONES DE USUARIOS
dameUsuarios(){
  return this.http.get('http://127.0.0.1:5000/dameUsuarios')
}
actualizaUsuario(datos:any){
  return this.http.post('http://127.0.0.1:5000/actualizaUsuario',datos)
}
registraUsuario(datos:any){
  return this.http.post('http://127.0.0.1:5000/registraUsuario',datos)
}
//Cargos
buscaCliente(datos:any){
  return this.http.post('http://127.0.0.1:5000/dameCargos',datos)
}
registraCargo(datos:any){
  return this.http.post('http://127.0.0.1:5000/registraCargo',datos)
}
}