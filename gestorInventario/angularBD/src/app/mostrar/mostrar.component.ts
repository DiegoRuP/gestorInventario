    import { Component, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar.component.html',
  styleUrl: './mostrar.component.css'
})
export class MostrarComponent implements OnInit {

  array: any[] = [];

  constructor(private abcService:AbcService){
    this.abcService.generarReporte('http://localhost:3000/mostrar').subscribe((res: any) => {
      console.log('Consulta general');
      console.log(res);
      this.array = res.data; // Asignar res.data en lugar de res.array
    });
  }

  ngOnInit(): void {
    this.abcService.consulta('http://localhost:3000/productos').subscribe(
      (res: any) => {
        console.log("Consulta general...");
        console.log(res); 
        this.array = res.products; 
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  baja(id_producto: string): void {
    this.abcService.baja(id_producto)
      .then((res) => {
        console.log('Producto eliminado:', res);
        this.array = this.array.filter(producto => producto.id_producto !== id_producto);
      })
      .catch((error) => {
        console.error('Error al eliminar producto:', error);
      });
  }
}
