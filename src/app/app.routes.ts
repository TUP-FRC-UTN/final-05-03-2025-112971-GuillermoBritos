import { Routes } from '@angular/router';
import { ListarReservasComponent } from './listar-reservas/listar-reservas.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';

export const routes: Routes = [

  { path: 'crear-reserva', component: CrearReservaComponent },

  { path: 'listar-reservas', component: ListarReservasComponent }
];
