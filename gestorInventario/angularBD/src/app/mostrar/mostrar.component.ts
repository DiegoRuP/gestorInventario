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

// mostrar.ts
// mostrar.ts
actualizar(): void {
  if (this.productoSeleccionado) {
    console.log('Datos a actualizar:', this.productoSeleccionado);

    // Convertir fechas a formato adecuado si es necesario
    this.productoSeleccionado.fecha_ingreso = new Date(this.productoSeleccionado.fecha_ingreso).toISOString().split('T')[0];
    this.productoSeleccionado.fecha_caducidad = new Date(this.productoSeleccionado.fecha_caducidad).toISOString().split('T')[0];

    this.abcService.actualizar(this.productoSeleccionado.id_producto, this.productoSeleccionado)
      .then((res) => {
        console.log('Producto actualizado:', res);
        const index = this.array.findIndex(producto => producto.id_producto === this.productoSeleccionado.id_producto);
        if (index !== -1) {
          this.array[index] = { ...this.productoSeleccionado };
        }
        this.productoSeleccionado = null; // Limpiar la selección
      })
      .catch((error) => {
        console.error('Error al actualizar producto:', error);
        alert(`Error al actualizar producto: ${error.message}`);
      });
  }
}

  

}
