import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AltasComponent } from './altas/altas.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AltasComponent, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularBD';
}
