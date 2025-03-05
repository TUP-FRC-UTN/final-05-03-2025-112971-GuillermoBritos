import { Routes } from '@angular/router';
import { ListarReservasComponent } from './listar-reservas/listar-reservas.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';

export const routes: Routes = [

  { path: 'ReservarPasaje', component: CrearReservaComponent },

  { path: 'Listado Reservas', component: ListarReservasComponent }
];
