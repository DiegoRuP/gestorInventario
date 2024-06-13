import { Routes } from '@angular/router';
import { AltasComponent } from './altas/altas.component';
import { MostrarComponent } from './mostrar/mostrar.component';
import { ReporteComponent } from './reporte/reporte.component';


export const routes: Routes = [
    { path: 'altas', component: AltasComponent },
    { path: 'mostrar', component: MostrarComponent },
    { path: 'reporte', component: ReporteComponent },
    { path: '', redirectTo: '/altas', pathMatch: 'full' }
];
