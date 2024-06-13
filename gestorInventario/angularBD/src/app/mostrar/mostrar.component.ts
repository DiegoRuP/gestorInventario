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

  constructor(private abcService:AbcService){}

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
}
