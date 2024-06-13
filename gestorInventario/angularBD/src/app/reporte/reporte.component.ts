import { Component, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'] // Cambié styleUrl a styleUrls
})
export class ReporteComponent implements OnInit {
  array: any[] = []; 
  array2: any[] = []; 

  constructor(private abcService: AbcService) { }

  ngOnInit(): void {
    this.abcService.generarReporte('http://localhost:3000/generarReporte').subscribe((res: any) => {
      console.log('Consulta general');
      console.log(res);
      this.array = res.data; 
    });

    this.abcService.generarReporte('http://localhost:3000/mostrar').subscribe((res: any) => {
      console.log('Consulta general');
      console.log(res);
      this.array2 = res.data; 
    });
  }
  generarPDF() {
    const doc = new jsPDF({
      orientation: 'landscape' 
    });

    doc.setFontSize(18); 
    doc.text('Reporte Inventario Faltante', 14, 20);

    doc.setFontSize(12);
    (doc as any).autoTable({
      head: [['ID', 'Nombre', 'Descripción', 'Categoría', 'Marca', 'Precio Compra', 'Precio Venta', 'Stock', 'Unidad', 'Proveedor', 'Ingreso', 'Caducidad', 'Código']],
      body: this.array.map(item => [
        item.id_producto, item.nombre, item.descripcion, item.id_categoria, item.marca, item.precio_compra,
        item.precio_venta, item.cantidad_stock, item.unidad_medida, item.id_proveedor, item.fecha_ingreso,
        item.fecha_caducidad, item.codigo_barras
      ]),
      startY: 30,
      theme: 'striped',
      headStyles: { fontSize: 10 }, 
      bodyStyles: { fontSize: 9 }  
    });

    doc.save('reporte_inventario.pdf');
  }
}
