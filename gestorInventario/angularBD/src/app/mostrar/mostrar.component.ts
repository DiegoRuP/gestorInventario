import { Component, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mostrar.component.html',
  styleUrl: './mostrar.component.css'
})
export class MostrarComponent implements OnInit {

  array: any[] = [];
  productoSeleccionado: any = null;

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

  seleccionarProducto(producto: any): void {
    this.productoSeleccionado = { ...producto }
  }

  actualizar(): void {
    if (this.productoSeleccionado) {
      this.abcService.actualizar(this.productoSeleccionado.id_producto, this.productoSeleccionado)
        .then((res) => {
          console.log('Producto actualizado:', res);
          // Actualizar el array con los datos modificados
          const index = this.array.findIndex(producto => producto.id_producto === this.productoSeleccionado.id_producto);
          if (index !== -1) {
            this.array[index] = { ...this.productoSeleccionado };
          }
          this.productoSeleccionado = null; // Limpiar la selección
        })
        .catch((error) => {
          console.error('Error al actualizar producto:', error);
        });
    }
  }

}
