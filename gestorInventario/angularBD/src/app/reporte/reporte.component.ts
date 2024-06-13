import { Component, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit{
  array: any[] = []; 
  array2: any[] = []; 

  constructor(private abcService: AbcService) { 
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

  ngOnInit(): void {
    
  }

}
