import { Routes } from '@angular/router';
import { AltasComponent } from './altas/altas.component';
import { MostrarComponent } from './mostrar/mostrar.component';


export const routes: Routes = [
    { path: 'altas', component: AltasComponent },
    { path: 'mostrar', component: MostrarComponent },
    { path: '', redirectTo: '/altas', pathMatch: 'full' }
];
