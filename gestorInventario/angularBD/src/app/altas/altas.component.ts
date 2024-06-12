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
  id?: string;
  name?: string;
  lastname?: string;
  email?: string;
  tel?: string;

  constructor(private abcService: AbcService) { }

  ngOnInit(): void { }

  insertar(): void {
    let body = {
      idUser: this.id,
      name: this.name,
      lastname: this.lastname,
      contact: this.email,
      cellphone: this.tel
  };
  this.abcService.alta('http://localhost:3000/user', body).then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
  }

  limpiar(): void {
    this.id = '';
    this.name = '';
    this.lastname = '';
    this.email = '';
    this.tel = '';
  }
}
