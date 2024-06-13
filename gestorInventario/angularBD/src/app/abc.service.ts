import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbcService {

  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  consulta(url: string){
    return this.httpClient.get(url);
  }

  alta(url:string, body:any){
    return this.httpClient.post(url, body).toPromise();
  }

  baja(id: string){
    return this.httpClient.delete(`${this.apiUrl}/productos/${id}`).toPromise();
  }

  generarReporte(url: string) {
    return this.httpClient.get(url);
  }

  actualizar(id: string, body: any){
    return this.httpClient.put(`${this.apiUrl}/productos/${id}`, body).toPromise();
  }

  buscarProductos(query: string) {
    return this.httpClient.get(`http://localhost:3000/search?q=${query}`);
  }

}
