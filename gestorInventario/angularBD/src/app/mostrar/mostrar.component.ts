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

  array: any = [] = [];
  searchQuery: string = '';

  constructor(private abcService: AbcService) { 
    this.abcService.consulta('http://localhost:3000/user').subscribe((res: any) => {
    console.log('Consulta general');  
    console.log(res);
    this.array = res.array;
    });
  }

  buscar(): void {
    if (this.searchQuery) {
      this.abcService.buscarProductos(this.searchQuery).subscribe((res: any) => {
        console.log('Resultados de búsqueda');
        console.log(res);
        this.array = res.array;
      });
    } else {
      this.constructor();
    }
  }

  ngOnInit(): void { }

}
