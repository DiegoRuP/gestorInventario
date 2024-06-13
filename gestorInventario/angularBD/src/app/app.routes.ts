import { Routes } from '@angular/router';
import { AltasComponent } from './altas/altas.component';
import { MostrarComponent } from './mostrar/mostrar.component';
import { ReporteComponent } from './reporte/reporte.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    { path: 'altas', component: AltasComponent },
    { path: 'mostrar', component: MostrarComponent },
    { path: 'reporte', component: ReporteComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
