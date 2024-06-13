import { Component, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-altas',
  standalone: true ,
  imports: [FormsModule, CommonModule],
  templateUrl: './altas.component.html',
  styleUrl: './altas.component.css'
})
export class AltasComponent implements OnInit {
  id_producto?: string;
  nombre?: string;
  descripcion?: string;
  id_categoria?: string;
  marca?: string;
  precio_compra?: string;
  precio_venta?: string;
  cantidad_stock?: string;
  unidad_medida?: string;
  id_proveedor?: string;
  fecha_ingreso?: string;
  fecha_caducidad?: string;
  codigo_barras?: string
  
  editando: boolean = false;
  productoIdEditar: string = '';

  constructor(private abcService: AbcService) { }

  ngOnInit(): void { }

  insertar(): void {
    let body = {
      id_producto: this.id_producto,
      nombre: this.nombre,
      descripcion: this.descripcion,
      id_categoria: this.id_categoria,
      marca: this.marca,
      precio_compra: this.precio_compra,
      precio_venta: this.precio_venta,
      cantidad_stock: this.cantidad_stock,
      unidad_medida: this.unidad_medida,
      id_proveedor: this.id_proveedor,
      fecha_ingreso: this.fecha_ingreso,
      fecha_caducidad: this.fecha_caducidad,
      codigo_barras: this.codigo_barras
    };
  
    this.abcService.alta('http://localhost:3000/productos', body)
      .then((data) => {
        console.log('Respuesta del servidor:', data);
      })
      .catch((error) => {
        console.error('Error al insertar producto:', error);
        if (error.response && error.response.data && error.response.data.err) {
          const errObj = JSON.parse(error.response.data.err);
          if (errObj.code === 'ER_NO_REFERENCED_ROW_2') {
            alert('La categoría especificada no existe. Por favor, seleccione una categoría válida.');
          } else {
            console.error('Error desconocido:', error);
          }
        } else {
          console.error('Error desconocido:', error);
        }
      });
  }

  limpiar(): void {
    this.id_producto = '';
    this.nombre = '';
    this.descripcion = '';
    this.id_categoria = '';
    this.precio_compra = '';
    this.precio_venta = '';
    this.cantidad_stock = '';
    this.unidad_medida = '';
    this.id_proveedor = '';
    this.fecha_ingreso = '';
    this.fecha_caducidad = '';
    this.codigo_barras = '';
  }

  editar(){

  }
}
